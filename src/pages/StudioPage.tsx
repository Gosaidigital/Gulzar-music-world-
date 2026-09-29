import React, { useState } from 'react';
import { Mic2, Radio, CheckCircle2, Clock, MapPin, Calendar, Check } from 'lucide-react';
import { useMusicData } from '../lib/useMusicData';
import { useAuth } from '../context/AuthContext';
import { SEO } from '../components/common/SEO';

export const StudioPage: React.FC = () => {
  const { createBooking } = useMusicData();
  const { userProfile } = useAuth();

  const [serviceType, setServiceType] = useState<any>('Song Recording');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:00 AM');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBooking({
      userName: name,
      userEmail: email || userProfile?.email || 'guest@gulzarmusicworld.com',
      userPhone: phone,
      serviceType,
      preferredDate,
      preferredTime,
      notes
    });

    setSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
  };

  return (
    <div className="space-y-12 pb-12">
      <SEO 
        title="Gulzar Recording Studio Raipur – Audio & Video Services"
        description="Book professional music recording studio in Raipur Chhattisgarh. State-of-the-art vocal booth, SSL mixing console, tube microphones, and audio mastering."
      />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider">
          Gulzar Recording Studio
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
          State of the Art Audio & Video Studio
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Raipur's premier music production house specializing in Chhattisgarhi folk recording, Panthi percussion, mixing, mastering, and music video shoots.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Song Vocal & Instrument Recording',
            desc: 'Isolated acoustic booths with Neumann U87, Tube Condensers, and SSL preamps.',
            price: '₹1,500 / Hour'
          },
          {
            title: 'Mixing & Digital Mastering',
            desc: 'Analog summing, stereo spatial mastering, and loudness normalization for Spotify & YouTube.',
            price: '₹5,000 / Song'
          },
          {
            title: 'Music Video Production',
            desc: '4K Multi-camera video shoot, cinematic lighting, color grading, and outdoor production.',
            price: '₹25,000 / Project'
          }
        ].map((serv, idx) => (
          <div key={idx} className="bg-[#14141E] border border-amber-500/20 rounded-2xl p-6 space-y-3 hover:border-amber-500/50 transition-all">
            <h3 className="text-lg font-bold text-white">{serv.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{serv.desc}</p>
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-amber-400">
              <span>{serv.price}</span>
              <button 
                onClick={() => setServiceType(serv.title.split(' ')[0] as any)}
                className="hover:underline text-[11px]"
              >
                Book This →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Form Card */}
      <div className="bg-[#141420] border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-2xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-white text-center mb-6">
          Schedule Your Studio Session
        </h2>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">Booking Confirmed!</h3>
            <p className="text-xs text-slate-300">Thank you! Gulzar Music World studio team will call you within 2 hours to confirm your date.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Service Type</label>
              <select 
                value={serviceType} 
                onChange={(e) => setServiceType(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Song Recording">Song Vocal & Percussion Recording</option>
                <option value="Mixing & Mastering">Mixing & Digital Mastering</option>
                <option value="Album Production">Complete Album Production</option>
                <option value="Music Video Shooting">4K Music Video Shoot</option>
                <option value="Voiceover / Dubbing">Voiceover & Dubbing</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Singer or Project Name"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Mobile Phone Number</label>
                <input 
                  type="tel" 
                  required 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 Mobile No."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Preferred Date</label>
                <input 
                  type="date" 
                  required 
                  value={preferredDate} 
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Preferred Time Slot</label>
                <select 
                  value={preferredTime} 
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="10:00 AM">10:00 AM - Morning Slot</option>
                  <option value="02:00 PM">02:00 PM - Afternoon Slot</option>
                  <option value="06:00 PM">06:00 PM - Evening Slot</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Session Notes & Requirements (Optional)</label>
              <textarea 
                rows={3}
                value={notes} 
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention language (CG Song / Panthi / Karma), instruments needed (dholak, mandhar), etc."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-sm shadow-xl hover:scale-[1.01] transition-transform"
            >
              Confirm Recording Inquiry
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
