"use client";
import React, { useState, useEffect } from 'react';

// Lightweight AI chat widget for MBMB – frontend only (no PHI exposure in UI)
// This component communicates with /api/ai-chat on the server.

export default function AIChat() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! I am MBMB assistant. I can answer questions about Medical Billing Miami Beach. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

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
      const botMsg = { role: 'bot', content: data?.text || 'I am currently unavailable. Please try again later.' };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'bot', content: 'Error contacting assistant. Please try again.' }]);
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
    <div className="ai-chat fixed bottom-6 right-6 z-40 w-96 max-w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200" aria-label="MBMB AI Assistant">
      <div className="p-3 bg-gray-800 text-white flex items-center justify-between">
        <span className="font-semibold">MBMB Assistant</span>
        <span className="text-sm opacity-70">Miami Health Desk</span>
      </div>
      <div className="p-3 h-64 overflow-y-auto" style={{maxHeight: '280px'}}>
        {messages.map((m, idx) => (
          <div key={idx} className={m.role === 'bot' ? 'mb-2 text-sm' : 'text-right mb-2 text-sm'}>
            <span className={`inline-block ${m.role==='bot' ? 'bg-gray-100 text-gray-800' : 'bg-pink-100 text-gray-800'} p-2 rounded`}>
              {m.content}
            </span>
          </div>
        ))}
        {loading && <div className="text-xs text-gray-500 mt-2">Typing...</div>}
      </div>
      <div className="p-3 border-t border-gray-200 flex flex-col">
        <p className="text-xs text-gray-600 mb-2">This assistant is for general information only. It is not medical or legal advice. For official guidance, consult a licensed professional. Data handling complies with applicable privacy laws.</p>
        <div className="flex items-center mb-2">
        <input
          className="flex-1 border rounded px-3 py-2 mr-2" placeholder="Ask MBMB..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKey}
        />
        <button className="bg-pink-500 text-white px-4 py-2 rounded" onClick={send} aria-label="Send">Send</button>
        </div>
      </div>
    </div>
  );
}
