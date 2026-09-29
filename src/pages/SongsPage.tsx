import React, { useState } from 'react';
import { Play, Pause, Heart, Search, FileText, Share2, Disc } from 'lucide-react';
import { useMusicData } from '../lib/useMusicData';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { useAuth } from '../context/AuthContext';
import { Song, SongCategory } from '../types';
import { SEO } from '../components/common/SEO';

interface SongsPageProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const SongsPage: React.FC<SongsPageProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}) => {
  const { songs } = useMusicData();
  const { currentSong, isPlaying, playSong, togglePlayPause, setShowLyrics } = useAudioPlayer();
  const { userProfile, toggleFavoriteSong } = useAuth();

  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'title'>('popular');

  const categories: SongCategory[] = ['CG Song', 'Panthi Song', 'Karma Song', 'Dadariya', 'Bhakti Geet', 'Album Song'];

  const filtered = songs.filter(s => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesQuery = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.singer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  }).sort((a, b) => {
    if (sortBy === 'popular') return b.playsCount - a.playsCount;
    if (sortBy === 'latest') return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="space-y-8 pb-12">
      <SEO 
        title="Chhattisgarhi Songs Catalog – Gulzar Music World"
        description="Browse and listen to Chhattisgarhi CG songs, Panthi, Karma, Dadariya, Bhakti Geet, and album tracks on Gulzar Music World."
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
            <Disc className="w-8 h-8 text-amber-400" />
            <span>Chhattisgarhi Songs Catalog</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Showing {filtered.length} Chhattisgarhi tracks ({selectedCategory})
          </p>
        </div>

        {/* Search & Sort controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Filter by title, singer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400 w-52"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="popular">Most Popular</option>
            <option value="latest">Latest Released</option>
            <option value="title">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Categories Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === 'All'
              ? 'bg-gold-gradient text-slate-950 font-bold shadow-md'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          All Categories
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-gold-gradient text-slate-950 font-bold shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Songs Table / Card List */}
      <div className="space-y-2">
        {filtered.map((song, index) => {
          const isCurr = currentSong?.id === song.id;
          const isFav = userProfile?.favorites?.includes(song.id);

          return (
            <div
              key={song.id}
              className={`flex items-center justify-between gap-4 p-3 sm:p-4 rounded-xl transition-all border ${
                isCurr 
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' 
                  : 'bg-[#14141E] border-slate-800/80 hover:border-amber-500/30 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <span className="text-xs font-mono text-slate-500 w-5 text-center shrink-0">
                  {index + 1}
                </span>

                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 group">
                  <img 
                    src={song.coverUrl} 
                    alt={song.title} 
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => {
                      if (isCurr) togglePlayPause();
                      else playSong(song, filtered);
                    }}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-amber-400 transition-opacity"
                  >
                    {isCurr && isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-amber-400" />}
                  </button>
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white truncate hover:text-amber-300 transition-colors cursor-pointer" onClick={() => playSong(song, filtered)}>
                    {song.title}
                  </h4>
                  <p className="text-xs text-slate-400 truncate flex items-center gap-2">
                    <span>{song.singer}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-amber-400/80 text-[10px] uppercase tracking-wider font-semibold">{song.category}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  {song.duration}
                </span>

                {song.lyrics && (
                  <button
                    onClick={() => {
                      playSong(song);
                      setShowLyrics(true);
                    }}
                    className="p-1.5 text-slate-400 hover:text-amber-300 transition-colors"
                    title="Lyrics"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => toggleFavoriteSong(song.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400 space-y-2">
            <p className="text-base font-semibold">No songs found in this category.</p>
            <p className="text-xs">Try selecting 'All Categories' or clearing search query.</p>
          </div>
        )}
      </div>

    </div>
  );
};
