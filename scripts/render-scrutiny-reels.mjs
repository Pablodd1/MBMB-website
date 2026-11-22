import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const ROOT = process.cwd();
const OUT_DIR = path.resolve(ROOT, 'public', 'reels');
const WORK_DIR = 'C:/Users/jasme/.gemini/antigravity/brain/0e2b14de-6de7-4fde-b321-23c66f36a1e8/scratch/reel_studio/work';
const AVATAR_PNG = path.join(WORK_DIR, 'jasmel_avatar_clean.png');
const TTS_ENDPOINT = 'https://medicalbillingmb.com/api/tts';

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(WORK_DIR, { recursive: true });

function escapeXml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text, maxChars) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > maxChars && cur) {
      lines.push(cur.trim());
      cur = w;
    } else {
      cur = (cur + ' ' + w).trim();
    }
  }
  if (cur) lines.push(cur.trim());
  return lines;
}

async function synthesizeSpeech(text, lang, outFile) {
  if (fs.existsSync(outFile) && fs.statSync(outFile).size > 2000) return outFile;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(TTS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language: lang, voice: 'rex' }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.audioContent) {
        fs.writeFileSync(outFile, Buffer.from(data.audioContent, 'base64'));
        return outFile;
      }
    }
    await new Promise((r) => setTimeout(r, 800 * attempt));
  }
  throw new Error(`TTS failed for: ${text}`);
}

function getDuration(mediaPath) {
  return (
    parseFloat(
      execFileSync(
        'ffprobe',
        ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', mediaPath],
        { encoding: 'utf8' }
      ).trim()
    ) || 3.0
  );
}

const ACCENT_COLORS = {
  red: { main: '#ef4444', soft: 'rgba(239,68,68,0.16)', border: 'rgba(239,68,68,0.45)', pillText: '#fca5a5' },
  amber: { main: '#f59e0b', soft: 'rgba(245,158,11,0.16)', border: 'rgba(245,158,11,0.45)', pillText: '#fcd34d' },
  cyan: { main: '#00A8E8', soft: 'rgba(0,168,232,0.16)', border: 'rgba(0,168,232,0.45)', pillText: '#7dd3fc' },
  green: { main: '#10b981', soft: 'rgba(16,185,129,0.16)', border: 'rgba(16,185,129,0.45)', pillText: '#6ee7b7' },
};

