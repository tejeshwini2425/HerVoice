/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, Reorder } from 'motion/react';
import { Target, Layers, Plus, Trash2, ArrowRight, Download, Sparkles } from 'lucide-react';

export default function ShePath() {
  const [items, setItems] = useState([
    { id: '1', text: 'Achieve Financial Independence', category: 'Career' },
    { id: '2', text: 'Set Daily Boundaries', category: 'Growth' },
    { id: '3', text: 'Travel Solo once a year', category: 'Lifestyle' },
  ]);

  const [newItem, setNewItem] = useState('');
  const [newCat, setNewCat] = useState('Career');

  const addItem = () => {
    if (!newItem.trim()) return;
    setItems([...items, { id: Date.now().toString(), text: newItem, category: newCat }]);
    setNewItem('');
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-16 border-b border-pink-soft/10 pb-12">
        <h2 className="text-6xl font-display italic font-black text-white mb-6 tracking-tighter leading-[0.9]">SHE PATH.</h2>
        <p className="text-pink-soft/60 max-w-sm mx-auto font-medium uppercase text-[10px] tracking-[0.3em] leading-relaxed">
          Blueprint / Success Metrics / Strategy
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white/5 p-8 rounded-[2rem] border border-pink-soft/10 backdrop-blur-xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-soft/40 mb-8 flex items-center gap-3">
              <Plus size={16} /> Define Horizon
            </h3>
            <div className="space-y-6">
              <textarea 
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="What is your next objective?"
                className="w-full min-h-[140px] p-6 bg-pink-soft/5 border border-pink-soft/10 rounded-xl focus:border-pink-soft/30 outline-none text-sm font-medium tracking-wide resize-none text-white border-dashed"
              />
              <div className="flex gap-2 flex-wrap">
                {['Career', 'Growth', 'Lifestyle', 'Freedom'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setNewCat(cat)}
                    className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${newCat === cat ? 'bg-pink-soft text-burgundy shadow-lg' : 'bg-pink-soft/10 text-pink-soft/40 hover:text-pink-soft'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <button 
                onClick={addItem}
                className="w-full py-5 bg-pink-soft text-burgundy rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl"
              >
                Add to Path
              </button>
            </div>
          </div>

          <div className="bg-gold-glow/5 p-8 rounded-[2rem] border border-gold-glow/20">
            <Sparkles className="text-gold-glow mb-4" size={20} />
            <h4 className="font-black text-[10px] uppercase tracking-widest text-gold-glow mb-2">Empowerment Logic</h4>
            <p className="text-xs text-white/60 leading-loose">
              Prioritize goals that grant you "Systemic Freedom"—objectives that dismantle structural dependency.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white/5 p-10 md:p-16 rounded-[3rem] border border-pink-soft/10 min-h-[500px] backdrop-blur-3xl shadow-2xl">
            <div className="flex items-center justify-between mb-12">
              <div className="text-[10px] font-black text-pink-soft/40 uppercase tracking-[0.4em] flex items-center gap-3">
                <Layers size={16} /> Blueprint Architecture
              </div>
              <div className="text-[9px] text-pink-soft/30 font-black uppercase tracking-widest italic animate-pulse">Drag to sequence</div>
            </div>

            <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-6">
              {items.map((item) => (
                <Reorder.Item 
                  key={item.id} 
                  value={item}
                  className="bg-white/5 border border-pink-soft/10 p-8 rounded-[1.5rem] flex items-center justify-between group cursor-grab active:cursor-grabbing hover:bg-pink-soft/10 transition-all border-dashed"
                >
                  <div className="flex items-center gap-8">
                    <div className="w-10 h-10 rounded-full bg-pink-soft text-burgundy flex items-center justify-center text-xs font-black italic">
                      0{items.indexOf(item) + 1}
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-[0.3em] font-black text-pink-soft/30 mb-2">{item.category}</div>
                      <div className="text-xl font-display italic font-bold text-white group-hover:text-pink-soft transition-colors tracking-tight">{item.text}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-3 text-pink-soft/20 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={24} strokeWidth={1.5} />
                  </button>
                </Reorder.Item>
              ))}
            </Reorder.Group>

            {items.length === 0 && (
              <div className="h-[300px] flex flex-col items-center justify-center text-pink-soft/20 space-y-4">
                <Target size={80} strokeWidth={0.5} className="mb-4 opacity-50" />
                <p className="font-medium uppercase tracking-[0.3em] text-[10px]">Your path is currently clear</p>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button className="group px-14 py-6 bg-pink-soft text-burgundy rounded-full font-black uppercase text-[10px] tracking-widest shadow-2xl shadow-black/50 hover:bg-white transition-all hover:scale-105 flex items-center gap-4">
              Manifest Life Plan <Download size={20} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
