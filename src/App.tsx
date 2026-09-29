import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { AudioPlayerProvider } from './context/AudioPlayerContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AudioPlayer } from './components/common/AudioPlayer';

import { HomePage } from './pages/HomePage';
import { SongsPage } from './pages/SongsPage';
import { AlbumsPage } from './pages/AlbumsPage';
import { ArtistsPage } from './pages/ArtistsPage';
import { VideosPage } from './pages/VideosPage';
import { StudioPage } from './pages/StudioPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { LegalPage } from './pages/LegalPage';
import { UserPanelPage } from './pages/UserPanelPage';
import { AdminPanelPage } from './pages/AdminPanelPage';

export function MainApp() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-slate-100 flex flex-col font-sans">
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {activeTab === 'home' && (
          <HomePage 
            setActiveTab={setActiveTab} 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
        )}
        {activeTab === 'songs' && (
          <SongsPage 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
        )}
        {activeTab === 'albums' && <AlbumsPage />}
        {activeTab === 'artists' && <ArtistsPage />}
        {activeTab === 'videos' && <VideosPage />}
        {activeTab === 'studio' && <StudioPage />}
        {activeTab === 'gallery' && <GalleryPage />}
        {activeTab === 'about' && <AboutPage />}
        {activeTab === 'legal' && <LegalPage />}
        {activeTab === 'userPanel' && <UserPanelPage />}
        {activeTab === 'admin' && <AdminPanelPage />}
      </main>

      <Footer setActiveTab={setActiveTab} />
      <AudioPlayer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AudioPlayerProvider>
        <MainApp />
      </AudioPlayerProvider>
    </AuthProvider>
  );
}
