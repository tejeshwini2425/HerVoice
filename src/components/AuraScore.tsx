import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserStats, Emotion } from '../types';

interface AuraScoreProps {
  stats: UserStats;
}

const emotionMap: Record<Emotion, { emoji: string; color: string; label: string }> = {
  fear: { emoji: '😨', color: 'text-burgundy-deep', label: 'Fear' },
  confidence: { emoji: '😌', color: 'text-pink-soft', label: 'Confidence' },
  pressure: { emoji: '😓', color: 'text-pink-soft/60', label: 'Pressure' },
  power: { emoji: '🔥', color: 'text-gold-glow', label: 'Power' }
};

export default function AuraScore({ stats }: AuraScoreProps) {
  const total = (stats.confidence + stats.freedom + stats.independence + stats.voice) / 4;
  const currentEmotion = emotionMap[stats.emotion || 'pressure'];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Confidence Ring */}
        <motion.div 
          className="absolute inset-0 rounded-full border-2 border-pink-soft/20"
          animate={{ scale: [1, 1.1, 1], rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-2 rounded-full border-2 border-gold-glow/20"
          animate={{ scale: [1, 1.2, 1], rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-4 rounded-full border-2 border-white/10"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        {/* Core Glow */}
        <div className="relative z-10 text-center">
          <div className="text-[10px] font-black uppercase tracking-tighter opacity-40">Aura</div>
          <div className="text-xl font-display italic font-black text-white">{Math.floor(total)}</div>
        </div>

        {/* Dynamic Glow Bloom */}
        <div 
          className="absolute inset-0 rounded-full blur-2xl opacity-20 pointer-events-none"
          style={{ 
            background: `radial-gradient(circle, var(--color-pink-soft) 0%, transparent 70%)`,
            transform: `scale(${1 + total / 100})`
          }}
        />
      </div>

      {/* Emotion Tracker */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={stats.emotion}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex flex-col items-center"
        >
          <div className="text-xl mb-1">{currentEmotion.emoji}</div>
          <div className={`text-[8px] font-black uppercase tracking-widest ${currentEmotion.color}`}>{currentEmotion.label}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
