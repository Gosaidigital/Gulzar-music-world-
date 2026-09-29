import React, { useState } from 'react';
import { 
  Music, 
  Disc, 
  User, 
  Search, 
  Heart, 
  LogOut, 
  ShieldCheck, 
  Menu, 
  X, 
  SlidersHorizontal,
  Sparkles,
  BookOpen,
  Camera,
  Film
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery
}) => {
  const { currentUser, userProfile, isAdmin, loginWithGoogle, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const favCount = userProfile?.favorites?.length || 0;

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'songs', label: 'Songs' },
    { id: 'albums', label: 'Albums' },
    { id: 'artists', label: 'Artists' },
    { id: 'videos', label: 'Videos' },
    { id: 'studio', label: 'Studio' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0B0B0E]/90 backdrop-blur-xl border-b border-amber-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Zone 1: Wordmark */}
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 text-left shrink-0 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Music className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <span className="font-display font-black text-lg tracking-wider text-gold-gradient block leading-tight">
                GULZAR
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-semibold block -mt-0.5">
                Music World
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-300">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    isActive 
                      ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30' 
                      : 'hover:text-amber-300 hover:bg-slate-800/40'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Search Button */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-2 text-xs font-medium"
              title="Search Songs, Albums, Artists"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline text-slate-400">Search...</span>
            </button>

            {/* Admin Badge trigger */}
            {isAdmin && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
                  activeTab === 'admin' 
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30' 
                    : 'bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            )}

            {/* User Profile / Auth */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-2 pr-1.5 rounded-full bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-all"
                >
                  <span className="text-xs font-semibold text-slate-200 hidden sm:inline max-w-[100px] truncate">
                    {userProfile?.displayName || 'My Account'}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-xs">
                    {userProfile?.displayName?.[0]?.toUpperCase() || <User className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#16161E] border border-amber-500/20 rounded-xl shadow-2xl p-2 z-50 text-xs">
                    <div className="px-3 py-2 border-b border-slate-800 mb-1">
                      <p className="font-bold text-white truncate">{userProfile?.displayName}</p>
                      <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
                    </div>

                    <button
                      onClick={() => { setActiveTab('userPanel'); setIsUserDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-amber-500/15 hover:text-amber-300 flex items-center justify-between transition-colors"
                    >
                      <span>My User Panel</span>
                      {favCount > 0 && (
                        <span className="bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 text-[10px] rounded-full">
                          {favCount}
                        </span>
                      )}
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => { setActiveTab('admin'); setIsUserDropdownOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-amber-500/15 text-amber-300 font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Admin Dashboard</span>
                      </button>
                    )}

                    <button
                      onClick={() => { logout(); setIsUserDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-500/20 text-rose-400 flex items-center gap-1.5 transition-colors mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="px-3.5 py-1.5 rounded-lg bg-gold-gradient text-slate-950 font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-md shadow-amber-500/20"
              >
                Sign In
              </button>
            )}

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0F0F14] border-b border-amber-500/20 px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { setActiveTab(link.id); setIsMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === link.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => { setActiveTab('legal'); setIsMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-400 hover:bg-slate-800"
            >
              Legal & Policies
            </button>
          </div>
        )}
      </header>

      {/* Global Search Overlay Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 px-4">
          <div className="bg-[#16161E] border border-amber-500/30 rounded-2xl p-4 max-w-xl w-full shadow-2xl relative">
            <div className="flex items-center gap-3 bg-slate-900 px-3 py-2.5 rounded-xl border border-slate-800">
              <Search className="w-5 h-5 text-amber-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search songs, artists, Panthi, Karma, Dadariya..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setActiveTab('songs');
                    setShowSearchModal(false);
                  }
                }}
                className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-slate-500"
              />
              <button onClick={() => setShowSearchModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Press Enter to filter catalog</span>
              <button 
                onClick={() => { setActiveTab('songs'); setShowSearchModal(false); }}
                className="text-amber-400 hover:underline font-semibold"
              >
                View Songs Catalog →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
