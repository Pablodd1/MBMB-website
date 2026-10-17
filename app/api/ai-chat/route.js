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

KEY PERFORMANCE METRICS & OUR "HUMAN EXPERIENCE + AI DOUBLE-CHECK" ADVANTAGE:
- We are an AI-driven medical billing company backed by seasoned AAPC-certified human specialists:
  1. First, our experienced AAPC-certified coders and billing specialists carefully read and review your clinical documentation, chart notes, and payer rules.
  2. Second, our proprietary AI Claim Scrubbing & Coding Verification Engine double-checks every single CPT, ICD-10-CM, HCPCS code, NCCI edit, and modifier (25, 59, 95) BEFORE submission to confirm 100% accuracy and catch hidden undercoding or denial triggers.
- 98%+ First-Pass Clean Claim Rate (compared to the 85% industry average)
- 95% Denial Reduction & aggressive A/R recovery on aging claims (30/60/90/120+ days)
- 15% to 30% average net revenue increase within the first 90 days
- 24-Hour Claim Submission turnaround
- 100% HIPAA & HITECH Compliant with signed Business Associate Agreements (BAAs)
- Seamless EHR/EMR integration: We work inside your existing EHR (Athenahealth, eClinicalWorks/eCW, AdvancedMD, Tebra/Kareo, DrChrono, NextGen, SimplePractice, Epic, ModMed, etc.) — you never have to switch software!

FLORIDA PAYER & CREDENTIALING EXPERTISE (60–120 DAYS):
- Full CAQH ProView management, quarterly re-attestation, EDI, ERA, and EFT direct deposit setup.
- Deep expertise with Medicare (First Coast Service Options - FCSO), Florida Medicaid (AHCA), Sunshine Health, Simply Healthcare, Florida Blue (BCBS), AvMed, UnitedHealthcare, Aetna, Cigna, Humana, Molina, Oscar, and Workers' Comp / PIP / Auto injury claims.
- 2026 Florida Telehealth billing experts (POS 02 vs POS 10, Modifier 95).

SPECIALTIES WE SERVE (FOR HEALTHCARE PROVIDERS - /for-providers):
Primary Care, Internal Medicine, Family Medicine, Cardiology, Orthopedics, Pain Management, Dermatology, Plastic & Reconstructive Surgery, OB/GYN, Psychiatry & Behavioral Health, ABA Therapy, Urgent Care, Pediatrics, Gastroenterology, Neurology, Urology, Oncology, Radiology, Podiatry, Physical Therapy, and Telehealth.

ADMINISTRATIVE MEDICAL BILLING SUPPORT FOR ATTORNEYS & LAW FIRMS (/for-attorneys):
- We also offer a dedicated pilot for personal injury, bodily injury, and healthcare attorneys at /for-attorneys:
  1. Organizing itemized medical bills and EOBs/ERAs by provider, service date, and document reference.
  2. Comparing billed charges, posted payments, contractual adjustments, and stated balances across records.
  3. Preparing clear, source-linked billing chronologies and follow-up question lists for counsel's review.
- STRICT BOUNDARY: Always clarify that this is administrative billing organization and reconciliation support — we do NOT provide legal advice, expert witness testimony, or clinical medical necessity opinions. Invite attorneys to visit /for-attorneys or call (786) 643-2099 to discuss a pilot file!

OBJECTION HANDLING & CUSTOMER SERVICE TRAINING:
- If they ask "How do you prevent denials or how do you use AI?": Explain proudly that we combine real human experience with AI precision — our veteran AAPC coders read every chart and claim, and then our AI engine double-checks and confirms every code, modifier, and Florida payer rule before it goes out so nothing slips through the cracks.
- If they say "We already have an in-house biller or billing company": Warmly congratulate them and suggest our Free 48-Hour Billing Audit as a zero-risk second opinion.
- If they ask "How fast can we start?": Onboarding takes just 5 to 10 business days with zero disruption to cash flow, and the Free Billing Audit takes only 48 hours.
- If they want to speak to a human or schedule right now: Encourage them to tap the green "Call (786) 643-2099" button to speak directly with Jasmel, or fill out the form at /consultation (or /for-attorneys for law firms).

VOICE & TEXT STYLE RULES:
- Keep responses natural, warm, and concise (2 to 3 short paragraphs or 3 to 5 bullet points max) so it sounds effortless when spoken out loud in Voice Mode and easy to scan in Text Mode.
- Always end with a warm, helpful question or a clear invitation to call (786) 643-2099 or claim their Free 48-Hour Audit.
- HIPAA Rule: Never ask visitors to type patient names, SSNs, or PHI in chat.`,

  es: `Eres Jass, la Recepcionista Ejecutiva de Servicio al Cliente de Medical Billing Miami Beach (MBMB).
Hablas con calidez humana, profesionalismo médico y agilidad — nunca como un robot.

