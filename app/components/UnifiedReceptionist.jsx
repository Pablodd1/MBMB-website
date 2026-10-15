'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const QUICK_PROMPTS = {
  en: [
    { label: '💰 Pricing Tiers (5.6%–10%)', text: 'What are your medical billing pricing tiers and rates?' },
    { label: '🎯 Free 48h Billing Audit', text: 'How does the Free 48-Hour Billing Audit work?' },
    { label: '📋 Credentialing & CAQH', text: 'How long does insurance credentialing and CAQH enrollment take?' },
    { label: '🩺 Specialties & EHRs', text: 'Which medical specialties and EHR systems do you work with?' }
  ],
  es: [
    { label: '💰 Tarifas (5.6%–10%)', text: '¿Cuáles son sus tarifas y precios de facturación médica?' },
    { label: '🎯 Auditoría Gratis 48h', text: '¿Cómo funciona la auditoría gratuita en 48 horas?' },
    { label: '📋 Credencialización', text: '¿Cuánto toma la credencialización médica con seguros?' },
    { label: '📞 Hablar con Jasmel', text: 'Quiero hablar por teléfono con su equipo' }
  ],
  ht: [
    { label: '💰 Pri nou yo (5.6%–10%)', text: 'Ki pri sèvis faktirasyon medikal nou yo?' },
    { label: '🎯 Odit Gratis 48h', text: 'Kijan odit gratis la fonksyone?' }
  ],
  ru: [
    { label: '💰 Тарифы (5.6%–10%)', text: 'Какие у вас тарифы на медицинский биллинг?' },
    { label: '🎯 Бесплатный аудит 48ч', text: 'Как заказать бесплатный аудит биллинга?' }
  ]
};

