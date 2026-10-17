'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';

const QUICK_PROMPTS = {
  en: [
    { label: '💰 Pricing Tiers (5.6%–10%)', text: 'What are your medical billing pricing tiers and rates?' },
    { label: '🤖 Human + AI Double-Check', text: 'How do your human coders and AI work together to prevent claim denials?' },
    { label: '⚖️ For Attorneys & Law Firms', text: 'How does your medical billing organization and reconciliation support for attorneys work?' },
    { label: '🎯 Free 48h Billing Audit', text: 'How does the Free 48-Hour Billing Audit work?' }
  ],
  es: [
    { label: '💰 Tarifas (5.6%–10%)', text: '¿Cuáles son sus tarifas y precios de facturación médica?' },
    { label: '🤖 Experiencia + Doble Check IA', text: '¿Cómo combinan especialistas humanos con Inteligencia Artificial?' },
    { label: '⚖️ Para Abogados y Bufetes', text: '¿Cómo funciona el soporte administrativo de organización de facturas médicas para abogados?' },
    { label: '🎯 Auditoría Gratis 48h', text: '¿Cómo funciona la auditoría gratuita en 48 horas?' }
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
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm Jass, your MBMB AI Receptionist. We combine experienced AAPC coders who read every chart with AI pre-submission verification (5.6%–10% collection tiers), and we also offer administrative medical bill organization for law firms (/for-attorneys). How can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  // Voice output is ON automatically in 'call' (Voice AI) mode, and optional in 'chat' (Text Chat) mode
  const [voiceEnabledInChat, setVoiceEnabledInChat] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('en'); // en, es, ru, ht
  const [activeMode, setActiveMode] = useState('chat'); // 'chat' (Text Chat priority) or 'call' (Voice AI Representative)

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

  const officeNumber = '+1-786-643-2099';

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

  // Hard stop any in-flight TTS request, HTMLAudioElement, and browser speechSynthesis
  // Guarantees two voices can NEVER play at the same time.
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

  // Focus management and Escape key handling
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
    }, 60);

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

  // Browser Web Speech fallback when cloud TTS is unavailable
  const speakBrowserFallback = useCallback((cleanText, reqId) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (reqId !== ttsRequestIdRef.current) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const lang = languageRef.current;
      utterance.lang = lang === 'es' ? 'es-US' : lang === 'ru' ? 'ru-RU' : 'en-US';
      utterance.rate = 1.02;
      utterance.pitch = 1.05;
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

  // Speak text using Grok Voice 3.0 (/api/tts) with strict single-stream mutex
  const speakText = useCallback(async (text, forceSpeak = false) => {
    const shouldSpeak = forceSpeak || activeModeRef.current === 'call' || voiceEnabledInChatRef.current;
    if (!shouldSpeak) return;

    // Immediately cancel any previous audio or in-flight TTS fetch before starting a new one
    stopAllAudio();
    const reqId = ttsRequestIdRef.current;

    const cleanText = text
      .replace(/\*\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/[•🎯💰📋🩺📞👋✅🤖⚖️🎙️💬]/g, '')
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

      // If another speech request started or audio was stopped while fetching, discard this response
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

    // Stop any currently playing voice immediately when user sends a new message
    stopAllAudio();

    const userMsg = { role: 'user', content: msgText };
    const baseMessages = currentMessages || messages;
    const next = [...baseMessages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, language: languageRef.current })
      });
      const data = await res.json();
      let botResponse = data?.text || 'I would love to help! Please call Jasmel directly at (786) 643-2099 for immediate assistance.';
      botResponse = botResponse.replace(/\*\*\*/g, '').replace(/\*/g, '').trim();
      const botMsg = { role: 'assistant', content: botResponse };
      setMessages(prev => [...prev, botMsg]);
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
  }, [input, messages, speakText, stopAllAudio]);

  // Speech recognition setup
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
      // Speak a single concise greeting when entering Voice AI Representative mode
      const greetings = {
        en: "Hi! I'm Jass, your MBMB voice representative. Tap the microphone button below and ask me anything about our billing rates, coding, or attorney support.",
        es: "¡Hola! Soy Jass, tu representante de voz de MBMB. Toca el micrófono abajo y pregúntame sobre nuestras tarifas, codificación o soporte para abogados.",
        ht: "Bonjou! Mwen se Jass, reprezantan vwa MBMB ou. Peze mikwofòn nan pou poze kesyon ou.",
        ru: "Здравствуйте! Я Джасс, голосовой представитель MBMB. Нажмите на микрофон ниже и задайте любой вопрос."
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
    // Always stop Jass's voice before listening to the user so they never talk over each other
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

  const prompts = QUICK_PROMPTS[language] || QUICK_PROMPTS.en;

  return (
    <>
      {/* SINGLE UNIFIED FLOATING BUTTON (BOTTOM-LEFT) — NO DUPLICATE STACKED TEASER */}
      <div className="fixed bottom-5 left-5 z-50">
        <button
          ref={triggerBtnRef}
          onClick={toggleWidget}
          className="bg-gradient-to-r from-[#0066CC] via-[#0088DD] to-[#00A8E8] text-white pl-3.5 pr-5 py-3 rounded-full shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-400/50 border border-white/20 transition-all duration-300 hover:scale-105 flex items-center gap-3 cursor-pointer"
          aria-label={isOpen ? 'Close Jass AI Representative' : 'Open Jass AI Representative (Text Chat or Voice AI)'}
          aria-expanded={isOpen}
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
            <span className="text-[11px] text-cyan-100 block mt-0.5">Text Chat · Voice AI Representative</span>
          </div>
        </button>
      </div>

      {/* UNIFIED WIDGET PANEL - LEFT SIDE */}
      {isOpen && (
        <div
          role="region"
          aria-label="Jass MBMB AI Representative Panel"
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
                  <h3 className="text-white font-bold text-sm leading-tight">Jass — MBMB AI Representative</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-emerald-400 text-xs font-semibold">● Online Now</span>
                    <span className="text-slate-400 text-[11px]">
                      · {activeMode === 'chat' ? 'Text Chat Mode' : 'Live Voice AI Mode'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                ref={closeBtnRef}
                onClick={() => {
                  toggleWidget();
                  setTimeout(() => triggerBtnRef.current?.focus(), 40);
                }}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Priority Mode Switcher: 1. Text Chat | 2. Voice AI Representative | 3. Free Audit */}
            <div className="grid grid-cols-3 gap-2 mt-3.5">
              <button
                onClick={() => switchMode('chat')}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMode === 'chat'
                    ? 'bg-[#00A8E8] text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800/70 text-slate-300 hover:text-white'
                }`}
              >
                💬 Text Chat
              </button>
              <button
                onClick={() => switchMode('call')}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                  activeMode === 'call'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                }`}
              >
                🎙️ Voice AI
              </button>
              <Link
                href="/consultation"
                onClick={() => {
                  stopAllAudio();
                  setIsOpen(false);
                }}
                className="py-2 px-2.5 rounded-xl text-xs font-bold bg-white/10 text-white hover:bg-white/20 transition-all text-center border border-white/15"
              >
                🎯 Free Audit
              </Link>
            </div>
          </div>

          {/* MODE 1: TEXT CHAT (Silent by default unless speaker icon toggled) */}
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
                        <span className="text-[11px] text-slate-400 ml-1">Jass is replying...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Language & Optional Voice Read-Aloud Controls */}
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
                  onClick={toggleVoiceInChat}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                  title={voiceEnabledInChat ? 'Mute voice read-aloud in text chat' : 'Read text replies aloud'}
                  aria-label={voiceEnabledInChat ? 'Mute voice read-aloud' : 'Enable voice read-aloud'}
                >
                  {voiceEnabledInChat ? (
                    <>
                      <svg className="w-4 h-4 text-[#00A8E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                      <span className="text-[#00A8E8] font-semibold">Voice ON</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                      <span>Text Only</span>
                    </>
                  )}
                </button>
              </div>

              {/* Text Input */}
              <div className="p-3 border-t border-cyan-500/20 bg-slate-950/90">
                <div className="flex gap-2">
                  <label htmlFor="jass-chat-input" className="sr-only">
                    Ask Jass a question about MBMB services
                  </label>
                  <input
                    id="jass-chat-input"
                    ref={chatInputRef}
                    className="flex-1 bg-white text-slate-900 border border-slate-300 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#00A8E8] focus:ring-2 focus:ring-[#00A8E8]/30 placeholder:text-slate-400 font-medium transition-all"
                    placeholder={isListening ? 'Listening... speak now' : 'Type your question for Jass...'}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                  />
                  <button
                    onClick={toggleListening}
                    aria-label={isListening ? 'Stop voice dictation' : 'Dictate message'}
                    className={`px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                      isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                    }`}
                    title={isListening ? 'Stop listening' : 'Dictate with microphone'}
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
                    aria-label="Send chat message"
                    className="bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white px-4 py-2.5 rounded-xl font-bold hover:opacity-95 transition-all disabled:opacity-40 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5 text-center">
                  General business inquiries only — do not enter patient names, DOBs, or PHI.
                </p>
              </div>
            </>
          )}

          {/* MODE 2: VOICE AI REPRESENTATIVE (Single-Voice Guaranteed + Direct Phone Option) */}
          {activeMode === 'call' && (
            <div className="p-5 text-center flex flex-col items-center justify-between" style={{ height: '355px' }}>
              <div className="w-full bg-slate-900/90 border border-[#00A8E8]/40 rounded-2xl p-4 shadow-inner">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${isListening ? 'bg-red-500 animate-ping' : isPlayingAudio ? 'bg-[#00A8E8] animate-ping' : 'bg-emerald-400 animate-pulse'}`}></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#00A8E8]">
                      {isListening
                        ? 'Listening to You...'
                        : loading
                        ? 'Jass is Thinking...'
                        : isPlayingAudio
                        ? 'Jass is Speaking...'
                        : 'Grok Voice 3.0 AI Representative'}
                    </span>
                  </div>
                  {isPlayingAudio && (
                    <button
                      onClick={stopAllAudio}
                      className="text-[11px] font-bold text-rose-300 hover:text-white bg-rose-500/20 border border-rose-500/40 px-2 py-0.5 rounded-md cursor-pointer"
                    >
                      ⏹ Stop Audio
                    </button>
                  )}
                </div>

                <p className="text-slate-200 text-xs leading-relaxed mb-3 line-clamp-3 text-left bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  {messages[messages.length - 1]?.content}
                </p>

                <button
                  onClick={toggleListening}
                  className={`w-full py-3 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse shadow-red-500/30'
                      : 'bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white hover:opacity-95 shadow-cyan-500/25'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 10v2a7 7 0 01-14 0v-2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19v4M8 23h8" />
                  </svg>
                  {isListening ? 'Tap When Done Speaking' : '🎙️ Tap & Speak to Jass Live'}
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center w-full gap-3 my-1">
                <div className="flex-1 h-px bg-slate-800"></div>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Or Call Our Miami Office</span>
                <div className="flex-1 h-px bg-slate-800"></div>
              </div>

              {/* Direct Office Phone Call */}
              <div className="w-full">
                <a
                  href={`tel:${officeNumber.replace(/-/g, '')}`}
                  onClick={stopAllAudio}
                  className="w-full block bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 px-5 py-3 rounded-xl font-extrabold text-sm shadow-lg shadow-emerald-500/25 hover:scale-[1.02] transition-all"
                >
                  📞 Call Office Directly: (786) 643-2099
                </a>
                <p className="text-slate-400 text-[11px] mt-1.5">Speak directly with Jasmel · Mon–Fri 9AM–6PM EST</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
