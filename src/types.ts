export type SongCategory = 
  | 'CG Song'
  | 'Panthi Song'
  | 'Karma Song'
  | 'Dadariya'
  | 'Bhakti Geet'
  | 'Album Song';

export interface Song {
  id: string;
  title: string;
  singer: string;
  artist: string;
  category: SongCategory;
  albumId?: string;
  albumName?: string;
  coverUrl: string;
  audioUrl: string;
  youtubeUrl?: string;
  lyrics?: string;
  releaseDate: string;
  duration: string;
  playsCount: number;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  isFeatured?: boolean;
  createdAt: string;
}

export interface Album {
  id: string;
  title: string;
  coverUrl: string;
  artist: string;
  category: SongCategory;
  releaseDate: string;
  description: string;
  trackCount: number;
  featured?: boolean;
  createdAt: string;
}

export interface Artist {
  id: string;
  name: string;
  role: string; // e.g. "Lead Singer", "Music Director", "Composer"
  imageUrl: string;
  bio: string;
  category?: string;
  followersCount: number;
  popularSongs?: string[];
  featured?: boolean;
  createdAt: string;
}

export interface Video {
  id: string;
  title: string;
  youtubeUrl: string;
  youtubeId: string;
  thumbnailUrl: string;
  category: SongCategory;
  artist: string;
  viewsCount: number;
  releaseDate: string;
  description: string;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: 'Studio' | 'Recording' | 'Live Event' | 'Artist Shoot';
  caption?: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  userId?: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  serviceType: 'Song Recording' | 'Mixing & Mastering' | 'Album Production' | 'Music Video Shooting' | 'Voiceover / Dubbing';
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'New' | 'In Progress' | 'Resolved';
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'user';
  favorites?: string[]; // song IDs
  savedAlbums?: string[]; // album IDs
  followedArtists?: string[]; // artist IDs
  recentlyPlayed?: string[]; // song IDs
  createdAt: string;
}

export interface Playlist {
  id: string;
  title: string;
  description?: string;
  songIds: string[];
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  coverUrl: string;
  content: string;
  author: string;
  category: string;
  createdAt: string;
}
