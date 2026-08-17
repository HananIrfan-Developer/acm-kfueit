import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '../supabase';
import { Users, Calendar, Target, Globe, Lightbulb, Zap, ArrowRight, Shield, Quote, Mail } from 'lucide-react';

export function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [committee, setCommittee] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data: eData } = await supabase.from('events').select('*').order('date', { ascending: false }).limit(1);
      if (eData) setEvents(eData);
      
      const { data: mData } = await supabase.from('members').select('*').in('role', ['Supervisor', 'President', 'Vice President']).order('sort_order').limit(3);
      if (mData) setCommittee(mData);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Radiant Backgrounds */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[1000px] h-[1000px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* 1. Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div className="text-blue-400 font-bold tracking-widest text-sm mb-4 uppercase">ACM KFUEIT STUDENT CHAPTER</div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] uppercase">
            Advancing<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Technology.</span><br/>
            Empowering<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Students.</span>
          </h1>
          <p className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed">
            ACM KFUEIT is a student chapter of the Association for Computing Machinery, dedicated to advancing computing as a science and a profession.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/join" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] text-lg">Join ACM</Link>
            <Link to="/events" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold transition-all text-lg">Explore Events</Link>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative aspect-square w-full max-w-[400px] mx-auto lg:mr-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-[80px] z-0"></div>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            controls={false}
            className="relative z-10 w-full h-full object-contain scale-125 hover:scale-[1.35] transition-transform duration-700 pointer-events-none drop-shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            style={{ mixBlendMode: 'screen' }}
          >
             <source src="130273-746686709_medium.mp4" type="video/mp4"/>
             Your browser does not support the video tag.
          </video>
        </motion.div>
      </section>

      {/* 2. Stats Section */}
      <section className="py-12 border-y border-white/5 bg-white/5 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '800+', label: 'Members', icon: <Users className="text-blue-400" /> },
              { num: '50+', label: 'Events', icon: <Calendar className="text-cyan-400" /> },
              { num: '15+', label: 'Projects', icon: <Target className="text-blue-400" /> },
              { num: '10+', label: 'Workshops', icon: <Lightbulb className="text-cyan-400" /> },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center border border-blue-500/20">{stat.icon}</div>
                <div className="text-3xl font-bold text-white">{stat.num}</div>
                <div className="text-slate-400 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Content Grid (Events & News) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <h2 className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-widest">UPCOMING EVENT</h2>
            {events.length > 0 ? (
              <Link to={`/events/${events[0].id}`} className="block group h-full">
                <div className="glass-panel p-2 rounded-3xl h-full border-blue-500/20 hover:border-blue-500/50 transition-colors">
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                    <img loading="lazy" src={events[0].image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'} alt="Event" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80"></div>
                  </div>
                  <div className="px-6 pb-6">
                    <h3 className="text-2xl font-bold text-white mb-4">{events[0].title}</h3>
                    <div className="flex gap-4 text-sm text-slate-400 mb-6">
                      <span className="flex items-center gap-1"><Calendar size={14} className="text-blue-400" /> {new Date(events[0].date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><Shield size={14} className="text-blue-400" /> KFUEIT, Rahim Yar Khan</span>
                    </div>
                    <span className="text-blue-400 font-bold flex items-center gap-2">Register Now <ArrowRight size={16} /></span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="glass-panel p-10 rounded-3xl text-center text-slate-400 h-full flex items-center justify-center">No upcoming events.</div>
            )}
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-widest">LATEST NEWS</h2>
            <div className="glass-panel rounded-3xl p-8 h-full flex flex-col gap-6">
              {[
                { title: 'ACM KFUEIT Hosted an Amazing Seminar on AI & ML', date: 'May 11, 2026' },
                { title: 'Our Team Won at CodeXtreme Competition 2026', date: 'May 05, 2026' },
                { title: 'Annual General Meeting Spring 2026', date: 'April 10, 2026' }
              ].map((news, i) => (
                <Link to="/news" key={i} className="group block border-b border-white/5 pb-6 last:border-0 last:pb-0">
                  <h4 className="text-white font-bold group-hover:text-blue-400 transition-colors mb-2 line-clamp-2 leading-snug">{news.title}</h4>
                  <p className="text-xs text-blue-400 uppercase tracking-widest font-bold">{news.date}</p>
                </Link>
              ))}
              <Link to="/news" className="text-blue-400 text-sm font-bold flex items-center gap-2 mt-auto pt-4">View All News <ArrowRight size={14} /></Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Why Join */}
      <section className="py-24 bg-[#050b1a] border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-widest">WHY JOIN ACM KFUEIT?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Lightbulb />, title: 'Learn', desc: 'Enhance your technical skills and knowledge.' },
              { icon: <Globe />, title: 'Connect', desc: 'Network with peers and industry professionals.' },
              { icon: <Zap />, title: 'Grow', desc: 'Personal and professional development opportunities.' },
              { icon: <Target />, title: 'Lead', desc: 'Take initiatives and lead impactful projects.' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4 glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 rounded-2xl bg-blue-900/30 border border-blue-500/20 text-blue-400 flex items-center justify-center">{item.icon}</div>
                <h4 className="text-xl font-bold text-white">{item.title}</h4>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonials Spotlight */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
         <Quote size={64} className="mx-auto text-blue-500/20 mb-8" />
         <h2 className="text-2xl font-bold text-white mb-8">"ACM transformed my university experience. It gave me the practical exposure and leadership skills I needed to succeed."</h2>
         <div className="flex flex-col items-center justify-center gap-2">
           <div className="text-center">
             <div className="text-white font-bold text-xl">Hamza Arshad</div>
             <div className="text-blue-400 text-sm mt-1">Chapter President</div>
           </div>
         </div>
      </section>

      {/* 6. Executive Committee */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/5">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest">EXECUTIVE COMMITTEE</h2>
          <Link to="/committee" className="text-blue-400 text-sm font-bold flex items-center gap-2">View All Members <ArrowRight size={14}/></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {committee.map((member) => (
            <div key={member.id} className="glass-panel p-6 rounded-3xl text-center flex flex-col items-center group">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-blue-500/30 group-hover:border-blue-400 transition-colors p-1">
                <img loading="lazy" src={member.image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} alt={member.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <h4 className="text-white font-bold text-lg mb-1">{member.name}</h4>
              <p className="text-sm text-blue-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* 7. Newsletter Mini-CTA */}
      <section className="py-24 relative z-10 bg-blue-900/10 border-y border-blue-500/20">
         <div className="max-w-3xl mx-auto px-4 text-center">
           <Mail size={40} className="mx-auto text-blue-400 mb-6"/>
           <h2 className="text-3xl font-bold text-white mb-4 uppercase">Stay in the Loop</h2>
           <p className="text-slate-400 mb-8">Get notified about upcoming hackathons, seminars, and exclusive tech resources.</p>
           <form className="flex flex-col sm:flex-row gap-4 justify-center">
             <input type="email" placeholder="Enter your email" className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500 w-full sm:w-80" />
             <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-all">Subscribe</button>
           </form>
         </div>
      </section>

      {/* 8. Global Partner */}
      <section className="py-16 bg-[#020617] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">OUR GLOBAL PARTNER</h4>
            <div className="flex items-center gap-4 text-white font-bold text-xl">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
                <img loading="lazy" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPHaOyU7EMjnlbQp59hxvBpuJ7fQ2DDu6zCQ&s" alt="ACM Logo" className="w-full h-full object-contain" />
              </div>
              Association for Computing Machinery
            </div>
          </div>
          <div className="text-slate-400 text-sm max-w-md text-right leading-relaxed">
            ACM is the world's largest educational and scientific computing society, uniting computing educators, researchers, and professionals.
          </div>
        </div>
      </section>
    </div>
  );
}
