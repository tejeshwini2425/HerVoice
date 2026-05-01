/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Heart, Send, Sparkles, Filter } from 'lucide-react';
import { UnsaidMessage } from '../types';

export default function UnsaidWall() {
  const [messages, setMessages] = useState<UnsaidMessage[]>(() => {
    const saved = localStorage.getItem('her_voice_unsaid');
    return saved ? JSON.parse(saved) : [
      { id: '1', text: "I wish I could say 'No' without feeling like a bad person.", reactions: { heart: 42 }, timestamp: Date.now() },
      { id: '2', text: "I am more than my marital status.", reactions: { heart: 89 }, timestamp: Date.now() - 100000 },
      { id: '3', text: "Today I spoke up in the meeting for the first time. My hands were shaking, but I did it.", reactions: { heart: 156 }, timestamp: Date.now() - 500000 },
    ];
  });

  const [input, setInput] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    localStorage.setItem('her_voice_unsaid', JSON.stringify(messages));
  }, [messages]);

  const postMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: UnsaidMessage = {
      id: Date.now().toString(),
      text: input,
      reactions: { heart: 0 },
      timestamp: Date.now()
    };

    setMessages([newMessage, ...messages]);
    setInput('');
    setIsPosting(false);
  };

  const react = (id: string) => {
    setMessages(messages.map(m => 
      m.id === id ? { ...m, reactions: { ...m.reactions, heart: (m.reactions.heart || 0) + 1 } } : m
    ));
  };

  return (
    <div className="min-h-screen -m-6 md:-m-12 p-6 md:p-24 bg-burgundy-deep text-pink-soft overflow-hidden relative">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-20 bg-pink-soft/10"
            initial={{ x: Math.random() * 100 + "%", y: "-20%" }}
            animate={{ y: "120%", opacity: [0, 0.3, 0] }}
            transition={{ duration: 10 + Math.random() * 15, repeat: Infinity, delay: Math.random() * 5 }}
          />
        ))}
      </div>

      <header className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24 border-b border-pink-soft/10 pb-12">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-pink-soft text-burgundy rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-6">
            <Sparkles size={10} /> Sovereign Space
          </div>
          <h2 className="text-[80px] md:text-[120px] font-display italic font-black mb-8 text-white leading-[0.8] tracking-tighter drop-shadow-2xl">UNSAID.</h2>
          <p className="text-pink-soft/60 text-[10px] uppercase font-black tracking-[0.4em] leading-loose">
            Anonymous Expression / Collective Healing / Release
          </p>
        </div>

        <button 
          onClick={() => setIsPosting(true)}
          className="group relative px-14 py-6 bg-pink-soft text-burgundy rounded-full font-black uppercase text-[10px] tracking-widest shadow-2xl transition-all hover:bg-white hover:scale-105 flex items-center gap-4"
        >
          <MessageSquare size={18} /> Share Your Truth
        </button>
      </header>

      {/* Floating Bubbles */}
      <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-2xl border border-pink-soft/10 p-12 rounded-[2.5rem] group transition-all relative overflow-hidden"
            >
              <div className="relative z-10 min-h-[160px] flex flex-col justify-between">
                <p className="text-2xl md:text-3xl font-display italic font-bold leading-tight text-white/90 tracking-tight">
                  "{msg.text}"
                </p>
                
                <div className="mt-16 flex items-center justify-between">
                  <span className="text-[9px] uppercase font-black opacity-30 tracking-[0.3em] italic">
                    {new Date(msg.timestamp).toLocaleDateString()}
                  </span>
                  
                  <button 
                    onClick={() => react(msg.id)}
                    className="flex items-center gap-3 px-5 py-2.5 bg-pink-soft/5 border border-pink-soft/10 rounded-full hover:bg-pink-soft hover:text-burgundy transition-all"
                  >
                    <Heart size={14} className={msg.reactions.heart > 0 ? 'fill-current' : ''} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{msg.reactions.heart}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Post Modal */}
      <AnimatePresence>
        {isPosting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsPosting(false)}
              className="absolute inset-0 bg-burgundy-deep/95 backdrop-blur-3xl" 
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-2xl bg-white p-12 md:p-20 rounded-[3.5rem] text-burgundy shadow-3xl"
            >
              <div className="mb-12">
                <h3 className="text-5xl font-display italic font-black mb-4 tracking-tighter">SPEAK.</h3>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Your voice will be carried anonymously</p>
              </div>
              
              <form onSubmit={postMessage} className="space-y-10">
                <textarea 
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="I wish I could say..."
                  className="w-full min-h-[240px] p-10 bg-pink-soft/5 border-2 border-burgundy border-dashed rounded-[2rem] text-2xl font-display italic font-medium focus:bg-pink-soft/10 outline-none transition-all resize-none text-burgundy"
                />
                <button 
                  type="submit"
                  disabled={!input.trim()}
                  className="w-full py-6 bg-burgundy text-white rounded-full font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-black transition-all disabled:opacity-30 shadow-2xl shadow-burgundy/20"
                >
                  <Send size={20} /> Release Your Truth
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-burgundy/20 rounded-full blur-[120px] -z-10" />
    </div>
  );
}