async function renderBeatFrame({ reelTag, lang, beatIndex, totalBeats, scene, captionText, avatarBuf, outPng }) {
  const W = 1080;
  const H = 1920;
  const accent = ACCENT_COLORS[scene.accent || 'cyan'];
  const progressWidth = Math.round(880 * ((beatIndex + 1) / totalBeats));

  const headlineLines = wrapText(scene.headline, 24);
  const headlineSvg = headlineLines
    .map((line, i) => `<text x="72" y="${472 + i * 68}" font-family="Segoe UI, Arial, sans-serif" font-size="56" font-weight="800" fill="#ffffff">${escapeXml(line)}</text>`)
    .join('\n');

  const stageTop = 472 + headlineLines.length * 68 + 26;
  let bodySvg = '';

  if (scene.type === 'hero') {
    const heroLines = wrapText(scene.cardBody, 34);
    const bodyTextSvg = heroLines
      .map((l, i) => `<text x="118" y="${stageTop + 178 + i * 46}" font-family="Segoe UI, Arial, sans-serif" font-size="33" font-weight="500" fill="#cbd5e1">${escapeXml(l)}</text>`)
      .join('\n');
    const cardH = Math.max(340, 210 + heroLines.length * 46 + 44);
    bodySvg = `
      <rect x="72" y="${stageTop}" width="880" height="${cardH}" rx="28" fill="rgba(12,26,48,0.88)" stroke="${accent.border}" stroke-width="2.5"/>
      <rect x="72" y="${stageTop}" width="12" height="${cardH}" rx="6" fill="${accent.main}"/>
      <text x="118" y="${stageTop + 106}" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="900" fill="${accent.main}">${escapeXml(scene.cardStat)}</text>
      ${bodyTextSvg}
    `;
  } else if (scene.type === 'rows') {
    const rowH = 148;
    const gap = 22;
    bodySvg = scene.rows
      .map((row, idx) => {
        const y = stageTop + idx * (rowH + gap);
        const c = ACCENT_COLORS[row.color || 'cyan'];
        const titleLines = wrapText(row.title, 34);
        const subLines = wrapText(row.sub, 40);
        return `
          <rect x="72" y="${y}" width="880" height="${rowH}" rx="22" fill="rgba(12,26,48,0.88)" stroke="rgba(148,163,184,0.22)" stroke-width="2"/>
          <rect x="72" y="${y}" width="10" height="${rowH}" rx="5" fill="${c.main}"/>
          <rect x="104" y="${y + 24}" width="188" height="100" rx="16" fill="${c.soft}" stroke="${c.border}" stroke-width="1.8"/>
          <text x="198" y="${y + 89}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="${row.badge.length > 6 ? 32 : 40}" font-weight="900" fill="${c.main}">${escapeXml(row.badge)}</text>
          <text x="318" y="${y + (titleLines.length > 1 ? 52 : 62)}" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="800" fill="#f8fafc">${escapeXml(titleLines[0] || '')}</text>
          ${titleLines[1] ? `<text x="318" y="${y + 86}" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="800" fill="#f8fafc">${escapeXml(titleLines[1])}</text>` : ''}
          <text x="318" y="${y + (titleLines.length > 1 ? 120 : 102)}" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="500" fill="#94a3b8">${escapeXml(subLines[0] || '')}</text>
          ${!titleLines[1] && subLines[1] ? `<text x="318" y="${y + 130}" font-family="Segoe UI, Arial, sans-serif" font-size="23" font-weight="500" fill="#94a3b8">${escapeXml(subLines[1])}</text>` : ''}
        `;
      })
      .join('\n');
  } else if (scene.type === 'cta') {
    bodySvg = `
      <rect x="72" y="${stageTop}" width="880" height="445" rx="28" fill="rgba(10,25,47,0.92)" stroke="rgba(16,185,129,0.5)" stroke-width="2.5"/>
      <rect x="122" y="${stageTop + 44}" width="780" height="96" rx="48" fill="url(#ctaGrad)"/>
      <text x="512" y="${stageTop + 105}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="31" font-weight="900" fill="#031510" letter-spacing="0.8">${escapeXml(scene.ctaButton)}</text>
      <text x="512" y="${stageTop + 215}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="800" fill="#38bdf8">${escapeXml(scene.ctaUrl || 'medicalbillingmb.com/call-me')}</text>
      <text x="512" y="${stageTop + 286}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="48" font-weight="900" fill="#ffffff">(786) 643-2099</text>
      <text x="512" y="${stageTop + 348}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700" fill="#fcd34d">${escapeXml(scene.ctaTagline)}</text>
      <text x="512" y="${stageTop + 402}" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="600" fill="#94a3b8">${escapeXml(lang === 'es' ? 'Llama · Texto · Consulta Virtual Gratis · $0 Instalación' : 'Call · Text · Free Virtual Consultation · $0 Setup')}</text>
    `;
  }

  const capLines = wrapText(captionText, 36);
  const capBoxY = 1215;
  const capBoxH = Math.max(150, 58 + capLines.length * 48);
  const capTextSvg = capLines
    .map((l, i) => `<text x="112" y="${capBoxY + 62 + i * 48}" font-family="Segoe UI, Arial, sans-serif" font-size="36" font-weight="800" fill="#ffffff">${escapeXml(l)}</text>`)
    .join('\n');

  const svg = `
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#040b18"/>
        <stop offset="50%" stop-color="#07152b"/>
        <stop offset="100%" stop-color="#030812"/>
      </linearGradient>
      <radialGradient id="topGlow" cx="50%" cy="22%" r="60%">
        <stop offset="0%" stop-color="${accent.main}" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#040b18" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="progGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#00A8E8"/>
        <stop offset="100%" stop-color="#10b981"/>
      </linearGradient>
      <linearGradient id="ctaGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#10b981"/>
        <stop offset="100%" stop-color="#34d399"/>
      </linearGradient>
      <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
        <path d="M 72 0 L 0 0 0 72" fill="none" stroke="rgba(148,163,184,0.06)" stroke-width="1"/>
      </pattern>
    </defs>

    <rect width="${W}" height="${H}" fill="url(#bgGrad)"/>
    <rect width="${W}" height="${H}" fill="url(#grid)"/>
    <rect width="${W}" height="${H}" fill="url(#topGlow)"/>

    <rect x="72" y="94" width="880" height="8" rx="4" fill="rgba(255,255,255,0.14)"/>
    <rect x="72" y="94" width="${progressWidth}" height="8" rx="4" fill="url(#progGrad)"/>

    <rect x="72" y="126" width="520" height="50" rx="25" fill="rgba(15,32,60,0.85)" stroke="rgba(56,189,248,0.3)" stroke-width="1.5"/>
    <circle cx="102" cy="151" r="7" fill="#10b981"/>
    <text x="122" y="160" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="800" fill="#e2e8f0" letter-spacing="1.4">MEDICAL BILLING MIAMI BEACH</text>

    <rect x="746" y="126" width="206" height="50" rx="25" fill="rgba(0,168,232,0.15)" stroke="rgba(0,168,232,0.45)" stroke-width="1.5"/>
    <text x="849" y="160" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="800" fill="#7dd3fc" letter-spacing="1">${escapeXml(reelTag)}</text>

    <rect x="72" y="202" width="880" height="148" rx="24" fill="rgba(10,22,42,0.82)" stroke="rgba(245,158,11,0.35)" stroke-width="1.8"/>
    <circle cx="152" cy="276" r="72" fill="#07152b" stroke="#f59e0b" stroke-width="4.5"/>
    <text x="248" y="264" font-family="Segoe UI, Arial, sans-serif" font-size="36" font-weight="900" fill="#ffffff">Jasmel Acosta</text>
    <circle cx="536" cy="252" r="14" fill="#00A8E8"/>
    <path d="M529 252 L534 257 L544 246" fill="none" stroke="#ffffff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="248" y="308" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="600" fill="#94a3b8">${lang === 'es' ? 'CEO y Fundador · Miami Beach, FL · EN &amp; Español' : 'CEO &amp; Founder · Miami Beach, FL · EN &amp; Español'}</text>

    <rect x="72" y="376" width="${Math.min(620, scene.pill.length * 17 + 56)}" height="44" rx="22" fill="${accent.soft}" stroke="${accent.border}" stroke-width="1.6"/>
    <text x="100" y="405" font-family="Segoe UI, Arial, sans-serif" font-size="21" font-weight="800" fill="${accent.pillText}" letter-spacing="1.4">${escapeXml(scene.pill)}</text>

    ${headlineSvg}
    ${bodySvg}

    <rect x="72" y="${capBoxY}" width="880" height="${capBoxH}" rx="24" fill="rgba(4,12,26,0.92)" stroke="rgba(56,189,248,0.42)" stroke-width="2"/>
    <rect x="72" y="${capBoxY}" width="10" height="${capBoxH}" rx="5" fill="#00A8E8"/>
    ${capTextSvg}

    <text x="72" y="${capBoxY + capBoxH + 46}" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="600" fill="#64748b">${escapeXml(scene.source || 'Medical Billing Miami Beach · Miami Beach, FL')}</text>
  </svg>`;

  await sharp(Buffer.from(svg))
    .composite([{ input: avatarBuf, left: 84, top: 208 }])
    .png()
    .toFile(outPng);
}

