import React from 'react';
import { Music, MapPin, Mail, Phone, Youtube, Heart, Shield } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openLegalPolicy?: (policyKey: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openLegalPolicy }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#07070A] border-t border-amber-500/15 text-slate-400 pt-12 pb-24 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Brand Column */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center text-slate-950 font-bold">
              <Music className="w-4 h-4 fill-slate-950" />
            </div>
            <span className="font-display font-black text-lg text-gold-gradient tracking-wider">
              GULZAR MUSIC WORLD
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Chhattisgarhi Music • Studio • Audio • Video
          </p>
          <p className="text-slate-500 text-[11px] leading-normal">
            Promoting authentic Chhattisgarhi folk music, Panthi, Karma, Dadariya, Jasgeet and modern studio recording in Raipur, Chhattisgarh.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-3 text-amber-400">
            Music Catalog
          </h4>
          <ul className="space-y-2">
            {['CG Song', 'Panthi Song', 'Karma Song', 'Dadariya', 'Bhakti Geet', 'Album Song'].map((cat) => (
              <li key={cat}>
                <button 
                  onClick={() => setActiveTab('songs')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Studio Services */}
        <div>
          <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-3 text-amber-400">
            Studio Services
          </h4>
          <ul className="space-y-2">
            {['Song Recording', 'Mixing & Mastering', 'Album Production', 'Music Video Shoot', 'Voiceover / Dubbing'].map((serv) => (
              <li key={serv}>
                <button 
                  onClick={() => setActiveTab('studio')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {serv}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal & Contact */}
        <div className="space-y-3">
          <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider text-amber-400">
            Legal & Contact
          </h4>
          <div className="space-y-1.5 text-slate-400 text-[11px]">
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Raipur, Chhattisgarh, India 492001</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>contact@gulzarmusicworld.com</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>+91 98261 00000</span>
            </p>
          </div>

          <div className="pt-2">
            <button 
              onClick={() => setActiveTab('legal')}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded-lg border border-amber-500/20 flex items-center gap-1.5 transition-colors font-medium text-xs"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>All 9 Legal Policies & Disclaimers</span>
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <p>© {currentYear} Gulzar Music World. All Rights Reserved.</p>
        <p className="flex items-center gap-1">
          <span>Crafted for Chhattisgarhi Sangeet Lovers</span>
          <Heart className="w-3 h-3 fill-rose-500 text-rose-500 inline" />
        </p>
      </div>
    </footer>
  );
};
