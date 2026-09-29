import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Music, 
  Disc, 
  Mic2, 
  Video, 
  Camera, 
  Calendar, 
  Mail, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  Eye, 
  Sparkles, 
  Sliders, 
  Key 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMusicData } from '../lib/useMusicData';
import { Song, Album, Artist, SongCategory, Video as VideoType, GalleryItem } from '../types';
import { SEO } from '../components/common/SEO';

export const AdminPanelPage: React.FC = () => {
  const { isAdmin, currentUser, loginWithGoogle } = useAuth();
  const [demoAdminOverride, setDemoAdminToggle] = useState<boolean>(false);

  const { 
    songs, 
    albums, 
    artists, 
    videos, 
    gallery, 
    bookings, 
    contacts, 
    addSong, 
    deleteSong, 
    addAlbum, 
    deleteAlbum, 
    addArtist, 
    deleteArtist,
    addVideo,
    deleteVideo,
    addGalleryItem,
    deleteGalleryItem,
    updateBookingStatus,
    deleteBooking,
    updateContactStatus,
    deleteContactMessage
  } = useMusicData();

  const [adminTab, setAdminTab] = useState<'songs' | 'albums' | 'artists' | 'videos' | 'gallery' | 'bookings' | 'contacts'>('songs');

  // New Song Form State
  const [songTitle, setSongTitle] = useState('');
  const [songSinger, setSongSinger] = useState('');
  const [songArtist, setSongArtist] = useState('');
  const [songCategory, setSongCategory] = useState<SongCategory>('CG Song');
  const [songCover, setSongCover] = useState('');
  const [songAudio, setSongAudio] = useState('');
  const [songLyrics, setSongLyrics] = useState('');
  const [songYoutube, setSongYoutube] = useState('');
  const [showAddSongModal, setShowAddSongModal] = useState(false);

  // New Album Form State
  const [albumTitle, setAlbumTitle] = useState('');
  const [albumArtist, setAlbumArtist] = useState('');
  const [albumCategory, setAlbumCategory] = useState<SongCategory>('CG Song');
  const [albumCover, setAlbumCover] = useState('');
  const [albumDesc, setAlbumDesc] = useState('');
  const [showAddAlbumModal, setShowAddAlbumModal] = useState(false);

  // New Artist Form State
  const [artistName, setArtistName] = useState('');
  const [artistRole, setArtistRole] = useState('Singer & Composer');
  const [artistImage, setArtistImage] = useState('');
  const [artistBio, setArtistBio] = useState('');
  const [showAddArtistModal, setShowAddArtistModal] = useState(false);

  // New Video Form State
  const [videoTitle, setVideoTitle] = useState('');
  const [videoArtist, setVideoArtist] = useState('');
  const [videoCategory, setVideoCategory] = useState<SongCategory>('CG Song');
  const [videoYoutubeUrl, setVideoYoutubeUrl] = useState('');
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);

  // New Gallery Form State
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryImage, setGalleryImage] = useState('');
  const [galleryCategory, setGalleryCategory] = useState<'Studio' | 'Recording' | 'Live Event' | 'Artist Shoot'>('Studio');
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);

  const isEffectiveAdmin = isAdmin || demoAdminOverride;

  if (!isEffectiveAdmin) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <ShieldCheck className="w-16 h-16 text-amber-400 mx-auto" />
        <h2 className="text-2xl font-display font-bold text-white">Admin Portal Sign In</h2>
        <p className="text-slate-400 text-xs leading-relaxed">
          Sign in with your authorized admin Google account or toggle Demo Admin Mode below to manage Gulzar Music World catalog.
        </p>

        <div className="pt-2 flex flex-col gap-3">
          <button
            onClick={loginWithGoogle}
            className="px-6 py-3 rounded-xl bg-gold-gradient text-slate-950 font-bold text-sm shadow-xl"
          >
            Sign In with Google
          </button>

          <button
            onClick={() => setDemoAdminToggle(true)}
            className="px-6 py-2.5 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 font-semibold text-xs hover:bg-slate-800 transition-colors"
          >
            ⚡ Preview Admin Mode (Demo Mode)
          </button>
        </div>
      </div>
    );
  }

  const handleAddSongSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!songTitle || !songSinger) return;

    await addSong({
      title: songTitle,
      singer: songSinger,
      artist: songArtist || songSinger,
      category: songCategory,
      coverUrl: songCover || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      audioUrl: songAudio || 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg',
      lyrics: songLyrics,
      youtubeUrl: songYoutube,
      releaseDate: new Date().toISOString().split('T')[0],
      duration: '04:12',
      playsCount: 0,
      description: `Official ${songCategory} track recorded at Gulzar Studio Raipur.`,
      isFeatured: false,
      createdAt: new Date().toISOString()
    });

    setSongTitle('');
    setSongSinger('');
    setSongArtist('');
    setSongCover('');
    setSongAudio('');
    setSongLyrics('');
    setSongYoutube('');
    setShowAddSongModal(false);
  };

  const handleAddAlbumSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!albumTitle || !albumArtist) return;

    await addAlbum({
      title: albumTitle,
      artist: albumArtist,
      category: albumCategory,
      coverUrl: albumCover || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
      description: albumDesc || 'Chhattisgarhi music album by Gulzar Music World.',
      releaseDate: new Date().toISOString().split('T')[0],
      trackCount: 6,
      featured: false,
      createdAt: new Date().toISOString()
    });

    setAlbumTitle('');
    setAlbumArtist('');
    setAlbumCover('');
    setAlbumDesc('');
    setShowAddAlbumModal(false);
  };

  const handleAddArtistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artistName) return;

    await addArtist({
      name: artistName,
      role: artistRole || 'Lead Singer',
      imageUrl: artistImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
      bio: artistBio || 'Chhattisgarhi folk vocalist.',
      category: 'CG Song',
      followersCount: 1200,
      featured: false,
      createdAt: new Date().toISOString()
    });

    setArtistName('');
    setArtistRole('Singer & Composer');
    setArtistImage('');
    setArtistBio('');
    setShowAddArtistModal(false);
  };

  const handleAddVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle || !videoYoutubeUrl) return;

    let youtubeId = 'dQw4w9WgXcQ';
    if (videoYoutubeUrl.includes('v=')) {
      youtubeId = videoYoutubeUrl.split('v=')[1]?.split('&')[0] || 'dQw4w9WgXcQ';
    } else if (videoYoutubeUrl.includes('youtu.be/')) {
      youtubeId = videoYoutubeUrl.split('youtu.be/')[1]?.split('?')[0] || 'dQw4w9WgXcQ';
    }

    await addVideo({
      title: videoTitle,
      artist: videoArtist || 'Gulzar Music World',
      category: videoCategory,
      youtubeUrl: videoYoutubeUrl,
      youtubeId,
      thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
      viewsCount: 15000,
      releaseDate: new Date().toISOString().split('T')[0],
      description: 'Official Chhattisgarhi Music Video.',
      createdAt: new Date().toISOString()
    });

    setVideoTitle('');
    setVideoArtist('');
    setVideoYoutubeUrl('');
    setShowAddVideoModal(false);
  };

  const handleAddGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle || !galleryImage) return;

    await addGalleryItem({
      title: galleryTitle,
      imageUrl: galleryImage,
      category: galleryCategory,
      createdAt: new Date().toISOString()
    });

    setGalleryTitle('');
    setGalleryImage('');
    setShowAddGalleryModal(false);
  };

  return (
    <div className="space-y-8 pb-12">
      <SEO 
        title="Admin Control Panel – Gulzar Music World"
        description="Full CRUD catalog management for Chhattisgarhi songs, albums, artists, music videos, photo gallery, bookings, and customer contacts."
      />

      {/* Admin Title Header */}
      <div className="bg-[#14141E] border border-amber-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gold-gradient text-slate-950 font-bold flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-display font-bold text-white">Gulzar Studio Admin Portal</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Logged in as {currentUser?.email || 'Authorized Administrator'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {demoAdminOverride && (
            <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase tracking-wider">
              Demo Admin Mode Active
            </span>
          )}
          <button 
            onClick={() => setDemoAdminToggle(!demoAdminOverride)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
          >
            Toggle Mode
          </button>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Songs', count: songs.length, icon: Music, color: 'text-amber-400' },
          { label: 'Albums', count: albums.length, icon: Disc, color: 'text-amber-400' },
          { label: 'Artists', count: artists.length, icon: Mic2, color: 'text-amber-400' },
          { label: 'Videos', count: videos.length, icon: Video, color: 'text-amber-400' },
          { label: 'Bookings', count: bookings.length, icon: Calendar, color: 'text-emerald-400' },
          { label: 'Inquiries', count: contacts.length, icon: Mail, color: 'text-blue-400' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-[#14141E] border border-slate-800 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] uppercase font-bold tracking-wider">{stat.label}</span>
                <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
              </div>
              <p className="text-xl font-mono font-bold text-white">{stat.count}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
        {[
          { id: 'songs', label: `Songs (${songs.length})`, icon: Music },
          { id: 'albums', label: `Albums (${albums.length})`, icon: Disc },
          { id: 'artists', label: `Artists (${artists.length})`, icon: Mic2 },
          { id: 'videos', label: `Videos (${videos.length})`, icon: Video },
          { id: 'gallery', label: `Gallery (${gallery.length})`, icon: Camera },
          { id: 'bookings', label: `Studio Bookings (${bookings.length})`, icon: Calendar },
          { id: 'contacts', label: `Messages (${contacts.length})`, icon: Mail },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = adminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
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

      {/* Songs Tab */}
      {adminTab === 'songs' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white">Chhattisgarhi Songs Catalog ({songs.length})</h3>
            <button
              onClick={() => setShowAddSongModal(true)}
              className="px-4 py-2 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Publish New Song</span>
            </button>
          </div>

          <div className="space-y-2">
            {songs.map((song) => (
              <div 
                key={song.id}
                className="flex items-center justify-between gap-4 p-3 rounded-xl bg-[#14141E] border border-slate-800 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img src={song.coverUrl} alt={song.title} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate">{song.title}</p>
                    <p className="text-slate-400 text-[10px] truncate">{song.singer} • <span className="text-amber-400 font-semibold">{song.category}</span></p>
                  </div>
                </div>

                <button
                  onClick={() => deleteSong(song.id)}
                  className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors shrink-0"
                  title="Delete Song"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Albums Tab */}
      {adminTab === 'albums' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white">Music Albums ({albums.length})</h3>
            <button
              onClick={() => setShowAddAlbumModal(true)}
              className="px-4 py-2 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Album</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {albums.map((alb) => (
              <div key={alb.id} className="bg-[#14141E] border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={alb.coverUrl} alt={alb.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate">{alb.title}</p>
                    <p className="text-slate-400 text-[10px] truncate">{alb.artist} • {alb.category}</p>
                  </div>
                </div>

                <button
                  onClick={() => deleteAlbum(alb.id)}
                  className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Artists Tab */}
      {adminTab === 'artists' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white">Artists & Singers Directory ({artists.length})</h3>
            <button
              onClick={() => setShowAddArtistModal(true)}
              className="px-4 py-2 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Artist Profile</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {artists.map((art) => (
              <div key={art.id} className="bg-[#14141E] border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={art.imageUrl} alt={art.name} className="w-12 h-12 rounded-full object-cover shrink-0 border border-amber-500/30" />
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate">{art.name}</p>
                    <p className="text-amber-400 text-[10px] truncate">{art.role}</p>
                  </div>
                </div>

                <button
                  onClick={() => deleteArtist(art.id)}
                  className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Videos Tab */}
      {adminTab === 'videos' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white">YouTube Music Videos ({videos.length})</h3>
            <button
              onClick={() => setShowAddVideoModal(true)}
              className="px-4 py-2 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Video Embed</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {videos.map((vid) => (
              <div key={vid.id} className="bg-[#14141E] border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={vid.thumbnailUrl} alt={vid.title} className="w-16 h-10 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate">{vid.title}</p>
                    <p className="text-slate-400 text-[10px] truncate">{vid.artist}</p>
                  </div>
                </div>

                <button
                  onClick={() => deleteVideo(vid.id)}
                  className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Tab */}
      {adminTab === 'gallery' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white">Studio Photo Gallery ({gallery.length})</h3>
            <button
              onClick={() => setShowAddGalleryModal(true)}
              className="px-4 py-2 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Photo</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {gallery.map((gal) => (
              <div key={gal.id} className="bg-[#14141E] border border-slate-800 rounded-xl p-2.5 space-y-2 relative group">
                <img src={gal.imageUrl} alt={gal.title} className="w-full aspect-4/3 rounded-lg object-cover" />
                <p className="font-bold text-white text-xs truncate">{gal.title}</p>
                <button
                  onClick={() => deleteGalleryItem(gal.id)}
                  className="absolute top-4 right-4 p-1.5 bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bookings Management Tab */}
      {adminTab === 'bookings' && (
        <div className="space-y-3">
          <h3 className="text-base font-bold text-white">Studio Session Bookings ({bookings.length})</h3>
          {bookings.map((b) => (
            <div key={b.id} className="bg-[#14141E] border border-slate-800 rounded-xl p-4 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{b.userName}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  b.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
                  b.status === 'Completed' ? 'bg-blue-500/20 text-blue-400' :
                  b.status === 'Cancelled' ? 'bg-rose-500/20 text-rose-400' :
                  'bg-amber-500/20 text-amber-400'
                }`}>
                  {b.status}
                </span>
              </div>
              <p className="text-slate-300">Service: <span className="font-semibold text-amber-300">{b.serviceType}</span> | Preferred Date: {b.preferredDate} ({b.preferredTime})</p>
              <p className="text-slate-400">Phone: {b.userPhone} | Email: {b.userEmail}</p>
              {b.notes && <p className="text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800">Notes: {b.notes}</p>}

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div className="flex gap-2">
                  <button 
                    onClick={() => updateBookingStatus(b.id, 'Confirmed')}
                    className="px-3 py-1 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 rounded font-semibold text-[10px]"
                  >
                    Confirm
                  </button>
                  <button 
                    onClick={() => updateBookingStatus(b.id, 'Completed')}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 rounded font-semibold text-[10px]"
                  >
                    Complete
                  </button>
                  <button 
                    onClick={() => updateBookingStatus(b.id, 'Cancelled')}
                    className="px-3 py-1 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 rounded font-semibold text-[10px]"
                  >
                    Cancel
                  </button>
                </div>

                <button
                  onClick={() => deleteBooking(b.id)}
                  className="p-1 text-slate-500 hover:text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {bookings.length === 0 && (
            <p className="text-xs text-slate-500 text-center py-12">No studio bookings submitted yet.</p>
          )}
        </div>
      )}

      {/* Contacts Management Tab */}
      {adminTab === 'contacts' && (
        <div className="space-y-3">
          <h3 className="text-base font-bold text-white">Contact Form Messages ({contacts.length})</h3>
          {contacts.map((c) => (
            <div key={c.id} className="bg-[#14141E] border border-slate-800 rounded-xl p-4 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{c.name} ({c.email})</span>
                <span className="text-amber-400 uppercase font-bold text-[10px]">{c.status}</span>
              </div>
              <p className="font-semibold text-amber-300">{c.subject}</p>
              <p className="text-slate-300 bg-slate-900/60 p-2.5 rounded border border-slate-800">{c.message}</p>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => updateContactStatus(c.id, 'Resolved')}
                  className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded font-semibold text-[10px]"
                >
                  Mark Resolved
                </button>
                <button
                  onClick={() => deleteContactMessage(c.id)}
                  className="p-1 text-slate-500 hover:text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {contacts.length === 0 && (
            <p className="text-xs text-slate-500 text-center py-12">No contact messages received yet.</p>
          )}
        </div>
      )}

      {/* Add Song Modal */}
      {showAddSongModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161622] border border-amber-500/30 rounded-2xl p-6 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-white text-base">Publish New Chhattisgarhi Song</h3>
            <form onSubmit={handleAddSongSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Song Title</label>
                <input 
                  type="text" required value={songTitle} onChange={(e) => setSongTitle(e.target.value)}
                  placeholder="e.g. Tor Surila Maya CG"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Singer Name</label>
                  <input 
                    type="text" required value={songSinger} onChange={(e) => setSongSinger(e.target.value)}
                    placeholder="Gulzar Khan"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Category</label>
                  <select 
                    value={songCategory} onChange={(e) => setSongCategory(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="CG Song">CG Song</option>
                    <option value="Panthi Song">Panthi Song</option>
                    <option value="Karma Song">Karma Song</option>
                    <option value="Dadariya">Dadariya</option>
                    <option value="Bhakti Geet">Bhakti Geet</option>
                    <option value="Album Song">Album Song</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Cover Image URL (Optional)</label>
                <input 
                  type="url" value={songCover} onChange={(e) => setSongCover(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Lyrics (Optional)</label>
                <textarea 
                  rows={3} value={songLyrics} onChange={(e) => setSongLyrics(e.target.value)}
                  placeholder="Paste Chhattisgarhi lyrics here..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" onClick={() => setShowAddSongModal(false)}
                  className="px-3 py-2 rounded-lg text-slate-400"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gold-gradient text-slate-950 font-bold"
                >
                  Publish Song
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Album Modal */}
      {showAddAlbumModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161622] border border-amber-500/30 rounded-2xl p-6 max-w-lg w-full space-y-4">
            <h3 className="font-bold text-white text-base">Create New Music Album</h3>
            <form onSubmit={handleAddAlbumSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Album Title</label>
                <input 
                  type="text" required value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)}
                  placeholder="e.g. Mor Chhattisgarhi Sur Vol 2"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Artist</label>
                  <input 
                    type="text" required value={albumArtist} onChange={(e) => setAlbumArtist(e.target.value)}
                    placeholder="Gulzar Khan"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Category</label>
                  <select 
                    value={albumCategory} onChange={(e) => setAlbumCategory(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
                  >
                    <option value="CG Song">CG Song</option>
                    <option value="Panthi Song">Panthi Song</option>
                    <option value="Karma Song">Karma Song</option>
                    <option value="Dadariya">Dadariya</option>
                    <option value="Bhakti Geet">Bhakti Geet</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Cover Artwork URL</label>
                <input 
                  type="url" value={albumCover} onChange={(e) => setAlbumCover(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddAlbumModal(false)} className="px-3 py-2 text-slate-400">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gold-gradient text-slate-950 font-bold rounded-lg">Create Album</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Artist Modal */}
      {showAddArtistModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161622] border border-amber-500/30 rounded-2xl p-6 max-w-lg w-full space-y-4">
            <h3 className="font-bold text-white text-base">Add Artist Profile</h3>
            <form onSubmit={handleAddArtistSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Artist Name</label>
                <input 
                  type="text" required value={artistName} onChange={(e) => setArtistName(e.target.value)}
                  placeholder="Vocalist Name"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Role</label>
                <input 
                  type="text" value={artistRole} onChange={(e) => setArtistRole(e.target.value)}
                  placeholder="Playback Singer / Music Director"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Profile Photo URL</label>
                <input 
                  type="url" value={artistImage} onChange={(e) => setArtistImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddArtistModal(false)} className="px-3 py-2 text-slate-400">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gold-gradient text-slate-950 font-bold rounded-lg">Save Artist</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Video Modal */}
      {showAddVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161622] border border-amber-500/30 rounded-2xl p-6 max-w-lg w-full space-y-4">
            <h3 className="font-bold text-white text-base">Add YouTube Video Embed</h3>
            <form onSubmit={handleAddVideoSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Video Title</label>
                <input 
                  type="text" required value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="Tor Surila Maya Official Video"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">YouTube URL</label>
                <input 
                  type="url" required value={videoYoutubeUrl} onChange={(e) => setVideoYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddVideoModal(false)} className="px-3 py-2 text-slate-400">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gold-gradient text-slate-950 font-bold rounded-lg">Embed Video</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Gallery Modal */}
      {showAddGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161622] border border-amber-500/30 rounded-2xl p-6 max-w-lg w-full space-y-4">
            <h3 className="font-bold text-white text-base">Add Studio Gallery Photo</h3>
            <form onSubmit={handleAddGallerySubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Photo Title</label>
                <input 
                  type="text" required value={galleryTitle} onChange={(e) => setGalleryTitle(e.target.value)}
                  placeholder="Vocal Booth Recording Session"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Image URL</label>
                <input 
                  type="url" required value={galleryImage} onChange={(e) => setGalleryImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddGalleryModal(false)} className="px-3 py-2 text-slate-400">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gold-gradient text-slate-950 font-bold rounded-lg">Add Photo</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
