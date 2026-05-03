'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function UnifiedReceptionist() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hey there! I'm Sofia, your MBMB receptionist. I can chat or talk — whatever you prefer. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [language, setLanguage] = useState('en');
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
      recognitionRef.current.lang = language === 'ht' ? 'ht-HT' : language === 'es' ? 'es-ES' : 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        // Auto-send after speech
        setTimeout(() => {
          sendMessage(transcript);
        }, 300);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
    return () => recognitionRef.current?.abort();
  }, [language]);

  // Speak text using Google Cloud TTS - FRIENDLIER voice
  const speakText = async (text) => {
    if (!isSpeaking) return;
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }

    try {
      const cleanText = text.replace(/\*\*\*/g, '').replace(/\*/g, '').trim();
      if (!cleanText) return;

      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText, language })
      });

      if (!res.ok) return;
      const data = await res.json();
      const audioBlob = base64ToBlob(data.audioContent, 'audio/mpeg');
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      currentAudioRef.current = audio;
      audio.onended = () => { URL.revokeObjectURL(audioUrl); currentAudioRef.current = null; };
      await audio.play();
    } catch (err) {
      console.error('TTS error:', err);
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
    if (newOpen && !hasGreeted) {
      setTimeout(() => {
        const greetings = {
          en: "Hi there! I'm Sofia, your MBMB virtual receptionist. I can answer questions about our billing services, pricing, or help you book a free consultation. Type or speak — whatever feels easier!",
          es: "¡Hola! Soy Sofia, tu recepcionista virtual de MBMB. Puedo responder preguntas sobre nuestros servicios de facturación, precios, o ayudarte a reservar una consulta gratuita. ¡Escribe o habla — lo que te resulte más fácil!",
          ht: "Bonjou! Mwen se Sofia, resepsyonis virtual ou pou MBMB. Mwen ka reponn kesyon sou sèvis faktirasyon nou yo, pri, oswa ede ou rezève yon konsiltasyon gratis. Tape oswa pale — sa ki pi fasil pou ou!"
        };
        speakText(greetings[language] || greetings.en);
        setHasGreeted(true);
      }, 600);
    }
  };

  const toggleVoice = () => {
    const newState = !isSpeaking;
    setIsSpeaking(newState);
    if (!newState && currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported. Try Chrome or Edge.');
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
      let botResponse = data?.text || 'Sorry, I am having trouble connecting. Please call us at (786) 643-2099!';
      botResponse = botResponse.replace(/\*\*\*/g, '').replace(/\*/g, '').trim();
      const botMsg = { role: 'assistant', content: botResponse };
      const updated = [...next, botMsg];
      setMessages(updated);
      speakText(botResponse);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection issue. Please call (786) 643-2099 for immediate help.' }]);
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

  return (
    <>
      {/* LEFT-SIDE Floating Widget Button */}
      <button
        onClick={toggleWidget}
        className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-110 flex items-center gap-2 group"
        aria-label="Open MBMB Receptionist"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span className="text-sm font-semibold hidden group-hover:inline-block whitespace-nowrap">Ask Sofia</span>
      </button>

      {/* WIDGET PANEL - LEFT SIDE */}
      {isOpen && (
        <div className="fixed bottom-20 left-6 z-50 w-[380px] max-w-[calc(100vw-48px)] rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30" style={{background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'}}>
          
          {/* Header */}
          <div className="p-4 border-b border-cyan-500/20" style={{background: 'linear-gradient(90deg, rgba(6,182,212,0.15) 0%, rgba(59,130,246,0.15) 100%)'}}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Sofia — MBMB Receptionist</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <span className="text-green-400 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={toggleWidget} className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mode Tabs */}
            <div className="flex gap-2 mt-3">
              <button 
                onClick={() => setActiveMode('chat')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${activeMode === 'chat' ? 'bg-cyan-500 text-white' : 'bg-gray-700/50 text-gray-400 hover:text-white'}`}
              >
                💬 Text Chat
              </button>
              <a 
                href={`tel:${officeNumber.replace(/-/g, '')}`}
                onClick={() => setActiveMode('call')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all text-center ${activeMode === 'call' ? 'bg-green-500 text-white' : 'bg-gray-700/50 text-gray-400 hover:text-white'}`}
              >
                📞 Call Now
              </a>
            </div>
          </div>

          {/* Chat Area */}
          {activeMode === 'chat' && (
            <>
              <div className="p-4 overflow-y-auto" style={{height: '280px'}}>
                {messages.map((m, idx) => (
                  <div key={idx} className={`mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                      m.role === 'assistant' 
                        ? 'bg-gray-800/80 text-gray-100 rounded-bl-none border border-gray-700/50' 
                        : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none'
                    }`}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start mb-3">
                    <div className="bg-gray-800/80 border border-gray-700/50 px-4 py-3 rounded-2xl rounded-bl-none">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Controls */}
              <div className="px-4 py-2 border-t border-gray-700/50 flex items-center justify-between">
                <div className="flex items-center gap-1 bg-gray-800/50 rounded-lg p-1">
                  <button onClick={() => setLanguage('en')} className={`text-xs px-2 py-1 rounded ${language === 'en' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:text-white'}`}>EN</button>
                  <button onClick={() => setLanguage('es')} className={`text-xs px-2 py-1 rounded ${language === 'es' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:text-white'}`}>ES</button>
                  <button onClick={() => setLanguage('ht')} className={`text-xs px-2 py-1 rounded ${language === 'ht' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:text-white'}`}>HT</button>
                </div>
                <button onClick={toggleVoice} className="text-gray-400 hover:text-white transition-colors" title={isSpeaking ? 'Mute voice' : 'Enable voice'}>
                  {isSpeaking ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Input */}
              <div className="p-3 border-t border-cyan-500/20" style={{background: 'rgba(15,23,42,0.9)'}}>
                <div className="flex gap-2">
                  <input
                    className="flex-1 bg-gray-800/60 border border-gray-700/50 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 placeholder-gray-500 transition-all"
                    placeholder={isListening ? "I'm listening..." : "Type or tap mic to speak..."}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                  />
                  <button 
                    onClick={toggleListening}
                    className={`px-3 py-3 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-700/60 text-gray-400 hover:text-white'}`}
                    title={isListening ? "Stop listening" : "Speak your message"}
                  >
                    {isListening ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 10v2a7 7 0 01-14 0v-2" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19v4M8 23h8" />
                      </svg>
                    )}
                  </button>
                  <button 
                    onClick={() => sendMessage()} 
                    disabled={loading || !input.trim()}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
                <p className="text-[10px] text-gray-600 mt-2">For general info. Call (786) 643-2099 for appointments.</p>
              </div>
            </>
          )}

          {/* Call Mode */}
          {activeMode === 'call' && (
            <div className="p-6 text-center" style={{height: '360px'}}>
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Call MBMB Directly</h3>
              <p className="text-gray-400 text-sm mb-6">Speak to a real person right away</p>
              <a 
                href={`tel:${officeNumber.replace(/-/g, '')}`}
                className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-500/30 transition-all hover:scale-105"
              >
                📞 {officeNumber}
              </a>
              <p className="text-gray-500 text-xs mt-6">Mon-Sat: 4:00 PM - 6:00 PM EST</p>
              <button 
                onClick={() => setActiveMode('chat')}
                className="mt-4 text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
              >
                ← Back to chat
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
