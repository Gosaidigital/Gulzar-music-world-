import React, { useState } from 'react';
import { Video as VideoIcon, Play, X, Eye, Calendar } from 'lucide-react';
import { useMusicData } from '../lib/useMusicData';
import { Video } from '../types';
import { SEO } from '../components/common/SEO';

export const VideosPage: React.FC = () => {
  const { videos } = useMusicData();
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  return (
    <div className="space-y-8 pb-12">
      <SEO 
        title="Chhattisgarhi Music Videos – Gulzar Music World"
        description="Watch official Chhattisgarhi music videos, Panthi dance videos, and live studio recording sessions on YouTube."
      />

      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
          <VideoIcon className="w-8 h-8 text-amber-400" />
          <span>Chhattisgarhi Music Videos</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          High-definition music videos shot across Chhattisgarh locations and Gulzar Studio.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((vid) => (
          <div 
            key={vid.id}
            onClick={() => setActiveVideo(vid)}
            className="bg-[#14141E] border border-amber-500/20 rounded-2xl overflow-hidden hover:border-amber-500/50 cursor-pointer transition-all group"
          >
            <div className="relative aspect-video">
              <img 
                src={vid.thumbnailUrl} 
                alt={vid.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-gold-gradient text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                </div>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                {vid.category}
              </span>
              <h3 className="text-sm font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                {vid.title}
              </h3>
              <p className="text-xs text-slate-400">{vid.artist}</p>
              <div className="flex items-center gap-3 text-[10px] text-slate-500 pt-1">
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {vid.viewsCount.toLocaleString()} views</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {vid.releaseDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Embedded YouTube Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-[#161622] border border-amber-500/30 rounded-2xl p-4 max-w-3xl w-full relative">
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 p-2 text-slate-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-4">
              <iframe 
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId || 'dQw4w9WgXcQ'}?autoplay=1`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <h3 className="text-lg font-bold text-white">{activeVideo.title}</h3>
            <p className="text-xs text-amber-400 mt-1">{activeVideo.artist}</p>
            <p className="text-xs text-slate-300 mt-2">{activeVideo.description}</p>
          </div>
        </div>
      )}

    </div>
  );
};
