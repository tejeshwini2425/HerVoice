/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, ShieldCheck, CheckCircle2, Sparkles, Mic, Volume2 } from 'lucide-react';
import { CONFIDENCE_SCENARIOS } from '../constants';
import { UserStats } from '../types';

interface ConfidenceGymProps {
  stats: UserStats;
  onUpdateStats: (impact: Partial<UserStats>) => void;
}

export default function ConfidenceGym({ stats, onUpdateStats }: ConfidenceGymProps) {
  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const scenario = CONFIDENCE_SCENARIOS[index];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStats({ confidence: 15, voice: 10 });
    setIsSubmitted(true);
    setFeedback("Confident ✅ Strong Tone Detect.");
    setTimeout(() => {
      if (index < CONFIDENCE_SCENARIOS.length - 1) {
        setIndex(index + 1);
        setResponse('');
        setIsSubmitted(false);
        setFeedback(null);
      }
    }, 3000);
  };

  const simulateMic = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setResponse("I appreciate your input, but I wasn't finished sharing my perspective. Let's return to the point I was making.");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-left mb-16 border-b border-pink-soft/10 pb-8 flex justify-between items-end">
        <div>
          <h2 className="text-7xl font-display italic font-black text-white mb-4 tracking-tighter">UNMUTE.</h2>
          <p className="text-pink-soft/40 font-black uppercase text-[10px] tracking-[0.4em]">
            Boundary Builder Gym / Build Your Voice
          </p>
        </div>
        <div className="text-right hidden md:block">
          <div className="text-[10px] uppercase font-black opacity-40 tracking-widest">Voice Power</div>
          <div className="text-3xl font-black text-pink-soft italic">{stats.voice}xp</div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <div className="bg-white/5 backdrop-blur-md rounded-[3.5rem] border border-pink-soft/10 overflow-hidden shadow-3xl">
            <div className="bg-pink-soft p-8 flex items-center justify-between text-burgundy">
              <div className="flex items-center gap-4">
                <ShieldCheck size={24} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scenario {index + 1} / {CONFIDENCE_SCENARIOS.length}</span>
              </div>
              <div className="flex gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-burgundy" />
                 <div className="w-1.5 h-1.5 rounded-full bg-burgundy opacity-20" />
                 <div className="w-1.5 h-1.5 rounded-full bg-burgundy opacity-20" />
              </div>
            </div>

            <div className="p-12 md:p-20">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="scenario"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-16"
                  >
                    <div className="space-y-8">
                      <div className="text-[10px] font-black text-pink-soft/40 uppercase tracking-widest">The Context</div>
                      <p className="text-4xl italic font-display font-medium text-white leading-tight">
                        "{scenario.context}"
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10">
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                           <label className="text-[10px] font-black text-pink-soft/40 uppercase tracking-widest">
                            {scenario.prompt}
                          </label>
                          <button 
                            type="button"
                            onClick={simulateMic}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border border-pink-soft/10 text-[9px] font-black uppercase tracking-widest transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/5 text-pink-soft/60 hover:bg-pink-soft/10'}`}
                          >
                            <Mic size={12} /> {isListening ? 'Listening...' : 'Voice Input'}
                          </button>
                        </div>
                        <textarea 
                          value={response}
                          onChange={(e) => setResponse(e.target.value)}
                          placeholder="Your defiant response..."
                          className="w-full min-h-[200px] p-10 bg-pink-soft/5 border-2 border-pink-soft/10 rounded-[2rem] focus:border-pink-soft/30 focus:ring-8 focus:ring-pink-soft/5 transition-all text-2xl font-light italic resize-none outline-none text-white border-dashed"
                        />
                      </div>

                      <button 
                        type="submit"
                        disabled={!response.trim()}
                        className="w-full py-8 px-8 bg-pink-soft text-burgundy rounded-[2rem] font-black uppercase text-xs tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-white transition-all disabled:opacity-30 shadow-3xl shadow-black/60"
                      >
                        <Send size={20} /> Release Your Voice
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-24"
                  >
                    <div className="w-32 h-32 bg-pink-soft text-burgundy rounded-full flex items-center justify-center mx-auto mb-12 shadow-[0_0_80px_rgba(255,209,220,0.4)]">
                      <CheckCircle2 size={64} />
                    </div>
                    <h3 className="text-6xl font-display italic font-black text-white mb-6 tracking-tighter">VOICE STRENGTHENED.</h3>
                    {feedback && (
                      <div className="inline-block px-6 py-2 bg-pink-soft/10 text-pink-soft rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                        {feedback}
                      </div>
                    )}
                    <p className="text-pink-soft/40 font-black uppercase text-xs tracking-widest mt-4">Power Gain +25pts</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-pink-soft p-10 rounded-[3rem] text-burgundy shadow-3xl">
            <div className="text-7xl font-black font-display italic mb-2 tracking-tighter">08</div>
            <div className="text-[10px] uppercase tracking-widest font-black opacity-60">Barriers Broken</div>
          </div>
          
          <div className="bg-white/5 p-8 border border-pink-soft/10 rounded-[3rem] text-pink-soft backdrop-blur-xl">
             <div className="flex items-center gap-3 mb-8">
                <Volume2 className="text-gold-glow" size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Pro Tip</span>
             </div>
             <p className="text-sm font-medium leading-relaxed italic text-white/80">"Tone is a tool. Practice lowering your pitch slightly to project authority without volume."</p>
          </div>

          <div className="bg-burgundy-dark p-10 border border-gold-glow/20 rounded-[3rem] text-gold-glow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles size={80} />
            </div>
            <div className="relative z-10">
              <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-8">Next Level</div>
              <div className="h-1 bg-gold-glow/10 rounded-full overflow-hidden mb-6">
                <div className="h-full bg-gold-glow w-1/3" />
              </div>
              <p className="text-[10px] font-bold opacity-80 leading-relaxed uppercase tracking-widest">Reach 100xp to unlock "The Invisible Negotiator"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
