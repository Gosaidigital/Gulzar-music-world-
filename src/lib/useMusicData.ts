import { useEffect, useState } from 'react';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { Album, Artist, BlogPost, Booking, ContactMessage, GalleryItem, Song, Video } from '../types';
import { 
  INITIAL_ALBUMS, 
  INITIAL_ARTISTS, 
  INITIAL_BLOGS, 
  INITIAL_GALLERY, 
  INITIAL_SONGS, 
  INITIAL_VIDEOS 
} from './initialData';

export function useMusicData() {
  const [songs, setSongs] = useState<Song[]>(INITIAL_SONGS);
  const [albums, setAlbums] = useState<Album[]>(INITIAL_ALBUMS);
  const [artists, setArtists] = useState<Artist[]>(INITIAL_ARTISTS);
  const [videos, setVideos] = useState<Video[]>(INITIAL_VIDEOS);
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Songs listener
    const unsubSongs = onSnapshot(collection(db, 'songs'), (snapshot) => {
      if (!snapshot.empty) {
        const loaded: Song[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Song));
        setSongs(loaded);
      }
    }, (err) => console.warn('Songs listener warning:', err?.message || err));

    // Albums listener
    const unsubAlbums = onSnapshot(collection(db, 'albums'), (snapshot) => {
      if (!snapshot.empty) {
        const loaded: Album[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Album));
        setAlbums(loaded);
      }
    }, (err) => console.warn('Albums listener warning:', err?.message || err));

    // Artists listener
    const unsubArtists = onSnapshot(collection(db, 'artists'), (snapshot) => {
      if (!snapshot.empty) {
        const loaded: Artist[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Artist));
        setArtists(loaded);
      }
    }, (err) => console.warn('Artists listener warning:', err?.message || err));

    // Videos listener
    const unsubVideos = onSnapshot(collection(db, 'videos'), (snapshot) => {
      if (!snapshot.empty) {
        const loaded: Video[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Video));
        setVideos(loaded);
      }
    }, (err) => console.warn('Videos listener warning:', err?.message || err));

    // Gallery listener
    const unsubGallery = onSnapshot(collection(db, 'gallery'), (snapshot) => {
      if (!snapshot.empty) {
        const loaded: GalleryItem[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryItem));
        setGallery(loaded);
      }
    }, (err) => console.warn('Gallery listener warning:', err?.message || err));

    // Bookings listener
    const unsubBookings = onSnapshot(collection(db, 'bookings'), (snapshot) => {
      const loaded: Booking[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
      setBookings(loaded);
    }, () => {});

    // Contacts listener
    const unsubContacts = onSnapshot(collection(db, 'contacts'), (snapshot) => {
      const loaded: ContactMessage[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactMessage));
      setContacts(loaded);
    }, () => {});

    setLoading(false);

    return () => {
      unsubSongs();
      unsubAlbums();
      unsubArtists();
      unsubVideos();
      unsubGallery();
      unsubBookings();
      unsubContacts();
    };
  }, []);

  // Song CRUD
  const addSong = async (song: Omit<Song, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'songs'), song);
      const newSong = { id: docRef.id, ...song };
      setSongs(prev => [newSong, ...prev]);
    } catch (err) {
      setSongs(prev => [{ id: `song-${Date.now()}`, ...song }, ...prev]);
    }
  };

  const updateSong = async (id: string, updates: Partial<Song>) => {
    try {
      await updateDoc(doc(db, 'songs', id), updates);
    } catch (err) {}
    setSongs(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteSong = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'songs', id));
    } catch (err) {}
    setSongs(prev => prev.filter(s => s.id !== id));
  };

  // Album CRUD
  const addAlbum = async (album: Omit<Album, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'albums'), album);
      setAlbums(prev => [{ id: docRef.id, ...album }, ...prev]);
    } catch (err) {
      setAlbums(prev => [{ id: `alb-${Date.now()}`, ...album }, ...prev]);
    }
  };

  const updateAlbum = async (id: string, updates: Partial<Album>) => {
    try {
      await updateDoc(doc(db, 'albums', id), updates);
    } catch (err) {}
    setAlbums(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const deleteAlbum = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'albums', id));
    } catch (err) {}
    setAlbums(prev => prev.filter(a => a.id !== id));
  };

  // Artist CRUD
  const addArtist = async (artist: Omit<Artist, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'artists'), artist);
      setArtists(prev => [{ id: docRef.id, ...artist }, ...prev]);
    } catch (err) {
      setArtists(prev => [{ id: `art-${Date.now()}`, ...artist }, ...prev]);
    }
  };

  const updateArtist = async (id: string, updates: Partial<Artist>) => {
    try {
      await updateDoc(doc(db, 'artists', id), updates);
    } catch (err) {}
    setArtists(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const deleteArtist = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'artists', id));
    } catch (err) {}
    setArtists(prev => prev.filter(a => a.id !== id));
  };

  // Video CRUD
  const addVideo = async (video: Omit<Video, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'videos'), video);
      setVideos(prev => [{ id: docRef.id, ...video }, ...prev]);
    } catch (err) {
      setVideos(prev => [{ id: `vid-${Date.now()}`, ...video }, ...prev]);
    }
  };

  const deleteVideo = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'videos', id));
    } catch (err) {}
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  // Gallery CRUD
  const addGalleryItem = async (item: Omit<GalleryItem, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'gallery'), item);
      setGallery(prev => [{ id: docRef.id, ...item }, ...prev]);
    } catch (err) {
      setGallery(prev => [{ id: `gal-${Date.now()}`, ...item }, ...prev]);
    }
  };

  const deleteGalleryItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'gallery', id));
    } catch (err) {}
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  // Booking CRUD
  const createBooking = async (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking = {
      ...booking,
      status: 'Pending' as const,
      createdAt: new Date().toISOString()
    };
    try {
      const docRef = await addDoc(collection(db, 'bookings'), newBooking);
      setBookings(prev => [{ id: docRef.id, ...newBooking }, ...prev]);
    } catch (err) {
      setBookings(prev => [{ id: `book-${Date.now()}`, ...newBooking }, ...prev]);
    }
  };

  const updateBookingStatus = async (id: string, status: Booking['status']) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { status });
    } catch (err) {}
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const deleteBooking = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'bookings', id));
    } catch (err) {}
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  // Contact CRUD
  const createContactMessage = async (contact: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const newContact = {
      ...contact,
      status: 'New' as const,
      createdAt: new Date().toISOString()
    };
    try {
      const docRef = await addDoc(collection(db, 'contacts'), newContact);
      setContacts(prev => [{ id: docRef.id, ...newContact }, ...prev]);
    } catch (err) {
      setContacts(prev => [{ id: `cnt-${Date.now()}`, ...newContact }, ...prev]);
    }
  };

  const updateContactStatus = async (id: string, status: ContactMessage['status']) => {
    try {
      await updateDoc(doc(db, 'contacts', id), { status });
    } catch (err) {}
    setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  const deleteContactMessage = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'contacts', id));
    } catch (err) {}
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  return {
    songs,
    albums,
    artists,
    videos,
    gallery,
    blogs,
    bookings,
    contacts,
    loading,
    addSong,
    updateSong,
    deleteSong,
    addAlbum,
    updateAlbum,
    deleteAlbum,
    addArtist,
    updateArtist,
    deleteArtist,
    addVideo,
    deleteVideo,
    addGalleryItem,
    deleteGalleryItem,
    createBooking,
    updateBookingStatus,
    deleteBooking,
    createContactMessage,
    updateContactStatus,
    deleteContactMessage
  };
}
