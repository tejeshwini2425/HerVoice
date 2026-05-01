import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  MessageCircle, 
  Target, 
  Save, 
  Heart, 
  Send,
  Sparkles,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { MENTORS, TRIBE_POSTS } from '../constants';
import { Mentor, TribePost, UserStats } from '../types';

interface ConnectGrowProps {
  stats: UserStats;
}

export default function ConnectGrow({ stats }: ConnectGrowProps) {
  const [activeTab, setActiveTab] = useState<'mentors' | 'tribe' | 'chat'>('mentors');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [tribeCategory, setTribeCategory] = useState('All');

  const categories = ['All', 'Students', 'Entrepreneurs', 'Creatives', 'Tech'];
  const filteredTribe = tribeCategory === 'All' 
    ? TRIBE_POSTS 
    : TRIBE_POSTS.filter(p => p.category === tribeCategory);

  return (
    <div className="space-y-16 pb-24">
      <header className="border-b border-pink-soft/10 pb-12 flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <h2 className="text-7xl font-display italic font-black text-white leading-tight tracking-tighter">SHE CONNECT.</h2>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mt-4">Find Your Tribe / Meet Your Mentor / Join the Circle</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-full border border-pink-soft/10">
          {(['mentors', 'tribe', 'chat'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-pink-soft text-burgundy shadow-lg' : 'text-pink-soft/40 hover:text-pink-soft'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <AnimatePresence mode="wait">
        {activeTab === 'mentors' && (
          <motion.div 
            key="mentors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {MENTORS.map((mentor, i) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedMentor(mentor)}
                className="group bg-white/5 border border-pink-soft/10 p-8 rounded-[2.5rem] hover:bg-pink-soft/10 cursor-pointer transition-all"
              >
                <div className="flex justify-between items-start mb-12">
                  <span className="text-[9px] font-black uppercase tracking-widest text-pink-soft/40">{mentor.category} Mentor</span>
                  <div className="w-10 h-10 border border-pink-soft/20 rounded-full flex items-center justify-center group-hover:bg-pink-soft group-hover:text-burgundy transition-all">
                    <ChevronRight size={18} />
                  </div>
                </div>
                <div className="mb-8">
                  <h3 className="text-4xl font-display italic font-black text-white leading-tight">{mentor.name}</h3>
                  <p className="text-[10px] font-black uppercase opacity-60 mt-2 tracking-widest">{mentor.title}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {mentor.challenges.slice(0, 2).map(c => (
                    <span key={c} className="text-[8px] font-black uppercase px-2 py-1 bg-pink-soft/10 rounded-md opacity-40">{c}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'tribe' && (
          <motion.div 
            key="tribe"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setTribeCategory(cat)}
                  className={`flex-shrink-0 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${tribeCategory === cat ? 'bg-white text-burgundy shadow-lg' : 'bg-white/5 text-pink-soft/40 hover:text-pink-soft'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredTribe.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/5 border border-pink-soft/5 p-10 rounded-[3rem] space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-soft/20 flex items-center justify-center text-[10px] font-black text-pink-soft">
                        {post.author[0]}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest">{post.author}</span>
                    </div>
                    <span className="text-[9px] font-black uppercase opacity-20 tracking-tighter">{post.category}</span>
                  </div>
                  <p className="text-xl italic font-medium leading-relaxed text-white/80">"{post.content}"</p>
                  <div className="flex items-center gap-6 pt-4">
                    <button className="flex items-center gap-2 text-pink-soft/40 hover:text-pink-soft transition-colors">
                      <Heart size={14} />
                      <span className="text-[10px] font-black">{post.likes}</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'chat' && (
          <motion.div 
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto bg-white/5 rounded-[3rem] border border-pink-soft/10 flex flex-col h-[600px] overflow-hidden"
          >
            <div className="p-8 border-b border-pink-soft/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-pink-soft flex items-center justify-center text-burgundy">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-xl font-display font-black text-white italic">AI Mentor / Guide</h3>
                <p className="text-[10px] font-black uppercase opacity-40">Ready to listen and advise</p>
              </div>
            </div>
            <div className="flex-1 p-8 space-y-8 overflow-y-auto">
              <div className="flex gap-4">
                <div className="bg-pink-soft/10 p-6 rounded-[2rem] rounded-tl-none max-w-[80%]">
                  <p className="text-sm font-medium leading-relaxed italic">"Welcome to your sovereign space. What's weighing on your mind today? Is it your career horizon, or perhaps finding your voice in a difficult situation?"</p>
                </div>
              </div>
            </div>
            <div className="p-8 border-t border-pink-soft/10">
              <div className="flex gap-4">
                <button className="flex-1 px-6 py-4 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-pink-soft/40 hover:bg-pink-soft/10 transition-all text-left">
                  My Career Horizon
                </button>
                <button className="flex-1 px-6 py-4 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-pink-soft/40 hover:bg-pink-soft/10 transition-all text-left">
                  Finding My Voice
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mentor Detail Modal */}
      <AnimatePresence>
        {selectedMentor && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMentor(null)}
              className="absolute inset-0 bg-burgundy-deep/95 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-4xl bg-white rounded-[4rem] text-burgundy overflow-hidden flex flex-col md:flex-row h-[80vh] md:h-auto"
            >
              <div className="w-full md:w-2/5 bg-pink-soft p-12 md:p-16 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 opacity-40">Mentor Profile</div>
                  <h3 className="text-6xl font-display font-black italic leading-[0.85] tracking-tighter mb-4">{selectedMentor.name}</h3>
                  <p className="text-xs font-black uppercase tracking-widest opacity-60">{selectedMentor.title}</p>
                </div>
                <div className="space-y-4 pt-12 md:pt-0">
                  <button className="w-full py-5 bg-burgundy text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3">
                    <Save size={16} /> Save Advocacy
                  </button>
                  <button className="w-full py-5 border-2 border-burgundy rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-burgundy hover:text-white transition-all">
                    <Heart size={16} /> I want this life
                  </button>
                </div>
              </div>
              <div className="flex-1 p-12 md:p-20 overflow-y-auto space-y-12">
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mb-6">Her Story</h4>
                  <p className="text-2xl font-medium leading-relaxed italic">"{selectedMentor.story}"</p>
                </section>
                <section className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mb-6">Barriers Overcome</h4>
                    <ul className="space-y-4">
                      {selectedMentor.challenges.map(c => (
                        <li key={c} className="flex items-center gap-3 text-sm font-bold opacity-70 italic">
                          <div className="w-1.5 h-1.5 rounded-full bg-burgundy" /> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mb-6">Direct Advice</h4>
                    <p className="text-sm font-black leading-loose uppercase tracking-widest opacity-80">{selectedMentor.advice}</p>
                  </div>
                </section>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section className="bg-gold-glow/5 border border-gold-glow/20 rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-xl">
          <div className="flex items-center gap-4 text-gold-glow mb-6">
            <Calendar size={32} />
            <h3 className="text-4xl font-display italic font-black">Meetup Mode.</h3>
          </div>
          <p className="text-white/60 font-medium leading-relaxed italic text-lg">Join high-impact circles and physical collectives. Your journey is better when shared.</p>
        </div>
        <button className="px-14 py-8 bg-gold-glow text-burgundy rounded-full font-black uppercase text-[10px] tracking-[0.3em] shadow-[0_0_50px_rgba(255,215,0,0.2)] hover:scale-105 transition-all">
          Find Nearby Circles
        </button>
      </section>
    </div>
  );
}
