import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  User as FirebaseUser 
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';
import { Playlist, UserProfile } from '../types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  isAdmin: boolean;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  toggleFavoriteSong: (songId: string) => Promise<void>;
  toggleSaveAlbum: (albumId: string) => Promise<void>;
  toggleFollowArtist: (artistId: string) => Promise<void>;
  addToRecentlyPlayed: (songId: string) => Promise<void>;
  createPlaylist: (title: string, description?: string) => Promise<void>;
  addSongToPlaylist: (playlistId: string, songId: string) => Promise<void>;
  playlists: Playlist[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAILS = ['tanushkumari47@gmail.com', 'admin@gulzarmusicworld.com'];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const isAdminEmail = ADMIN_EMAILS.includes(user.email || '');

        // Set optimistic profile first
        const defaultProfile: UserProfile = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'Music Fan',
          photoURL: user.photoURL || '',
          role: isAdminEmail ? 'admin' : 'user',
          favorites: [],
          savedAlbums: [],
          followedArtists: [],
          recentlyPlayed: [],
          createdAt: new Date().toISOString()
        };
        setUserProfile(defaultProfile);

        try {
          // Listen to live updates on user profile
          const unsubDoc = onSnapshot(userDocRef, async (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data() as UserProfile;
              if (isAdminEmail && data.role !== 'admin') {
                await updateDoc(userDocRef, { role: 'admin' }).catch(() => {});
                data.role = 'admin';
              }
              setUserProfile(data);
            } else {
              // Create user profile document if missing
              await setDoc(userDocRef, defaultProfile).catch(() => {});
            }
            setLoading(false);
          }, (err) => {
            console.warn("User profile snapshot info:", err?.message || err);
            setLoading(false);
          });

          return () => unsubDoc();
        } catch (err) {
          console.warn("User profile setup info:", err);
          setLoading(false);
        }
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setUserProfile(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleFavoriteSong = async (songId: string) => {
    if (!currentUser || !userProfile) return;
    const currentFavs = userProfile.favorites || [];
    const exists = currentFavs.includes(songId);
    const updatedFavs = exists ? currentFavs.filter(id => id !== songId) : [...currentFavs, songId];

    setUserProfile({ ...userProfile, favorites: updatedFavs });

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { favorites: updatedFavs });
    } catch (err) {
      console.warn("Failed to sync favorite to firestore:", err);
    }
  };

  const toggleSaveAlbum = async (albumId: string) => {
    if (!currentUser || !userProfile) return;
    const currentSaved = userProfile.savedAlbums || [];
    const exists = currentSaved.includes(albumId);
    const updatedSaved = exists ? currentSaved.filter(id => id !== albumId) : [...currentSaved, albumId];

    setUserProfile({ ...userProfile, savedAlbums: updatedSaved });

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { savedAlbums: updatedSaved });
    } catch (err) {
      console.warn("Failed to sync saved album to firestore:", err);
    }
  };

  const toggleFollowArtist = async (artistId: string) => {
    if (!currentUser || !userProfile) return;
    const currentFollowed = userProfile.followedArtists || [];
    const exists = currentFollowed.includes(artistId);
    const updatedFollowed = exists ? currentFollowed.filter(id => id !== artistId) : [...currentFollowed, artistId];

    setUserProfile({ ...userProfile, followedArtists: updatedFollowed });

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { followedArtists: updatedFollowed });
    } catch (err) {
      console.warn("Failed to sync followed artist to firestore:", err);
    }
  };

  const addToRecentlyPlayed = async (songId: string) => {
    if (!currentUser || !userProfile) return;
    const currentRP = userProfile.recentlyPlayed || [];
    const filtered = currentRP.filter(id => id !== songId);
    const updatedRP = [songId, ...filtered].slice(0, 30);

    setUserProfile({ ...userProfile, recentlyPlayed: updatedRP });

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { recentlyPlayed: updatedRP });
    } catch (err) {
      console.warn("Failed to sync recently played:", err);
    }
  };

  const createPlaylist = async (title: string, description?: string) => {
    const newPl: Playlist = {
      id: `pl-${Date.now()}`,
      title,
      description: description || '',
      songIds: [],
      createdAt: new Date().toISOString()
    };
    setPlaylists(prev => [...prev, newPl]);
  };

  const addSongToPlaylist = async (playlistId: string, songId: string) => {
    setPlaylists(prev => prev.map(pl => {
      if (pl.id === playlistId && !pl.songIds.includes(songId)) {
        return { ...pl, songIds: [...pl.songIds, songId] };
      }
      return pl;
    }));
  };

  const isAdmin = userProfile?.role === 'admin' || (currentUser?.email ? ADMIN_EMAILS.includes(currentUser.email) : false);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        isAdmin,
        loading,
        loginWithGoogle,
        logout,
        toggleFavoriteSong,
        toggleSaveAlbum,
        toggleFollowArtist,
        addToRecentlyPlayed,
        createPlaylist,
        addSongToPlaylist,
        playlists
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
