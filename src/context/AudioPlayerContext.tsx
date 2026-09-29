import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Song } from '../types';
import { useAuth } from './AuthContext';

interface AudioPlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  showLyrics: boolean;
  queue: Song[];
  playSong: (song: Song, playlistQueue?: Song[]) => void;
  togglePlayPause: () => void;
  seekTo: (time: number) => void;
  setVolume: (vol: number) => void;
  playNext: () => void;
  playPrev: () => void;
  setShowLyrics: (show: boolean) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.8);
  const [showLyrics, setShowLyrics] = useState<boolean>(false);
  const [queue, setQueue] = useState<Song[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { addToRecentlyPlayed } = useAuth();

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  const playSong = (song: Song, playlistQueue?: Song[]) => {
    if (!audioRef.current) return;

    if (playlistQueue && playlistQueue.length > 0) {
      setQueue(playlistQueue);
    }

    setCurrentSong(song);
    audioRef.current.src = song.audioUrl;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
      addToRecentlyPlayed(song.id);
    }).catch(err => {
      console.warn("Audio play prevented or errored:", err);
      setIsPlaying(true); // fall through so visual state reflects user intention
    });
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !currentSong) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Audio play failed:", err);
      });
    }
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolume = (vol: number) => {
    setVolumeState(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const playNext = () => {
    if (!currentSong || queue.length === 0) return;
    const currentIndex = queue.findIndex(s => s.id === currentSong.id);
    if (currentIndex !== -1 && currentIndex < queue.length - 1) {
      playSong(queue[currentIndex + 1]);
    } else if (queue.length > 0) {
      playSong(queue[0]); // Loop around
    }
  };

  const playPrev = () => {
    if (!currentSong || queue.length === 0) return;
    const currentIndex = queue.findIndex(s => s.id === currentSong.id);
    if (currentIndex > 0) {
      playSong(queue[currentIndex - 1]);
    } else {
      playSong(queue[queue.length - 1]);
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        showLyrics,
        queue,
        playSong,
        togglePlayPause,
        seekTo,
        setVolume,
        playNext,
        playPrev,
        setShowLyrics
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
  return context;
};
