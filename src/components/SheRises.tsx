import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Search, 
  Filter, 
  ArrowLeft, 
  MapPin, 
  BookOpen, 
  Lightbulb, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { Section, HistoricalFigure } from '../types';
import { HISTORICAL_FIGURES, BARRIER_BREAKERS } from '../constants';

interface SheRisesProps {
  onNavigate: (section: Section) => void;
}

export default function SheRises({ onNavigate }: SheRisesProps) {
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(null);
  const [activeRegion, setActiveRegion] = useState<string | 'All'>('All');
  const [activeField, setActiveField] = useState<string | 'All'>('All');

  const filteredFigures = HISTORICAL_FIGURES.filter(f => {
    const regionMatch = activeRegion === 'All' || f.region === activeRegion;
    const fieldMatch = activeField === 'All' || f.field === activeField;
    return regionMatch && fieldMatch;
  });

  const regions = ['All', 'Asia', 'Europe', 'Africa', 'Americas'];
  const fields = ['All', 'Science', 'Business', 'Aviation', 'Activism', 'Education'];

  return (
    <div className="space-y-16 pb-32">
      {/* 🌌 ENTRY ANIMATION / BANNER */}
      <header className="relative py-20 text-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-pink-soft/10 border border-pink-soft/20 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-8 text-pink-soft">
            <Globe size={14} /> Global Impact
          </div>
          <h2 className="text-7xl md:text-8xl font-display italic font-black text-white leading-tight tracking-tighter mb-6">SHE RISES.</h2>
          <p className="text-pink-soft/60 text-xl italic font-medium max-w-2xl mx-auto">"Across the world, women are rising."</p>
        </motion.div>
        
        {/* Animated Particles/Glowing Dots for Map Feel */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute w-1.5 h-1.5 bg-gold-glow rounded-full blur-[2px]"
               animate={{ 
                 opacity: [0.1, 0.4, 0.1],
                 scale: [1, 1.5, 1],
               }}
               transition={{ 
                 duration: 3 + Math.random() * 4, 
                 repeat: Infinity,
                 delay: i * 0.5
               }}
               style={{ 
                 top: `${Math.random() * 100}%`, 
                 left: `${Math.random() * 100}%` 
               }}
             />
          ))}
        </div>
      </header>

      {/* 🔥 7. BREAKING BARRIERS STRIP */}
      <div className="bg-burgundy-dark/50 border-y border-pink-soft/10 py-6 overflow-hidden flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 items-center px-10"
        >
          {BARRIER_BREAKERS.map((text, i) => (
            <div key={i} className="flex items-center gap-6">
              <Sparkles className="text-gold-glow" size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-soft/60">{text}</span>
            </div>
          ))}
          {BARRIER_BREAKERS.map((text, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-6">
              <Sparkles className="text-gold-glow" size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-soft/60">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 🧭 FILTER SYSTEM */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-4">
        <div className="flex flex-wrap justify-center gap-3">
          {regions.map(r => (
            <button 
              key={r}
              onClick={() => setActiveRegion(r)}
              className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${activeRegion === r ? 'bg-pink-soft text-burgundy shadow-xl' : 'bg-white/5 text-pink-soft/40 hover:bg-white/10'}`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {fields.map(f => (
            <button 
              key={f}
              onClick={() => setActiveField(f)}
              className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${activeField === f ? 'bg-gold-glow text-burgundy shadow-xl' : 'bg-white/5 text-pink-soft/40 hover:bg-white/10'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 👩💼 ACHIEVEMENT CARDS / GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        <AnimatePresence mode="popLayout">
          {filteredFigures.map((figure, i) => (
             <motion.div
               layout
               key={figure.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95 }}
               transition={{ delay: i * 0.1 }}
               onClick={() => setSelectedFigure(figure)}
               className="group relative bg-white/5 border border-pink-soft/10 rounded-[3rem] p-10 flex flex-col justify-between hover:bg-white/10 transition-all cursor-pointer overflow-hidden min-h-[400px]"
             >
                <div className="absolute top-0 right-0 p-8 text-pink-soft/10 group-hover:text-gold-glow/20 transition-colors">
                  <Globe size={120} />
                </div>
                
                <div className="relative z-10">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-pink-soft/10 flex items-center justify-center text-pink-soft">
                        <MapPin size={14} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{figure.country}</span>
                   </div>
                   <h3 className="text-4xl font-display italic font-black text-white leading-tight mb-2">{figure.name}</h3>
                   <div className="inline-block px-3 py-1 bg-gold-glow/10 border border-gold-glow/20 rounded-full text-[8px] font-black uppercase tracking-widest text-gold-glow mb-8">
                     {figure.field}
                   </div>
                </div>

                <div className="relative z-10 flex justify-between items-end">
                   <div className="flex items-center gap-2 text-pink-soft group-hover:gap-4 transition-all">
                      <span className="text-[10px] font-black uppercase tracking-widest group-hover:opacity-100 transition-opacity">Explore Story</span>
                      <ChevronRight size={16} />
                   </div>
                   <div className="text-[80px] font-black font-display italic opacity-[0.03] absolute -bottom-8 -right-4 pointer-events-none group-hover:opacity-10 transition-opacity">
                      {figure.field.slice(0, 1)}
                   </div>
                </div>
             </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* 📖 STORY VIEW (FULL SCREEN) */}
      <AnimatePresence>
        {selectedFigure && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] bg-burgundy-deep overflow-y-auto"
          >
             <div className="max-w-6xl mx-auto min-h-screen p-8 md:p-20 relative">
                <button 
                  onClick={() => setSelectedFigure(null)}
                  className="mb-12 flex items-center gap-3 text-pink-soft/40 hover:text-pink-soft transition-colors text-[10px] font-black uppercase tracking-widest"
                >
                  <ArrowLeft size={16} /> Back to Impact
                </button>

                <div className="grid md:grid-cols-2 gap-16 md:gap-32">
                   <div className="space-y-12">
                      <div>
                        <div className="text-sm font-black uppercase tracking-[0.4em] text-pink-soft/40 mb-4">{selectedFigure.field} Pioneer</div>
                        <h2 className="text-7xl md:text-8xl font-display italic font-black text-white leading-none tracking-tighter mb-8">{selectedFigure.name}</h2>
                        <div className="flex items-center gap-4 text-pink-soft/60">
                           <MapPin size={18} />
                           <span className="text-xl italic font-medium">{selectedFigure.country}</span>
                        </div>
                      </div>

                      <div className="p-8 border-l-4 border-gold-glow bg-gold-glow/5 italic text-2xl md:text-3xl font-medium text-white leading-relaxed">
                        "{selectedFigure.quote}"
                      </div>

                      <div className="space-y-8">
                         <div className="space-y-4">
                            <h4 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-pink-soft/40">
                               <Sparkles size={14} /> Early Life
                            </h4>
                            <p className="text-lg text-pink-soft/80 leading-relaxed font-medium">{selectedFigure.earlyLife}</p>
                         </div>
                         
                         <div className="space-y-4">
                            <h4 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-pink-soft/40">
                               <Zap size={14} /> The Challenges
                            </h4>
                            <div className="space-y-3">
                               {selectedFigure.challenges.map((c, i) => (
                                 <div key={i} className="flex gap-4 items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-burgundy-light mt-2 shrink-0" />
                                    <p className="text-base text-pink-soft/80 font-medium">{c}</p>
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-12">
                      <div className="bg-white/5 border border-pink-soft/10 rounded-[3rem] p-10 md:p-16 space-y-12">
                         <div className="space-y-6">
                            <h4 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-gold-glow">
                               <BookOpen size={14} /> Key Achievements
                            </h4>
                            <div className="space-y-6">
                               {selectedFigure.achievements.map((a, i) => (
                                 <motion.div 
                                   key={i}
                                   initial={{ x: 20, opacity: 0 }}
                                   animate={{ x: 0, opacity: 1 }}
                                   transition={{ delay: 0.3 + i * 0.1 }}
                                   className="p-6 bg-burgundy border border-gold-glow/20 rounded-2xl"
                                  >
                                    <p className="text-white font-bold italic">{a}</p>
                                 </motion.div>
                               ))}
                            </div>
                         </div>

                         <div className="space-y-6">
                            <h4 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-pink-soft/40">
                               <Lightbulb size={14} /> Mindset & Lessons
                            </h4>
                            <div className="flex flex-wrap gap-3 mb-6">
                               {selectedFigure.skills.map(skill => (
                                 <span key={skill} className="px-4 py-2 bg-pink-soft/10 text-pink-soft text-[10px] font-black uppercase tracking-widest rounded-full">
                                   {skill}
                                 </span>
                               ))}
                            </div>
                            <p className="text-pink-soft italic opacity-60 leading-relaxed font-bold">"{selectedFigure.mindset}"</p>
                         </div>
                      </div>

                      {/* 💡 5. “FOLLOW THIS PATH” Integration */}
                      <div className="space-y-4">
                         <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-center opacity-30">This could be you.</h4>
                         <div className="flex flex-col gap-4">
                            <button 
                              onClick={() => { setSelectedFigure(null); onNavigate('path'); }}
                              className="w-full py-6 bg-pink-soft text-burgundy rounded-full font-black uppercase text-[10px] tracking-widest shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                            >
                              I want a life like this <ExternalLink size={14} />
                            </button>
                            <div className="grid grid-cols-2 gap-4">
                               <button 
                                 onClick={() => { setSelectedFigure(null); onNavigate('gym'); }}
                                 className="py-4 border border-pink-soft/20 text-pink-soft rounded-full font-black uppercase text-[8px] tracking-widest hover:border-pink-soft transition-all"
                               >
                                 Practice Her Confidence
                               </button>
                               <button 
                                 onClick={() => { setSelectedFigure(null); onNavigate('choices'); }}
                                 className="py-4 border border-pink-soft/20 text-pink-soft rounded-full font-black uppercase text-[8px] tracking-widest hover:border-pink-soft transition-all"
                               >
                                 Try Her Choices
                               </button>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
