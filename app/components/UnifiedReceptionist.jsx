'use client';
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';

const QUICK_PROMPTS = {
  en: [
    { label: '💰 Pricing (5.6%–10%)', key: 'pricing', text: 'What are your exact billing rates and is there a setup fee?' },
    { label: '🩺 Free 20-Claim Audit', key: 'audit', text: 'How does the free 48-hour 20-claim audit work?' },
    { label: '⚖️ Attorney 1-Case Pilot', key: 'attorney', text: 'How does the 72-hour Personal Injury billing chronology pilot work?' },
    { label: '🏥 Credentialing & EHRs', key: 'ehr', text: 'Do I keep my current EHR and how fast is Florida credentialing?' }
  ],
  es: [
    { label: '💰 Tarifas (5.6%–10%)', key: 'pricing_es', text: '¿Cuáles son sus tarifas exactas y hay costo de instalación?' },
    { label: '🩺 Auditoría Gratis (20 Reclamos)', key: 'audit_es', text: '¿Cómo funciona la auditoría gratuita de 20 reclamos en 48 horas?' },
    { label: '⚖️ Piloto para Abogados', key: 'attorney_es', text: '¿Cómo funciona la cronología y conciliación de facturas médicas para abogados?' },
    { label: '🏥 Credencialización y EHR', key: 'ehr_es', text: '¿Puedo mantener mi EHR actual y qué aseguradoras manejan?' }
  ],
  ht: [
    { label: '💰 Pri (5.6%–10%)', key: 'pricing', text: 'Ki pri sèvis faktirasyon medikal nou yo?' },
    { label: '🏥 Kredansyalizasyon & EHR', key: 'ehr', text: 'Ki jan nou travay ak sistèm EHR mwen an?' }
  ],
  ru: [
    { label: '💰 Тарифы (5.6%–10%)', key: 'pricing', text: 'Какие у вас тарифы на медицинский биллинг?' },
    { label: '🏥 Аккредитация и EHR', key: 'ehr', text: 'С какими страховыми и системами EHR вы работаете?' }
  ]
};

// Instant (<15ms), authentic human-written answers from a seasoned medical biller perspective
function getInstantHumanReply(rawText, lang = 'en') {
  const q = rawText.toLowerCase();

  if (lang === 'es') {
    if (q.includes('tarifa') || q.includes('precio') || q.includes('costo') || q.includes('5.6')) {
      return 'Cobramos del 5.6% al 10% únicamente sobre lo que entra a su cuenta bancaria. $0 costo de instalación, sin mensualidades fijas. Si un reclamo no se cobra, usted no nos paga nada. ¿Desea agendar una llamada de 15 min en la pestaña "📅 Book 15m Call"?';
    }
    if (q.includes('auditor') || q.includes('20 reclamo') || q.includes('denegad')) {
      return 'Envíenos 20 reclamos denegados o mal pagados (tras firmar acuerdo HIPAA BAA). En 48 horas nuestros codificadores certificados AAPC le muestran exactamente qué código CPT/modificador corregir y cuánto dinero puede recuperar—100% gratis.';
    }
    if (q.includes('abogad') || q.includes('cronolog') || q.includes('lesion')) {
      return 'Envíenos 1 expediente de lesiones personales (CMS-1500, UB-04, EOBs, PIP). En 72 horas le entregamos una tabla en Excel + PDF referenciada por página (Bates) con códigos CPT en lenguaje claro, cargos duplicados marcados y saldos conciliados.';
    }
    if (q.includes('ehr') || q.includes('credencial')) {
      return 'Usted mantiene su EHR actual (Athenahealth, eClinicalWorks, Kareo/Tebra, AdvancedMD, Epic, DrChrono). Trabajamos directo en su sistema. También gestionamos credencialización completa con Medicare (FCSO), Florida Medicaid (AHCA), Florida Blue, Simply y Sunshine.';
    }
  }

  if (q.includes('pric') || q.includes('rate') || q.includes('cost') || q.includes('fee') || q.includes('5.6') || q.includes('how much')) {
    return "Straight numbers: 5.6% to 10% of what actually hits your bank account. $0 setup fee, no monthly retainers, and we never charge on uncollected claims. Exact rate depends on your monthly claim volume and specialty. Tap '📅 Book 15m Call' above to get a written quote today.";
  }

  if (q.includes('audit') || q.includes('20-claim') || q.includes('20 claim') || q.includes('denial') || q.includes('denied') || q.includes('underpaid')) {
    return "Here is our 48-hour proof test: Pick 20 denied or underpaid claims (CO-16, CO-50, CO-97, or Modifier 25/59 rejections). Once we sign your HIPAA BAA, our U.S. AAPC coders review them and hand you the exact CPT/modifier fix and recoverable dollar amount in 48 hours—free.";
  }

  if (q.includes('attorney') || q.includes('lawyer') || q.includes('law firm') || q.includes('chronology') || q.includes('pilot') || q.includes('personal injury') || q.includes('eob')) {
    return "For trial attorneys: Send us 1 messy Personal Injury billing file (CMS-1500s, UB-04s, PIP logs, EOBs). In 72 hours, we return a Bates-linked chronology (editable Excel + PDF) with every CPT code in plain English, duplicate facility/physician charges flagged, and true net balances reconciled.";
  }

  if (q.includes('ehr') || q.includes('software') || q.includes('credential') || q.includes('caqh') || q.includes('medicare') || q.includes('medicaid')) {
    return "You keep your current EHR—we work directly inside eClinicalWorks, Athenahealth, Kareo/Tebra, AdvancedMD, DrChrono, NextGen, and Epic. For credentialing, we handle CAQH, Medicare (FCSO), Florida Medicaid (AHCA), Florida Blue, Simply, Sunshine, UHC, Aetna, and Cigna end-to-end.";
  }

  if (q.includes('book') || q.includes('schedule') || q.includes('appointment') || q.includes('speak') || q.includes('call') || q.includes('jasmel')) {
    return "You can lock in a 15-minute call with Jasmel right now—just tap the '📅 Book 15m Call' tab at the top of this window, or call us directly at (786) 643-2099.";
  }

  return null;
}

