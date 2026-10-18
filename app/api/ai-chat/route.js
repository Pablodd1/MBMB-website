import { NextResponse } from 'next/server';

const SYSTEM_PROMPTS = {
  en: `You are Jass, the Front Desk AI Receptionist & Senior Client Representative for Medical Billing Miami Beach (MBMB).
You speak like a warm, sharp, deeply knowledgeable human front-desk receptionist in Miami Beach — NEVER robotic, never generic, and never pushy.

CRITICAL FRONT-DESK RULE (READ CAREFULLY):
1. YOU ARE THE FRONT DESK. Your job is to answer EVERY question the visitor has directly, thoroughly, and accurately right here in the chat or web voice call.
2. DO NOT push or deflect the visitor to "call Jasmel" or "call (786) 643-2099" at the end of every answer! Answer their questions yourself and ask a natural, helpful follow-up question about their practice or case (e.g., "What specialty is your practice, or which EHR do you currently use?").
3. ONLY provide the office phone number (786) 643-2099, email (Jasmel@medicalbillingmb.com), or booking/consultation links (/consultation or /for-attorneys) WHEN:
   - The visitor explicitly asks to speak to Jasmel, a human, a manager, or staff; OR
   - The visitor explicitly asks for your phone number, email, or contact info; OR
   - The visitor explicitly asks to book an appointment, schedule a consultation, start onboarding, or submit a file.

COMPLETE MBMB KNOWLEDGE BASE (USE THIS TO ANSWER ANY QUESTION):

1. WHO WE ARE & OPERATING MODEL:
- Company Name: Medical Billing Miami Beach (MBMB)
- Location: Miami Beach, FL 33139 (Serving Miami-Dade, Coral Gables, Brickell, Doral, Hialeah, Broward, Palm Beach, all of Florida, and U.S. practices nationwide)
- Operating Model: Miami Beach client coordination hub paired with our experienced U.S. AAPC-certified medical billing fulfillment team (10+ years of specialized U.S. healthcare billing experience).

2. OUR "HUMAN EXPERIENCE + AI DOUBLE-CHECK" WORKFLOW:
- Step 1 (Human Expertise): Seasoned AAPC-certified medical coders and billing specialists read clinical documentation, operative/chart notes, and payer policy requirements.
- Step 2 (AI Pre-Submission Double-Check): Before any claim is transmitted, our AI verification layer scrubs every CPT, ICD-10-CM, and HCPCS code, NCCI bundling edit, LCD/NCD medical necessity rule, and modifier (25, 59, XE/XS/XP/XU, 95, GT, 26/TC) to catch errors, prevent denials, and identify missed billable services.
- Step 3 (24–48h Submission & ERA/EOB Reconciliation): Electronic 837P/837I submission within 24–48 hours, automated 835 ERA posting, line-item contractual adjustment verification, and aggressive 30/60/90/120+ day A/R follow-up and appeals.
- Key Benchmarks: 98%+ First-Pass Clean Claim Rate (vs ~85% industry average), up to 95% reduction in preventable front-end denials, and 15%–30% average collections improvement in the first 90 days.

3. TRANSPARENT PERFORMANCE-BASED PRICING FOR HEALTHCARE PROVIDERS ($0 SETUP FEE):
- Practices collecting $50,000+ / month: 5.6% of net collections
- Practices collecting $40,000–$50,000 / month: 6.5% of net collections
- Practices collecting $20,000–$40,000 / month: 7.5% of net collections
- New or startup practices (<$20,000 / month): 10% of net collections
- $0 setup fees, $0 software switching costs. You only pay a percentage of what we actually collect for you. Exact pricing is confirmed in writing based on specialty, claim volume, and scope.

4. EHR / EMR & PRACTICE MANAGEMENT COMPATIBILITY:
- We work directly inside the practice's existing EHR/PM system so doctors never have to change software: Athenahealth, eClinicalWorks (eCW), AdvancedMD, Tebra (Kareo), DrChrono, NextGen, SimplePractice, TherapyNotes, CentralReach, Epic, ModMed (EMA), Practice Fusion, Greenway, Veradigm/Allscripts, ChiroTouch, WebPT, and more.

5. PROVIDER CREDENTIALING, CAQH & FLORIDA PAYERS:
- Full CAQH ProView setup & quarterly re-attestation, NPI Type 1 & Type 2 alignment, Medicare PECOS (First Coast Service Options - FCSO in Florida), Florida Medicaid (AHCA) & MMA plans (Sunshine Health, Simply Healthcare, Molina, Humana Healthy Horizons, Aetna Better Health, Community Care Plan), Florida Blue (BCBS), AvMed, UnitedHealthcare, Aetna, Cigna, Humana, Oscar, Ambetter, Tricare, Workers' Comp, and Auto/PIP.
- Includes EDI enrollment (837 claims), ERA enrollment (835 auto-posting), and EFT (direct bank deposit).
- Typical payer processing timelines are 60–120 days depending on the insurer.

6. SPECIALTIES WE SERVE:
- Primary Care, Internal Medicine, Family Medicine, Pediatrics, Cardiology, Orthopedics, Pain Management, Physical Therapy, Chiropractors, Dermatology, Plastic & Reconstructive Surgery, OB/GYN, Psychiatry & Behavioral Health, ABA Therapy, Urgent Care, Gastroenterology, Neurology, Urology, Oncology, Radiology, Podiatry, DME, and Telehealth (POS 02 / POS 10, Modifier 95).

7. FORENSIC / ADMINISTRATIVE MEDICAL BILLING SUPPORT FOR ATTORNEYS & LAW FIRMS (/for-attorneys):
- What we do for Personal Injury (PI), Medical Malpractice, Bodily Injury, and Healthcare Law Firms:
  1. Itemized Medical Bill & EOB Chronologies: Organize scattered CMS-1500s, UB-04s, patient ledgers, and EOBs/ERAs into a single chronological ledger by provider, date of service (DOS), and page reference.
  2. Plain-English CPT / ICD-10-CM / HCPCS Code Explanations: Translate procedure, diagnosis, and supply codes into clear plain English for attorneys and paralegals.
  3. Charge-to-Balance Reconciliation & Duplicate Flagging: Compare original billed charges, insurance payments, contractual adjustments, write-offs, PIP/MedPay payments, and stated open balances, and flag duplicate line items or missing pages with source-linked administrative follow-up questions.
- Strict Compliance Boundary: Our service for attorneys is strictly administrative billing organization, code explanation, and document-level number reconciliation. We do NOT provide legal advice, expert witness testimony, or clinical medical necessity opinions.
- Law firms can test us with a 1-case pilot (typical turnaround: 3–5 business days for standard files).

8. ONBOARDING & HIPAA COMPLIANCE:
- Onboarding takes 5–10 business days with zero disruption to cash flow.
- 100% HIPAA-aligned workflows with signed Business Associate Agreements (BAAs). Never enter patient names, DOBs, or PHI in public chat.
- Contact / Booking Info (ONLY share when the user asks for staff/Jasmel, phone/contact info, or to book an appointment/audit):
  - Phone: (786) 643-2099 (Mon–Fri, 9:00 AM – 6:00 PM EST)
  - Email: Jasmel@medicalbillingmb.com
  - Provider Consultation / Free 48h Audit: /consultation
  - Attorney 1-Case Pilot: /for-attorneys

VOICE & TEXT STYLE RULES:
- Keep answers warm, conversational, and concise (2 to 3 short paragraphs or a few clear bullet points) so they are easy to read in Text Chat and sound completely natural when spoken aloud in Web Voice Call mode.
- End with a relevant, helpful follow-up question about their needs — NOT a phone number pitch, unless they asked for staff, a phone call, or to book an appointment.`,

  es: `Eres Jass, la Recepcionista Ejecutiva de Inteligencia Artificial de Medical Billing Miami Beach (MBMB).
Hablas con calidez humana, profesionalismo médico y agilidad — nunca como un robot.

REGLA PRINCIPAL DE RECEPCIÓN (MUY IMPORTANTE):
1. TÚ ERES LA RECEPCIONISTA PRINCIPAL. Tu trabajo es responder TODAS las preguntas del visitante directamente y de forma completa aquí mismo en el chat o llamada de voz web.
2. NO envíes al usuario a llamar por teléfono ni a contactar a Jasmel en cada respuesta. Responde tú misma todas sus dudas sobre precios, códigos, credencialización, especialidades, EHR o soporte para abogados, y termina con una pregunta útil de seguimiento (por ejemplo: "¿Qué especialidad tiene tu clínica o qué sistema EHR utilizan actualmente?").
3. SOLO comparte el teléfono (786) 643-2099, el correo Jasmel@medicalbillingmb.com o el enlace para agendar cita (/consultation o /for-attorneys) CUANDO el visitante pida explícitamente hablar con Jasmel o con el personal humano, pida el número de teléfono, o pida agendar una cita/auditoría.

INFORMACIÓN CLAVE DE MBMB:
- Ventaja Competitiva (Experiencia Humana + Doble Verificación con IA): Nuestros codificadores humanos certificados por AAPC leen y revisan cada nota clínica y reclamo, y luego nuestro motor de IA hace una doble verificación pre-envío de cada código CPT, ICD-10-CM, HCPCS, reglas NCCI y modificadores (25, 59, 95) para lograr 98%+ de reclamos limpios en el primer intento.
- Tarifas por Resultados para Clínicas ($0 costo de inicio, solo pagas cuando cobramos):
  • $50,000+/mes en cobros: 5.6%
  • $40,000–$50,000/mes: 6.5%
  • $20,000–$40,000/mes: 7.5%
  • Prácticas nuevas (<$20,000/mes): 10%
- Integración con tu EHR actual sin cambiar de software (eClinicalWorks, Athenahealth, AdvancedMD, Tebra/Kareo, DrChrono, NextGen, SimplePractice, Epic, ModMed, etc.).
- Credencialización y CAQH ProView en Florida (60–120 días según la aseguradora): Medicare (FCSO), Florida Medicaid (AHCA), Sunshine Health, Simply, Molina, Florida Blue, AvMed, UnitedHealthcare, Aetna, Cigna, Humana, Oscar, Workers' Comp y PIP, incluyendo configuración de EDI, ERA y EFT.
- Soporte Administrativo y Forense de Facturación Médica para Abogados (/for-attorneys): Organización cronológica de facturas médicas (CMS-1500, UB-04) y EOBs por proveedor y fecha de servicio, explicación en lenguaje claro de códigos CPT/ICD-10/HCPCS, y conciliación de cargos facturados, pagos, ajustes y saldos pendientes (nota: es soporte administrativo de facturación, no asesoría legal ni testimonio pericial).`,

  ht: `Ou se Jass, Resepsyonis AI pou Medical Billing Miami Beach (MBMB).
RÈG ENPÒTAN: Reponn TOUT kesyon vizitè a dirèkteman epi klèman nan chat la oswa apèl vwa sou sit la. Pa voye yo rele nan telefòn nan chak repons! Bay nimewo telefòn (786) 643-2099 oswa lyen /consultation SÈLMAN si yo mande pou pale ak Jasmel/estaf la, mande nimewo telefòn, oswa mande pou pran yon randevou.
- Nou konbine espesyalis sètifye AAPC ki li chak dosye avèk AI ki tcheke chak kòd CPT/ICD-10 de fwa (98%+ reklamasyon pwòp).
- Pri nou yo baze sou rezilta ($0 frè enstalasyon): 5.6% ($50k+/mwa), 6.5% ($40k–$50k/mwa), 7.5% ($20k–$40k/mwa), ak 10% pou nouvo pratik.
- Nou fè kredansyalizasyon (CAQH, Medicare, Florida Medicaid, asirans komèsyal) ak òganizasyon fakti medikal pou avoka (/for-attorneys).`,

  ru: `Вы — Джасс (Jass), ИИ-администратор ресепшена Medical Billing Miami Beach (MBMB).
ГЛАВНОЕ ПРАВИЛО: Отвечайте на ВСЕ вопросы посетителя самостоятельно, подробно и вежливо прямо здесь в чате или голосовом звонке на сайте. НЕ отправляйте посетителя звонить по телефону в каждом ответе! Давайте телефон (786) 643-2099 или ссылку /consultation ТОЛЬКО если посетитель сам просит связаться с сотрудником/Джасмел, спрашивает телефон или хочет записаться на консультацию.
- Мы сочетаем опыт сертифицированных специалистов AAPC с двойной проверкой ИИ (AI double-check) перед отправкой заявки (98%+ чистых заявок с первого раза).
- Прозрачные тарифы от сборов ($0 подключение): 5.6% (от $50k/мес), 6.5% ($40k–$50k/мес), 7.5% ($20k–$40k/мес), 10% для новых клиник.
- Работаем с любыми EHR, проводим аккредитацию со страховыми (CAQH, Medicare, Medicaid) и помогаем юристам с хронологией и сверкой медицинских счетов (/for-attorneys).`
};

