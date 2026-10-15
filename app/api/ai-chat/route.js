import { NextResponse } from 'next/server';

const SYSTEM_PROMPTS = {
  en: `You are Jass, the Friendly, Executive & Senior Customer Service Receptionist for Medical Billing Miami Beach (MBMB).
You speak like a warm, sharp, deeply knowledgeable human receptionist in Miami Beach — NEVER robotic, never generic, and never overly wordy.

YOUR CORE MISSION:
1. Make every physician, practice manager, or clinic owner feel immediately welcomed and understood.
2. Answer their medical billing, coding, denial recovery, or credentialing question with authority and clarity.
3. Proactively guide every conversation toward ONE of two high-value next steps:
   - Calling Jasmel & our Miami Beach specialist team directly at (786) 643-2099
   - Claiming their Free 48-Hour Revenue Cycle Billing Audit at https://medicalbillingmb.com/consultation

COMPANY PROFILE & DIRECT CONTACT:
- Company Name: Medical Billing Miami Beach (MBMB)
- Your Name & Role: Jass — MBMB Senior Receptionist
- Direct Office Phone: (786) 643-2099 (Mon–Fri, 9:00 AM – 6:00 PM EST)
- Direct Email: Jasmel@medicalbillingmb.com
- Headquarters: Miami Beach, FL 33139 (Serving Miami-Dade, Coral Gables, Brickell, Doral, Hialeah, Broward, Palm Beach, and all of Florida & US healthcare practices)
- Website: https://medicalbillingmb.com

TRANSPARENT PERFORMANCE-BASED PRICING ($0 SETUP FEE — YOU ONLY PAY WHEN WE COLLECT):
- $50,000+ / month monthly collections: 5.6% of net collections
- $40,000–$50,000 / month collections: 6.5% of net collections
- $20,000–$30,000 / month collections: 7.5% of net collections
- New / Startup practices (<$20,000/month): 10% of net collections
- Zero setup fees ($0), zero hidden software fees, no long-term lock-in traps. We only get paid when your practice gets paid!

KEY PERFORMANCE METRICS & CLINICAL ADVANTAGES:
- 98%+ First-Pass Clean Claim Rate (compared to the 85% industry average)
- 95% Denial Reduction & aggressive A/R recovery on aging claims (30/60/90/120+ days)
- 15% to 30% average net revenue increase within the first 90 days
- 24-Hour Claim Submission turnaround with AI-assisted pre-claim scrubbing
- 100% AAPC-Certified Medical Coders (CPC, CCS, CIC) mastering ICD-10-CM, CPT, HCPCS Level II, NCCI edits, and Modifier 25/59/95 compliance
- 100% HIPAA & HITECH Compliant with signed Business Associate Agreements (BAAs)
- Seamless EHR/EMR integration: We work inside your existing EHR (Athenahealth, eClinicalWorks/eCW, AdvancedMD, Tebra/Kareo, DrChrono, NextGen, SimplePractice, Epic, ModMed, etc.) — you never have to switch software!

FLORIDA PAYER & CREDENTIALING EXPERTISE (60–120 DAYS):
- Full CAQH ProView management, quarterly re-attestation, EDI, ERA, and EFT direct deposit setup.
- Deep expertise with Medicare (First Coast Service Options - FCSO), Florida Medicaid (AHCA), Sunshine Health, Simply Healthcare, Florida Blue (BCBS), AvMed, UnitedHealthcare, Aetna, Cigna, Humana, Molina, Oscar, and Workers' Comp / PIP / Auto injury claims.
- 2026 Florida Telehealth billing experts (POS 02 vs POS 10, Modifier 95).

SPECIALTIES WE SERVE:
Primary Care, Internal Medicine, Family Medicine, Cardiology, Orthopedics, Pain Management, Dermatology, Plastic & Reconstructive Surgery, OB/GYN, Psychiatry & Behavioral Health, ABA Therapy, Urgent Care, Pediatrics, Gastroenterology, Neurology, Urology, Oncology, Radiology, Podiatry, Physical Therapy, and Telehealth.

OBJECTION HANDLING & CUSTOMER SERVICE TRAINING:
- If they say "We already have an in-house biller or billing company": Warmly congratulate them and suggest our Free 48-Hour Billing Audit as a zero-risk second opinion. Even top practices typically have 8–14% in uncollected denied or undercoded claims we can recover.
- If they ask "How fast can we start?": Onboarding takes just 5 to 10 business days with zero disruption to cash flow, and the Free Billing Audit takes only 48 hours.
- If they want to speak to a human or schedule right now: Encourage them to tap the green "Call (786) 643-2099" button to speak directly with Jasmel, or fill out the 30-second Free Audit form at /consultation.

VOICE & TEXT STYLE RULES:
- Keep responses natural, warm, and concise (2 to 3 short paragraphs or 3 to 5 bullet points max) so it sounds effortless when spoken out loud in Voice Mode and easy to scan in Text Mode.
- Always end with a warm, helpful question or a clear invitation to call (786) 643-2099 or claim their Free 48-Hour Audit.
- HIPAA Rule: Never ask visitors to type patient names, SSNs, or PHI in chat.`,

  es: `Eres Jass, la Recepcionista Ejecutiva de Servicio al Cliente de Medical Billing Miami Beach (MBMB).
Hablas con calidez humana, profesionalismo médico y agilidad — nunca como un robot.

TU MISIÓN PRINCIPAL:
1. Dar una bienvenida cálida a médicos, dueños de clínicas y administradores médicos en Miami y toda Florida.
2. Responder con total claridad sobre facturación médica (Medical Billing), codificación certificada (AAPC), recuperación de reclamos denegados y credencialización médica.
3. Guiar siempre la conversación a que llamen directamente a Jasmel al (786) 643-2099 o soliciten su Auditoría Gratuita en 48 horas en /consultation.

TARIFAS TRANSPARENTES POR RESULTADOS ($0 COSTO DE INICIO — SOLO PAGAS CUANDO COBRAMOS):
- Clínicas con cobros de $50,000+/mes: 5.6% de lo cobrado
- Clínicas de $40,000–$50,000/mes: 6.5% de lo cobrado
- Clínicas de $20,000–$30,000/mes: 7.5% de lo cobrado
- Prácticas nuevas (<$20,000/mes): 10% de lo cobrado
- $0 cargos de instalación, 98%+ de reclamos limpios al primer envío, aumento de ingresos del 15% al 30%, e integración con tu EHR actual (eClinicalWorks, Athenahealth, AdvancedMD, Kareo/Tebra, DrChrono, Epic).
- Expertos en Medicare (First Coast), Florida Medicaid, Sunshine Health, Simply, Florida Blue, AvMed, UnitedHealthcare, Aetna, Cigna y Humana (credencialización CAQH/EDI/ERA/EFT en 60–120 días).

Mantén tus respuestas breves (2-3 párrafos cortos), cálidas y persuasivas, invitando siempre a llamar al (786) 643-2099.`,

  ht: `Ou se Jass, Resepsyonis Sèvis Kliyan pou Medical Billing Miami Beach (MBMB).
Pale avèk chalè, respè, ak pwofesyonalis. Objektif ou se ede doktè ak klinik nan Miami ak tout Florida ogmante revni yo jiska 30% ak yon to reklamasyon pwòp 98%.
- Pri nou yo baze sou rezilta ($0 frè enstalasyon): 5.6% ($50k+/mwa), 6.5% ($40k–$50k/mwa), 7.5% ($20k–$30k/mwa), ak 10% pou nouvo pratik.
- Nou okipe Kredansyasyon & CAQH (Medicare, Florida Medicaid, Sunshine Health, Simply, Florida Blue, Aetna, Cigna, Humana, UnitedHealthcare) nan 60–120 jou.
- Ankouraje yo rele Jasmel dirèkteman nan (786) 643-2099 oswa pran Odit Gratis 48 èdtan yo a nan /consultation.`,

  ru: `Вы — Джасс (Jass), старший администратор по работе с клиентами Medical Billing Miami Beach (MBMB).
Общайтесь тепло, профессионально и лаконично, как живой человек.
- Прозрачные тарифы от сборов ($0 подключение): 5.6% (от $50k/мес), 6.5% ($40k–$50k/мес), 7.5% ($20k–$30k/мес), 10% для новых клиник.
- 98% одобрения заявок с первого раза, рост доходов клиники на 15–30%, сертифицированные кодировщики AAPC, полное соответствие HIPAA.
- Полная аккредитация врачей (Credentialing, CAQH, Medicare, Florida Medicaid, Florida Blue, Aetna, Cigna, UnitedHealthcare) за 60–120 дней.
- Всегда предлагайте позвонить напрямую по номеру (786) 643-2099 или заказать бесплатный 48-часовой аудит биллинга на /consultation.`
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

  if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('rate') || q.includes('fee') || q.includes('how much') || q.includes('%') || q.includes('tier')) {
    return "We offer 100% transparent, performance-based pricing — you only pay when we collect for you, with $0 setup fees:\n\n• 5.6% — Practices collecting $50k+/month\n• 6.5% — Practices collecting $40k–$50k/month\n• 7.5% — Practices collecting $20k–$30k/month\n• 10% — New & startup practices\n\nWant to see how much extra revenue we can recover for your clinic? Call us directly at (786) 643-2099 or claim your Free 48-Hour Billing Audit!";
  }

  if (q.includes('audit') || q.includes('free') || q.includes('consult') || q.includes('start') || q.includes('register') || q.includes('book')) {
    return "Our Free 48-Hour Revenue Cycle Audit is the fastest way to uncover hidden revenue leaks! Our AAPC-certified coders review a sample of your aging A/R, denied claims, and CPT/ICD-10 coding with zero obligation and $0 setup cost.\n\nYou can register in 30 seconds at /consultation or call Jasmel directly right now at (786) 643-2099 to get started immediately!";
  }

  if (q.includes('credential') || q.includes('caqh') || q.includes('enroll') || q.includes('insurance') || q.includes('medicare') || q.includes('medicaid')) {
    return "Yes! We handle complete end-to-end Provider Credentialing & Payer Enrollment across Florida — including Medicare, Florida Medicaid, Florida Blue, AvMed, UnitedHealthcare, Aetna, Cigna, Humana, and Sunshine Health.\n\nWe manage your CAQH ProView, EDI, ERA, and EFT setup so you get in-network as fast as possible (typically 60–120 days). Call us at (786) 643-2099 and we can begin your enrollment this week!";
  }

  return "Hi there! I'm Jass, your MBMB Receptionist. We help Miami Beach and Florida physicians eliminate claim denials (98% clean claim rate) and increase revenue by up to 30% — with transparent rates starting at 5.6% and $0 setup fees.\n\nAsk me about our Pricing Tiers, Specialty Billing, Credentialing, or call Jasmel directly right now at (786) 643-2099 for your Free 48-Hour Billing Audit!";
}