function getNextBusinessDays(count = 5) {
  const days = [];
  const cursor = new Date();
  while (days.length < count) {
    cursor.setDate(cursor.getDate() + 1);
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) {
      const label = cursor.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      const iso = cursor.toISOString().split('T')[0];
      days.push({ label, iso });
    }
  }
  return days;
}

const TIME_SLOTS = ['10:00 AM', '11:30 AM', '2:00 PM', '4:00 PM'];

export default function UnifiedReceptionist() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi—how can we help your practice or firm today? Ask about our 5.6%–10% billing rates, our free 48-hour 20-claim audit, or book a 15-minute call right in this window."
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceEnabledInChat, setVoiceEnabledInChat] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('en');
  const [activeMode, setActiveMode] = useState('chat'); // 'chat' | 'schedule' | 'call'

  // Inline Scheduler State
  const businessDays = useMemo(() => getNextBusinessDays(5), []);
  const [selectedDay, setSelectedDay] = useState(() => getNextBusinessDays(5)[0]?.label || '');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [bookName, setBookName] = useState('');
  const [bookEmail, setBookEmail] = useState('');
  const [bookPhone, setBookPhone] = useState('');
  const [bookOrg, setBookOrg] = useState('');
  const [bookFocus, setBookFocus] = useState('20-Claim Free Audit (Provider)');
  const [bookStatus, setBookStatus] = useState('idle'); // 'idle' | 'submitting' | 'confirmed' | 'error'

  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const currentAudioRef = useRef(null);
  const ttsAbortRef = useRef(null);
  const ttsRequestIdRef = useRef(0);
  const activeModeRef = useRef(activeMode);
  const voiceEnabledInChatRef = useRef(voiceEnabledInChat);
  const languageRef = useRef(language);
  const triggerBtnRef = useRef(null);
  const chatInputRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    activeModeRef.current = activeMode;
  }, [activeMode]);

  useEffect(() => {
    voiceEnabledInChatRef.current = voiceEnabledInChat;
  }, [voiceEnabledInChat]);

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const stopAllAudio = useCallback(() => {
    ttsRequestIdRef.current += 1;
    if (ttsAbortRef.current) {
      try {
        ttsAbortRef.current.abort();
      } catch {}
      ttsAbortRef.current = null;
    }
    if (currentAudioRef.current) {
      try {
        currentAudioRef.current.pause();
        currentAudioRef.current.src = '';
      } catch {}
      currentAudioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    setIsPlayingAudio(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      stopAllAudio();
      return;
    }
    const focusTimer = setTimeout(() => {
      if (activeMode === 'chat' && chatInputRef.current) {
        chatInputRef.current.focus();
      } else if (closeBtnRef.current) {
        closeBtnRef.current.focus();
      }
    }, 50);

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        stopAllAudio();
        setIsOpen(false);
        setTimeout(() => triggerBtnRef.current?.focus(), 40);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, activeMode, stopAllAudio]);

  const speakBrowserFallback = useCallback((cleanText, reqId) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (reqId !== ttsRequestIdRef.current) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const lang = languageRef.current;
      utterance.lang = lang === 'es' ? 'es-US' : lang === 'ru' ? 'ru-RU' : 'en-US';
      utterance.rate = 1.03;
      utterance.pitch = 1.02;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsPlayingAudio(false);
    }
  }, []);

  const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) byteNumbers[i] = byteCharacters.charCodeAt(i);
    return new Blob([new Uint8Array(byteNumbers)], { type: mimeType });
  };

  const speakText = useCallback(async (text, forceSpeak = false) => {
    const shouldSpeak = forceSpeak || activeModeRef.current === 'call' || voiceEnabledInChatRef.current;
    if (!shouldSpeak) return;

    stopAllAudio();
    const reqId = ttsRequestIdRef.current;

    const cleanText = text
      .replace(/\*\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/[•🎯💰📋🩺📞👋✅🤖⚖️🎙️💬🏥📅]/g, '')
      .trim();
    if (!cleanText) return;

    const controller = new AbortController();
    ttsAbortRef.current = controller;

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText, language: languageRef.current }),
        signal: controller.signal
      });

      if (reqId !== ttsRequestIdRef.current) return;

      if (!res.ok) {
        speakBrowserFallback(cleanText, reqId);
        return;
      }
      const data = await res.json();
      if (reqId !== ttsRequestIdRef.current) return;

      if (!data?.audioContent) {
        speakBrowserFallback(cleanText, reqId);
        return;
      }

      const audioBlob = base64ToBlob(data.audioContent, 'audio/mpeg');
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      currentAudioRef.current = audio;
      setIsPlayingAudio(true);

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        if (currentAudioRef.current === audio) {
          currentAudioRef.current = null;
          setIsPlayingAudio(false);
        }
      };
      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        if (currentAudioRef.current === audio) {
          currentAudioRef.current = null;
          setIsPlayingAudio(false);
        }
      };

      await audio.play();
    } catch (err) {
      if (err?.name === 'AbortError') return;
      if (reqId === ttsRequestIdRef.current) {
        speakBrowserFallback(cleanText, reqId);
      }
    }
  }, [stopAllAudio, speakBrowserFallback]);

  const sendMessage = useCallback(async (textOverride = null, currentMessages = null) => {
    const msgText = (textOverride ?? input).trim();
    if (!msgText) return;

    stopAllAudio();

    const userMsg = { role: 'user', content: msgText };
    const baseMessages = currentMessages || messages;
    const next = [...baseMessages, userMsg];
    setMessages(next);
    setInput('');

    // 1. Check instant (<15ms) local human-written response first
    const instantReply = getInstantHumanReply(msgText, languageRef.current);
    if (instantReply) {
      const botMsg = { role: 'assistant', content: instantReply };
      setMessages(prev => [...prev, botMsg]);
      speakText(instantReply);
      return;
    }

    // 2. Otherwise query /api/ai-chat
    setLoading(true);
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, language: languageRef.current })
      });
      const data = await res.json();
      let botResponse =
        data?.text ||
        "We charge 5.6%–10% of actual collections ($0 setup). Tap '📅 Book 15m Call' above or call (786) 643-2099 to review your claims.";
      botResponse = botResponse.replace(/\*\*\*/g, '').replace(/\*/g, '').trim();
      const botMsg = { role: 'assistant', content: botResponse };
      setMessages(prev => [...prev, botMsg]);
      speakText(botResponse);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            "Tap '📅 Book 15m Call' above to pick a time with Jasmel, or call us directly at (786) 643-2099."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, messages, speakText, stopAllAudio]);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'ht' ? 'ht-HT' : language === 'es' ? 'es-ES' : language === 'ru' ? 'ru-RU' : 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results?.[0]?.[0]?.transcript || '';
        setIsListening(false);
        if (transcript.trim()) {
          setInput(transcript);
          sendMessage(transcript);
        }
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
    return () => recognitionRef.current?.abort();
  }, [language, sendMessage]);

  const toggleWidget = () => {
    const newOpen = !isOpen;
    if (!newOpen) {
      stopAllAudio();
    }
    setIsOpen(newOpen);
  };

  const switchMode = (newMode) => {
    stopAllAudio();
    setActiveMode(newMode);
    if (newMode === 'call') {
      const greetings = {
        en: "Hi, tap the microphone below and ask me about our 5.6% to 10% billing rates, our 20-claim free audit, or our attorney billing chronologies.",
        es: "Hola, toca el micrófono abajo para preguntar sobre nuestras tarifas de facturación médica, la auditoría gratis de 20 reclamos, o soporte para abogados.",
        ht: "Bonjou, peze mikwofòn nan pou poze nenpòt kesyon ou genyen.",
        ru: "Здравствуйте! Нажмите на микрофон ниже и задайте любой вопрос."
      };
      speakText(greetings[language] || greetings.en, true);
    }
  };

  const toggleVoiceInChat = () => {
    const nextState = !voiceEnabledInChat;
    setVoiceEnabledInChat(nextState);
    if (!nextState) {
      stopAllAudio();
    } else if (messages.length > 0) {
      speakText(messages[messages.length - 1].content, true);
    }
  };

  const toggleListening = () => {
    stopAllAudio();
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookName.trim() || !bookEmail.trim()) return;
    setBookStatus('submitting');
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bookName.trim(),
          email: bookEmail.trim(),
          phone: bookPhone.trim(),
          practice: bookOrg.trim(),
          specialty: bookFocus,
          meeting_type: bookFocus,
          selected_slot: {
            dayName: selectedDay,
            time: selectedTime
          }
        })
      });
      if (res.ok) {
        setBookStatus('confirmed');
      } else {
        setBookStatus('error');
      }
    } catch {
      setBookStatus('error');
    }
  };

  const prompts = QUICK_PROMPTS[language] || QUICK_PROMPTS.en;

  return (
    <>
      {/* MINIMALISTIC FLOATING TRIGGER BUTTON (BOTTOM-RIGHT) */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          ref={triggerBtnRef}
          onClick={toggleWidget}
          className="bg-[#0a1628] hover:bg-[#0f223d] text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-2xl border border-[#00A8E8]/50 transition-all duration-200 hover:scale-[1.03] flex items-center gap-2.5 cursor-pointer"
          aria-label={isOpen ? 'Close Front Desk & Scheduler' : 'Open Front Desk & 15-Minute Call Scheduler'}
          aria-expanded={isOpen}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-bold tracking-tight">
            Ask or Book 15m Call
          </span>
        </button>
      </div>

      {/* MINIMALISTIC PANEL */}
      {isOpen && (
        <div
          role="region"
          aria-label="MBMB Direct Desk & Call Scheduler"
          className="fixed bottom-20 right-5 z-50 w-[390px] max-w-[calc(100vw-32px)] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 bg-[#0a1628]"
        >
          {/* Minimalistic Top Bar: 3 Mode Tabs + Close Button (Zero Logo/Title Clutter) */}
          <div className="p-2.5 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between gap-1.5">
            <div className="grid grid-cols-3 gap-1 flex-1">
              <button
                type="button"
                onClick={() => switchMode('chat')}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  activeMode === 'chat'
                    ? 'bg-[#0066CC] text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white'
                }`}
              >
                💬 Ask
              </button>
              <button
                type="button"
                onClick={() => switchMode('schedule')}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  activeMode === 'schedule'
                    ? 'bg-[#00A8E8] text-slate-950 shadow-sm'
                    : 'bg-slate-800/80 text-cyan-300 hover:text-white'
                }`}
              >
                📅 Book 15m Call
              </button>
              <button
                type="button"
                onClick={() => switchMode('call')}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  activeMode === 'call'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-800/80 text-emerald-300 hover:text-white'
                }`}
              >
                🎙️ Voice
              </button>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => {
                toggleWidget();
                setTimeout(() => triggerBtnRef.current?.focus(), 40);
              }}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              aria-label="Close window"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* MODE 1: FAST TEXT CHAT */}
          {activeMode === 'chat' && (
            <>
              <div className="p-3.5 overflow-y-auto space-y-2.5" style={{ height: '275px' }}>
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[86%] px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] leading-relaxed whitespace-pre-line ${
                        m.role === 'assistant'
                          ? 'bg-slate-800/95 text-slate-100 border border-slate-700/70'
                          : 'bg-[#0066CC] text-white font-medium'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}

                {!loading && (
                  <div className="pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {prompts.map((item, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => sendMessage(item.text)}
                          className="text-left text-[11px] bg-slate-800/90 hover:bg-[#0066CC]/40 text-cyan-200 border border-cyan-500/30 rounded-lg px-2.5 py-1.5 transition-all hover:border-cyan-400 cursor-pointer"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800/80 border border-slate-700/50 px-3 py-2 rounded-xl text-xs text-slate-300">
                      Typing...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Sub-bar: Language + Quick Schedule Jump + Audio Toggle */}
              <div className="px-3.5 py-1.5 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {['en', 'es', 'ht', 'ru'].map((lng) => (
                    <button
                      key={lng}
                      type="button"
                      onClick={() => setLanguage(lng)}
                      className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded cursor-pointer ${
                        language === lng ? 'bg-[#00A8E8] text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {lng}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => switchMode('schedule')}
                  className="text-[11px] font-bold text-[#00A8E8] hover:text-white transition-colors cursor-pointer"
                >
                  📅 Pick a Time Slot →
                </button>

                <button
                  type="button"
                  onClick={toggleVoiceInChat}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-[11px]"
                  title={voiceEnabledInChat ? 'Mute voice' : 'Read replies aloud'}
                >
                  {voiceEnabledInChat ? '🔊 On' : '🔇 Mute'}
                </button>
              </div>

              {/* Input */}
              <div className="p-2.5 border-t border-slate-800 bg-slate-950">
                <div className="flex gap-1.5">
                  <input
                    id="jass-chat-input"
                    ref={chatInputRef}
                    className="flex-1 bg-white text-slate-900 border border-slate-300 text-xs sm:text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#00A8E8] placeholder:text-slate-400 font-medium"
                    placeholder={isListening ? 'Listening...' : 'Ask about rates, denials, or pilot...'}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                  />
                  <button
                    type="button"
                    onClick={() => sendMessage()}
                    disabled={loading || !input.trim()}
                    aria-label="Send message"
                    className="bg-[#0066CC] hover:bg-[#00A8E8] text-white px-3.5 py-2 rounded-lg font-bold text-xs transition-all disabled:opacity-40 cursor-pointer"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          )}

          {/* MODE 2: INLINE 15-MINUTE CALL / AUDIT SCHEDULER */}
          {activeMode === 'schedule' && (
            <div className="p-4 overflow-y-auto" style={{ maxHeight: '380px' }}>
              {bookStatus === 'confirmed' ? (
                <div className="bg-emerald-500/15 border border-emerald-400/40 rounded-xl p-4 text-center space-y-2 my-4">
                  <div className="text-emerald-300 font-extrabold text-base">
                    ✓ Locked In: {selectedDay} at {selectedTime} EST
                  </div>
                  <p className="text-slate-200 text-xs leading-relaxed">
                    We just sent a calendar confirmation to <strong>{bookEmail}</strong>. Jasmel will call you at the scheduled time (or reach us anytime at <strong>(786) 643-2099</strong>).
                  </p>
                  <button
                    type="button"
                    onClick={() => setBookStatus('idle')}
                    className="mt-2 text-xs text-[#00A8E8] underline cursor-pointer"
                  >
                    Book another time
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-3 text-left">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      1. Select Day &amp; Time (EST)
                    </label>
                    <div className="grid grid-cols-5 gap-1 mb-1.5">
                      {businessDays.map((d) => (
                        <button
                          key={d.iso}
                          type="button"
                          onClick={() => setSelectedDay(d.label)}
                          className={`py-1.5 px-1 rounded text-[10px] font-bold text-center transition-all cursor-pointer border ${
                            selectedDay === d.label
                              ? 'bg-[#00A8E8] text-slate-950 border-[#00A8E8]'
                              : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`py-1.5 px-2 rounded text-[11px] font-bold transition-all cursor-pointer border ${
                            selectedTime === slot
                              ? 'bg-[#0066CC] text-white border-[#00A8E8]'
                              : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      2. Focus
                    </label>
                    <select
                      value={bookFocus}
                      onChange={(e) => setBookFocus(e.target.value)}
                      className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg px-2.5 py-2 text-xs font-medium focus:outline-none focus:border-[#00A8E8]"
                    >
                      <option value="20-Claim Free Audit (Provider)">🩺 Free 48-Hr 20-Claim Audit (Provider)</option>
                      <option value="Full Practice Billing Quote (5.6%–10%)">💰 Full Billing Quote (5.6%–10% of Collections)</option>
                      <option value="Attorney 1-Case Chronology Pilot">⚖️ Attorney 1-Case Billing Chronology Pilot</option>
                      <option value="Florida Payer Credentialing">🏥 Florida Payer Credentialing</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={bookName}
                      onChange={(e) => setBookName(e.target.value)}
                      className="bg-white text-slate-900 rounded-lg px-2.5 py-2 text-xs font-medium border border-slate-300 focus:outline-none"
                    />
                    <input
                      type="tel"
                      placeholder="Direct Phone *"
                      required
                      value={bookPhone}
                      onChange={(e) => setBookPhone(e.target.value)}
                      className="bg-white text-slate-900 rounded-lg px-2.5 py-2 text-xs font-medium border border-slate-300 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Work Email *"
                      value={bookEmail}
                      onChange={(e) => setBookEmail(e.target.value)}
                      className="bg-white text-slate-900 rounded-lg px-2.5 py-2 text-xs font-medium border border-slate-300 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Practice or Firm Name"
                      value={bookOrg}
                      onChange={(e) => setBookOrg(e.target.value)}
                      className="bg-white text-slate-900 rounded-lg px-2.5 py-2 text-xs font-medium border border-slate-300 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={bookStatus === 'submitting'}
                    className="w-full bg-[#0066CC] hover:bg-[#00A8E8] text-white font-bold text-xs py-2.5 rounded-lg shadow-lg transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {bookStatus === 'submitting'
                      ? 'Confirming Slot...'
                      : `Confirm ${selectedDay} at ${selectedTime} EST →`}
                  </button>

                  {bookStatus === 'error' && (
                    <p className="text-rose-400 text-[11px] text-center">
                      Could not book—please call (786) 643-2099 directly.
                    </p>
                  )}
                </form>
              )}
            </div>
          )}

          {/* MODE 3: VOICE CALL */}
          {activeMode === 'call' && (
            <div className="p-4 flex flex-col justify-between" style={{ height: '310px' }}>
              <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#00A8E8]">
                      {isListening
                        ? '● Listening...'
                        : loading
                        ? '● Thinking...'
                        : isPlayingAudio
                        ? '● Speaking...'
                        : '● Voice Ready'}
                    </span>
                    {isPlayingAudio && (
                      <button
                        type="button"
                        onClick={stopAllAudio}
                        className="text-[11px] font-bold text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded cursor-pointer"
                      >
                        ⏹ Stop
                      </button>
                    )}
                  </div>
                  <div className="text-slate-200 text-xs leading-relaxed bg-slate-950/80 p-3 rounded-lg border border-slate-800 max-h-[125px] overflow-y-auto">
                    {messages[messages.length - 1]?.content}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleListening}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-[#0066CC] hover:bg-[#00A8E8] text-white'
                  }`}
                >
                  {isListening ? 'Tap When Done Speaking' : '🎙️ Tap & Speak'}
                </button>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span>Direct Line: (786) 643-2099</span>
                <button
                  type="button"
                  onClick={() => switchMode('schedule')}
                  className="text-cyan-300 hover:text-white font-semibold underline cursor-pointer"
                >
                  Book 15m Call
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
