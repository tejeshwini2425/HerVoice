/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Info, AlertTriangle, Briefcase, Clock, Shield, TrendingUp } from 'lucide-react';

export default function RealityReveal() {
  const [view, setView] = useState<'female' | 'male'>('female');

  const stats = {
    female: [
      { label: 'Unpaid Labor', value: '4.5 hrs/day', icon: Clock, color: 'text-pink-soft' },
      { label: 'Workforce Gap', value: '27%', icon: Briefcase, color: 'text-pink-soft' },
      { label: 'Safety Index', value: '42/100', icon: Shield, color: 'text-pink-soft' },
      { label: 'Leadership', value: '8.2%', icon: TrendingUp, color: 'text-pink-soft' },
    ],
    male: [
      { label: 'Unpaid Labor', value: '1.2 hrs/day', icon: Clock, color: 'text-blue-400' },
      { label: 'Workforce Gap', value: '2%', icon: Briefcase, color: 'text-blue-400' },
      { label: 'Safety Index', value: '92/100', icon: Shield, color: 'text-blue-400' },
      { label: 'Leadership', value: '91.8%', icon: TrendingUp, color: 'text-blue-400' },
    ]
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 border-b border-pink-soft/10 pb-12">
        <div className="max-w-md">
          <h2 className="text-6xl font-display italic font-black text-white mb-6 leading-[0.9] tracking-tighter">INVISIBLE <br/>BARRIERS.</h2>
          <p className="text-pink-soft/60 font-medium uppercase text-[10px] tracking-[0.3em] leading-relaxed">
            Data Reveals Truths / Structural Disadvantage
          </p>
        </div>
        
        <div className="flex p-2 bg-pink-soft/5 backdrop-blur-md rounded-2xl border border-pink-soft/10">
          <button 
            onClick={() => setView('female')}
            className={`px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${view === 'female' ? 'bg-pink-soft text-burgundy shadow-lg' : 'text-pink-soft/40 hover:text-pink-soft'}`}
          >
            Female Reality
          </button>
          <button 
            onClick={() => setView('male')}
            className={`px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${view === 'male' ? 'bg-blue-600 text-white shadow-lg' : 'text-pink-soft/40 hover:text-blue-400'}`}
          >
            Male Perspective
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {stats[view].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 bg-white/5 border border-pink-soft/10 rounded-[2rem] group hover:bg-pink-soft/10 transition-all`}
            >
              <div className="flex items-start justify-between mb-12">
                <div className={`p-4 rounded-2xl bg-pink-soft/5 transition-colors group-hover:bg-pink-soft/20`}>
                  <Icon className={`w-10 h-10 ${stat.color}`} />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.34em] opacity-40 italic">0{i + 1}</div>
              </div>
              
              <div className="space-y-4">
                <div className="text-[10px] uppercase tracking-[0.3em] font-black opacity-40">{stat.label}</div>
                <motion.div 
                  key={stat.value}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="text-5xl font-display italic font-black text-white tracking-tighter"
                >
                  {stat.value}
                </motion.div>
              </div>

              {view === 'female' && (
                <div className="mt-8 flex items-center gap-3 p-4 bg-red-950/20 rounded-xl text-[10px] uppercase font-black tracking-widest text-red-500 border border-red-500/20">
                  <AlertTriangle size={14} /> Structural disadvantage detected
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        layout
        className="mt-16 p-12 bg-burgundy rounded-[3rem] text-pink-soft overflow-hidden relative"
      >
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-display font-bold mb-6">The Global Landscape</h3>
            <p className="opacity-70 leading-relaxed font-light mb-8">
              At the current rate of progress, it will take another 132 years to reach full gender parity. 
              The barriers are not just in our heads—they are built into the systems we navigate.
            </p>
            <div className="flex gap-4">
              <div className="px-6 py-3 border border-pink-soft/20 rounded-full text-xs font-bold uppercase tracking-wider">UN Women Data</div>
              <div className="px-6 py-3 border border-pink-soft/20 rounded-full text-xs font-bold uppercase tracking-wider">2024 Report</div>
            </div>
          </div>
          <div className="relative">
            <div className="flex flex-col gap-4">
              {[80, 45, 12].map((w, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-2 bg-pink-soft/10 rounded-full w-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${w}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gold-glow"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-glow/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
      </motion.div>
    </div>
  );
}
