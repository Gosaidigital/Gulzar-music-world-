import React, { useState } from 'react';
import { Disc, Play, Bookmark, X, Calendar, Music } from 'lucide-react';
import { useMusicData } from '../lib/useMusicData';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { useAuth } from '../context/AuthContext';
import { Album, Song } from '../types';
import { SEO } from '../components/common/SEO';

export const AlbumsPage: React.FC = () => {
  const { albums, songs } = useMusicData();
  const { playSong } = useAudioPlayer();
  const { userProfile, toggleSaveAlbum } = useAuth();
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  const getAlbumSongs = (albumId: string): Song[] => {
    return songs.filter(s => s.albumId === albumId);
  };

  return (
    <div className="space-y-8 pb-12">
      <SEO 
        title="Chhattisgarhi Music Albums – Gulzar Music World"
        description="Explore Chhattisgarhi music album releases, Panthi albums, Karma compilations, and Jasgeet albums on Gulzar Music World."
      />

      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
          <Disc className="w-8 h-8 text-amber-400" />
          <span>Chhattisgarhi Music Albums</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Explore complete audio albums recorded and produced at Gulzar Music World.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album) => {
          const isSaved = userProfile?.savedAlbums?.includes(album.id);
          const albumSongs = getAlbumSongs(album.id);

          return (
            <div 
              key={album.id}
              className="bg-[#14141E] border border-amber-500/20 rounded-2xl p-5 space-y-4 hover:border-amber-500/50 transition-all group"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <img 
                  src={album.coverUrl} 
                  alt={album.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => toggleSaveAlbum(album.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-slate-300 hover:text-amber-400 backdrop-blur-md"
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
                </button>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  {album.category}
                </span>
                <h3 className="text-lg font-bold text-white">{album.title}</h3>
                <p className="text-xs text-slate-400">{album.artist}</p>
                <p className="text-[11px] text-slate-500 mt-2">{album.description}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <span className="text-xs text-slate-400 font-mono">{albumSongs.length || album.trackCount} Tracks</span>
                <button
                  onClick={() => setSelectedAlbum(album)}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-amber-300" />
                  <span>View Tracklist</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Album Tracks Modal */}
      {selectedAlbum && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-[#161622] border border-amber-500/30 rounded-2xl p-6 max-w-xl w-full max-h-[85vh] overflow-y-auto relative">
            <button 
              onClick={() => setSelectedAlbum(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <img src={selectedAlbum.coverUrl} alt={selectedAlbum.title} className="w-20 h-20 rounded-xl object-cover border border-amber-500/30" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">{selectedAlbum.category}</span>
                <h3 className="text-xl font-bold text-white">{selectedAlbum.title}</h3>
                <p className="text-xs text-slate-400">{selectedAlbum.artist}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Album Tracklist</h4>
              {getAlbumSongs(selectedAlbum.id).map((song, i) => (
                <div 
                  key={song.id}
                  onClick={() => playSong(song, getAlbumSongs(selectedAlbum.id))}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-amber-500/10 cursor-pointer border border-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500">{i + 1}</span>
                    <div>
                      <p className="text-xs font-bold text-white">{song.title}</p>
                      <p className="text-[10px] text-slate-400">{song.singer}</p>
                    </div>
                  </div>
                  <Play className="w-4 h-4 text-amber-400" />
                </div>
              ))}

              {getAlbumSongs(selectedAlbum.id).length === 0 && (
                <p className="text-xs text-slate-500 text-center py-6">No tracks assigned to this album yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