function generateAmbientBed(durationSec, outWav) {
  const dur = (durationSec + 1.5).toFixed(2);
  const fadeOutStart = Math.max(0.5, durationSec - 1.2).toFixed(2);
  const expr =
    '0.22*sin(2*PI*130.81*t) + 0.16*sin(2*PI*196.00*t) + 0.14*sin(2*PI*246.94*t) + 0.10*sin(2*PI*293.66*t)*(0.65+0.35*sin(2*PI*0.25*t)) + 0.08*sin(2*PI*329.63*t)*(0.5+0.5*sin(2*PI*0.5*t))';
  execFileSync('ffmpeg', [
    '-y', '-v', 'error',
    '-f', 'lavfi',
    '-i', `aevalsrc=${expr}:s=44100:d=${dur}`,
    '-af', `lowpass=f=820,volume=0.085,afade=t=in:st=0:d=1.0,afade=t=out:st=${fadeOutStart}:d=1.4`,
    '-ac', '2',
    outWav,
  ]);
}

const SCRUTINY_REELS = [
  {
    id: 'reel_6_scrutiny_en',
    filename: 'MBMB_Reel_6_Scrutiny_Before_Scrutiny_EN.mp4',
    reelTag: 'REEL 06 · EN',
    lang: 'en',
    beats: [
      {
        speech: 'Insurance payers run automated scrutiny to deny your claims in milliseconds. At Medical Billing Miami Beach, we run Scrutiny Before the Scrutiny.',
        caption: 'Payers use automated edits to deny claims in milliseconds — we run Scrutiny Before the Scrutiny™.',
        scene: {
          type: 'hero',
          accent: 'cyan',
          pill: 'SCRUTINY BEFORE THE SCRUTINY',
          headline: 'Stop Claim Denials Before Payers Ever See Them',
          cardStat: '8-Point Pre-Check',
          cardBody: 'Every clinical note, ICD-10, CPT code, modifier, and payer rule audited BEFORE a single claim leaves your office.',
          source: 'Medical Billing Miami Beach · Pre-Submission Scrutiny',
        },
      },
      {
        speech: 'Before transmission, we review the complete medical note against every ICD-10 diagnosis, CPT procedure, and E and M complexity level.',
        caption: 'We review the complete medical note against every ICD-10, CPT code & E/M MDM level first.',
        scene: {
          type: 'rows',
          accent: 'cyan',
          pill: 'DOCUMENTATION TO CODE',
          headline: 'Full Clinical Note & Coding Alignment',
          rows: [
            { badge: 'ICD-10', color: 'cyan', title: 'Clinical Note Verification', sub: 'Zero unsupported or ruled-out diagnoses' },
            { badge: 'CPT/EM', color: 'green', title: 'Accurate MDM Leveling', sub: 'Stop silent 99213/99214 undercoding' },
            { badge: 'Render', color: 'amber', title: 'Performed vs. Ordered Guard', sub: 'Never bill ordered labs as rendered care' },
          ],
          source: 'Medical Billing Miami Beach · Clinical Documentation Review',
        },
      },
      {
        speech: 'We catch Modifier 25 and 59 traps, Florida Medicare LCD medical necessity gaps, and Medicare Advantage routing errors before they trigger a rejection.',
        caption: 'We catch Modifier 25/59 traps, Florida LCD medical necessity gaps & payer routing errors upfront.',
        scene: {
          type: 'rows',
          accent: 'amber',
          pill: 'ZERO PAYER TRAPS',
          headline: 'Catch What Payers Reject — Before Filing',
          rows: [
            { badge: '25 / 59', color: 'amber', title: 'Modifier & NCCI Bundling Guard', sub: 'Prevents CO-97 & CO-50 front-end denials' },
            { badge: 'LCD/NCD', color: 'cyan', title: 'Florida Medical Necessity Check', sub: 'Diagnosis pointers verified for FCSO & commercial' },
            { badge: 'Shield', color: 'green', title: 'MA, FL Medicaid & QMB Safety', sub: 'Blocks wrong-payer & balance-billing errors' },
          ],
          source: 'Medical Billing Miami Beach · Florida Payer Compliance',
        },
      },
      {
        speech: 'Anything missing is held for quick correction and signed off by our U.S. AAPC-certified coders — driving ninety-eight-point-four percent clean claims inside your current EHR.',
        caption: 'Anything missing is fixed upfront & signed off by U.S. AAPC coders — 98.4% clean claims in your EHR.',
        scene: {
          type: 'rows',
          accent: 'green',
          pill: 'AUDIT-PROOF RESULTS',
          headline: 'Only Clean, Defensible Claims Reach Payers',
          rows: [
            { badge: '98.4%', color: 'green', title: 'Clean First-Pass Claim Target', sub: 'Faster payouts in 14–21 days' },
            { badge: 'AAPC', color: 'cyan', title: 'U.S. Certified Coder Sign-Off', sub: 'Zero blind automation · Full audit safety' },
            { badge: '$0', color: 'green', title: 'Setup Fee · Keep Your EHR', sub: 'Only 5.6%–10% of collected cash' },
          ],
          source: 'Medical Billing Miami Beach · U.S. AAPC-Certified Coders',
        },
      },
      {
        speech: 'Test Scrutiny Before the Scrutiny free on twenty charts. Visit medicalbillingmb.com or call 786-643-2099 today.',
        caption: 'Test Scrutiny Before the Scrutiny™ free on 20 charts — visit medicalbillingmb.com or call (786) 643-2099.',
        scene: {
          type: 'cta',
          accent: 'green',
          pill: 'FREE 20-CLAIM SCRUTINY TEST',
          headline: 'Scrutiny Before the Scrutiny™',
          ctaButton: 'RUN FREE 20-CLAIM SCRUTINY TEST',
          ctaUrl: 'medicalbillingmb.com/services/pre-submission-scrutiny',
          ctaTagline: 'Catch what’s missing before payers see it.',
          source: 'Medical Billing Miami Beach · Miami Beach, FL',
        },
      },
    ],
  },
  {
    id: 'reel_6_scrutiny_es',
    filename: 'MBMB_Reel_6_Escrutinio_Previo_ES.mp4',
    reelTag: 'REEL 06 · ES',
    lang: 'es',
    beats: [
      {
        speech: 'Las aseguradoras usan sistemas automáticos para rechazar tus reclamos en segundos. En Medical Billing Miami Beach aplicamos Escrutinio Antes del Escrutinio.',
        caption: 'Las aseguradoras rechazan reclamos en segundos — nosotros aplicamos Escrutinio Antes del Escrutinio™.',
        scene: {
          type: 'hero',
          accent: 'cyan',
          pill: 'ESCRUTINIO ANTES DEL ESCRUTINIO',
          headline: 'Evita Rechazos Antes de Enviar Tus Reclamos',
          cardStat: 'Revisión 8 Puntos',
          cardBody: 'Auditamos tu nota médica completa, códigos ICD-10, CPT, modificadores y reglas de seguros ANTES de transmitir.',
          source: 'Medical Billing Miami Beach · Escrutinio Previo',
        },
      },
      {
        speech: 'Antes de enviar un solo reclamo, revisamos la nota clínica completa frente a cada diagnóstico ICD-10, código CPT y nivel de complejidad médica.',
        caption: 'Revisamos tu nota clínica completa frente a cada ICD-10, CPT y nivel E/M antes de enviar.',
        scene: {
          type: 'rows',
          accent: 'cyan',
          pill: 'NOTA CLÍNICA A CÓDIGO',
          headline: 'Alineación Total de Documentación y Códigos',
          rows: [
            { badge: 'ICD-10', color: 'cyan', title: 'Validación de Nota Clínica', sub: 'Cero diagnósticos sin soporte o descartados' },
            { badge: 'CPT/EM', color: 'green', title: 'Nivel E/M Exacto', sub: 'Evita perder ~40% por subcodificar 99213/99214' },
            { badge: 'Control', color: 'amber', title: 'Realizado vs. Ordenado', sub: 'Separa exámenes ordenados de procedimientos' },
          ],
          source: 'Medical Billing Miami Beach · Auditoría Clínica Previa',
        },
      },
      {
        speech: 'Detectamos fallas de Modificador 25 y 59, necesidad médica LCD en Florida y errores de cobertura Medicare Advantage antes de que generen un rechazo.',
        caption: 'Detectamos errores de Modificador 25/59, reglas LCD en Florida y cobertura incorrecta a tiempo.',
        scene: {
          type: 'rows',
          accent: 'amber',
          pill: 'CERO TRAMPAS DE SEGUROS',
          headline: 'Detectamos lo Que Rechazan — Antes de Enviar',
          rows: [
            { badge: '25 / 59', color: 'amber', title: 'Escudo de Modificadores y NCCI', sub: 'Evita rechazos prevenibles CO-97 y CO-50' },
            { badge: 'LCD/NCD', color: 'cyan', title: 'Necesidad Médica en Florida', sub: 'Punteros de diagnóstico verificados' },
            { badge: 'Escudo', color: 'green', title: 'Medicare Advantage, Medicaid y QMB', sub: 'Protege contra errores de plan y auditorías' },
          ],
          source: 'Medical Billing Miami Beach · Cumplimiento en Florida',
        },
      },
      {
        speech: 'Todo expediente con información faltante se corrige primero y recibe validación final de nuestros codificadores certificados AAPC dentro de tu mismo EHR.',
        caption: 'Corregimos todo a tiempo con codificadores AAPC en EE.UU. — 98.4% reclamos limpios en tu EHR.',
        scene: {
          type: 'rows',
          accent: 'green',
          pill: 'RECLAMOS A PRUEBA DE AUDITORÍA',
          headline: 'Solo Reclamos Limpios Llegan al Seguro',
          rows: [
            { badge: '98.4%', color: 'green', title: 'Meta de Reclamos Limpios', sub: 'Pagos más rápidos en 14–21 días' },
            { badge: 'AAPC', color: 'cyan', title: 'Validación Humana AAPC', sub: 'Cero automatización ciega · Máximo respaldo' },
            { badge: '$0', color: 'green', title: 'Instalación · Mismo EHR', sub: 'Solo 5.6%–10% de lo cobrado en banco' },
          ],
          source: 'Medical Billing Miami Beach · Codificadores AAPC',
        },
      },
      {
        speech: 'Prueba nuestro escrutinio previo gratis en veinte expedientes. Visita medicalbillingmb.com o llama al 786-643-2099 hoy mismo.',
        caption: 'Prueba nuestro escrutinio previo gratis en 20 casos — medicalbillingmb.com o (786) 643-2099.',
        scene: {
          type: 'cta',
          accent: 'green',
          pill: 'PRUEBA GRATIS DE 20 RECLAMOS',
          headline: 'Escrutinio Antes del Escrutinio™',
          ctaButton: 'PRUEBA GRATIS 20 RECLAMOS',
          ctaUrl: 'medicalbillingmb.com/services/pre-submission-scrutiny',
          ctaTagline: 'Detectamos lo que falta antes que el seguro.',
          source: 'Medical Billing Miami Beach · Miami Beach, FL',
        },
      },
    ],
  },
];

