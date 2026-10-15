import { NextResponse } from 'next/server';

const SYSTEM_PROMPTS = {
  en: `You are Jass, the Friendly & Executive Medical Billing Receptionist for Medical Billing Miami Beach (MBMB).
Your goal is to warmly welcome doctors, practice managers, and clinic owners, answer their medical billing/coding/credentialing questions clearly, and enthusiastically encourage them to either:
1. Call Jasmel & the MBMB team directly right now at (786) 643-2099
2. Claim their Free 48-Hour Revenue Cycle Billing Audit at medicalbillingmb.com/consultation

COMPANY INFORMATION:
- Name: Medical Billing Miami Beach (MBMB)
- Receptionist Name: Jass — MBMB Receptionist
- Founder / Direct Contact: Jasmel ((786) 643-2099 | Jasmel@medicalbillingmb.com)
- Location: Miami Beach & Miami-Dade, Florida (Serving all of Florida & US healthcare practices)
- Website: https://medicalbillingmb.com

TRANSPARENT PERFORMANCE PRICING (NO SETUP FEES, PAY ONLY WHEN WE COLLECT):
- $50k+ / month practices: 5.6% of net collections
- $40k–$50k / month practices: 6.5% of net collections
- $20k–$30k / month practices: 7.5% of net collections
- New / Startup practices (<$20k/mo): 10% of net collections
- $0 setup fees, no long-term lock-in contracts.

CORE SERVICES & RESULTS:
1. Full-Service Medical Billing & Revenue Cycle Management (RCM): 98%+ first-pass clean claim rate, 24-hour claim submission, aggressive denial management & A/R recovery (up to 30% revenue increase).
2. Certified Medical Coding (AAPC): CPC, CCS, CIC certified coders for ICD-10-CM, CPT, HCPCS Level II, and NCCI modifier compliance.
3. Provider Credentialing & CAQH Enrollment: Medicare, Florida Medicaid, AvMed, Florida Blue, UnitedHealthcare, Aetna, Cigna, Humana, Simply, Sunshine Health (60-120 days average, EDI/ERA/EFT setup).
4. Free 48-Hour Billing Audit: Zero-obligation audit uncovering denied claims, undercoding, and revenue leaks within 48 hours.

SPECIALTIES SERVED:
Primary Care, Internal Medicine, Cardiology, Orthopedics, Dermatology, OB/GYN, Psychiatry & Behavioral Health, Urgent Care, Pediatrics, General Surgery, Plastic Surgery, Neurology, Gastroenterology, Urology, Oncology, Telehealth.

COMMUNICATION RULES:
- Keep responses concise (2-4 short paragraphs max), warm, confident, and conversion-focused.
- Always invite the user to call (786) 643-2099 or register for the Free 48-Hour Billing Audit.
- HIPAA rule: Never ask users to type patient PHI or SSNs in chat.`,

  es: `Eres Jass, la Recepcionista Ejecutiva de Facturación Médica de Medical Billing Miami Beach (MBMB).
Tu objetivo es atender cálidamente a médicos y administradores de clínicas, responder sus dudas sobre facturación médica, codificación y credencialización, y animarlos a:
1. Llamar directamente a Jasmel y al equipo de MBMB al (786) 643-2099
2. Solicitar su Auditoría de Facturación Gratuita en 48 horas en medicalbillingmb.com/consultation

INFORMACIÓN CLAVE:
- Nombre: Medical Billing Miami Beach (MBMB)
- Recepcionista: Jass — Recepcionista de MBMB
- Teléfono directo: (786) 643-2099 | Email: Jasmel@medicalbillingmb.com
- Tarifas transparentes por desempeño (solo pagas cuando cobramos):
  • Prácticas de $50k+/mes: 5.6%
  • Prácticas de $40k–$50k/mes: 6.5%
  • Prácticas de $20k–$30k/mes: 7.5%
  • Prácticas nuevas: 10%
  • $0 costo de instalación, 98% de reclamos limpios en el primer envío, especialistas certificados por AAPC y cumplimiento total con HIPAA.
- Credencialización médica (CAQH, Medicare, Florida Medicaid, Florida Blue, Aetna, Cigna, UnitedHealthcare, Humana) en 60-120 días.

Mantén respuestas breves, cálidas y persuasivas, invitando siempre a llamar al (786) 643-2099.`,

  ht: `Ou se Jass, Resepsyonis Faktirasyon Medikal pou Medical Billing Miami Beach (MBMB).
Objektif ou se ede doktè ak klinik yo ak faktirasyon medikal, kodaj (AAPC), ak kredansyasyon, epi ankouraje yo rele nou dirèkteman nan (786) 643-2099 oswa pran yon Odit Gratis nan 48 èdtan.
- Pri nou yo baze sou rezilta: 5.6% pou gwo klinik ($50k+/mwa), 6.5% ($40k-$50k), 7.5% ($20k-$30k), ak 10% pou nouvo pratik. $0 frè enstalasyon!
- Telefòn dirèk: (786) 643-2099 | Imèl: Jasmel@medicalbillingmb.com.`,

  ru: `Вы — Джасс (Jass), приветливый и профессиональный администратор Medical Billing Miami Beach (MBMB).
Ваша цель — помогать врачам и управляющим клиник по вопросам медицинского биллинга, кодирования (AAPC) и аккредитации (Credentialing) во Флориде, а также предлагать позвонить напрямую по номеру (786) 643-2099 или заказать бесплатный 48-часовой аудит биллинга.
- Прозрачные тарифы от сборов: 5.6% (от $50k/мес), 6.5% ($40k–$50k/мес), 7.5% ($20k–$30k/мес), 10% для новых клиник. $0 за подключение, 98% чистых заявок!`
};

