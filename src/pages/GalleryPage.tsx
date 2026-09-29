import React, { useState } from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { useMusicData } from '../lib/useMusicData';
import { SEO } from '../components/common/SEO';

export const GalleryPage: React.FC = () => {
  const { gallery } = useMusicData();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Studio', 'Recording', 'Live Event', 'Artist Shoot'];

  const filtered = activeCategory === 'All'
    ? gallery
    : gallery.filter(g => g.category === activeCategory);

  return (
    <div className="space-y-8 pb-12">
      <SEO 
        title="Studio Photo Gallery – Gulzar Music World"
        description="View photos of Gulzar Studio recording equipment, live Chhattisgarhi concerts, behind the scenes, and artist sessions."
      />

      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
          <Camera className="w-8 h-8 text-amber-400" />
          <span>Studio & Event Photo Gallery</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Explore behind the scenes photos from Gulzar Music World recording studio and live concerts.
        </p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-gold-gradient text-slate-950 font-bold shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div 
            key={item.id}
            className="bg-[#14141E] border border-amber-500/20 rounded-2xl overflow-hidden group hover:border-amber-500/50 transition-all"
          >
            <div className="relative aspect-4/3 overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-black/70 text-amber-400 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                {item.category}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              {item.caption && <p className="text-xs text-slate-400 mt-1">{item.caption}</p>}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