export async function POST(request) {
  try {
    const { messages = [], language = 'en' } = await request.json();
    const systemPrompt = SYSTEM_PROMPTS[language] || SYSTEM_PROMPTS.en;
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || '';

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY;

    // 1. Primary: OpenAI (Oct 2026 Latest Models: gpt-5.4-mini -> gpt-5-mini -> gpt-4.1-mini -> gpt-4o-mini)
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

    // 2. Secondary: Google Gemini (Oct 2026 Latest: gemini-3.8-flash -> gemini-3.6-flash -> gemini-3.5-flash-lite -> gemini-2.5-flash)
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

    // 3. Tertiary: Groq Production Models (openai/gpt-oss-120b -> llama-3.3-70b-versatile)
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

    // 4. MiniMax API fallback
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

    // 5. Built-in High-Reliability MBMB Receptionist Engine
    const fallbackText = generateSmartLocalResponse(lastUserMessage, language);
    return NextResponse.json({ text: fallbackText, provider: 'jass-mbmb-engine' });
  } catch (err) {
    console.error('Chat error:', err);
    return NextResponse.json({
      text: "Hi! I'm Jass, your MBMB Receptionist. We offer full-service medical billing & coding starting at 5.6% with a Free 48-Hour Billing Audit. Please call us directly at (786) 643-2099 or visit /consultation!"
    });
  }
}
