import { motion } from 'motion/react';
import { Globe, Users, Trophy, Lightbulb, BookOpen, Star, Quote, HelpCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Join() {
  const benefits = [
    { icon: <Globe />, title: 'Learn & Grow', desc: 'Access to workshops, seminars and technical resources.' },
    { icon: <Users />, title: 'Connect', desc: 'Build connections with peers and industry experts.' },
    { icon: <Trophy />, title: 'Opportunities', desc: 'Get opportunities for career growth and internships.' },
    { icon: <Lightbulb />, title: 'Lead & Inspire', desc: 'Lead projects and make a positive impact.' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Hero Section */}
        <section className="text-center max-w-4xl mx-auto mb-24 border-b border-white/10 pb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 uppercase tracking-tight leading-[1.1]">
            BE PART OF A GLOBAL <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">COMPUTING COMMUNITY</span>
          </h1>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Join ACM KFUEIT and unlock opportunities to learn, grow, connect and lead. Together we build a stronger future.
          </p>
          <a href="#apply" className="inline-block px-10 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            Join the Community
          </a>
        </section>

        {/* 2. Why Join ACM KFUEIT? */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold text-white mb-10 text-center uppercase tracking-widest">WHY JOIN ACM KFUEIT?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-blue-500/20">
                  {b.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{b.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. Membership Benefits Card */}
        <section className="mb-24">
          <div className="glass-panel p-10 md:p-14 rounded-3xl border-t border-blue-500/30">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-8 uppercase tracking-wide">EXCLUSIVE BENEFITS</h2>
                <ul className="space-y-4">
                  {[
                    'Access to ACM Digital Library',
                    'Discounts on ACM sponsored events',
                    'Global Certification opportunities',
                    'Networking with industry professionals',
                    'Priority registration for Hackathons',
                    'Exclusive technical resources & mentors'
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-300">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 border border-blue-500/20"><CheckCircle size={16} /></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Fake ID Card */}
              <div className="relative max-w-md mx-auto w-full">
                <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full"></div>
                <div className="relative bg-gradient-to-br from-blue-900 to-[#020617] border border-blue-400/30 p-8 rounded-3xl shadow-2xl backdrop-blur-xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="flex justify-between items-start mb-12">
                    <div className="text-white font-bold text-2xl flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                        <img loading="lazy" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPHaOyU7EMjnlbQp59hxvBpuJ7fQ2DDu6zCQ&s" alt="ACM Logo" className="w-full h-full object-contain" />
                      </div>
                      <div className="leading-tight">ACM<br/><span className="text-blue-400 text-sm tracking-widest uppercase">Member Card</span></div>
                    </div>
                  </div>
                  <div className="text-slate-300 font-mono text-2xl tracking-[0.2em] mb-8 font-light">
                    1234 5678 9101
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 uppercase tracking-wider items-end">
                    <div>Valid Thru<br/><span className="text-white text-lg font-mono">12/26</span></div>
                    <div className="w-12 h-8 rounded bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-80"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Testimonials */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold text-white mb-10 text-center uppercase tracking-widest">WHAT OUR MEMBERS SAY</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: "Joining ACM KFUEIT was the best decision of my university life. The workshops completely leveled up my coding skills.", name: "Sarah Khan", role: "Web Developer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
              { text: "The network you build here is invaluable. I found my co-founders for my startup at an ACM hackathon.", name: "Ali Raza", role: "Final Year Student", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali" },
              { text: "Being part of the executive committee taught me leadership and management skills I could never learn in a classroom.", name: "Fatima Noor", role: "Alumni", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima" }
            ].map((t, idx) => (
               <div key={idx} className="glass-panel p-8 rounded-3xl relative">
                 <Quote size={40} className="text-blue-500/20 absolute top-6 left-6" />
                 <p className="text-slate-300 relative z-10 mb-6 italic pt-4">"{t.text}"</p>
                 <div className="border-t border-white/10 pt-4">
                   <h4 className="text-white font-bold text-sm">{t.name}</h4>
                   <p className="text-slate-500 text-xs">{t.role}</p>
                 </div>
               </div>
            ))}
          </div>
        </section>

        {/* 5. FAQs */}
        <section className="mb-24 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10 text-center uppercase tracking-widest">FREQUENTLY ASKED QUESTIONS</h2>
          <div className="space-y-4">
            {[
              { q: 'Who can join ACM KFUEIT?', a: 'Any student enrolled at KFUEIT with a passion for computing and technology can join, regardless of their major.' },
              { q: 'Is there a membership fee?', a: 'Standard chapter membership is free. Official ACM Global membership has a discounted student fee which unlocks the Digital Library.' },
              { q: 'How do I join the Executive Committee?', a: 'We open applications for the Executive Committee at the start of every academic year. Active members are given preference.' }
            ].map((faq, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl flex gap-4 items-start">
                <HelpCircle size={24} className="text-blue-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">{faq.q}</h4>
                  <p className="text-slate-400 text-sm">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Application Form Banner (CTA) */}
        <section id="apply" className="text-center glass-panel p-16 rounded-3xl border border-blue-500/40 bg-gradient-to-b from-blue-900/20 to-[#020617] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <h2 className="text-3xl font-extrabold text-white mb-6 uppercase tracking-wider relative z-10">Ready to join ACM KFUEIT?</h2>
          <p className="text-slate-300 mb-10 max-w-2xl mx-auto text-lg relative z-10">Click below to fill out the official membership application form. Our team will review your application and get back to you with the next steps.</p>
          <Link to="/signup" className="relative z-10 inline-flex items-center justify-center px-12 py-5 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold transition-all shadow-xl hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] text-lg w-full sm:w-auto">
            Apply for Membership
          </Link>
        </section>

      </div>
    </div>
  );
}
