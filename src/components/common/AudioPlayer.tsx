import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Heart, 
  FileText, 
  X, 
  Maximize2, 
  ChevronUp, 
  ListMusic 
} from 'lucide-react';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import { useAuth } from '../../context/AuthContext';

export const AudioPlayer: React.FC = () => {
  const { 
    currentSong, 
    isPlaying, 
    currentTime, 
    duration, 
    volume, 
    showLyrics, 
    togglePlayPause, 
    seekTo, 
    setVolume, 
    playNext, 
    playPrev, 
    setShowLyrics,
    queue
  } = useAudioPlayer();

  const { userProfile, toggleFavoriteSong } = useAuth();
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.8);
  const [showQueueModal, setShowQueueModal] = useState(false);
  const [isExpandedMobile, setIsExpandedMobile] = useState(false);

  if (!currentSong) return null;

  const isFav = userProfile?.favorites?.includes(currentSong.id) || false;

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <>
      {/* Stick Audio Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#121218]/95 backdrop-blur-xl border-t border-amber-500/20 px-4 py-2.5 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Song info & Vinyl Artwork */}
          <div className="flex items-center gap-3 min-w-0 w-1/4">
            <div className="relative group shrink-0">
              <img 
                src={currentSong.coverUrl} 
                alt={currentSong.title} 
                className={`w-12 h-12 rounded-lg object-cover shadow-lg border border-amber-500/30 ${isPlaying ? 'animate-spin-slow' : ''}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80';
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center transition-opacity">
                <ChevronUp 
                  className="w-5 h-5 text-amber-400 cursor-pointer" 
                  onClick={() => setIsExpandedMobile(!isExpandedMobile)} 
                />
              </div>
            </div>

            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-white truncate hover:text-amber-400 transition-colors cursor-pointer">
                {currentSong.title}
              </h4>
              <p className="text-xs text-slate-400 truncate flex items-center gap-1.5">
                <span>{currentSong.singer}</span>
                <span className="text-amber-500/60">•</span>
                <span className="text-amber-400/80 text-[10px] font-medium uppercase tracking-wider">{currentSong.category}</span>
              </p>
            </div>

            <button 
              onClick={() => toggleFavoriteSong(currentSong.id)}
              className="ml-1 text-slate-400 hover:text-rose-500 transition-colors shrink-0 hidden sm:block"
              title={isFav ? "Remove from Favorites" : "Add to Favorites"}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          {/* Controls & Progress bar */}
          <div className="flex flex-col items-center gap-1 flex-1 max-w-xl">
            <div className="flex items-center gap-4">
              <button 
                onClick={playPrev}
                className="text-slate-400 hover:text-amber-400 transition-colors p-1"
                title="Previous Track"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button 
                onClick={togglePlayPause}
                className="w-9 h-9 rounded-full bg-gold-gradient text-slate-950 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md shadow-amber-500/20"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
              </button>

              <button 
                onClick={playNext}
                className="text-slate-400 hover:text-amber-400 transition-colors p-1"
                title="Next Track"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Seek bar */}
            <div className="w-full flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="w-9 text-right shrink-0">{formatTime(currentTime)}</span>
              <input 
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={(e) => seekTo(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 hover:accent-amber-300 transition-all"
              />
              <span className="w-9 shrink-0">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Secondary Actions (Volume, Lyrics, Queue) */}
          <div className="flex items-center justify-end gap-3 w-1/4">
            {currentSong.lyrics && (
              <button 
                onClick={() => setShowLyrics(!showLyrics)}
                className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${showLyrics ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`}
                title="Song Lyrics"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden lg:inline">Lyrics</span>
              </button>
            )}

            <button 
              onClick={() => setShowQueueModal(!showQueueModal)}
              className="p-1.5 text-slate-400 hover:text-amber-400 transition-colors hidden sm:block relative"
              title="Playing Queue"
            >
              <ListMusic className="w-4 h-4" />
              {queue.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-500 text-slate-950 rounded-full text-[9px] font-bold flex items-center justify-center">
                  {queue.length}
                </span>
              )}
            </button>

            <div className="hidden md:flex items-center gap-2 group">
              <button onClick={handleMuteToggle} className="text-slate-400 hover:text-white transition-colors">
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input 
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Lyrics View Modal */}
      {showLyrics && currentSong.lyrics && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="bg-[#16161E] border border-amber-500/30 rounded-2xl p-6 sm:p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative">
            <button 
              onClick={() => setShowLyrics(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <img 
                src={currentSong.coverUrl} 
                alt={currentSong.title} 
                className="w-24 h-24 rounded-xl mx-auto mb-3 object-cover shadow-xl border border-amber-500/30"
              />
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
                {currentSong.category}
              </span>
              <h3 className="text-2xl font-display font-bold text-white">{currentSong.title}</h3>
              <p className="text-slate-400 text-sm">{currentSong.singer}</p>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-5 border border-slate-800 whitespace-pre-line text-slate-200 text-center leading-relaxed font-sans text-sm sm:text-base">
              {currentSong.lyrics}
            </div>
          </div>
        </div>
      )}

      {/* Queue Modal */}
      {showQueueModal && (
        <div className="fixed bottom-16 right-4 z-50 bg-[#16161E] border border-amber-500/30 rounded-xl p-4 w-80 shadow-2xl max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <ListMusic className="w-4 h-4" /> Next Up ({queue.length})
            </h4>
            <button onClick={() => setShowQueueModal(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {queue.map((s, idx) => (
              <div 
                key={`${s.id}-${idx}`}
                className={`flex items-center justify-between gap-2 p-2 rounded-lg cursor-pointer transition-colors ${s.id === currentSong.id ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300' : 'hover:bg-slate-800/60 text-slate-300'}`}
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate">{s.title}</p>
                  <p className="text-[10px] text-slate-400 truncate">{s.singer}</p>
                </div>
                {s.id === currentSong.id && (
                  <span className="text-[10px] font-bold text-amber-400 uppercase">Playing</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
