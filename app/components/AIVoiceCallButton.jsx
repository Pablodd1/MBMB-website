'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react';

// MBMB Knowledge Base for AI Voice Assistant
const MBMB_KNOWLEDGE = {
  greeting: [
    "Thank you for calling Medical Billing Miami Beach. I'm your AI assistant. How can I help you today?",
    "Welcome to MBMB. This is the AI front desk. Are you calling about medical billing services?",
    "Hello, you've reached Medical Billing Miami Beach. I'm here to answer your billing questions."
  ],
  services: {
    'medical billing': 'We provide full-cycle medical billing services including claim submission, payment posting, denial management, and accounts receivable follow-up. Our fee is 5.6% to 10% of collected revenue only.',
    'medical coding': 'Our AAPC-certified coders handle ICD-10, CPT, and HCPCS coding with 98% accuracy. We ensure maximum reimbursement and compliance.',
    'credentialing': 'Provider credentialing takes 60 to 120 days. We handle CAQH enrollment, EDI setup, ERA, EFT, and all payer applications.',
    'revenue cycle': 'Our revenue cycle management includes eligibility verification, prior authorizations, claim scrubbing, and aggressive denial appeals.',
    'consultation': 'We offer a free billing audit and consultation. Would you like me to schedule one for you?'
  },
  pricing: 'Our pricing is performance-based: 5.6% to 10% of collected revenue. No setup fees, no monthly retainers. We only get paid when you get paid.',
  specialties: 'We serve all major specialties including family medicine, internal medicine, pediatrics, cardiology, dermatology, orthopedics, OB-GYN, psychiatry, and urgent care.',
  contact: 'You can reach us at 786-643-2099, email Jasmel at medicalbillingmb dot com, or WhatsApp the same number.',
  location: 'We are based in Miami Beach, Florida, serving healthcare providers across Miami-Dade, Broward, and all of South Florida.',
  compliance: 'We are fully HIPAA and HITECH compliant. We sign Business Associate Agreements with all clients and use encrypted data transmission.',
  hours: 'Our office hours are Monday through Saturday, 4 PM to 6 PM Eastern Time.',
  commonQuestions: {
    'how long': 'Credentialing takes 60 to 120 days. Claims are typically paid within 14 to 30 days.',
    'denial rate': 'Our clients see denial rates drop from industry average of 15% down to just 2%.',
    'ehr': 'We integrate with Epic, Cerner, Athenahealth, eClinicalWorks, and most major EHR systems.',
    'florida medicaid': 'Yes, we have extensive experience with Florida Medicaid billing requirements and regulations.',
    'hipaa': 'Absolutely. We are fully HIPAA compliant with encrypted data, secure servers, and BAAs with all clients.',
    'get started': 'Getting started is easy. Schedule a free consultation and we will analyze your billing process. Onboarding takes 1 to 2 weeks.',
    'cost': 'Our fee is 5.6% to 10% of collected revenue. No setup fees, no hidden costs. Performance-based only.'
  }
};

