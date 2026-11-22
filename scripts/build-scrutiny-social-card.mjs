import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const OUT = path.resolve(process.cwd(), 'public/raster/social/style2-week7-scrutiny-before-scrutiny.jpg');
const AVATAR = 'C:/Users/jasme/.gemini/antigravity/brain/0e2b14de-6de7-4fde-b321-23c66f36a1e8/scratch/reel_studio/work/jasmel_avatar_clean.png';

const svg = `
<svg width="1080" height="1350" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#040b18"/>
      <stop offset="55%" stop-color="#081730"/>
      <stop offset="100%" stop-color="#030812"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="18%" r="55%">
      <stop offset="0%" stop-color="#00A8E8" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#040b18" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="btn" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0066CC"/>
      <stop offset="100%" stop-color="#00A8E8"/>
    </linearGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(148,163,184,0.06)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1080" height="1350" fill="url(#bg)"/>
  <rect width="1080" height="1350" fill="url(#grid)"/>
  <rect width="1080" height="1350" fill="url(#glow)"/>

  <!-- Top Brand Pill -->
  <rect x="64" y="56" width="540" height="48" rx="24" fill="rgba(15,32,60,0.9)" stroke="rgba(56,189,248,0.35)" stroke-width="1.5"/>
  <circle cx="94" cy="80" r="7" fill="#10b981"/>
  <text x="114" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" fill="#e2e8f0" letter-spacing="1.4">MEDICAL BILLING MIAMI BEACH</text>

  <rect x="706" y="56" width="310" height="48" rx="24" fill="rgba(16,185,129,0.16)" stroke="rgba(16,185,129,0.45)" stroke-width="1.5"/>
  <text x="861" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="19" font-weight="800" fill="#6ee7b7" letter-spacing="1">8-POINT PRE-CHECK</text>

  <!-- Main Title -->
  <text x="64" y="182" font-family="Segoe UI, Arial, sans-serif" font-size="56" font-weight="900" fill="#ffffff">Scrutiny Before the</text>
  <text x="64" y="248" font-family="Segoe UI, Arial, sans-serif" font-size="56" font-weight="900" fill="#00A8E8">Scrutiny™</text>
  <text x="64" y="302" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="600" fill="#cbd5e1">Payers audit your claims to deny them. We review every</text>
  <text x="64" y="338" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="600" fill="#cbd5e1">clinical note, ICD-10, CPT &amp; modifier BEFORE filing.</text>

  <!-- 4 Executive Pillars (2x2 Grid) -->
  <!-- Card 1 -->
  <rect x="64" y="380" width="460" height="236" rx="24" fill="rgba(12,26,48,0.9)" stroke="rgba(0,168,232,0.45)" stroke-width="2"/>
  <rect x="64" y="380" width="10" height="236" rx="5" fill="#00A8E8"/>
  <text x="100" y="434" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="900" fill="#38bdf8" letter-spacing="1">01 · FULL NOTE ↔ CODE</text>
  <text x="100" y="482" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="800" fill="#ffffff">ICD-10 &amp; CPT MDM Check</text>
  <text x="100" y="526" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="500" fill="#94a3b8">Verifies full SOAP/consult notes so</text>
  <text x="100" y="556" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="500" fill="#94a3b8">nothing is downcoded or unsupported.</text>

  <!-- Card 2 -->
  <rect x="556" y="380" width="460" height="236" rx="24" fill="rgba(12,26,48,0.9)" stroke="rgba(245,158,11,0.45)" stroke-width="2"/>
  <rect x="556" y="380" width="10" height="236" rx="5" fill="#f59e0b"/>
  <text x="592" y="434" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="900" fill="#fcd34d" letter-spacing="1">02 · MODIFIER &amp; LCD GUARD</text>
  <text x="592" y="482" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="800" fill="#ffffff">Florida Payer Rules First</text>
  <text x="592" y="526" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="500" fill="#94a3b8">Catches Modifier 25/59, NCCI edits,</text>
  <text x="592" y="556" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="500" fill="#94a3b8">MUE limits &amp; FCSO medical necessity.</text>

  <!-- Card 3 -->
  <rect x="64" y="644" width="460" height="236" rx="24" fill="rgba(12,26,48,0.9)" stroke="rgba(16,185,129,0.45)" stroke-width="2"/>
  <rect x="64" y="644" width="10" height="236" rx="5" fill="#10b981"/>
  <text x="100" y="698" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="900" fill="#6ee7b7" letter-spacing="1">03 · PAYER &amp; QMB SHIELD</text>
  <text x="100" y="746" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="800" fill="#ffffff">Zero Routing Traps</text>
  <text x="100" y="790" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="500" fill="#94a3b8">Flags Medicare Advantage, FL Medicaid,</text>
  <text x="100" y="820" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="500" fill="#94a3b8">QMB rules &amp; APRN compliance upfront.</text>

  <!-- Card 4 -->
  <rect x="556" y="644" width="460" height="236" rx="24" fill="rgba(12,26,48,0.9)" stroke="rgba(56,189,248,0.45)" stroke-width="2"/>
  <rect x="556" y="644" width="10" height="236" rx="5" fill="#38bdf8"/>
  <text x="592" y="698" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="900" fill="#7dd3fc" letter-spacing="1">04 · U.S. AAPC SIGN-OFF</text>
  <text x="592" y="746" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="800" fill="#ffffff">98.4% Clean First-Pass</text>
  <text x="592" y="790" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="500" fill="#94a3b8">Missing info fixed BEFORE submission.</text>
  <text x="592" y="820" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="500" fill="#94a3b8">Keep your EHR · $0 setup · 5.6%–10%.</text>

  <!-- CTA Strip -->
  <rect x="64" y="920" width="952" height="214" rx="28" fill="rgba(10,25,47,0.94)" stroke="rgba(0,168,232,0.5)" stroke-width="2.5"/>
  <rect x="114" y="952" width="852" height="74" rx="37" fill="url(#btn)"/>
  <text x="540" y="999" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="29" font-weight="900" fill="#ffffff" letter-spacing="0.8">FREE 48-HR 20-CLAIM SCRUTINY TEST →</text>
  <text x="540" y="1072" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="800" fill="#38bdf8">medicalbillingmb.com/services/pre-submission-scrutiny</text>
  <text x="540" y="1112" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="700" fill="#e2e8f0">📞 (786) 643-2099  ·  Call · Text · Free 15-Min Virtual Review  ·  EN &amp; Español</text>

  <!-- CEO Footer Bar -->
  <rect x="64" y="1166" width="952" height="126" rx="24" fill="rgba(10,22,42,0.85)" stroke="rgba(245,158,11,0.35)" stroke-width="1.8"/>
  <circle cx="136" cy="1229" r="52" fill="#07152b" stroke="#f59e0b" stroke-width="4"/>
  <text x="212" y="1220" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="900" fill="#ffffff">Jasmel Acosta</text>
  <text x="212" y="1256" font-family="Segoe UI, Arial, sans-serif" font-size="21" font-weight="600" fill="#94a3b8">CEO &amp; Founder · Medical Billing Miami Beach · Miami Beach, FL</text>
</svg>
`;

const avatarBuf = await sharp(AVATAR).resize(98, 98).png().toBuffer();
await sharp(Buffer.from(svg))
  .composite([{ input: avatarBuf, left: 87, top: 1180 }])
  .jpeg({ quality: 92 })
  .toFile(OUT);

console.log('✅ Built Scrutiny Before the Scrutiny social card:', OUT);
