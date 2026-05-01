/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="relative min-h-screen bg-burgundy overflow-hidden flex items-center justify-center">
      {/* Background Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-pink-soft/20"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0 
          }}
          animate={{ 
            y: [null, "-20%", "20%"],
            opacity: [0, 0.5, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{ 
            duration: 5 + Math.random() * 10, 
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}

      {/* Decorative Glows */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gold-glow/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-pink-soft/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex justify-center"
        >
          <div className="p-4 bg-white/5 backdrop-blur-sm rounded-full border border-pink-soft/20 ring-4 ring-pink-soft/5">
            <Heart className="w-12 h-12 text-pink-soft" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[80px] md:text-[180px] leading-[0.8] font-display italic font-black text-white mb-8 tracking-tighter drop-shadow-2xl"
        >
          HER <br />
          <span className="text-pink-soft text-glow block md:pl-32">VOICE.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-pink-soft/60 mb-16 max-w-2xl mx-auto font-medium uppercase tracking-[0.2em] leading-relaxed"
        >
          Immersive Journey / Storytelling / Confidence / Awareness
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative inline-flex items-center gap-3 px-16 py-8 bg-pink-soft text-burgundy rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all hover:bg-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-gold-glow/20 translate-y-full group-hover:translate-y-0 transition-transform" />
          <span className="relative flex items-center gap-4">
            Start Your Journey <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex items-center justify-center gap-8 text-pink-soft/40 text-xs uppercase tracking-[0.2em]"
        >
          <span>Storytelling</span>
          <div className="w-1 h-1 bg-pink-soft/40 rounded-full" />
          <span>Confidence</span>
          <div className="w-1 h-1 bg-pink-soft/40 rounded-full" />
          <span>Action</span>
        </motion.div>
      </div>
    </div>
  );
}