function generateSmartLocalResponse(userText = '', language = 'en') {
  const q = userText.toLowerCase();

  if (language === 'es') {
    if (q.includes('precio') || q.includes('costo') || q.includes('tarifa') || q.includes('cuanto') || q.includes('%')) {
      return "¡Excelente pregunta! En MBMB trabajamos 100% basados en resultados ($0 costo de inicio y sin cargos ocultos). Nuestras tarifas escalonadas son:\n\n• 5.6% para prácticas que facturan $50k+/mes\n• 6.5% para prácticas de $40k–$50k/mes\n• 7.5% para prácticas de $20k–$30k/mes\n• 10% para prácticas nuevas\n\n¿Te gustaría que revisemos tus números? ¡Llámanos ahora al (786) 643-2099 o solicita tu Auditoría Gratuita de 48 horas!";
    }
    if (q.includes('credencial') || q.includes('seguro') || q.includes('medicaid') || q.includes('medicare') || q.includes('caqh')) {
      return "¡Sí! Nos encargamos de todo tu proceso de Credencialización y CAQH con Medicare, Florida Medicaid, Florida Blue, AvMed, Aetna, Cigna, Humana y UnitedHealthcare. Configuramos EDI, ERA y EFT para que recibas tus pagos rápido (60 a 120 días). ¡Llama a Jasmel al (786) 643-2099 para iniciar tu inscripción hoy mismo!";
    }
    if (q.includes('auditoria') || q.includes('gratis') || q.includes('consulta') || q.includes('empezar')) {
      return "¡Por supuesto! Ofrecemos una Auditoría del Ciclo de Ingresos 100% Gratuita en 48 horas. Analizamos tus reclamos denegados y códigos CPT/ICD-10 para recuperar hasta un 30% más de ingresos. Puedes registrarte en nuestro formulario de Auditoría Gratuita o llamarnos directamente al (786) 643-2099.";
    }
    return "¡Hola! Soy Jass, tu recepcionista de Medical Billing Miami Beach. Ayudamos a médicos en Miami y toda Florida a alcanzar un 98% de reclamos aprobados y reducir denegaciones con tarifas desde 5.6%.\n\n¿Quieres conocer nuestras tarifas, servicios de credencialización o agendar tu Auditoría Gratuita de 48h? ¡Escríbeme tu consulta o llámanos directo al (786) 643-2099!";
  }

  if (language === 'ht') {
    return "Bonjou! Mwen se Jass, resepsyonis Medical Billing Miami Beach (MBMB). Nou ede doktè ak klinik nan Miami ak tout Florida ogmante revni yo jiska 30% ak yon to reklamasyon pwòp 98%. Pri nou yo kòmanse nan 5.6% san okenn frè kache ($0 setup).\n\nRele nou dirèkteman kounye a nan (786) 643-2099 oswa mande Odit Gratis 48 èdtan ou a!";
  }

  if (language === 'ru') {
    return "Здравствуйте! Я Джасс, администратор Medical Billing Miami Beach (MBMB). Мы помогаем врачам и клиникам в Майами и по всей Флориде увеличить сборы до 30% при 98% одобрении заявок с первого раза. Наши тарифы — от 5.6% до 10% без стартовых взносов ($0 setup).\n\nПозвоните нам прямо сейчас по телефону (786) 643-2099 или закажите бесплатный 48-часовой аудит биллинга!";
  }

  // English smart responses
  if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('rate') || q.includes('fee') || q.includes('how much') || q.includes('%') || q.includes('tier')) {
    return "We offer 100% transparent, performance-based pricing — you only pay when we collect for you, with $0 setup fees:\n\n• 5.6% — Practices collecting $50k+/month\n• 6.5% — Practices collecting $40k–$50k/month\n• 7.5% — Practices collecting $20k–$30k/month\n• 10% — New & startup practices\n\nWant to see how much extra revenue we can recover for your clinic? Call us directly at (786) 643-2099 or claim your Free 48-Hour Billing Audit!";
  }

  if (q.includes('audit') || q.includes('free') || q.includes('consult') || q.includes('start') || q.includes('register') || q.includes('book')) {
    return "Our Free 48-Hour Revenue Cycle Audit is the fastest way to uncover hidden revenue leaks! Our AAPC-certified coders review a sample of your aging A/R, denied claims, and CPT/ICD-10 coding with zero obligation and $0 setup cost.\n\nYou can register in 30 seconds at /consultation or call Jasmel directly right now at (786) 643-2099 to get started immediately!";
  }

  if (q.includes('credential') || q.includes('caqh') || q.includes('enroll') || q.includes('insurance') || q.includes('medicare') || q.includes('medicaid')) {
    return "Yes! We handle complete end-to-end Provider Credentialing & Payer Enrollment across Florida — including Medicare, Florida Medicaid, Florida Blue, AvMed, UnitedHealthcare, Aetna, Cigna, Humana, and Sunshine Health.\n\nWe manage your CAQH ProView, EDI, ERA, and EFT setup so you get in-network as fast as possible (typically 60–120 days). Call us at (786) 643-2099 and we can begin your enrollment this week!";
  }

  if (q.includes('specialt') || q.includes('cardio') || q.includes('ortho') || q.includes('derm') || q.includes('mental') || q.includes('psych') || q.includes('primary') || q.includes('urgent') || q.includes('obgyn') || q.includes('pediatric') || q.includes('surg')) {
    return "We serve 16+ medical specialties across Miami Beach and Florida — including Primary Care, Internal Medicine, Cardiology, Orthopedics, Dermatology, OB/GYN, Psychiatry & Behavioral Health, Urgent Care, Pediatrics, Surgery, Neurology, and Telehealth.\n\nOur AAPC-certified coders know your specialty's exact CPT modifiers and NCCI edits to prevent denials. Give us a quick call at (786) 643-2099 to discuss your practice!";
  }

  if (q.includes('denial') || q.includes('reject') || q.includes('ar ') || q.includes('a/r') || q.includes('collect') || q.includes('claim')) {
    return "Denial prevention and A/R recovery are our superpower! While the industry average denial rate is 10–15%, MBMB achieves a 98%+ first-pass clean claim rate and submits claims within 24 hours. We aggressively appeal unpaid claims to boost practice collections by up to 30%.\n\nLet us run a Free 48-Hour Audit on your denied claims — call (786) 643-2099 or click 'Free Audit' to begin!";
  }

  if (q.includes('phone') || q.includes('call') || q.includes('contact') || q.includes('talk') || q.includes('human') || q.includes('person') || q.includes('jasmel')) {
    return "You can reach Jasmel and our Miami Beach billing specialists directly right now at (786) 643-2099 (Mon–Fri, 9:00 AM – 6:00 PM EST) or email Jasmel@medicalbillingmb.com.\n\nTap the green 'Call Now' button above to dial immediately — we'd love to speak with you!";
  }

  if (q.includes('ehr') || q.includes('emr') || q.includes('software') || q.includes('athena') || q.includes('kareo') || q.includes('ecw') || q.includes('drchrono') || q.includes('advancedmd')) {
    return "You never have to change your current EHR! Our team integrates seamlessly with Athenahealth, eClinicalWorks (eCW), AdvancedMD, Kareo/Tebra, DrChrono, NextGen, SimplePractice, Epic, and virtually all major EHR/PM systems under strict HIPAA compliance.\n\nCall us at (786) 643-2099 to see how easily we plug into your workflow!";
  }

  return "Hi there! I'm Jass, your MBMB Receptionist. We help Miami Beach and Florida physicians eliminate claim denials (98% clean claim rate) and increase revenue by up to 30% — with transparent rates starting at 5.6% and $0 setup fees.\n\nAsk me about our Pricing Tiers, Specialty Billing, Credentialing, or call Jasmel directly right now at (786) 643-2099 for your Free 48-Hour Billing Audit!";
}