async function renderReel(reel, avatarBuf) {
  console.log(`\n🎬 Rendering ${reel.filename} (${reel.beats.length} beats)...`);
  const reelWork = path.join(WORK_DIR, reel.id);
  fs.mkdirSync(reelWork, { recursive: true });
  const segPaths = [];
  const audioPaths = [];
  let totalDur = 0;

  for (let i = 0; i < reel.beats.length; i++) {
    const beat = reel.beats[i];
    const mp3Path = path.join(reelWork, `vo_${i}.mp3`);
    const padWav = path.join(reelWork, `vo_${i}_pad.wav`);
    const pngPath = path.join(reelWork, `frame_${i}.png`);
    const segMp4 = path.join(reelWork, `seg_${i}.mp4`);

    await synthesizeSpeech(beat.speech, reel.lang, mp3Path);
    const voDur = getDuration(mp3Path);
    const tailPad = i === reel.beats.length - 1 ? 1.15 : 0.38;
    const leadPad = i === 0 ? 0.25 : 0.12;
    const segDur = +(leadPad + voDur + tailPad).toFixed(3);
    totalDur += segDur;

    execFileSync('ffmpeg', [
      '-y', '-v', 'error', '-i', mp3Path,
      '-af', `adelay=${Math.round(leadPad * 1000)}|${Math.round(leadPad * 1000)},apad=whole_dur=${segDur}`,
      '-ar', '44100', '-ac', '2', padWav,
    ]);
    audioPaths.push(padWav);

    await renderBeatFrame({
      reelTag: reel.reelTag,
      lang: reel.lang,
      beatIndex: i,
      totalBeats: reel.beats.length,
      scene: beat.scene,
      captionText: beat.caption,
      avatarBuf,
      outPng: pngPath,
    });

    const frames = Math.max(30, Math.round(segDur * 30));
    const fadeOutStart = Math.max(0.1, segDur - 0.18).toFixed(3);
    execFileSync('ffmpeg', [
      '-y', '-v', 'error', '-loop', '1', '-i', pngPath, '-t', String(segDur),
      '-vf', `scale=1120:1992,zoompan=z='1+0.025*(on/${frames})':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${frames}:s=1080x1920:fps=30,fade=t=in:st=0:d=0.16,fade=t=out:st=${fadeOutStart}:d=0.18,format=yuv420p`,
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '24', '-r', '30', '-an', segMp4,
    ]);
    segPaths.push(segMp4);
  }

  const vidList = path.join(reelWork, 'vlist.txt');
  fs.writeFileSync(vidList, segPaths.map((p) => `file '${p.replace(/\\/g, '/')}'`).join('\n'));
  const concatVid = path.join(reelWork, 'video_concat.mp4');
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', vidList, '-c', 'copy', concatVid]);

  const audList = path.join(reelWork, 'alist.txt');
  fs.writeFileSync(audList, audioPaths.map((p) => `file '${p.replace(/\\/g, '/')}'`).join('\n'));
  const concatVo = path.join(reelWork, 'vo_concat.wav');
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', audList, '-c', 'copy', concatVo]);

  const musicWav = path.join(reelWork, 'ambient_bed.wav');
  generateAmbientBed(totalDur, musicWav);

  const finalOut = path.join(OUT_DIR, reel.filename);
  execFileSync('ffmpeg', [
    '-y', '-v', 'error', '-i', concatVid, '-i', concatVo, '-i', musicWav,
    '-filter_complex', '[1:a]highpass=f=75,acompressor=threshold=-18dB:ratio=2.5:attack=10:release=120,volume=1.35[vo];[2:a]volume=0.32[bg];[vo][bg]amix=inputs=2:duration=first:dropout_transition=1,loudnorm=I=-14:TP=-1.5:LRA=9[aout]',
    '-map', '0:v:0', '-map', '[aout]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '44100', '-movflags', '+faststart', finalOut,
  ]);
  const mb = (fs.statSync(finalOut).size / (1024 * 1024)).toFixed(2);
  console.log(`  ✅ Ready: ${reel.filename} (${getDuration(finalOut).toFixed(1)}s, ${mb} MB)`);
}

const avatarBuf = fs.readFileSync(AVATAR_PNG);
for (const r of SCRUTINY_REELS) {
  await renderReel(r, avatarBuf);
}