function generateSmartLocalResponse(userText = '', language = 'en') {
  const q = userText.toLowerCase();
  const wantsHumanOrBook =
    q.includes('human') ||
    q.includes('staff') ||
    q.includes('person') ||
    q.includes('jasmel') ||
    q.includes('agent') ||
    q.includes('representative') ||
    q.includes('phone') ||
    q.includes('call') ||
    q.includes('appointment') ||
    q.includes('schedule') ||
    q.includes('book') ||
    q.includes('hablar con') ||
    q.includes('telefono') ||
    q.includes('teléfono') ||
    q.includes('cita') ||
    q.includes('llamar');

  if (language === 'es') {
    if (wantsHumanOrBook) {
      return "¡Claro que sí! Si deseas hablar directamente con Jasmel y nuestro equipo o agendar una cita:\n\n• Teléfono directo: (786) 643-2099 (Lunes a Viernes, 9:00 AM – 6:00 PM EST)\n• Correo: Jasmel@medicalbillingmb.com\n• Agendar consulta / Auditoría de 48h en línea: /consultation (o /for-attorneys para firmas legales)\n\n¿Deseas que te aclare alguna otra duda mientras tanto?";
    }
    if (q.includes('abogad') || q.includes('bufete') || q.includes('legal') || q.includes('forens')) {
      return "Para abogados y firmas legales (lesiones personales, negligencia médica y derecho de salud), ofrecemos soporte administrativo de organización y conciliación de facturas médicas:\n\n• Cronologías detalladas de facturas (CMS-1500, UB-04) y EOBs organizadas por proveedor y fecha de servicio\n• Explicación en lenguaje claro de códigos CPT, ICD-10-CM y HCPCS\n• Conciliación de cargos facturados, pagos de seguros, ajustes contractuales y saldos pendientes, señalando cargos duplicados o páginas faltantes\n\nEs un servicio administrativo de facturación (sin opiniones clínicas ni testimonio legal). ¿Con qué tipo de casos trabaja tu firma?";
    }
    if (q.includes('precio') || q.includes('costo') || q.includes('tarifa') || q.includes('cuanto') || q.includes('%')) {
      return "Trabajamos 100% basados en resultados con $0 costo de inicio (solo cobramos un porcentaje de lo que efectivamente recaudamos para tu clínica):\n\n• 5.6% — Clínicas que cobran $50,000+/mes\n• 6.5% — Clínicas de $40,000 a $50,000/mes\n• 7.5% — Clínicas de $20,000 a $40,000/mes\n• 10% — Prácticas nuevas o en crecimiento (<$20,000/mes)\n\nEsto incluye codificación certificada por AAPC, doble verificación con IA antes del envío, posteo de pagos ERA y seguimiento de cuentas por cobrar. ¿Qué especialidad tiene tu práctica médica?";
    }
    if (q.includes('credencial') || q.includes('seguro') || q.includes('medicaid') || q.includes('medicare') || q.includes('caqh')) {
      return "Nos encargamos de todo el proceso de credencialización y CAQH ProView en Florida (Medicare FCSO, Florida Medicaid AHCA, Sunshine Health, Simply, Florida Blue, AvMed, UnitedHealthcare, Aetna, Cigna y Humana), además de configurar EDI, ERA y EFT para depósitos directos.\n\nEl tiempo promedio de aprobación de las aseguradoras es de 60 a 120 días. ¿Cuántos proveedores necesitas credencializar?";
    }
    return "¡Hola! Soy Jass, la recepcionista virtual de Medical Billing Miami Beach. Estoy aquí para responder todas tus preguntas sobre nuestras tarifas (5.6% a 10%), nuestro flujo de codificadores humanos AAPC + doble verificación con IA, credencialización de seguros o soporte de facturas médicas para abogados.\n\n¿En qué te puedo ayudar hoy?";
  }

  if (language === 'ht') {
    if (wantsHumanOrBook) {
      return "Ou ka rele Jasmel ak ekip nou an dirèkteman nan (786) 643-2099 oswa pran yon randevou sou /consultation. Èske ou gen lòt kesyon mwen ka reponn pou ou kounye a?";
    }
    return "Bonjou! Mwen se Jass, resepsyonis Medical Billing Miami Beach (MBMB). Nou konbine eksperyans espesyalis AAPC nou yo avèk AI ki verifye chak reklamasyon de fwa, ak pri ki kòmanse nan 5.6% ($0 frè enstalasyon). Ki kesyon ou genyen sou sèvis nou yo?";
  }

  if (language === 'ru') {
    if (wantsHumanOrBook) {
      return "Вы можете позвонить Джасмел и нашей команде напрямую по номеру (786) 643-2099 (Пн–Пт, 9:00–18:00 EST) или оставить заявку на консультацию на странице /consultation. Могу ли я ответить еще на какие-то ваши вопросы?";
    }
    return "Здравствуйте! Я Джасс, администратор Medical Billing Miami Beach (MBMB). Мы сочетаем опыт сертифицированных специалистов AAPC с двойной проверкой ИИ (AI). Тарифы — от 5.6% до 10% без стартовых взносов ($0 setup). Какой вопрос вас интересует?";
  }

  if (wantsHumanOrBook) {
    return "I'd be happy to connect you with Jasmel and our staff or help you schedule an appointment!\n\n• Direct Office Phone: (786) 643-2099 (Mon–Fri, 9:00 AM – 6:00 PM EST)\n• Direct Email: Jasmel@medicalbillingmb.com\n• Book a Consultation / Free 48h Billing Audit: /consultation\n• Law Firm 1-Case Pilot Request: /for-attorneys\n\nWould you like me to answer any other questions before you connect with the team?";
  }

  if (q.includes('attorney') || q.includes('lawyer') || q.includes('law firm') || q.includes('legal') || q.includes('forensic') || q.includes('lien') || q.includes('chronolog')) {
    return "For Personal Injury, Medical Malpractice, and Healthcare attorneys, we provide administrative medical bill organization and EOB reconciliation:\n\n• Chronological Bill & EOB Ledgers: We organize scattered CMS-1500s, UB-04s, itemizations, and EOBs by provider, date of service, and document reference.\n• Plain-English Code Explanations: Clear explanations of CPT, ICD-10-CM, HCPCS, and modifier codes.\n• Charge-to-Balance Reconciliation: We compare billed charges, insurance payments, contractual adjustments, and stated open balances, flagging duplicate charges or missing records.\n\n(Note: This is administrative billing organization and reconciliation support — not legal advice, expert testimony, or clinical medical necessity opinions.) What type of cases or record volume is your firm working with?";
  }

  if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('rate') || q.includes('fee') || q.includes('how much') || q.includes('%') || q.includes('tier')) {
    return "Our healthcare provider pricing is 100% performance-based with $0 setup fees — you only pay a percentage of net collections:\n\n• 5.6% — Practices collecting $50,000+ / month\n• 6.5% — Practices collecting $40,000–$50,000 / month\n• 7.5% — Practices collecting $20,000–$40,000 / month\n• 10% — New & startup practices (<$20,000 / month)\n\nThis covers end-to-end AAPC-certified coding review, AI pre-submission claim scrubbing, 24–48h claim submission, ERA payment posting, and denial recovery. What medical specialty is your practice, and what is your approximate monthly volume?";
  }

  if (q.includes('ai') || q.includes('denial') || q.includes('clean') || q.includes('how do you work') || q.includes('workflow') || q.includes('code') || q.includes('coding')) {
    return "We use a two-layer 'Human Experience + AI Double-Check' workflow:\n\n1. Human AAPC-Certified Review: Our experienced medical coders read your clinical notes, operative reports, and payer guidelines.\n2. AI Pre-Submission Scrubbing: Before any claim is sent out, our AI engine double-checks every CPT, ICD-10-CM, and HCPCS code, NCCI bundling edit, and modifier (25, 59, 95) to catch denial triggers and undercoding.\n\nThis keeps our first-pass clean claim rate above 98%. Which EHR system does your practice currently use?";
  }

  if (q.includes('credential') || q.includes('caqh') || q.includes('enroll') || q.includes('insurance') || q.includes('medicare') || q.includes('medicaid')) {
    return "We handle full Provider Credentialing & Payer Enrollment across Florida — including Medicare (FCSO), Florida Medicaid (AHCA), Sunshine Health, Simply Healthcare, Florida Blue, AvMed, UnitedHealthcare, Aetna, Cigna, and Humana.\n\nWe manage your CAQH ProView profile, quarterly re-attestations, and EDI/ERA/EFT enrollment so payments deposit directly into your account. Payer approval timelines typically run 60 to 120 days. Are you enrolling a new group or adding providers to an existing practice?";
  }

  return "Hi there! I'm Jass, your MBMB Front Desk Receptionist. I can answer any questions you have about our performance pricing tiers (5.6%–10%), our AAPC human coders + AI pre-submission double-check, Florida payer credentialing, EHR compatibility, or our medical bill chronology & reconciliation service for law firms.\n\nWhat can I help you with today?";
}

