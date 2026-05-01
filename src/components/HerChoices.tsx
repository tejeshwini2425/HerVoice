import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  RefreshCw, 
  Sparkles, 
  ChevronRight, 
  AlertCircle, 
  Info,
  Clock,
  RotateCcw,
  Zap,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import { STORY_NODES } from '../constants';
import { UserStats, Section, Emotion, ChoiceHistory } from '../types';

interface HerChoicesProps {
  stats: UserStats;
  onUpdateStats: (impact: Partial<UserStats>) => void;
  onNavigate: (section: Section) => void;
}

export default function HerChoices({ stats, onUpdateStats, onNavigate }: HerChoicesProps) {
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [showInsight, setShowInsight] = useState(false);

  const currentNode = STORY_NODES.find(n => n.id === currentNodeId) || STORY_NODES[0];
  const isEnd = currentNode.choices.length === 0;

  const handleChoice = (nextNodeId: string, impact: Partial<UserStats>, text: string, emotion?: Emotion) => {
    const historyEntry: ChoiceHistory = {
      nodeId: currentNodeId,
      choiceText: text,
      timestamp: Date.now()
    };

    onUpdateStats({ 
      ...impact, 
      emotion,
      choiceHistory: [...(stats.choiceHistory || []), historyEntry]
    });
    
    setCurrentNodeId(nextNodeId);
    setShowInsight(true);
    setTimeout(() => setShowInsight(false), 4000);
  };

  const rewind = () => {
    if (stats.choiceHistory && stats.choiceHistory.length > 0) {
      const newHistory = [...stats.choiceHistory];
      const last = newHistory.pop();
      if (last) {
        onUpdateStats({ choiceHistory: newHistory });
        setCurrentNodeId(last.nodeId);
      }
    }
  };

  const reset = () => {
    onUpdateStats({ choiceHistory: [], confidence: 20, freedom: 20, independence: 20, voice: 20 });
    setCurrentNodeId('start');
  };

  const getPersonalityType = () => {
    const { confidence, freedom, independence, voice } = stats;
    if (voice > 70) return { name: "The Fearless Leader", desc: "You lead with conviction and refuse to be silenced." };
    if (independence > 70) return { name: "The Sovereign Architect", desc: "You build your own world on your own terms." };
    if (freedom > 70) return { name: "The Rising Voice", desc: "You are breaking chains and claiming your space." };
    return { name: "The Resilient Soul", desc: "You are navigating complex paths with quiet strength." };
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="flex items-center justify-between mb-16 border-b border-pink-soft/10 pb-8">
        <div>
          <h2 className="text-5xl font-display italic font-black text-white">HER CHOICES.</h2>
          <p className="text-[10px] uppercase font-black opacity-30 mt-2 tracking-widest italic">Simulation 01 / Breaking Patterns</p>
        </div>
        <div className="flex items-center gap-8">
          {stats.choiceHistory && stats.choiceHistory.length > 0 && !isEnd && (
            <button 
              onClick={rewind}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-pink-soft/40 hover:text-pink-soft transition-colors"
            >
              <RotateCcw size={14} /> Rewind
            </button>
          )}
          <div className="text-right">
            <div className="text-[10px] uppercase font-black opacity-40 tracking-widest">Aura Score</div>
            <div className="text-3xl font-black text-pink-soft italic">
              {Math.floor((stats.confidence + stats.freedom + stats.independence + stats.voice) / 4)}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentNodeId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white/5 backdrop-blur-md p-8 md:p-20 rounded-[4rem] border border-pink-soft/10 min-h-[600px] flex flex-col justify-between relative overflow-hidden"
        >
          {isEnd && (
            <div className="absolute inset-0 bg-burgundy-deep flex flex-col items-center justify-center p-12 text-center text-pink-soft z-20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10 }}
                className="w-24 h-24 bg-gold-glow rounded-full flex items-center justify-center text-burgundy mb-8 shadow-[0_0_50px_rgba(255,215,0,0.3)]"
              >
                <UserCheck size={48} />
              </motion.div>
              
              <h3 className="text-2xl font-black uppercase tracking-[0.2em] opacity-40 mb-2">You Became:</h3>
              <h4 className="text-6xl font-display font-black italic tracking-tighter mb-4 leading-tight text-white">{getPersonalityType().name}</h4>
              <p className="text-lg italic font-medium opacity-60 mb-8 max-w-md">"{getPersonalityType().desc}"</p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 p-8 rounded-[3rem] border border-pink-soft/20 mb-12 max-w-lg"
              >
                <div className="text-[10px] font-black uppercase tracking-widest text-gold-glow mb-4">Letter from Future Self</div>
                <p className="text-xl italic font-medium leading-relaxed">
                  "Thank you for not staying silent. Because of your choices today, you are {getPersonalityType().name.toLowerCase()}. Your courage was the seed."
                </p>
              </motion.div>

              <div className="w-full max-w-xl mb-12">
                <div className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-6 text-left">Your Journey Timeline</div>
                <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
                  {(stats.choiceHistory || []).map((h, i) => (
                    <div key={i} className="flex-shrink-0 w-48 p-5 bg-white/5 border border-pink-soft/10 rounded-2xl relative">
                      <div className="text-[8px] font-black uppercase tracking-widest opacity-30 mb-2">Scene 0{i + 1}</div>
                      <p className="text-[10px] font-bold leading-relaxed">{h.choiceText}</p>
                      {i < (stats.choiceHistory || []).length - 1 && (
                        <div className="absolute top-1/2 -right-4 w-4 h-0.5 bg-pink-soft/20" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={reset}
                  className="px-10 py-5 bg-pink-soft text-burgundy rounded-full font-black uppercase text-[10px] tracking-widest shadow-2xl hover:scale-105 transition-all"
                >
                  Rewrite History
                </button>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="px-10 py-5 border-2 border-pink-soft/20 text-pink-soft rounded-full font-black uppercase text-[10px] tracking-widest hover:border-pink-soft transition-all"
                >
                  Return to Hub
                </button>
              </div>
            </div>
          )}

          <div className="flex-1">
            <div className="flex justify-between items-center mb-12 relative z-10">
              <div className="text-[10px] uppercase tracking-[0.4em] text-pink-soft/40 flex items-center gap-3">
                <Sparkles size={14} /> Scene 0{(stats.choiceHistory || []).length + 1}
              </div>
              {currentNode.socialStat && (
                <div className="bg-white/5 px-4 py-1.5 rounded-full flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-glow animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-pink-soft/60">{currentNode.socialStat}</span>
                </div>
              )}
            </div>

            <AnimatePresence>
              {showInsight && currentNode.insight && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-8 left-1/2 -translate-x-1/2 bg-white text-burgundy px-6 py-2 rounded-full font-black uppercase text-[9px] tracking-widest shadow-2xl flex items-center gap-3 z-30"
                >
                  {currentNode.insightType === 'growth' ? <Zap size={14} className="text-gold-glow" /> : <ShieldAlert size={14} />}
                  {currentNode.insight}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row gap-8 mb-12">
               <div className="flex-1 space-y-4">
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-30">Inner Voice (Fear)</div>
                  <p className="text-sm font-medium italic text-pink-soft/60 leading-relaxed">
                    "{currentNode.innerVoice || 'What if things go wrong?'}"
                  </p>
               </div>
               <div className="w-px bg-pink-soft/10 hidden md:block" />
               <div className="flex-1 space-y-4 text-right">
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-30 text-gold-glow">Sovereign Voice</div>
                  <p className="text-sm font-bold italic text-gold-glow leading-relaxed">
                    "{currentNode.outerVoice || 'You are capable of defining your own path.'}"
                  </p>
               </div>
            </div>

            <p className="text-3xl md:text-5xl font-display italic font-bold leading-[1.1] text-white mb-8 tracking-tighter">
              {currentNode.text}
            </p>

            {currentNode.realityQuote && (
              <div className="mb-12 p-6 border-l-4 border-gold-glow bg-gold-glow/5">
                <p className="text-sm font-black uppercase tracking-widest text-gold-glow">"{currentNode.realityQuote}"</p>
              </div>
            )}
          </div>

          <div className="space-y-12">
            {currentNode.lesson && (
               <motion.div 
                 initial={{ height: 0, opacity: 0 }}
                 animate={{ height: 'auto', opacity: 1 }}
                 className="p-6 bg-pink-soft text-burgundy rounded-[2rem] flex items-start gap-4 border border-white/20"
               >
                 <Info size={24} className="shrink-0 mt-1" />
                 <div>
                   <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Mentor Insight</span>
                   <p className="text-sm font-bold leading-relaxed">{currentNode.lesson}</p>
                 </div>
               </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {currentNode.choices.map((choice, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChoice(choice.nextNodeId, choice.impact, choice.text, choice.emotionChange)}
                  className={`group relative flex flex-col p-8 rounded-2xl text-left transition-all shadow-xl overflow-hidden ${choice.isBreakRules ? 'bg-burgundy-dark border-gold-glow/40 border-2' : 'bg-white text-burgundy hover:bg-pink-soft'}`}
                >
                  {choice.isBreakRules && (
                    <div className="absolute top-2 right-4 flex items-center gap-2 text-[8px] font-black uppercase text-gold-glow tracking-widest">
                      <AlertCircle size={10} /> Hidden Path
                    </div>
                  )}
                  <div className={`text-[10px] font-black uppercase tracking-widest mb-4 ${choice.isBreakRules ? 'text-gold-glow opacity-60' : 'opacity-40'}`}>Option 0{i + 1}</div>
                  <span className={`font-black text-xl leading-tight ${choice.isBreakRules ? 'text-white' : ''}`}>{choice.text}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex justify-center">
         <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
            <span>Emotion: {stats.emotion || 'neutral'}</span>
            <div className="w-1 h-1 rounded-full bg-pink-soft" />
            <span>Path Depth: {(stats.choiceHistory || []).length}</span>
         </div>
      </div>
    </div>
  );
}