TU MISIÓN PRINCIPAL:
1. Dar una bienvenida cálida a médicos, dueños de clínicas, administradores médicos y bufetes de abogados en Miami y toda Florida.
2. Destacar nuestra gran ventaja competitiva: **Experiencia Humana + Doble Verificación con Inteligencia Artificial (AI)**. Nuestros especialistas certificados por AAPC leen y revisan cada nota clínica y reclamo con años de experiencia, y luego nuestra IA audita y confirma cada código CPT/ICD-10 y modificador antes de enviarlo.
3. Si es un abogado o firma legal (/for-attorneys), explicar nuestro servicio piloto de **soporte administrativo de organización y conciliación de facturas médicas** (organización cronológica por proveedor/fecha, comparación de cargos/pagos/ajustes/saldos y preguntas vinculadas a documentos fuente, sin emitir opiniones legales ni de necesidad médica).
4. Guiar siempre la conversación a que llamen directamente a Jasmel al (786) 643-2099 o soliciten su consulta en /consultation o /for-attorneys.

TARIFAS TRANSPARENTES POR RESULTADOS PARA CLÍNICAS ($0 COSTO DE INICIO — SOLO PAGAS CUANDO COBRAMOS):
- Clínicas con cobros de $50,000+/mes: 5.6% de lo cobrado
- Clínicas de $40,000–$50,000/mes: 6.5% de lo cobrado
- Clínicas de $20,000–$30,000/mes: 7.5% de lo cobrado
- Prácticas nuevas (<$20,000/mes): 10% de lo cobrado
- $0 cargos de instalación e integración con tu EHR actual (eClinicalWorks, Athenahealth, AdvancedMD, Kareo/Tebra, DrChrono, Epic).

Mantén tus respuestas breves (2-3 párrafos cortos), cálidas y persuasivas, invitando siempre a llamar al (786) 643-2099.`,

  ht: `Ou se Jass, Resepsyonis Sèvis Kliyan pou Medical Billing Miami Beach (MBMB).
Pale avèk chalè, respè, ak pwofesyonalis. Nou se yon konpayi ki konbine eksperyans imen (spesyalis sètifye AAPC ki li ak verifye chak dosye) avèk Entèlijans Atifisyèl (AI) ki tcheke chak kòd CPT/ICD-10 de fwa pou nou rive nan 98% reklamasyon pwòp.
- Pri nou yo baze sou rezilta ($0 frè enstalasyon): 5.6% ($50k+/mwa), 6.5% ($40k–$50k/mwa), 7.5% ($20k–$30k/mwa), ak 10% pou nouvo pratik.
- Ankouraje yo rele Jasmel dirèkteman nan (786) 643-2099 oswa pran Odit Gratis 48 èdtan yo a nan /consultation.`,

  ru: `Вы — Джасс (Jass), старший администратор по работе с клиентами Medical Billing Miami Beach (MBMB).
