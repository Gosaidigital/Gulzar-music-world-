import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Sparkles, 
  Disc, 
  Mic2, 
  Video, 
  Heart, 
  FileText, 
  ArrowRight, 
  Calendar, 
  Radio, 
  Music, 
  CheckCircle2, 
  SlidersHorizontal 
} from 'lucide-react';
import { useMusicData } from '../lib/useMusicData';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { useAuth } from '../context/AuthContext';
import { Song, SongCategory } from '../types';
import { SEO } from '../components/common/SEO';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveTab,
  selectedCategory,
  setSelectedCategory
}) => {
  const { songs, albums, artists, videos, gallery, createBooking } = useMusicData();
  const { currentSong, isPlaying, playSong, togglePlayPause, setShowLyrics } = useAudioPlayer();
  const { userProfile, toggleFavoriteSong } = useAuth();

  const [bookingService, setBookingService] = useState<string>('Song Recording');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('10:00 AM');
  const [bookingName, setBookingName] = useState<string>('');
  const [bookingPhone, setBookingPhone] = useState<string>('');
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const categories: SongCategory[] = ['CG Song', 'Panthi Song', 'Karma Song', 'Dadariya', 'Bhakti Geet', 'Album Song'];

  const filteredSongs = selectedCategory === 'All'
    ? songs
    : songs.filter(s => s.category === selectedCategory);

  const featuredSong = songs.find(s => s.isFeatured) || songs[0];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone || !bookingDate) return;

    await createBooking({
      userName: bookingName,
      userEmail: userProfile?.email || 'guest@gulzarmusicworld.com',
      userPhone: bookingPhone,
      serviceType: bookingService as any,
      preferredDate: bookingDate,
      preferredTime: bookingTime,
      notes: bookingNotes
    });

    setBookingSuccess(true);
    setBookingName('');
    setBookingPhone('');
    setBookingNotes('');
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  return (
    <div className="space-y-16 pb-12">
      <SEO 
        title="Gulzar Music World – Chhattisgarhi Music & Studio Platform"
        description="Official platform for Gulzar Music World. Listen to Chhattisgarhi Songs, Panthi, Karma, Dadariya, Bhakti Geet, Album Songs, Music Videos, and book professional recording studio services."
      />

      {/* Hero Section */}
      <section className="relative min-h-[500px] lg:min-h-[580px] rounded-3xl overflow-hidden border border-amber-500/25 bg-[#0F0F16] flex items-center shadow-2xl">
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&auto=format&fit=crop&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0E] via-[#0B0B0E]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E] via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide">
              <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Chhattisgarhi Music • Studio • Audio • Video</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white leading-tight tracking-tight">
              Pure <span className="text-gold-gradient">Chhattisgarhi</span> Melodies & Recording Studio
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Experience authentic Chhattisgarhi folk, spiritual Panthi geet, energetic Karma, romantic Dadariya, and divine Jasgeet. Book state-of-the-art studio recording in Raipur.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {featuredSong && (
                <button
                  onClick={() => playSong(featuredSong, songs)}
                  className="px-6 py-3.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-sm flex items-center gap-2.5 shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Play Featured Track</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('studio')}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 text-white hover:text-amber-300 font-bold text-sm border border-amber-500/30 hover:border-amber-500/60 flex items-center gap-2 transition-all"
              >
                <Mic2 className="w-4 h-4 text-amber-400" />
                <span>Book Recording Studio</span>
              </button>
            </div>
          </div>

          {/* Featured Song Hero Card */}
          {featuredSong && (
            <div className="lg:col-span-5">
              <div className="bg-[#161622]/80 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-5 shadow-2xl space-y-4">
                <div className="relative aspect-square rounded-xl overflow-hidden group">
                  <img 
                    src={featuredSong.coverUrl} 
                    alt={featuredSong.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/90 text-slate-950 font-bold text-[10px] uppercase tracking-wider">
                      {featuredSong.category}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-display font-bold text-white truncate">{featuredSong.title}</h3>
                  <p className="text-xs text-amber-400 font-medium">{featuredSong.singer}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <button
                    onClick={() => {
                      if (currentSong?.id === featuredSong.id) togglePlayPause();
                      else playSong(featuredSong, songs);
                    }}
                    className="px-4 py-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-2 transition-all"
                  >
                    {currentSong?.id === featuredSong.id && isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-amber-300" />}
                    <span>{currentSong?.id === featuredSong.id && isPlaying ? 'Pause Track' : 'Listen Now'}</span>
                  </button>

                  <button
                    onClick={() => {
                      playSong(featuredSong);
                      setShowLyrics(true);
                    }}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>View Lyrics</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Category Pills Filter Bar */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Disc className="w-5 h-5 text-amber-400" />
            <span>Explore Chhattisgarhi Categories</span>
          </h2>
          <button 
            onClick={() => setActiveTab('songs')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>View All Songs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-gold-gradient text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            All Tracks
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gold-gradient text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Songs Grid / Catalog */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSongs.map((song) => {
            const isCurr = currentSong?.id === song.id;
            const isFav = userProfile?.favorites?.includes(song.id);

            return (
              <div 
                key={song.id}
                className={`bg-[#14141E] border rounded-2xl p-4 flex items-center gap-4 transition-all hover:border-amber-500/50 group ${
                  isCurr ? 'border-amber-500 bg-amber-500/5' : 'border-amber-500/15'
                }`}
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <img 
                    src={song.coverUrl} 
                    alt={song.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <button
                    onClick={() => playSong(song, songs)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-amber-400"
                  >
                    {isCurr && isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-amber-400" />}
                  </button>
                </div>

                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-0.5">
                    {song.category}
                  </span>
                  <h4 className="text-sm font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                    {song.title}
                  </h4>
                  <p className="text-xs text-slate-400 truncate">{song.singer}</p>
                </div>

                <button
                  onClick={() => toggleFavoriteSong(song.id)}
                  className="p-2 text-slate-500 hover:text-rose-500 transition-colors shrink-0"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Latest Albums Showcase */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Disc className="w-5 h-5 text-amber-400" />
            <span>Chhattisgarhi Music Albums</span>
          </h2>
          <button 
            onClick={() => setActiveTab('albums')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>View All Albums</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {albums.map((alb) => (
            <div 
              key={alb.id}
              onClick={() => setActiveTab('albums')}
              className="bg-[#14141E] border border-amber-500/15 rounded-2xl p-3 space-y-3 hover:border-amber-500/50 cursor-pointer transition-all group"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <img 
                  src={alb.coverUrl} 
                  alt={alb.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-amber-400 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                  {alb.category}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                  {alb.title}
                </h4>
                <p className="text-xs text-slate-400 truncate">{alb.artist}</p>
                <p className="text-[10px] text-slate-500 mt-1">{alb.trackCount} Tracks • {alb.releaseDate}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Artists */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Mic2 className="w-5 h-5 text-amber-400" />
            <span>Chhattisgarhi Artists & Singers</span>
          </h2>
          <button 
            onClick={() => setActiveTab('artists')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>Explore Artists</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {artists.map((art) => (
            <div 
              key={art.id}
              onClick={() => setActiveTab('artists')}
              className="bg-[#14141E] border border-amber-500/15 rounded-2xl p-4 text-center hover:border-amber-500/50 cursor-pointer transition-all group space-y-3"
            >
              <img 
                src={art.imageUrl} 
                alt={art.name} 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto object-cover border-2 border-amber-500/30 group-hover:scale-105 transition-transform"
              />
              <div>
                <h4 className="text-sm font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                  {art.name}
                </h4>
                <p className="text-[11px] text-amber-400 font-medium truncate">{art.role}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{art.followersCount.toLocaleString()} Fans</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Music Videos Section */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-amber-400" />
            <span>Official Chhattisgarhi Videos</span>
          </h2>
          <button 
            onClick={() => setActiveTab('videos')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>Watch All Videos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {videos.map((vid) => (
            <div 
              key={vid.id}
              onClick={() => setActiveTab('videos')}
              className="bg-[#14141E] border border-amber-500/15 rounded-2xl overflow-hidden hover:border-amber-500/50 cursor-pointer transition-all group"
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
              <div className="p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  {vid.category}
                </span>
                <h4 className="text-sm font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                  {vid.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1">{vid.artist} • {vid.viewsCount.toLocaleString()} views</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recording Studio Booking Section */}
      <section className="bg-gradient-to-r from-[#141420] via-[#1A1A28] to-[#141420] border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-wider border border-amber-500/20">
              Gulzar Studio Raipur
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Book Professional Recording Studio
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Record lead vocals, Panthi dholak, Karma mandhar, or get Dolby Atmos stereo mixing & mastering with experienced audio engineers.
            </p>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Neumann & Tube Microphones</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>SSL Analog Console & Acoustic Isolation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Video Shooting & Dubbing Services</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7 bg-[#0E0E14] border border-amber-500/20 rounded-2xl p-6 shadow-xl">
            {bookingSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Booking Inquiry Submitted!</h3>
                <p className="text-xs text-slate-400">Our studio manager will call you back shortly to confirm your recording slot.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Select Service</label>
                  <select 
                    value={bookingService} 
                    onChange={(e) => setBookingService(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Song Recording">Song Vocal Recording</option>
                    <option value="Mixing & Mastering">Mixing & Mastering</option>
                    <option value="Album Production">Full Album Production</option>
                    <option value="Music Video Shooting">Music Video Shooting</option>
                    <option value="Voiceover / Dubbing">Voiceover / Dubbing</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder="Singer or Band Name"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      placeholder="+91 Mobile No."
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Preferred Date</label>
                    <input 
                      type="date" 
                      required 
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Preferred Time</label>
                    <select 
                      value={bookingTime} 
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="10:00 AM">10:00 AM - Morning Slot</option>
                      <option value="02:00 PM">02:00 PM - Afternoon Slot</option>
                      <option value="06:00 PM">06:00 PM - Evening Slot</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gold-gradient text-slate-950 font-bold text-sm shadow-lg hover:scale-[1.02] transition-transform mt-2"
                >
                  Submit Recording Inquiry
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};
