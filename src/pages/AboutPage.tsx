import React, { useState } from 'react';
import { Music, MapPin, Mail, Phone, Send, CheckCircle2 } from 'lucide-react';
import { useMusicData } from '../lib/useMusicData';
import { SEO } from '../components/common/SEO';

export const AboutPage: React.FC = () => {
  const { createContactMessage } = useMusicData();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createContactMessage({
      name,
      email,
      phone,
      subject: subject || 'General Inquiry',
      message
    });
    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="space-y-12 pb-12">
      <SEO 
        title="About & Contact – Gulzar Music World"
        description="Learn about Gulzar Music World's mission in preserving Chhattisgarhi folk music culture and contact our studio team."
      />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider">
          About Us
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
          Gulzar Music World & Studio
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          Founded with a passion for Chhattisgarhi culture, Gulzar Music World is Central India's leading record label and audio recording studio dedicated to authentic CG Songs, Panthi, Karma, Dadariya, and Jasgeet.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Contact Information & Mission */}
        <div className="bg-[#14141E] border border-amber-500/20 rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-display font-bold text-white">Contact & Studio Address</h2>
          
          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Gulzar Music Studio</p>
                <p>Pandri Market Road, Near City Center, Raipur, Chhattisgarh 492001, India</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="font-bold text-white">Email Address</p>
                <p>contact@gulzarmusicworld.com / info@gulzarmusicstudio.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="font-bold text-white">Phone Support</p>
                <p>+91 98261 00000 / +91 771 400000</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold text-amber-400 mb-2">Our Mission</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We empower local Chhattisgarhi artists, singers, and musicians by offering high-end audio engineering, worldwide digital distribution, and professional music video shoots.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#141420] border border-amber-500/30 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-display font-bold text-white mb-4">Send Us a Message</h2>

          {submitted ? (
            <div className="text-center py-8 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Message Sent Successfully!</h3>
              <p className="text-xs text-slate-400">We appreciate your inquiry and will reply to your email shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Name</label>
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email</label>
                  <input 
                    type="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone</label>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 Mobile"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Subject</label>
                <input 
                  type="text" 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Song distribution, studio query, music inquiry..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Message</label>
                <textarea 
                  rows={4}
                  required 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your query here..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Contact Message</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