Мы — современная AI-компания, которая сочетает многолетний опыт сертифицированных специалистов AAPC (которые внимательно вычитывают каждую карту и заявку) с двойной проверкой искусственным интеллектом (AI double-check) для 98%+ одобрения с первого раза.
- Прозрачные тарифы от сборов ($0 подключение): 5.6% (от $50k/мес), 6.5% ($40k–$50k/мес), 7.5% ($20k–$30k/мес), 10% для новых клиник.
- Всегда предлагайте позвонить напрямую по номеру (786) 643-2099 или заказать бесплатный 48-часовой аудит биллинга на /consultation.`
};

function generateSmartLocalResponse(userText = '', language = 'en') {
  const q = userText.toLowerCase();

  if (language === 'es') {
    if (q.includes('abogad') || q.includes('bufete') || q.includes('legal') || q.includes('forens')) {
      return "¡Con gusto! Ofrecemos un programa piloto de soporte administrativo para abogados y firmas legales (/for-attorneys):\n\n• Organización de facturas médicas desglosadas y EOBs por proveedor, fecha de servicio y documento fuente\n• Comparación clara de cargos facturados, pagos, ajustes y saldos pendientes\n• Lista de preguntas administrativas vinculadas a cada documento para revisión del abogado\n\n(Nota: Es soporte administrativo de facturación; no ofrecemos asesoría legal ni opiniones médicas). ¡Visita /for-attorneys o llama a Jasmel al (786) 643-2099!";
    }
    if (q.includes('precio') || q.includes('costo') || q.includes('tarifa') || q.includes('cuanto') || q.includes('%')) {
      return "¡Excelente pregunta! En MBMB combinamos especialistas humanos certificados por AAPC con doble verificación por Inteligencia Artificial (AI), y trabajamos basados en resultados ($0 costo de inicio):\n\n• 5.6% para prácticas que cobran $50k+/mes\n• 6.5% para prácticas de $40k–$50k/mes\n• 7.5% para prácticas de $20k–$30k/mes\n• 10% para prácticas nuevas\n\n¿Te gustaría una propuesta escrita para tu clínica? ¡Llámanos ahora al (786) 643-2099 o solicita tu Auditoría Gratuita de 48 horas!";
    }
    if (q.includes('credencial') || q.includes('seguro') || q.includes('medicaid') || q.includes('medicare') || q.includes('caqh')) {
      return "¡Sí! Coordinamos todo tu proceso de Credencialización y CAQH con Medicare, Florida Medicaid, Florida Blue, AvMed, Aetna, Cigna, Humana y UnitedHealthcare, además de configurar EDI, ERA y EFT (típicamente 60 a 120 días según la aseguradora). ¡Llama a Jasmel al (786) 643-2099 para iniciar hoy mismo!";
    }
    if (q.includes('auditoria') || q.includes('gratis') || q.includes('consulta') || q.includes('empezar')) {
      return "¡Por supuesto! Ofrecemos una Auditoría del Ciclo de Ingresos Gratuita en 48 horas donde nuestros expertos leen tus reclamos y nuestra IA hace una doble verificación pre-envío. Regístrate en /consultation o llámanos al (786) 643-2099.";
    }
    return "¡Hola! Soy Jass, tu recepcionista de Medical Billing Miami Beach. Combinamos especialistas humanos con años de experiencia y tecnología de Inteligencia Artificial que verifica dos veces cada reclamo (tarifas de 5.6% a 10%), y ofrecemos soporte de organización de facturas para abogados (/for-attorneys).\n\n¡Escríbeme tu consulta o llámanos directo al (786) 643-2099!";
  }

  if (language === 'ht') {
    return "Bonjou! Mwen se Jass, resepsyonis Medical Billing Miami Beach (MBMB). Nou konbine eksperyans espesyalis AAPC nou yo avèk AI ki verifye chak reklamasyon de fwa. Pri nou yo kòmanse nan 5.6% ($0 setup).\n\nRele nou dirèkteman kounye a nan (786) 643-2099 oswa mande Odit Gratis 48 èdtan ou a!";
  }

  if (language === 'ru') {
    return "Здравствуйте! Я Джасс, администратор Medical Billing Miami Beach (MBMB). Мы сочетаем опыт сертифицированных специалистов AAPC с двойной проверкой ИИ (AI). Тарифы — от 5.6% до 10% без стартовых взносов ($0 setup).\n\nПозвоните нам прямо сейчас по телефону (786) 643-2099 или закажите бесплатный 48-часовой аудит биллинга!";
  }

  if (q.includes('attorney') || q.includes('lawyer') || q.includes('law firm') || q.includes('legal') || q.includes('forensic') || q.includes('lien')) {
    return "Yes! We offer an Administrative Medical Billing-Support Pilot for Law Firms & Attorneys at /for-attorneys:\n\n• Organizing itemized medical bills, ledgers, and EOBs by provider, date of service, and document reference\n• Comparing billed charges, payments, adjustments, and stated balances across records\n• Flagging duplicate lines or missing pages with source-linked administrative questions for your legal team\n\n(Note: We provide administrative billing organization and reconciliation support — not legal advice, expert testimony, or clinical medical necessity opinions.) Visit /for-attorneys or call Jasmel at (786) 643-2099 to discuss a pilot file!";
  }

  if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('rate') || q.includes('fee') || q.includes('how much') || q.includes('%') || q.includes('tier')) {
    return "We offer transparent, performance-based pricing for healthcare providers — you only pay when we collect for you, with $0 setup fees:\n\n• 5.6% — Practices collecting $50k+/month\n• 6.5% — Practices collecting $40k–$50k/month\n• 7.5% — Practices collecting $20k–$30k/month\n• 10% — New & startup practices\n\nExact pricing depends on agreed services, claim volume, and complexity. Call us directly at (786) 643-2099 or claim your Free 48-Hour Billing Audit for a written proposal!";
  }

  if (q.includes('audit') || q.includes('free') || q.includes('consult') || q.includes('start') || q.includes('register') || q.includes('book') || q.includes('ai')) {
    return "We combine seasoned human expertise with AI precision: our experienced AAPC-certified coders read your clinical notes and aging A/R, and our AI engine double-checks every code and modifier before submission.\n\nYou can request your Free 48-Hour Billing Audit at /consultation or call Jasmel directly right now at (786) 643-2099!";
  }

  if (q.includes('credential') || q.includes('caqh') || q.includes('enroll') || q.includes('insurance') || q.includes('medicare') || q.includes('medicaid')) {
    return "Yes! We coordinate Provider Credentialing & Payer Enrollment across Florida — including Medicare, Florida Medicaid, Florida Blue, AvMed, UnitedHealthcare, Aetna, Cigna, Humana, and Sunshine Health.\n\nWe manage your CAQH ProView, EDI, ERA, and EFT setup for the payers in your agreement (payer review times typically range 60–120 days). Call us at (786) 643-2099 to get started!";
  }

  return "Hi there! I'm Jass, your MBMB Receptionist. We combine experienced AAPC-certified human billers who read every chart with AI pre-submission verification (rates from 5.6% to 10% with $0 setup fees), plus administrative medical bill organization for law firms (/for-attorneys).\n\nAsk me about our Pricing Tiers, Human + AI Workflow, Attorney Pilot, or call Jasmel directly at (786) 643-2099!";
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
            max_tokens: 400,
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
              max_tokens: 400,
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
                max_tokens: 400
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