export default function UnifiedReceptionist() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi Doctor! 👋 I'm Jass, your MBMB Receptionist. Ask me about our 5.6%–10% performance rates, free 48-hour billing audit, or tap below to call us directly at (786) 643-2099!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [language, setLanguage] = useState('en'); // en, es, ru, ht
  const [activeMode, setActiveMode] = useState('chat'); // 'chat' or 'call'
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const currentAudioRef = useRef(null);

  const officeNumber = '+1-786-643-2099';

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'ht' ? 'ht-HT' : language === 'es' ? 'es-ES' : language === 'ru' ? 'ru-RU' : 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        setTimeout(() => {
          sendMessage(transcript);
        }, 300);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
    return () => recognitionRef.current?.abort();
  }, [language]);

  // Browser Web Speech fallback when cloud TTS key is not active
  const speakBrowserFallback = (cleanText) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = language === 'es' ? 'es-US' : language === 'ru' ? 'ru-RU' : 'en-US';
      utterance.rate = 1.02;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore synthesis errors
    }
  };

  // Speak text using Google Cloud TTS with automatic Web Speech fallback
  const speakText = async (text) => {
    if (!isSpeaking) return;
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }

    const cleanText = text.replace(/\*\*\*/g, '').replace(/\*/g, '').replace(/[•🎯💰📋🩺📞👋✅]/g, '').trim();
    if (!cleanText) return;

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText, language })
      });

      if (!res.ok) {
        speakBrowserFallback(cleanText);
        return;
      }
      const data = await res.json();
      if (!data?.audioContent) {
        speakBrowserFallback(cleanText);
        return;
      }
      const audioBlob = base64ToBlob(data.audioContent, 'audio/mpeg');
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      currentAudioRef.current = audio;
      audio.onended = () => { URL.revokeObjectURL(audioUrl); currentAudioRef.current = null; };
      await audio.play();
    } catch {
      speakBrowserFallback(cleanText);
    }
  };

  const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) byteNumbers[i] = byteCharacters.charCodeAt(i);
    return new Blob([new Uint8Array(byteNumbers)], { type: mimeType });
  };

  const toggleWidget = () => {
    const newOpen = !isOpen;
    setIsOpen(newOpen);
    setShowTeaser(false);
    if (newOpen && !hasGreeted) {
      setTimeout(() => {
        const greetings = {
          en: "Hi there! I'm Jass, your MBMB receptionist. I can answer questions about our 5.6% to 10% billing tiers, credentialing, or help you claim a free 48-hour billing audit. Type, tap a topic, or call us right now!",
          es: "¡Hola! Soy Jass, tu recepcionista de MBMB. Puedo responder preguntas sobre nuestras tarifas de facturación, credencialización o tu auditoría gratuita en 48 horas.",
          ht: "Bonjou! Mwen se Jass, resepsyonis ou pou MBMB. Mwen ka reponn kesyon sou sèvis faktirasyon nou yo oswa ede ou pran yon odit gratis."
        };
        speakText(greetings[language] || greetings.en);
        setHasGreeted(true);
      }, 450);
    }
  };

  const toggleVoice = () => {
    const newState = !isSpeaking;
    setIsSpeaking(newState);
    if (!newState) {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported in this browser. Try Chrome or Edge.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const sendMessage = async (textOverride = null) => {
    const msgText = textOverride || input;
    if (!msgText.trim()) return;
    const userMsg = { role: 'user', content: msgText };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, language })
      });
      const data = await res.json();
      let botResponse = data?.text || 'I would love to help! Please call Jasmel directly at (786) 643-2099 for immediate assistance.';
      botResponse = botResponse.replace(/\*\*\*/g, '').replace(/\*/g, '').trim();
      const botMsg = { role: 'assistant', content: botResponse };
      const updated = [...next, botMsg];
      setMessages(updated);
      speakText(botResponse);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "Hi! Please call Jasmel & our Miami Beach billing team directly at (786) 643-2099 or claim your Free 48-Hour Billing Audit at /consultation!"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const prompts = QUICK_PROMPTS[language] || QUICK_PROMPTS.en;

  return (
    <>
      {/* INVITING FLOATING TEASER CARD + BUTTON (BOTTOM-LEFT) */}
      <div className="fixed bottom-5 left-5 z-50 flex flex-col items-start gap-2.5">
        {!isOpen && showTeaser && (
          <div className="relative bg-slate-900/95 backdrop-blur-xl border border-[#00A8E8]/50 text-white rounded-2xl p-3.5 shadow-2xl max-w-[295px] animate-fade-in-up">
            <button
              onClick={() => setShowTeaser(false)}
              className="absolute top-2 right-2 text-slate-400 hover:text-white p-1"
              aria-label="Dismiss welcome message"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-start gap-2.5 pr-4">
              <div className="relative shrink-0 mt-0.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0066CC] to-[#00A8E8] flex items-center justify-center font-extrabold text-white text-sm shadow-md">
                  J
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full animate-pulse"></span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#00A8E8]">Jass — MBMB Receptionist</p>
                <p className="text-xs text-slate-200 mt-0.5 leading-snug">
                  Questions about our <strong className="text-white">5.6% billing rate</strong> or <strong className="text-white">Free 48h Audit</strong>?
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={toggleWidget}
                    className="text-[11px] font-bold bg-[#00A8E8] text-slate-950 px-2.5 py-1 rounded-lg hover:bg-cyan-300 transition cursor-pointer"
                  >
                    💬 Chat with Jass
                  </button>
                  <a
                    href="tel:+17866432099"
                    className="text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-lg hover:bg-emerald-500/30 transition"
                  >
                    📞 Call (786) 643-2099
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={toggleWidget}
          className="bg-gradient-to-r from-[#0066CC] via-[#0088DD] to-[#00A8E8] text-white pl-3.5 pr-5 py-3 rounded-full shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-400/50 border border-white/20 transition-all duration-300 hover:scale-105 flex items-center gap-3 cursor-pointer"
          aria-label="Open Jass MBMB Receptionist"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center font-extrabold text-sm border border-white/30">
              J
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0066CC]"></span>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-extrabold tracking-tight leading-none">Ask Jass</span>
              <span className="text-[10px] bg-emerald-400/20 text-emerald-200 border border-emerald-300/30 px-1.5 py-0.5 rounded-full font-semibold">
                LIVE
              </span>
            </div>
            <span className="text-[11px] text-cyan-100 block mt-0.5">MBMB Receptionist · Chat or Call</span>
          </div>
        </button>
      </div>

      {/* WIDGET PANEL - LEFT SIDE */}
      {isOpen && (
        <div
          className="fixed bottom-24 left-5 z-50 w-[395px] max-w-[calc(100vw-32px)] rounded-3xl overflow-hidden shadow-2xl border border-[#00A8E8]/40"
          style={{ background: 'linear-gradient(145deg, #0a1628 0%, #0f1f38 55%, #0a1628 100%)' }}
        >
          {/* Header */}
          <div
            className="p-4 border-b border-cyan-500/20"
            style={{ background: 'linear-gradient(90deg, rgba(0,102,204,0.28) 0%, rgba(0,168,232,0.18) 100%)' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0066CC] to-[#00A8E8] flex items-center justify-center shadow-lg border border-white/25">
                    <span className="text-white font-extrabold text-lg">J</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse"></span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm leading-tight">Jass — MBMB Receptionist</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-emerald-400 text-xs font-semibold">● Online Now</span>
                    <span className="text-slate-400 text-[11px]">· Instant Answers &amp; Voice</span>
                  </div>
                </div>
              </div>
              <button
                onClick={toggleWidget}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Direct Action Tabs: Chat vs Direct Call vs Free Audit */}
            <div className="grid grid-cols-3 gap-2 mt-3.5">
              <button
                onClick={() => setActiveMode('chat')}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMode === 'chat'
                    ? 'bg-[#00A8E8] text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800/70 text-slate-300 hover:text-white'
                }`}
              >
                💬 Chat Now
              </button>
              <a
                href={`tel:${officeNumber.replace(/-/g, '')}`}
                onClick={() => setActiveMode('call')}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                  activeMode === 'call'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                }`}
              >
                📞 Call Jass
              </a>
              <Link
                href="/consultation"
                onClick={() => setIsOpen(false)}
                className="py-2 px-2.5 rounded-xl text-xs font-bold bg-white/10 text-white hover:bg-white/20 transition-all text-center border border-white/15"
              >
                🎯 Free Audit
              </Link>
            </div>
          </div>

          {/* Chat Area */}
          {activeMode === 'chat' && (
            <>
              <div className="p-4 overflow-y-auto space-y-3" style={{ height: '270px' }}>
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                        m.role === 'assistant'
                          ? 'bg-slate-800/90 text-slate-100 rounded-bl-sm border border-slate-700/70 shadow-sm'
                          : 'bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white rounded-br-sm font-medium shadow-md'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}

                {/* Interactive Quick-Action Topic Pills */}
                {!loading && (
                  <div className="pt-1">
                    <p className="text-[11px] text-slate-400 mb-1.5 font-medium">Tap a question or type below:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {prompts.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => sendMessage(item.text)}
                          className="text-left text-[11px] bg-slate-800/90 hover:bg-[#0066CC]/40 text-cyan-200 border border-cyan-500/30 rounded-xl px-2.5 py-1.5 transition-all hover:border-cyan-400 cursor-pointer"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800/80 border border-slate-700/50 px-4 py-3 rounded-2xl rounded-bl-none">
                      <div className="flex gap-1.5 items-center">
                        <span className="w-2 h-2 bg-[#00A8E8] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-[#00A8E8] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-[#00A8E8] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        <span className="text-[11px] text-slate-400 ml-1">Jass is typing...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Language & Voice Controls + Direct Phone Strip */}
              <div className="px-4 py-2 border-t border-slate-800 bg-slate-900/70 flex items-center justify-between">
                <div className="flex items-center gap-1 bg-slate-800/80 rounded-lg p-0.5 border border-slate-700/60">
                  <button onClick={() => setLanguage('en')} className={`text-[11px] font-semibold px-2 py-0.5 rounded cursor-pointer ${language === 'en' ? 'bg-[#00A8E8] text-slate-950' : 'text-slate-400 hover:text-white'}`}>EN</button>
                  <button onClick={() => setLanguage('es')} className={`text-[11px] font-semibold px-2 py-0.5 rounded cursor-pointer ${language === 'es' ? 'bg-[#00A8E8] text-slate-950' : 'text-slate-400 hover:text-white'}`}>ES</button>
                  <button onClick={() => setLanguage('ru')} className={`text-[11px] font-semibold px-2 py-0.5 rounded cursor-pointer ${language === 'ru' ? 'bg-[#00A8E8] text-slate-950' : 'text-slate-400 hover:text-white'}`}>RU</button>
                  <button onClick={() => setLanguage('ht')} className={`text-[11px] font-semibold px-2 py-0.5 rounded cursor-pointer ${language === 'ht' ? 'bg-[#00A8E8] text-slate-950' : 'text-slate-400 hover:text-white'}`}>HT</button>
                </div>

                <a
                  href="tel:+17866432099"
                  className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  📞 (786) 643-2099
                </a>

                <button
                  onClick={toggleVoice}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title={isSpeaking ? 'Mute Jass voice' : 'Enable Jass voice'}
                >
                  {isSpeaking ? (
                    <svg className="w-4 h-4 text-[#00A8E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Input */}
              <div className="p-3 border-t border-cyan-500/20 bg-slate-950/90">
                <div className="flex gap-2">
                  <input
                    className="flex-1 bg-white text-slate-900 border border-slate-300 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00A8E8] focus:ring-2 focus:ring-[#00A8E8]/30 placeholder:text-slate-400 font-medium transition-all"
                    placeholder={isListening ? "Listening... speak now" : "Ask Jass anything or tap mic..."}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                  />
                  <button
                    onClick={toggleListening}
                    className={`px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                      isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                    }`}
                    title={isListening ? 'Stop listening' : 'Speak to Jass'}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 10v2a7 7 0 01-14 0v-2" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19v4M8 23h8" />
                    </svg>
                  </button>
                  <button
                    onClick={() => sendMessage()}
                    disabled={loading || !input.trim()}
                    className="bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white px-4 py-2.5 rounded-xl font-bold hover:opacity-95 transition-all disabled:opacity-40 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Call Mode */}
          {activeMode === 'call' && (
            <div className="p-6 text-center flex flex-col items-center justify-center" style={{ height: '350px' }}>
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-3 animate-pulse">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-1">Speak With Jasmel &amp; Our Team</h3>
              <p className="text-slate-300 text-xs max-w-xs mb-5">
                Get immediate answers on your practice&apos;s billing, denied claims, or credentialing in Miami &amp; across Florida.
              </p>
              <a
                href={`tel:${officeNumber.replace(/-/g, '')}`}
                className="w-full max-w-xs bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 px-6 py-3.5 rounded-xl font-extrabold text-base shadow-lg shadow-emerald-500/25 hover:scale-105 transition-all"
              >
                📞 Call (786) 643-2099
              </a>
              <Link
                href="/consultation"
                onClick={() => setIsOpen(false)}
                className="mt-3 text-xs font-semibold text-[#00A8E8] hover:underline"
              >
                Or schedule your Free 48-Hour Billing Audit online →
              </Link>
              <p className="text-slate-400 text-[11px] mt-4">Mon–Fri: 9:00 AM – 6:00 PM EST · Direct Line</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
