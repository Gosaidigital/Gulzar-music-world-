import { Album, Artist, BlogPost, GalleryItem, Song, Video } from '../types';

export const INITIAL_SONGS: Song[] = [
  {
    id: 'song-1',
    title: 'Tor Surila Maya CG',
    singer: 'Gulzar Khan & Alka Chandrakar',
    artist: 'Gulzar Khan',
    category: 'CG Song',
    albumId: 'album-1',
    albumName: 'Mor Chhattisgarhi Sur',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg', // high quality placeholder audio
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    lyrics: `(mukhda)
Tor surila maya mola behkaaye re
Chhattisgarhi sur mahan chhaaye re
Haye re mor cg ke maya
Tola dekh dekh jiyara lalchaaye re...

(antara 1)
Bhanwar jaisan naina tor
Koyal jaisan boli
Pahar jhumar gaaye re
Gulzar ke gana chhaaye re...`,
    releaseDate: '2026-01-15',
    duration: '04:12',
    playsCount: 14200,
    description: 'Sensational Chhattisgarhi duet romantic track recorded at Gulzar Studio Raipur.',
    seoTitle: 'Tor Surila Maya CG Song - Gulzar Music World',
    seoDescription: 'Listen to official Chhattisgarhi romantic duet Tor Surila Maya CG by Gulzar Khan and Alka Chandrakar.',
    isFeatured: true,
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'song-2',
    title: 'Guru Ghasidas Panthi Mahima',
    singer: 'Dukalu Yadav',
    artist: 'Dukalu Yadav',
    category: 'Panthi Song',
    albumId: 'album-2',
    albumName: 'Satnam Panthi Geet Vol 1',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://actions.google.com/sounds/v1/crowds/cheering.ogg',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    lyrics: `Satnam Satnam Guru Ji Tor Naama
Panthi Naache Re Jai Stambh Ke Chaaya
Guru Ghasidas Baba Ke Mahima Apar
Chhattisgarhi Dharti Mahan Jai Satnam...`,
    releaseDate: '2025-12-18',
    duration: '05:45',
    playsCount: 28900,
    description: 'Devotional Panthi Geet celebrating Saint Guru Ghasidas Baba and Satnam message.',
    isFeatured: true,
    createdAt: '2025-12-18T08:00:00Z'
  },
  {
    id: 'song-3',
    title: 'Karma Naach Re Sangwari',
    singer: 'Dilip Shadangi',
    artist: 'Dilip Shadangi',
    category: 'Karma Song',
    albumId: 'album-3',
    albumName: 'Chhattisgarhi Karma Jhumar',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    lyrics: `Mandhar baaje thak thak
Karma jhumar nacho sangwari
Chhattisgarhi mahan bhagoriya Karma
Maati ke khushboo gaaye ri...`,
    releaseDate: '2025-11-05',
    duration: '04:30',
    playsCount: 19800,
    description: 'High energy folk Karma song with traditional mandhar drums and Chhattisgarhi rhythm.',
    isFeatured: true,
    createdAt: '2025-11-05T09:00:00Z'
  },
  {
    id: 'song-4',
    title: 'Dadariya Chhattisgarhi Maya Sur',
    singer: 'Gulzar Khan & Mamta Chandrakar',
    artist: 'Gulzar Khan',
    category: 'Dadariya',
    albumId: 'album-1',
    albumName: 'Mor Chhattisgarhi Sur',
    coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    lyrics: `Aam ke daal mahan koyal kukaye
Dadariya suriya chhati mahan samaye
Mor cg ke maya mahan
Gana suno sangwari...`,
    releaseDate: '2026-02-10',
    duration: '03:55',
    playsCount: 16400,
    description: 'Authentic Chhattisgarhi Dadariya duet celebrating rural love and nature.',
    isFeatured: false,
    createdAt: '2026-02-10T11:00:00Z'
  },
  {
    id: 'song-5',
    title: 'Bamleshwari Mata Bhakti Jasgeet',
    singer: 'Gulzar Khan',
    artist: 'Gulzar Khan',
    category: 'Bhakti Geet',
    albumId: 'album-4',
    albumName: 'Dongargarh Jasgeet',
    coverUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    lyrics: `Dongargarh Mahan Maayi Bamleshwari Viraje
Jasgeet gaaye bhakt sangwari
Mata Rani Ke Charan Mahan
Jai Maayi Bamleshwari...`,
    releaseDate: '2025-10-12',
    duration: '06:10',
    playsCount: 34100,
    description: 'Popular Jasgeet dedicated to Maa Bamleshwari of Dongargarh Chhattisgarh.',
    isFeatured: true,
    createdAt: '2025-10-12T07:00:00Z'
  },
  {
    id: 'song-6',
    title: 'Chhattisgarhi Folk Album Title Track',
    singer: 'Gulzar Khan',
    artist: 'Gulzar Khan',
    category: 'Album Song',
    albumId: 'album-1',
    albumName: 'Mor Chhattisgarhi Sur',
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&auto=format&fit=crop&q=80',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    lyrics: `Mor Chhattisgarhi Sur Mahan
Sabobo sangwari jhum jhum gaave
Gulzar Music World Ke Studio Mahan
CG Sangeet Aage Badhaave...`,
    releaseDate: '2026-02-01',
    duration: '04:05',
    playsCount: 11200,
    description: 'Title track from Mor Chhattisgarhi Sur Album.',
    isFeatured: false,
    createdAt: '2026-02-01T12:00:00Z'
  }
];

export const INITIAL_ALBUMS: Album[] = [
  {
    id: 'album-1',
    title: 'Mor Chhattisgarhi Sur',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    artist: 'Gulzar Khan',
    category: 'CG Song',
    releaseDate: '2026-01-20',
    description: 'Masterpiece Chhattisgarhi folk and contemporary album by Gulzar Music World.',
    trackCount: 8,
    featured: true,
    createdAt: '2026-01-20T10:00:00Z'
  },
  {
    id: 'album-2',
    title: 'Satnam Panthi Geet Vol 1',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    artist: 'Dukalu Yadav',
    category: 'Panthi Song',
    releaseDate: '2025-12-15',
    description: 'Collection of spiritual Panthi geet with authentic dholak and manjeera beats.',
    trackCount: 10,
    featured: true,
    createdAt: '2025-12-15T09:00:00Z'
  },
  {
    id: 'album-3',
    title: 'Chhattisgarhi Karma Jhumar',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    artist: 'Dilip Shadangi',
    category: 'Karma Song',
    releaseDate: '2025-11-01',
    description: 'Energetic festival Karma folk dance songs recorded live in Gulzar Studio.',
    trackCount: 6,
    featured: false,
    createdAt: '2025-11-01T08:00:00Z'
  },
  {
    id: 'album-4',
    title: 'Dongargarh Jasgeet',
    coverUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    artist: 'Gulzar Khan',
    category: 'Bhakti Geet',
    releaseDate: '2025-10-10',
    description: 'Devotional Navratri Jasgeet for Maa Bamleshwari and Mata Danteshwari.',
    trackCount: 7,
    featured: true,
    createdAt: '2025-10-10T07:00:00Z'
  }
];

export const INITIAL_ARTISTS: Artist[] = [
  {
    id: 'artist-1',
    name: 'Gulzar Khan',
    role: 'Lead Singer & Music Director',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    bio: 'Founder of Gulzar Music World, legendary Chhattisgarhi singer and composer with over 15 years of musical heritage.',
    category: 'CG Song / Bhakti Geet',
    followersCount: 85400,
    popularSongs: ['Tor Surila Maya CG', 'Bamleshwari Mata Bhakti Jasgeet'],
    featured: true,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'artist-2',
    name: 'Alka Chandrakar',
    role: 'Playback Singer',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    bio: 'Iconic Chhattisgarhi female folk vocalist renowned for her sweet voice in Dadariya and album songs.',
    category: 'CG Song / Dadariya',
    followersCount: 62100,
    popularSongs: ['Tor Surila Maya CG'],
    featured: true,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'artist-3',
    name: 'Dukalu Yadav',
    role: 'Panthi & Bhakti Maestro',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
    bio: 'Master of Panthi Geet and Jasgeet, performing across India to promote Chhattisgarhi cultural spiritualism.',
    category: 'Panthi Song',
    followersCount: 110200,
    popularSongs: ['Guru Ghasidas Panthi Mahima'],
    featured: true,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'artist-4',
    name: 'Dilip Shadangi',
    role: 'Folk Composer & Lyricist',
    imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80',
    bio: 'Renowned Karma and Suwa dance music composer bringing vibrant Chhattisgarhi folk to young audiences.',
    category: 'Karma Song',
    followersCount: 49800,
    popularSongs: ['Karma Naach Re Sangwari'],
    featured: false,
    createdAt: '2025-01-01T00:00:00Z'
  }
];

export const INITIAL_VIDEOS: Video[] = [
  {
    id: 'vid-1',
    title: 'Tor Surila Maya CG - Official Music Video',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    category: 'CG Song',
    artist: 'Gulzar Khan & Alka Chandrakar',
    viewsCount: 450000,
    releaseDate: '2026-01-25',
    description: 'Official 4K Chhattisgarhi Music Video shot in scenic Chhattisgarh locations.',
    createdAt: '2026-01-25T10:00:00Z'
  },
  {
    id: 'vid-2',
    title: 'Guru Ghasidas Panthi Mahima - Live Studio Performance',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    category: 'Panthi Song',
    artist: 'Dukalu Yadav',
    viewsCount: 780000,
    releaseDate: '2025-12-20',
    description: 'High energy Panthi dance performance recorded live at Gulzar Music World Studio.',
    createdAt: '2025-12-20T08:00:00Z'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Gulzar Studio Main Control Room',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80',
    category: 'Studio',
    caption: 'State of the art SSL analog mixing desk and Neumann studio vocal monitors in Raipur.',
    createdAt: '2026-01-01T10:00:00Z'
  },
  {
    id: 'gal-2',
    title: 'Live Chhattisgarhi Vocal Recording Session',
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=80',
    category: 'Recording',
    caption: 'Gulzar Khan tracking lead vocals with vintage U87 tube microphone.',
    createdAt: '2026-01-05T10:00:00Z'
  },
  {
    id: 'gal-3',
    title: 'Panthi Dholak & Mandhar Tracking Isolation Booth',
    imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&auto=format&fit=crop&q=80',
    category: 'Recording',
    caption: 'Acoustically tuned percussion room for authentic folk instruments.',
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'gal-4',
    title: 'Gulzar Music World Live Concert Raipur',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
    category: 'Live Event',
    caption: 'Mega Chhattisgarhi Sangeet Mahotsav attended by thousands of folk music lovers.',
    createdAt: '2026-02-01T10:00:00Z'
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Evolution of Chhattisgarhi Music: From Folk Mandhar to Modern Digital Studios',
    slug: 'evolution-of-chhattisgarhi-music',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    content: `Chhattisgarhi music holds a deeply spiritual and festive place in the heart of Central India. From ancient Panthi geet performed during Satnam festivals to energetic Karma dance songs and tender Dadariya duets, the melodies reflect rural life, green paddy fields, and tribal heritage.

At Gulzar Music World, we are dedicated to preserving these organic folk textures while elevating production quality with modern digital mastering, tube microphones, and Dolby spatial mixing. Read on to learn how young artists are bringing CG songs to millions on YouTube and digital streaming...`,
    author: 'Gulzar Khan',
    category: 'Culture & Studio',
    createdAt: '2026-02-15T10:00:00Z'
  }
];
