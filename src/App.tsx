/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Map, 
  MessageSquare, 
  Target, 
  ShieldCheck, 
  User, 
  BarChart2, 
  Menu, 
  X,
  ArrowRight,
  Sparkles,
  Layout,
  Search,
  Users,
  Trophy,
  Globe
} from 'lucide-react';
import { Section, UserStats } from './types';
import { INITIAL_STATS } from './constants';

// --- Sub-components ---
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import HerChoices from './components/HerChoices';
import ConfidenceGym from './components/ConfidenceGym';
import RealityReveal from './components/RealityReveal';
import ShePath from './components/ShePath';
import UnsaidWall from './components/UnsaidWall';
import ConnectGrow from './components/ConnectGrow';
import AuraScore from './components/AuraScore';
import InnerSpace from './components/InnerSpace';
import SheRises from './components/SheRises';

export default function App() {
  const [currentSection, setCurrentSection] = useState<Section>('landing');
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('her_voice_stats');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...INITIAL_STATS, ...parsed };
    }
    return INITIAL_STATS;
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lastAchievement, setLastAchievement] = useState<string | null>(null);
  const [showDailyAffirmation, setShowDailyAffirmation] = useState(false);

  useEffect(() => {
    localStorage.setItem('her_voice_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    // Daily Glow logic
    const today = new Date().toDateString();
    const lastSeen = localStorage.getItem('her_voice_last_seen');
    if (lastSeen !== today) {
      setShowDailyAffirmation(true);
      localStorage.setItem('her_voice_last_seen', today);
    }
  }, []);

  const getDynamicAffirmation = () => {
    if (stats.voice < 30) return "You are allowed to take space.";
    if (stats.voice > 60) return "Look at you choosing yourself.";
    return "Today, your voice matters.";
  };

  const updateStats = (delta: Partial<UserStats>) => {
    setStats(prev => {
      const nextStats = {
        ...prev,
        ...delta,
        confidence: Math.min(100, Math.max(0, prev.confidence + (delta.confidence ?? 0))),
        freedom: Math.min(100, Math.max(0, prev.freedom + (delta.freedom ?? 0))),
        independence: Math.min(100, Math.max(0, prev.independence + (delta.independence ?? 0))),
        voice: Math.min(100, Math.max(0, prev.voice + (delta.voice ?? 0))),
        emotion: delta.emotion ?? prev.emotion,
        choiceHistory: delta.choiceHistory ?? prev.choiceHistory,
        achievements: delta.achievements ?? prev.achievements,
      };

      // Streak tracking
      const now = Date.now();
      const diff = now - prev.lastActive;
      if (diff < 86400000 * 2) { // Less than 48h
         nextStats.streak = (prev.streak || 0) + 1;
      } else {
         nextStats.streak = 1;
      }
      nextStats.lastActive = now;

      // Achievement Logic
      if (nextStats.voice >= 50 && !prev.achievements.includes('spoke_up')) {
        nextStats.achievements.push('spoke_up');
        setLastAchievement('Achievement Unlocked: The Voice Awakens');
      }

      return nextStats;
    });
  };

  // Dynamic Theme Mode based on Confidence/Freedom
  const themeClass = stats.confidence < 40 ? 'bg-burgundy-deep' : 'bg-burgundy';
  
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Layout },
    { id: 'choices', label: 'Her Choices', icon: Map },
    { id: 'gym', label: 'Unmute Gym', icon: ShieldCheck },
    { id: 'inner-space', label: 'Aura Care', icon: Sparkles },
    { id: 'rises', label: 'Impact', icon: Globe },
    { id: 'connect', label: 'She Connect', icon: Users },
    { id: 'unsaid', label: 'Unsaid Wall', icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard': return <Dashboard stats={stats} onNavigate={setCurrentSection} />;
      case 'choices': return <HerChoices stats={stats} onUpdateStats={updateStats} onNavigate={setCurrentSection} />;
      case 'gym': return <ConfidenceGym stats={stats} onUpdateStats={updateStats} />;
      case 'barriers': return <RealityReveal />;
      case 'path': return <ShePath />;
      case 'unsaid': return <UnsaidWall />;
      case 'connect': return <ConnectGrow stats={stats} />;
      case 'inner-space': return <InnerSpace stats={stats} onUpdateStats={updateStats} />;
      case 'rises': return <SheRises onNavigate={setCurrentSection} />;
      default: return <Dashboard stats={stats} onNavigate={setCurrentSection} />;
    }
  };

  if (currentSection === 'landing') {
    return <Landing onStart={() => setCurrentSection('dashboard')} />;
  }

  return (
    <div className={`min-h-screen ${themeClass} text-pink-soft font-sans flex overflow-hidden transition-colors duration-1000`}>
      {/* Daily Affirmation Popup */}
      <AnimatePresence>
        {showDailyAffirmation && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-burgundy-deep/90 backdrop-blur-2xl flex items-center justify-center p-8"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-lg text-center"
            >
              <Sparkles className="text-gold-glow mx-auto mb-10" size={64} />
              <h2 className="text-5xl font-display italic font-black text-white mb-6">GLOW AFFIRMATION.</h2>
              <p className="text-2xl italic font-medium text-pink-soft leading-relaxed mb-12">"{getDynamicAffirmation()}"</p>
              <button 
                onClick={() => setShowDailyAffirmation(false)}
                className="px-14 py-6 bg-pink-soft text-burgundy rounded-[2rem] font-black uppercase text-xs tracking-[0.4em] shadow-3xl hover:scale-105 transition-all"
              >
                Enter My Sovereignty
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Achievement Alert */}
      <AnimatePresence>
        {lastAchievement && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 20 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-[200] bg-gold-glow text-burgundy px-10 py-5 rounded-full font-black uppercase text-[10px] tracking-widest shadow-[0_0_80px_rgba(255,215,0,0.4)] flex items-center gap-4"
          >
            <Trophy size={16} /> {lastAchievement}
            <button onClick={() => setLastAchievement(null)} className="ml-4 opacity-40 hover:opacity-100"><X size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Affirmation Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
         {['Strong', 'Free', 'Enough', 'Sovereign', 'Voice'].map((word, i) => (
           <motion.div
             key={i}
             initial={{ x: Math.random() * 100 + '%', y: '110%' }}
             animate={{ y: '-10%' }}
             transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, delay: i * 3, ease: "linear" }}
             className="absolute text-[10px] font-black uppercase tracking-[1em] text-pink-soft/40 mix-blend-screen whitespace-nowrap"
           >
             {word}
           </motion.div>
         ))}
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-24 border-r border-pink-soft/10 bg-burgundy-deep
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col items-center py-8 justify-between shrink-0
      `}>
        <div className="flex flex-col gap-12 items-center">
          <AuraScore stats={stats} />
          
          <nav className="flex flex-col gap-10 items-center">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentSection(item.id as Section);
                    setIsSidebarOpen(false);
                  }}
                  className={`
                    p-3 rounded-xl transition-all
                    ${isActive ? 'bg-pink-soft text-burgundy shadow-xl' : 'text-pink-soft/40 hover:text-pink-soft'}
                  `}
                  title={item.label}
                >
                  <Icon size={20} />
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="writing-vertical flex items-center gap-4 text-pink-soft/20 text-[8px] font-black uppercase tracking-[0.5em]">
          <span>Her Voice Platform</span>
          <div className="w-1 h-1 rounded-full bg-gold-glow animate-pulse" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-y-auto">
        {/* Mobile Header */}
        <header className="lg:hidden p-4 flex items-center justify-between border-b border-pink-soft/5 bg-burgundy-deep/80 backdrop-blur-md">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-pink-soft">
            <Menu size={24} />
          </button>
          <div className="text-xl font-display italic font-black">HER VOICE</div>
          <div className="w-10"></div>
        </header>

        {/* Global Page Header (Non-landing/Dashboard sections can have a standard header) */}
        {currentSection !== 'dashboard' && currentSection !== 'unsaid' && (
           <header className="pt-12 px-8 md:px-16 pb-0 flex justify-between items-end">
              <button 
                onClick={() => setCurrentSection('dashboard')}
                className="text-[10px] font-black uppercase tracking-widest text-pink-soft/40 hover:text-pink-soft transition-colors flex items-center gap-2"
              >
                ← Back to Home
              </button>
              <div className="text-right hidden md:block">
                 <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30">Active Perspective</span>
                 <p className="text-sm font-bold uppercase tracking-widest text-pink-soft/60">Module / {currentSection}</p>
              </div>
           </header>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className={`flex-1 ${currentSection === 'unsaid' ? '' : 'p-8 md:p-16 lg:p-24'}`}
          >
            <div className="max-w-6xl mx-auto">
              {renderContent()}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Background Ambience */}
      <div className="fixed top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-pink-soft/10 to-transparent blur-[150px] opacity-30 -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-burgundy-dark/50 to-transparent blur-[120px] opacity-40 -z-10 pointer-events-none" />
    </div>
  );
}