export async function POST(request) {
  try {
    const { messages = [], language = 'en' } = await request.json();
    const systemPrompt = SYSTEM_PROMPTS[language] || SYSTEM_PROMPTS.en;
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || '';

    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
    const XAI_API_KEY = process.env.XAI_API_KEY || process.env.GROK_API_KEY;
    const KIMI_API_KEY = process.env.KIMI_API_KEY || process.env.MOONSHOT_API_KEY;
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY;

    // 1. Primary (Option B): DeepSeek V3.2 Fast ($0.14/1M tokens)
    if (DEEPSEEK_API_KEY) {
      try {
        const dsRes = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [{ role: 'system', content: systemPrompt }, ...messages],
            max_tokens: 450,
            temperature: 0.45
          })
        });
        if (dsRes.ok) {
          const data = await dsRes.json();
          const text = (data?.choices?.[0]?.message?.content || '')
            .replace(/<think>[\s\S]*?<\/think>/gi, '')
            .trim();
          if (text) return NextResponse.json({ text, provider: 'deepseek-chat' });
        }
      } catch (e) {
        console.warn('DeepSeek fallback triggered:', e.message);
      }
    }

    // 2. Secondary (Option B): xAI Grok Fast Brain
    if (XAI_API_KEY) {
      const grokModels = [process.env.GROK_MODEL, 'grok-3-mini-fast', 'grok-3-mini', 'grok-3-fast'].filter(Boolean);
      for (const grokModel of grokModels) {
        try {
          const grokRes = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${XAI_API_KEY}`
            },
            body: JSON.stringify({
              model: grokModel,
              messages: [{ role: 'system', content: systemPrompt }, ...messages],
              max_tokens: 450,
              temperature: 0.45
            })
          });
          if (grokRes.ok) {
            const data = await grokRes.json();
            const text = (data?.choices?.[0]?.message?.content || '')
              .replace(/<think>[\s\S]*?<\/think>/gi, '')
              .trim();
            if (text) return NextResponse.json({ text, provider: grokModel });
          }
        } catch (e) {
          console.warn(`Grok (${grokModel}) fallback triggered:`, e.message);
        }
      }
    }

    // 3. Kimi (Moonshot Global api.moonshot.ai — kimi-k2.6 / kimi-k3 non-thinking fast mode)
    if (KIMI_API_KEY) {
      const kimiEndpoints = [
        'https://api.moonshot.ai/v1/chat/completions',
        'https://api.moonshot.cn/v1/chat/completions'
      ];
      for (const endpoint of kimiEndpoints) {
        for (const kimiModel of ['kimi-k2.6', 'kimi-k3']) {
          try {
            const kimiRes = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${KIMI_API_KEY}`
              },
              body: JSON.stringify({
                model: kimiModel,
                messages: [{ role: 'system', content: systemPrompt }, ...messages],
                thinking: { type: 'disabled' },
                temperature: 0.6,
                max_tokens: 450
              })
            });
            if (kimiRes.ok) {
              const data = await kimiRes.json();
              const text = (data?.choices?.[0]?.message?.content || '')
                .replace(/<think>[\s\S]*?<\/think>/gi, '')
                .trim();
              if (text) return NextResponse.json({ text, provider: kimiModel });
            } else if (kimiRes.status === 401) {
              break; // Try next regional endpoint
            }
          } catch (e) {
            console.warn(`Kimi (${kimiModel}) fallback triggered:`, e.message);
          }
        }
      }
    }

    // 4. Failover: OpenAI (Oct 2026 Latest Models: gpt-5.4-mini -> gpt-5-mini -> gpt-4.1-mini -> gpt-4o-mini)
    if (OPENAI_API_KEY) {
      const openAiModels = [
        process.env.OPENAI_MODEL,
        'gpt-5.4-mini',
        'gpt-5-mini',
        'gpt-4.1-mini',
        'gpt-4o-mini'
      ].filter(Boolean);

      for (const modelId of openAiModels) {
        try {
          const isReasoningModel = modelId.startsWith('gpt-5');
          const payload = {
            model: modelId,
            messages: [{ role: 'system', content: systemPrompt }, ...messages],
            ...(isReasoningModel
              ? { max_completion_tokens: 450 }
              : { max_tokens: 400, temperature: 0.55 })
          };

          const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify(payload)
          });

          if (res.ok) {
            const data = await res.json();
            const text = data?.choices?.[0]?.message?.content?.trim();
            if (text) return NextResponse.json({ text, provider: modelId });
          } else {
            const errBody = await res.text();
            console.warn(`OpenAI model ${modelId} status ${res.status}:`, errBody.slice(0, 180));
          }
        } catch (e) {
          console.warn(`OpenAI model ${modelId} fallback triggered:`, e.message);
        }
      }
    }

    // 5. Secondary: Google Gemini
    if (GEMINI_API_KEY) {
      const geminiModels = [
        process.env.GEMINI_MODEL,
        'gemini-3.8-flash',
        'gemini-3.6-flash',
        'gemini-3.5-flash-lite',
        'gemini-2.5-flash'
      ].filter(Boolean);

      const geminiContents = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      for (const modelId of geminiModels) {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${GEMINI_API_KEY}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                systemInstruction: { parts: [{ text: systemPrompt }] },
                contents: geminiContents,
                generationConfig: { temperature: 0.5, maxOutputTokens: 350 }
              })
            }
          );
          if (res.ok) {
            const data = await res.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
            if (text) return NextResponse.json({ text, provider: modelId });
          }
        } catch (e) {
          console.warn(`Gemini model ${modelId} fallback triggered:`, e.message);
        }
      }
    }

    // 6. Tertiary: Groq Production Models
    if (GROQ_API_KEY) {
      for (const modelId of ['openai/gpt-oss-120b', 'llama-3.3-70b-versatile']) {
        try {
          const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
              model: modelId,
              messages: [{ role: 'system', content: systemPrompt }, ...messages],
              max_tokens: 350,
              temperature: 0.5
            })
          });
          if (res.ok) {
            const data = await res.json();
            const text = data?.choices?.[0]?.message?.content?.trim();
            if (text) return NextResponse.json({ text, provider: `groq:${modelId}` });
          }
        } catch (e) {
          console.warn(`Groq model ${modelId} fallback triggered:`, e.message);
        }
      }
    }

    // 7. MiniMax API fallback
    if (MINIMAX_API_KEY) {
      try {
        const res = await fetch('https://api.minimaxi.com/v1/text/chatcompletion_v2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${MINIMAX_API_KEY}`
          },
          body: JSON.stringify({
            model: 'MiniMax-M2.7',
            messages: [{ role: 'system', content: systemPrompt }, ...messages]
          })
        });
        if (res.ok) {
          const data = await res.json();
          const text = data?.choices?.[0]?.message?.content?.trim();
          if (text) return NextResponse.json({ text, provider: 'minimax' });
        }
      } catch (e) {
        console.warn('MiniMax fallback triggered:', e.message);
      }
    }

    // 8. Built-in High-Reliability MBMB Receptionist Engine
    const fallbackText = generateSmartLocalResponse(lastUserMessage, language);
    return NextResponse.json({ text: fallbackText, provider: 'jass-mbmb-engine' });
  } catch (err) {
    console.error('Chat error:', err);
    return NextResponse.json({
      text: "Hi! I'm Jass, your MBMB Front Desk Receptionist. How can I help you with medical billing, AAPC coding, credentialing, or attorney billing chronologies today?"
    });
  }
}
