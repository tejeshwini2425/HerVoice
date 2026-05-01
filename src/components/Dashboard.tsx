import React from 'react';
import { motion } from 'motion/react';
import { 
  Map, 
  ShieldCheck, 
  BarChart2, 
  Target, 
  Users, 
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  ListTodo,
  Globe
} from 'lucide-react';
import { Section, UserStats } from '../types';

interface DashboardProps {
  stats: UserStats;
  onNavigate: (section: Section) => void;
}

export default function Dashboard({ stats, onNavigate }: DashboardProps) {
  const missions = [
    { id: 1, text: "Say 'NO' to one request today", xp: 20 },
    { id: 2, text: "Write down one boundary you need", xp: 15 },
    { id: 3, text: "Practice one gym scenario", xp: 25 },
  ];

  const cards = [
    { 
      id: 'choices', 
      title: 'HER CHOICES', 
      desc: 'Reality Life Simulator', 
      icon: Map, 
      color: 'bg-pink-soft', 
      textColor: 'text-burgundy',
      module: '01 / Simulation'
    },
    { 
      id: 'gym', 
      title: 'UNMUTE', 
      desc: 'Boundary Builder Practice', 
      icon: ShieldCheck, 
      color: 'bg-burgundy-dark', 
      textColor: 'text-pink-soft',
      module: '02 / Gym'
    },
  ];

  const auraMetrics = [
    { label: 'Confidence', value: stats.confidence },
    { label: 'Freedom', value: stats.freedom },
    { label: 'Independence', value: stats.independence },
    { label: 'Voice', value: stats.voice },
  ];

  return (
    <div className="space-y-16">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
           <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-pink-soft/10 border border-pink-soft/20 rounded-full text-[9px] font-black uppercase tracking-[0.3em]">
                <Sparkles size={12} className="text-gold-glow" /> Status: {stats.confidence > 50 ? 'Sovereign' : 'Rising'}
              </div>
              {stats.streak > 0 && (
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-orange-400">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }}>🔥</motion.div> {stats.streak} Day Courage
                </div>
              )}
           </div>
          <h2 className="text-7xl font-display italic font-black text-white leading-tight tracking-tighter">THE HUB.</h2>
          <p className="text-pink-soft/40 text-[10px] uppercase font-black tracking-[0.4em] mt-4">Welcome back / Emotion: {stats.emotion || 'neutral'}</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:w-auto">
          {auraMetrics.map(m => (
            <div key={m.label} className="bg-white/5 border border-pink-soft/10 p-5 rounded-2xl min-w-[120px]">
              <div className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-2">{m.label}</div>
              <div className="text-xl font-display italic font-black">{m.value}</div>
              <div className="mt-2 h-0.5 bg-pink-soft/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${m.value}%` }}
                  className="h-full bg-pink-soft"
                />
              </div>
            </div>
          ))}
        </div>
      </header>

      <div className="grid md:grid-cols-6 gap-6">
        {/* Main Simulation Card */}
        <motion.div
           onClick={() => onNavigate('choices')}
           className="md:col-span-4 h-[400px] bg-pink-soft text-burgundy p-12 rounded-[3.5rem] flex flex-col justify-between group cursor-pointer border border-white/20 transition-all hover:scale-[1.01] shadow-2xl relative overflow-hidden"
        >
          <div className="flex justify-between items-start relative z-10">
            <span className="text-xs font-black uppercase tracking-[0.3em] opacity-40">01 / The Journey</span>
            <div className="w-12 h-12 border border-burgundy/20 rounded-full flex items-center justify-center group-hover:bg-burgundy group-hover:text-white transition-all">
              <ArrowUpRight size={24} />
            </div>
          </div>
          <div className="relative z-10 max-w-md">
            <h3 className="text-6xl font-display italic font-black tracking-tighter leading-[0.9] mb-4">HER CHOICES.</h3>
            <p className="text-sm font-bold uppercase tracking-widest opacity-60">Continue your immersive life simulation and define your future.</p>
          </div>
          <Map className="absolute top-1/2 right-0 translate-x-1/4 -translate-y-1/2 opacity-5 scale-[3] pointer-events-none" size={200} />
        </motion.div>

        {/* Missions Sidebar */}
        <div className="md:col-span-2 space-y-6">
           <div className="bg-white/5 border border-pink-soft/10 p-10 rounded-[3rem] h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-10">
                  <ListTodo className="text-pink-soft opacity-30" size={24} />
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">Mini Missions</h4>
                </div>
                <div className="space-y-6">
                  {missions.map(m => (
                    <div key={m.id} className="group relative flex items-start gap-4 cursor-pointer">
                      <div className="w-5 h-5 rounded border border-pink-soft/20 flex items-center justify-center shrink-0 group-hover:border-pink-soft transition-colors">
                         <div className="w-2 h-2 bg-pink-soft rounded-sm opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all" />
                      </div>
                      <div>
                        <p className="text-xs font-medium italic mb-1 group-hover:text-white transition-colors">{m.text}</p>
                        <span className="text-[8px] font-black uppercase text-gold-glow opacity-60">+{m.xp}xp Gain</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-10 border-t border-pink-soft/10">
                 <p className="text-[9px] font-black uppercase opacity-20 tracking-widest">Complete missions to evolve your aura</p>
              </div>
           </div>
        </div>

        {/* Other Cards */}
        <div className="md:col-span-2 h-[300px] bg-burgundy-dark p-10 rounded-3xl flex flex-col justify-between group cursor-pointer border border-pink-soft/10 hover:scale-[1.02] transition-all overflow-hidden" onClick={() => onNavigate('gym')}>
          <ShieldCheck className="opacity-20 translate-x-20 -translate-y-10 scale-150 absolute top-0 right-0" size={150} />
          <h3 className="text-4xl font-display italic font-black text-white relative z-10">UNMUTE.</h3>
          <p className="text-[10px] uppercase font-black opacity-40 tracking-widest text-pink-soft relative z-10">Confidence Gym</p>
        </div>

        <div className="md:col-span-2 h-[300px] bg-pink-soft/10 p-10 rounded-3xl flex flex-col justify-between group cursor-pointer border border-pink-soft/20 hover:scale-[1.02] transition-all text-pink-soft relative overflow-hidden" onClick={() => onNavigate('inner-space')}>
          <Sparkles className="opacity-10 translate-x-12 -translate-y-12 scale-150 absolute top-0 right-0 text-gold-glow" size={150} />
          <h3 className="text-4xl font-display italic font-black relative z-10">AURA CARE.</h3>
          <p className="text-[10px] uppercase font-black opacity-40 tracking-widest relative z-10">Inner space & Reset</p>
        </div>

        <div className="md:col-span-2 h-[300px] bg-gold-glow p-10 rounded-3xl flex flex-col justify-between group cursor-pointer border border-pink-soft/10 hover:scale-[1.02] transition-all text-burgundy overflow-hidden" onClick={() => onNavigate('connect')}>
          <Users className="opacity-10 translate-x-20 -translate-y-10 scale-150 absolute top-0 right-0" size={150} />
          <h3 className="text-4xl font-display italic font-black relative z-10">THE TRIBE.</h3>
          <p className="text-[10px] uppercase font-black opacity-60 tracking-widest relative z-10">She Connect</p>
        </div>

        <div className="md:col-span-2 h-[300px] bg-burgundy-deep/60 p-10 rounded-3xl flex flex-col justify-between group cursor-pointer border border-gold-glow/20 hover:border-gold-glow transition-all text-white relative overflow-hidden" onClick={() => onNavigate('rises')}>
          <Globe className="opacity-10 translate-x-12 -translate-y-12 scale-150 absolute top-0 right-0 text-gold-glow" size={150} />
          <h3 className="text-4xl font-display italic font-black relative z-10">SHE RISES.</h3>
          <p className="text-[10px] uppercase font-black opacity-40 tracking-widest relative z-10">Global Impact</p>
        </div>

        <div className="md:col-span-2 h-[300px] bg-white p-10 rounded-3xl flex flex-col justify-between group cursor-pointer border border-pink-soft/10 hover:scale-[1.02] transition-all text-burgundy relative overflow-hidden" onClick={() => onNavigate('unsaid')}>
          <div className="absolute inset-0 bg-gradient-to-br from-pink-soft/20 to-transparent pointer-events-none" />
          <MessageSquare className="opacity-5 translate-x-20 -translate-y-10 scale-150 absolute top-0 right-0" size={150} />
          <h3 className="text-4xl font-display italic font-black relative z-10">UNSAID.</h3>
          <p className="text-[10px] uppercase font-black opacity-40 tracking-widest relative z-10">Release Truth</p>
        </div>
      </div>
    </div>
  );
}
