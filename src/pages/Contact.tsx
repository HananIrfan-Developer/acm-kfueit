import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Globe, MessageSquare, Clock, Facebook, Twitter, Instagram, Linkedin, HelpCircle } from 'lucide-react';

export function Contact() {
  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Header */}
        <section className="mb-16 text-center border-b border-white/10 pb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 uppercase tracking-tight">CONTACT US</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Have questions, ideas, or want to collaborate? We're always open to discussing new projects, creative ideas, or opportunities.
          </p>
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Left Column */}
          <div className="space-y-8">
            
            {/* 2. Contact Info */}
            <div className="glass-panel p-8 md:p-10 rounded-3xl border-t border-blue-500/20">
              <h2 className="text-xl font-bold text-white mb-8 uppercase tracking-widest">GET IN TOUCH</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">Email Address</h4>
                    <p className="text-slate-400 text-lg">acmkfueitt@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">Phone Line</h4>
                    <p className="text-slate-400 text-lg">0314 6355102</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">Office Location</h4>
                    <p className="text-slate-400 text-lg leading-relaxed">KFUEIT Main Campus<br/>Rahim Yar Khan, Punjab, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Office Hours */}
            <div className="glass-panel p-8 rounded-3xl flex items-center justify-between">
              <div>
                 <h4 className="text-white font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><Clock size={16} className="text-blue-400"/> Office Hours</h4>
                 <p className="text-slate-400 text-sm">Monday - Friday: 9:00 AM - 4:00 PM</p>
                 <p className="text-slate-400 text-sm">Saturday & Sunday: Closed</p>
              </div>
            </div>
            
          </div>
          
          {/* Right Column: 4. Contact Form */}
          <div className="glass-panel p-8 md:p-12 rounded-3xl h-full flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-white mb-8 uppercase tracking-widest border-b border-white/10 pb-4 flex items-center gap-3"><MessageSquare className="text-blue-400"/> SEND A MESSAGE</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">First Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-900/10 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Last Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-900/10 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-900/10 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Your Message</label>
                <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-900/10 transition-all resize-none"></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] text-center tracking-wide uppercase mt-4">
                Send Transmission
              </button>
            </form>
          </div>
        </div>

        {/* 5. Social Media Hub */}
        <section className="mb-24 text-center glass-panel p-12 rounded-3xl border-t border-blue-500/20 bg-gradient-to-b from-blue-900/10 to-transparent">
          <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest">Connect on Socials</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">Follow our official channels for real-time updates, event photos, and tech news.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 hover:-translate-y-2 transition-all"><Facebook size={24} /></a>
            <a href="#" className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-blue-400 hover:text-white hover:border-blue-400 hover:-translate-y-2 transition-all"><Twitter size={24} /></a>
            <a href="#" className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white hover:border-pink-500 hover:-translate-y-2 transition-all"><Instagram size={24} /></a>
            <a href="#" className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white hover:border-blue-600 hover:-translate-y-2 transition-all"><Linkedin size={24} /></a>
          </div>
        </section>

        {/* 6. Quick FAQ */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10 text-center uppercase tracking-widest">COMMON INQUIRIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2"><HelpCircle size={16} className="text-blue-400"/> Sponsorships</h4>
              <p className="text-slate-400 text-sm">For corporate sponsorships, please email us directly with the subject line "Sponsorship Request".</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2"><HelpCircle size={16} className="text-blue-400"/> Event Collaborations</h4>
              <p className="text-slate-400 text-sm">We frequently collaborate with other societies. Send a detailed proposal to our email.</p>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
}
