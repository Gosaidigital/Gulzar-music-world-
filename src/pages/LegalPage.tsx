import React, { useState } from 'react';
import { Shield, FileText, Lock, AlertTriangle, Copyright, RefreshCw, Key, Scale } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const LegalPage: React.FC = () => {
  const [activePolicy, setActivePolicy] = useState<string>('privacy');

  const policies = [
    { id: 'privacy', title: 'Privacy Policy', icon: Lock },
    { id: 'terms', title: 'Terms & Conditions', icon: Scale },
    { id: 'disclaimer', title: 'Disclaimer', icon: AlertTriangle },
    { id: 'cookie', title: 'Cookie Policy', icon: FileText },
    { id: 'copyright', title: 'Copyright Policy', icon: Copyright },
    { id: 'dmca', title: 'DMCA / Copyright Complaint', icon: Shield },
    { id: 'refund', title: 'Refund & Cancellation', icon: RefreshCw },
    { id: 'licensing', title: 'Music Licensing Policy', icon: Key },
    { id: 'usage', title: 'Content Usage Policy', icon: FileText },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <SEO 
        title="Legal Policies & Disclaimers – Gulzar Music World"
        description="Official legal terms, privacy policy, DMCA copyright complaint process, music licensing, and content usage policies for Gulzar Music World."
      />

      <div className="text-center mb-10">
        <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
          Legal Framework
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
          Policies & Compliance
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
          Read our official terms regarding Chhattisgarhi music distribution, studio booking rules, copyrights, and privacy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar Tabs */}
        <div className="space-y-1.5 md:col-span-1">
          {policies.map((p) => {
            const Icon = p.icon;
            const isActive = activePolicy === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePolicy(p.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-all ${
                  isActive
                    ? 'bg-gold-gradient text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span className="truncate">{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content Box */}
        <div className="md:col-span-3 bg-[#14141C] border border-amber-500/20 rounded-2xl p-6 sm:p-8 text-slate-300 text-sm leading-relaxed space-y-6">
          
          {activePolicy === 'privacy' && (
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">Privacy Policy</h2>
              <p>Gulzar Music World ("we", "our", or "us") respects your privacy. This policy outlines how we collect, use, and safeguard personal information when you visit our website, sign up for an account, or book studio recording sessions.</p>
              <h3 className="text-base font-bold text-amber-400 mt-4 mb-2">1. Data We Collect</h3>
              <p>We collect information you provide directly, such as your name, email address, phone number, and studio booking details via Google Auth or direct forms.</p>
              <h3 className="text-base font-bold text-amber-400 mt-4 mb-2">2. How We Use Data</h3>
              <p>We use your information to facilitate studio bookings, customize your favorite song playlists, provide updates on Chhattisgarhi music releases, and ensure site security.</p>
            </div>
          )}

          {activePolicy === 'terms' && (
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">Terms & Conditions</h2>
              <p>By accessing Gulzar Music World, you agree to comply with these Terms & Conditions. All Chhattisgarhi audio tracks, lyrics, album art, and video content are protected intellectual property.</p>
              <h3 className="text-base font-bold text-amber-400 mt-4 mb-2">1. Account Security</h3>
              <p>You are responsible for maintaining the confidentiality of your login credentials.</p>
              <h3 className="text-base font-bold text-amber-400 mt-4 mb-2">2. Prohibited Uses</h3>
              <p>Commercial re-distribution, unauthorized copying, or scraping of audio files is strictly prohibited without written consent from Gulzar Music World.</p>
            </div>
          )}

          {activePolicy === 'disclaimer' && (
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">Disclaimer</h2>
              <p>The information and audio streams on Gulzar Music World are provided "as is". While we strive for absolute audio clarity and accuracy in lyrics, we make no guarantees regarding uninterrupted availability.</p>
            </div>
          )}

          {activePolicy === 'cookie' && (
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">Cookie Policy</h2>
              <p>We use cookies and local browser storage to remember your audio player volume, dark theme preferences, session authentication token, and recently played songs.</p>
            </div>
          )}

          {activePolicy === 'copyright' && (
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">Copyright Policy</h2>
              <p>All music recordings, Panthi geet, Karma compositions, Dadariya lyrics, and album artworks presented on Gulzar Music World are copyrighted under the Indian Copyright Act, 1957.</p>
            </div>
          )}

          {activePolicy === 'dmca' && (
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">DMCA & Copyright Complaints</h2>
              <p>If you believe that your copyrighted musical work has been used on our platform without authorization, please submit a written DMCA takedown notice to <strong>copyright@gulzarmusicworld.com</strong> with:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2 text-slate-400">
                <li>Identification of the copyrighted work claimed to be infringed.</li>
                <li>Exact URL or track title on Gulzar Music World.</li>
                <li>Your contact details and a statement of good faith belief.</li>
              </ul>
            </div>
          )}

          {activePolicy === 'refund' && (
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">Refund & Cancellation Policy</h2>
              <p>Studio recording bookings can be cancelled or rescheduled up to 48 hours prior to the booked slot for a 100% refund or studio credit. Cancellations within 24 hours incur a 30% slot retention fee.</p>
            </div>
          )}

          {activePolicy === 'licensing' && (
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">Music Licensing Policy</h2>
              <p>For commercial sync licensing (movies, TV commercials, radio broadcast, YouTube content ID whitelisting), please contact our licensing department at <strong>licensing@gulzarmusicworld.com</strong>.</p>
            </div>
          )}

          {activePolicy === 'usage' && (
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">Content Usage Policy</h2>
              <p>Short 15-second audio excerpts may be used in personal non-commercial social media reels provided proper artist attribution ("Music by Gulzar Music World") is visibly tagged.</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
