import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Wind, 
  Maximize2, 
  Plus, 
  ArrowRight,
  Heart,
  Moon,
  CheckCircle2,
  X
} from 'lucide-react';
import { UserStats } from '../types';

interface InnerSpaceProps {
  stats: UserStats;
  onUpdateStats: (delta: Partial<UserStats>) => void;
}

export default function InnerSpace({ stats, onUpdateStats }: InnerSpaceProps) {
  const [activeMode, setActiveMode] = useState<'hub' | 'mirror' | 'builder' | 'reset'>('hub');
  const [affirmationIAm, setAffirmationIAm] = useState('');
  const [affirmationIDeserve, setAffirmationIDeserve] = useState('');
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathText, setBreathText] = useState('Inhale');

  // 30-Second Reset logic
  useEffect(() => {
    let interval: any;
    if (isBreathing) {
      let step = 0;
      interval = setInterval(() => {
        step = (step + 1) % 2;
        setBreathText(step === 0 ? 'Inhale' : 'Exhale');
      }, 4000);
      
      const timeout = setTimeout(() => {
        setIsBreathing(false);
        setActiveMode('hub');
        onUpdateStats({ confidence: 5 });
      }, 30000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isBreathing]);

  const saveAffirmation = () => {
    if (affirmationIAm && affirmationIDeserve) {
      const newAff = { iAm: affirmationIAm, iDeserve: affirmationIDeserve };
      onUpdateStats({ 
        customAffirmations: [...(stats.customAffirmations || []), newAff],
        voice: 5
      });
      setAffirmationIAm('');
      setAffirmationIDeserve('');
      setActiveMode('hub');
    }
  };

  if (activeMode === 'mirror') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[200] bg-burgundy-deep flex flex-col items-center justify-center p-8 text-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-pink-soft/5 to-transparent pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="space-y-12 max-w-2xl"
        >
          <h2 className="text-6xl md:text-8xl font-display italic font-black text-white tracking-tighter filter blur-[0.5px]">YOU DESERVE RESPECT.</h2>
          <motion.p 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-xl font-medium text-pink-soft/60 italic"
          >
            Say it again... out loud.
          </motion.p>
        </motion.div>
        <button 
          onClick={() => setActiveMode('hub')}
          className="mt-24 px-12 py-5 border border-pink-soft/20 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-pink-soft hover:text-burgundy transition-all"
        >
          I have spoken my truth
        </button>
      </motion.div>
    );
  }

  if (activeMode === 'reset') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[200] bg-burgundy flex flex-col items-center justify-center p-8"
      >
        <div className="text-center mb-24">
          <h3 className="text-3xl font-display italic font-black text-white mb-4">RESET YOUR AURA.</h3>
          <p className="text-pink-soft/40 text-[10px] uppercase font-black tracking-widest">30 Seconds / Just Breath</p>
        </div>

        <motion.div 
          animate={{ scale: breathText === 'Inhale' ? [1, 1.5] : [1.5, 1] }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="w-48 h-48 rounded-full border-4 border-pink-soft/20 flex items-center justify-center relative"
        >
          <div className="absolute inset-0 rounded-full bg-pink-soft/10 blur-xl" />
          <span className="text-xl font-black uppercase tracking-widest text-pink-soft">{breathText}</span>
        </motion.div>

        {!isBreathing && (
          <button 
            onClick={() => setIsBreathing(true)}
            className="mt-24 px-12 py-6 bg-pink-soft text-burgundy rounded-full font-black uppercase text-xs tracking-[0.3em]"
          >
            Start Reset
          </button>
        )}
        
        <button onClick={() => setActiveMode('hub')} className="absolute top-12 right-12 text-pink-soft/40 hover:text-pink-soft transition-colors">
          <X size={32} />
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-16">
      <header className="border-b border-pink-soft/10 pb-12">
        <h2 className="text-7xl font-display italic font-black text-white leading-tight tracking-tighter">AURA CARE.</h2>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mt-4">Inner Space / Affirmations / Mental Resilience</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-8">
           <button 
            onClick={() => setActiveMode('mirror')}
            className="w-full bg-burgundy-dark border border-pink-soft/10 p-10 rounded-[3rem] text-left group hover:border-pink-soft transition-all h-64 flex flex-col justify-between"
          >
            <Maximize2 className="text-pink-soft/20 group-hover:text-pink-soft transition-colors" size={32} />
            <div>
              <h3 className="text-3xl font-display italic font-black text-white mb-2">Mirror Mode</h3>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Reflective Empowerment</p>
            </div>
          </button>

          <button 
            onClick={() => setActiveMode('reset')}
            className="w-full bg-pink-soft text-burgundy p-10 rounded-[3rem] text-left group hover:bg-white transition-all h-64 flex flex-col justify-between"
          >
            <Wind className="opacity-40" size={32} />
            <div>
              <h3 className="text-3xl font-display italic font-black mb-2">30s Reset</h3>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Overwhelmed? Pause here.</p>
            </div>
          </button>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white/5 border border-pink-soft/10 p-12 rounded-[4rem] h-full flex flex-col">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-4xl font-display italic font-black text-white">Affirmation Builder</h3>
              <Plus className="opacity-20" size={24} />
            </div>
            
            <div className="space-y-12 flex-1">
              <div className="space-y-6">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40">I am...</label>
                <input 
                  value={affirmationIAm}
                  onChange={(e) => setAffirmationIAm(e.target.value)}
                  placeholder="e.g. Enough / Powerful / Sovereign"
                  className="w-full bg-transparent border-b-2 border-pink-soft/10 focus:border-pink-soft outline-none text-2xl font-display italic font-medium py-4 transition-all"
                />
              </div>
              <div className="space-y-6">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40">I deserve...</label>
                <input 
                  value={affirmationIDeserve}
                  onChange={(e) => setAffirmationIDeserve(e.target.value)}
                  placeholder="e.g. Respect / Freedom / To be heard"
                  className="w-full bg-transparent border-b-2 border-pink-soft/10 focus:border-pink-soft outline-none text-2xl font-display italic font-medium py-4 transition-all"
                />
              </div>
            </div>

            <button 
              onClick={saveAffirmation}
              disabled={!affirmationIAm || !affirmationIDeserve}
              className="mt-12 w-full py-6 bg-gold-glow text-burgundy rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 disabled:opacity-20 transition-all hover:scale-[1.02]"
            >
              Manifest My Truth <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <section className="space-y-8 pt-12">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Your Manifested Truths</h4>
        <div className="grid md:grid-cols-2 gap-6">
          {(stats.customAffirmations || []).map((aff, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-burgundy-deep border border-pink-soft/5 p-8 rounded-[2.5rem] relative overflow-hidden"
            >
               <Heart className="absolute top-4 right-4 text-pink-soft/10" size={40} />
               <p className="text-2xl font-display italic font-black text-white leading-tight">"I am {aff.iAm}, and I deserve {aff.iDeserve}."</p>
            </motion.div>
          ))}
          {(!stats.customAffirmations || stats.customAffirmations.length === 0) && (
            <div className="text-sm font-medium italic opacity-20 py-12 text-center border-2 border-dashed border-pink-soft/5 rounded-[2.5rem]">
              No affirmations manifested yet...
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