export async function POST(request) {
  try {
    const { messages = [], language = 'en' } = await request.json();
    const systemPrompt = SYSTEM_PROMPTS[language] || SYSTEM_PROMPTS.en;
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || '';

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY;

    // 1. Primary: Google Gemini 2.5 Flash (Fastest, Best for Receptionist Chat & Voice)
    if (GEMINI_API_KEY) {
      try {
        const geminiContents = messages.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
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
          if (text) return NextResponse.json({ text, provider: 'gemini-2.5-flash' });
        }
      } catch (e) {
        console.warn('Gemini fallback triggered:', e.message);
      }
    }

    // 2. Secondary: OpenAI GPT-4o-mini
    if (OPENAI_API_KEY) {
      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'system', content: systemPrompt }, ...messages],
            max_tokens: 350,
            temperature: 0.5
          })
        });
        if (res.ok) {
          const data = await res.json();
          const text = data?.choices?.[0]?.message?.content?.trim();
          if (text) return NextResponse.json({ text, provider: 'gpt-4o-mini' });
        }
      } catch (e) {
        console.warn('OpenAI fallback triggered:', e.message);
      }
    }

    // 3. Tertiary: Groq Llama-3.3-70b-versatile
    if (GROQ_API_KEY) {
      try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'system', content: systemPrompt }, ...messages],
            max_tokens: 350,
            temperature: 0.5
          })
        });
        if (res.ok) {
          const data = await res.json();
          const text = data?.choices?.[0]?.message?.content?.trim();
          if (text) return NextResponse.json({ text, provider: 'groq-llama-3.3' });
        }
      } catch (e) {
        console.warn('Groq fallback triggered:', e.message);
      }
    }

    // 4. MiniMax API (if configured and active)
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

    // 5. Built-in High-Reliability MBMB Receptionist Engine (Always Online 24/7)
    const fallbackText = generateSmartLocalResponse(lastUserMessage, language);
    return NextResponse.json({ text: fallbackText, provider: 'jass-mbmb-engine' });
  } catch (err) {
    console.error('Chat error:', err);
    return NextResponse.json({
      text: "Hi! I'm Jass, your MBMB Receptionist. We offer full-service medical billing & coding starting at 5.6% with a Free 48-Hour Billing Audit. Please call us directly at (786) 643-2099 or visit /consultation!"
    });
  }
}
