import React from 'react';
import { Mic2, UserCheck, UserPlus, Play } from 'lucide-react';
import { useMusicData } from '../lib/useMusicData';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { useAuth } from '../context/AuthContext';
import { SEO } from '../components/common/SEO';

export const ArtistsPage: React.FC = () => {
  const { artists, songs } = useMusicData();
  const { playSong } = useAudioPlayer();
  const { userProfile, toggleFollowArtist } = useAuth();

  return (
    <div className="space-y-8 pb-12">
      <SEO 
        title="Chhattisgarhi Artists & Singers – Gulzar Music World"
        description="Profiles and discographies of famous Chhattisgarhi singers, Panthi artists, Karma composers, and music directors."
      />

      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
          <Mic2 className="w-8 h-8 text-amber-400" />
          <span>Chhattisgarhi Artists & Vocalists</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Follow your favorite Chhattisgarhi singers and explore their top hits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {artists.map((artist) => {
          const isFollowing = userProfile?.followedArtists?.includes(artist.id);
          const artistSongs = songs.filter(s => s.artist === artist.name || s.singer.includes(artist.name));

          return (
            <div 
              key={artist.id}
              className="bg-[#14141E] border border-amber-500/20 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 hover:border-amber-500/50 transition-all"
            >
              <img 
                src={artist.imageUrl} 
                alt={artist.name} 
                className="w-24 h-24 rounded-2xl object-cover shrink-0 border-2 border-amber-500/30"
              />

              <div className="space-y-3 flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-white">{artist.name}</h3>
                    <p className="text-xs text-amber-400 font-semibold">{artist.role}</p>
                  </div>

                  <button
                    onClick={() => toggleFollowArtist(artist.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                      isFollowing
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-gold-gradient text-slate-950 font-bold'
                    }`}
                  >
                    {isFollowing ? <UserCheck className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
                    <span>{isFollowing ? 'Following' : 'Follow'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{artist.bio}</p>

                {artistSongs.length > 0 && (
                  <div className="pt-2 border-t border-slate-800 space-y-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Top Song:</p>
                    <div 
                      onClick={() => playSong(artistSongs[0], artistSongs)}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 hover:bg-amber-500/10 cursor-pointer text-xs text-white"
                    >
                      <span className="truncate font-semibold">{artistSongs[0].title}</span>
                      <Play className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
