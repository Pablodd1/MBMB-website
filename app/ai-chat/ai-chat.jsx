"use client";
import React, { useState, useRef, useEffect } from 'react';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I am MBMB AI Assistant. How can I help you with medical billing today? Feel free to ask any questions - if we can't respond properly, we will call you at (786) 643-2099!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const [sessionId, setSessionId] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [hasGreeted, setHasGreeted] = useState(false);
  const speechRef = useRef(null);

  useEffect(() => {
    let storedSession = localStorage.getItem('mbmb_chat_session');
    if (!storedSession) {
      storedSession = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('mbmb_chat_session', storedSession);
    }
    setSessionId(storedSession);
    
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto voice greeting after 3 seconds
  useEffect(() => {
    const greetTimer = setTimeout(() => {
      if (!hasGreeted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const greeting = "Hey there! How may I assist you today? I'm the AI virtual desk assistant for Medical Billing Miami Beach. I can answer all your questions about our services. If I can't help you, don't worry - the owner himself will give you a call back!";
        speakText(greeting);
        setHasGreeted(true);
      }
    }, 3000);

    return () => clearTimeout(greetTimer);
  }, [hasGreeted]);

  const speakText = (text) => {
    if (!isSpeaking || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Try to get a good English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) ||
                           voices.find(v => v.lang.startsWith('en-US')) ||
                           voices.find(v => v.lang.startsWith('en'));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.onend = () => setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Load voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleVoice = () => {
    const newState = !isSpeaking;
    setIsSpeaking(newState);
    if (!newState) {
      window.speechSynthesis?.cancel();
    }
  };

  const saveConversation = async (msgs) => {
    try {
      await fetch('/my-api/chatbot-conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          sessionId, 
          messages: msgs,
          userInfo: {
            firstVisit: localStorage.getItem('mbmb_chat_first_visit') || new Date().toISOString()
          }
        })
      });
      if (!localStorage.getItem('mbmb_chat_first_visit')) {
        localStorage.setItem('mbmb_chat_first_visit', new Date().toISOString());
      }
    } catch (e) {
      console.error('Error saving conversation:', e);
    }
  };

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next })
      });
      const data = await res.json();
      let botResponse = data?.text || 'I am currently unavailable. Please try again later.';
      botResponse = botResponse.replace(/\*\*\*/g, '').replace(/\*/g, '').trim();
      const botMsg = { role: 'assistant', content: botResponse };
      const updatedMessages = [...next, botMsg];
      setMessages(updatedMessages);
      saveConversation(updatedMessages);
      // Speak the bot response
      speakText(botResponse);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating AI Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 md:bottom-6 right-20 z-50 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Open AI Assistant"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30" style={{background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'}}>
          
          {/* Header */}
          <div className="p-4 border-b border-cyan-500/20" style={{background: 'linear-gradient(90deg, rgba(6,182,212,0.15) 0%, rgba(59,130,246,0.15) 100%)'}}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Ask anything.</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <span className="text-green-400 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Voice Toggle */}
                <button onClick={toggleVoice} className="text-gray-400 hover:text-white transition-colors" title={isSpeaking ? 'Mute voice' : 'Enable voice'}>
                  {isSpeaking ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  )}
                </button>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 overflow-y-auto" style={{height: '320px'}}>
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

          {/* Input */}
          <div className="p-3 border-t border-cyan-500/20" style={{background: 'rgba(15,23,42,0.9)'}}>
            <div className="flex gap-2">
              <input
                className="flex-1 bg-gray-800/60 border border-gray-700/50 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 placeholder-gray-500 transition-all"
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
              />
              <button 
                onClick={send} 
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-gray-600 mt-2 px-1">For general info only. Not medical/legal advice.</p>
          </div>
        </div>
      )}
    </>
  );
}
