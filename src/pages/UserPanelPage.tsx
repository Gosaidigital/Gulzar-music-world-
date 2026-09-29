import React, { useState } from 'react';
import { User, Heart, Disc, Music, Plus, History, Bookmark, LogOut, Play } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMusicData } from '../lib/useMusicData';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { SEO } from '../components/common/SEO';

export const UserPanelPage: React.FC = () => {
  const { 
    currentUser, 
    userProfile, 
    loginWithGoogle, 
    logout, 
    playlists, 
    createPlaylist 
  } = useAuth();

  const { songs, albums, artists } = useMusicData();
  const { playSong } = useAudioPlayer();

  const [activeTab, setActiveTab] = useState<'favorites' | 'playlists' | 'history' | 'saved' | 'following'>('favorites');
  const [newPlaylistTitle, setNewPlaylistTitle] = useState('');
  const [showCreatePlModal, setShowCreatePlModal] = useState(false);

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <User className="w-16 h-16 text-amber-400 mx-auto" />
        <h2 className="text-2xl font-display font-bold text-white">Sign In to Your Account</h2>
        <p className="text-slate-400 text-xs">Access your favorite Chhattisgarhi songs, custom playlists, saved albums, and followed singers.</p>
        <button
          onClick={loginWithGoogle}
          className="px-6 py-3 rounded-xl bg-gold-gradient text-slate-950 font-bold text-sm shadow-xl"
        >
          Sign In with Google
        </button>
      </div>
    );
  }

  const favoriteSongs = songs.filter(s => userProfile?.favorites?.includes(s.id));
  const savedAlbumsList = albums.filter(a => userProfile?.savedAlbums?.includes(a.id));
  const followedArtistsList = artists.filter(a => userProfile?.followedArtists?.includes(a.id));
  const recentlyPlayedList = songs.filter(s => userProfile?.recentlyPlayed?.includes(s.id));

  const handleCreatePl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaylistTitle) return;
    createPlaylist(newPlaylistTitle);
    setNewPlaylistTitle('');
    setShowCreatePlModal(false);
  };

  return (
    <div className="space-y-8 pb-12">
      <SEO 
        title="User Dashboard – Gulzar Music World"
        description="User profile, favorite Chhattisgarhi songs, custom playlists, and saved albums."
      />

      {/* User Header */}
      <div className="bg-[#14141E] border border-amber-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-2xl">
            {userProfile?.displayName?.[0]?.toUpperCase() || <User className="w-8 h-8" />}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{userProfile?.displayName}</h1>
            <p className="text-xs text-slate-400">{currentUser.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-semibold uppercase">
              {userProfile?.role === 'admin' ? 'Administrator' : 'Music Fan Member'}
            </span>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-rose-400 border border-slate-800 text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {[
          { id: 'favorites', label: `Favorites (${favoriteSongs.length})`, icon: Heart },
          { id: 'playlists', label: `Playlists (${playlists.length})`, icon: Music },
          { id: 'history', label: `Recently Played (${recentlyPlayedList.length})`, icon: History },
          { id: 'saved', label: `Saved Albums (${savedAlbumsList.length})`, icon: Bookmark },
          { id: 'following', label: `Followed Artists (${followedArtistsList.length})`, icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gold-gradient text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'favorites' && (
        <div className="space-y-2">
          {favoriteSongs.map((song) => (
            <div 
              key={song.id}
              onClick={() => playSong(song, favoriteSongs)}
              className="flex items-center justify-between p-3 rounded-xl bg-[#14141E] border border-slate-800 hover:border-amber-500/30 cursor-pointer text-xs"
            >
              <div className="flex items-center gap-3">
                <img src={song.coverUrl} alt={song.title} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <p className="font-bold text-white">{song.title}</p>
                  <p className="text-slate-400 text-[10px]">{song.singer}</p>
                </div>
              </div>
              <Play className="w-4 h-4 text-amber-400" />
            </div>
          ))}

          {favoriteSongs.length === 0 && (
            <p className="text-xs text-slate-500 text-center py-12">No favorite songs added yet. Click the heart icon on any song!</p>
          )}
        </div>
      )}

      {activeTab === 'playlists' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setShowCreatePlModal(true)}
              className="px-4 py-2 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Playlist</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {playlists.map((pl) => (
              <div key={pl.id} className="bg-[#14141E] border border-amber-500/20 rounded-2xl p-4 space-y-2">
                <h3 className="font-bold text-white text-sm">{pl.title}</h3>
                <p className="text-xs text-slate-400">{pl.songIds.length} Tracks</p>
              </div>
            ))}
          </div>

          {playlists.length === 0 && (
            <p className="text-xs text-slate-500 text-center py-12">No custom playlists created yet.</p>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-2">
          {recentlyPlayedList.map((song) => (
            <div 
              key={song.id}
              onClick={() => playSong(song, recentlyPlayedList)}
              className="flex items-center justify-between p-3 rounded-xl bg-[#14141E] border border-slate-800 hover:border-amber-500/30 cursor-pointer text-xs"
            >
              <div className="flex items-center gap-3">
                <img src={song.coverUrl} alt={song.title} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <p className="font-bold text-white">{song.title}</p>
                  <p className="text-slate-400 text-[10px]">{song.singer}</p>
                </div>
              </div>
              <Play className="w-4 h-4 text-amber-400" />
            </div>
          ))}

          {recentlyPlayedList.length === 0 && (
            <p className="text-xs text-slate-500 text-center py-12">No play history recorded yet.</p>
          )}
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {savedAlbumsList.map((alb) => (
            <div key={alb.id} className="bg-[#14141E] border border-amber-500/20 rounded-2xl p-3 space-y-2">
              <img src={alb.coverUrl} alt={alb.title} className="w-full aspect-square rounded-xl object-cover" />
              <h4 className="font-bold text-white text-xs truncate">{alb.title}</h4>
              <p className="text-[10px] text-slate-400">{alb.artist}</p>
            </div>
          ))}

          {savedAlbumsList.length === 0 && (
            <p className="text-xs text-slate-500 text-center col-span-3 py-12">No saved albums yet.</p>
          )}
        </div>
      )}

      {activeTab === 'following' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {followedArtistsList.map((art) => (
            <div key={art.id} className="bg-[#14141E] border border-amber-500/20 rounded-2xl p-4 text-center space-y-2">
              <img src={art.imageUrl} alt={art.name} className="w-16 h-16 rounded-full mx-auto object-cover border border-amber-500/30" />
              <h4 className="font-bold text-white text-xs truncate">{art.name}</h4>
              <p className="text-[10px] text-amber-400">{art.role}</p>
            </div>
          ))}

          {followedArtistsList.length === 0 && (
            <p className="text-xs text-slate-500 text-center col-span-3 py-12">No artists followed yet.</p>
          )}
        </div>
      )}

      {/* Create Playlist Modal */}
      {showCreatePlModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161622] border border-amber-500/30 rounded-2xl p-6 max-w-sm w-full space-y-4">
            <h3 className="font-bold text-white text-base">Create New Playlist</h3>
            <form onSubmit={handleCreatePl} className="space-y-3 text-xs">
              <input 
                type="text"
                required
                placeholder="Playlist Title (e.g. My Panthi Favorites)"
                value={newPlaylistTitle}
                onChange={(e) => setNewPlaylistTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400"
              />
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreatePlModal(false)}
                  className="px-3 py-2 rounded-lg text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gold-gradient text-slate-950 font-bold"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