export default function AIVoiceCallButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState([]);
  const [transcript, setTranscript] = useState('');
  const [callActive, setCallActive] = useState(false);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Speech Recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
          let finalTranscript = '';
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }

          if (finalTranscript) {
            handleUserMessage(finalTranscript);
          }
          setTranscript(interimTranscript);
        };

        recognitionRef.current.onerror = (event) => {
          console.log('Speech recognition error:', event.error);
          if (event.error !== 'aborted') {
            setIsListening(false);
          }
        };

        recognitionRef.current.onend = () => {
          if (isListening) {
            recognitionRef.current.start();
          }
        };
      }

      // Speech Synthesis
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speak = useCallback((text) => {
    if (!synthRef.current) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = 'en-US';

    // Try to use a female voice
    const voices = synthRef.current.getVoices();
    const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Victoria'));
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (callActive) {
        startListening();
      }
    };

    synthRef.current.speak(utterance);
  }, [callActive]);

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.log('Recognition already started');
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  // AI Response Logic
  const generateResponse = (userText) => {
    const lowerText = userText.toLowerCase();
    
    // Check for service keywords
    for (const [service, description] of Object.entries(MBMB_KNOWLEDGE.services)) {
      if (lowerText.includes(service)) {
        return description;
      }
    }

    // Check common questions
    for (const [question, answer] of Object.entries(MBMB_KNOWLEDGE.commonQuestions)) {
      if (lowerText.includes(question)) {
        return answer;
      }
    }

    // Check general keywords
    if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('fee')) {
      return MBMB_KNOWLEDGE.pricing;
    }
    if (lowerText.includes('specialty') || lowerText.includes('specialties')) {
      return MBMB_KNOWLEDGE.specialties;
    }
    if (lowerText.includes('contact') || lowerText.includes('phone') || lowerText.includes('email')) {
      return MBMB_KNOWLEDGE.contact;
    }
    if (lowerText.includes('location') || lowerText.includes('where') || lowerText.includes('miami')) {
      return MBMB_KNOWLEDGE.location;
    }
    if (lowerText.includes('hipaa') || lowerText.includes('compliant') || lowerText.includes('secure')) {
      return MBMB_KNOWLEDGE.compliance;
    }
    if (lowerText.includes('hour') || lowerText.includes('time') || lowerText.includes('when')) {
      return MBMB_KNOWLEDGE.hours;
    }
    if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
      return MBMB_KNOWLEDGE.greeting[Math.floor(Math.random() * MBMB_KNOWLEDGE.greeting.length)];
    }
    if (lowerText.includes('bye') || lowerText.includes('goodbye') || lowerText.includes('thank')) {
      return "Thank you for calling Medical Billing Miami Beach. Have a great day!";
    }

    // Default fallback
    return "I'm here to help with your medical billing questions. You can ask about our services, pricing, credentialing, or schedule a free consultation. What would you like to know?";
  };

  const handleUserMessage = (text) => {
    setMessages(prev => [...prev, { type: 'user', text }]);
    
    // Stop listening while AI responds
    stopListening();
    
    // Generate and speak response
    const response = generateResponse(text);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'ai', text: response }]);
      speak(response);
    }, 500);
  };

  const startCall = () => {
    setCallActive(true);
    setIsOpen(true);
    setMessages([]);
    
    // Initial greeting
    const greeting = MBMB_KNOWLEDGE.greeting[0];
    setMessages([{ type: 'ai', text: greeting }]);
    speak(greeting);
  };

  const endCall = () => {
    setCallActive(false);
    stopListening();
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsOpen(false);
    setMessages([]);
  };

  if (!isOpen) {
    return (
      <button
        onClick={startCall}
        className="fixed bottom-24 left-6 z-50 group"
        aria-label="Call AI Assistant"
      >
        <span className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-700 text-white shadow-xl flex items-center justify-center group-hover:shadow-green-500/50 transition-all duration-300 group-hover:scale-110 border-2 border-white/30">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-semibold text-green-600 whitespace-nowrap bg-white/90 px-2 py-0.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          AI Front Desk
        </span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSpeaking ? 'bg-white/20 animate-pulse' : 'bg-white/10'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm">MBMB AI Front Desk</h3>
                <p className="text-xs text-white/70">{isSpeaking ? 'Speaking...' : isListening ? 'Listening...' : 'Ready'}</p>
              </div>
            </div>
            <button
              onClick={endCall}
              className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.type === 'user'
                    ? 'bg-green-600 text-white rounded-br-md'
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          
          {isListening && transcript && (
            <div className="flex justify-end">
              <div className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm bg-green-200 text-green-800 rounded-br-md">
                {transcript}
                <span className="animate-pulse">... </span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Controls */}
        <div className="px-6 py-4 bg-white border-t border-gray-100">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>

            <button
              onClick={() => {
                if (synthRef.current) {
                  synthRef.current.cancel();
                  setIsSpeaking(false);
                }
              }}
              className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors"
              disabled={!isSpeaking}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            </button>
          </div>
          
          <p className="text-center text-xs text-gray-400 mt-3">
            Tap microphone to speak · AI trained on MBMB medical billing
          </p>
        </div>
      </div>
    </div>
  );
}
