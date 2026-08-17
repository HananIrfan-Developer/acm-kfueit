import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '../supabase';
import { CalendarIcon, MapPin, Clock, Mic, Image, Layout, ArrowRight, Shield } from 'lucide-react';

export function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [highlights, setHighlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: eData } = await supabase.from('events').select('*').order('date', { ascending: false });
      if (eData) setEvents(eData);

      const { data: hData } = await supabase.from('highlights').select('*').order('created_at', { ascending: false }).limit(4);
      if (hData) setHighlights(hData);

      setLoading(false);
    }
    fetchData();
  }, []);

  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date());
  const pastEvents = events.filter(e => new Date(e.date) < new Date());

  const categories = [
    { name: 'Workshops', icon: <Layout />, desc: 'Hands-on technical sessions' },
    { name: 'Seminars', icon: <Mic />, desc: 'Insights from industry leaders' },
    { name: 'Hackathons', icon: <Clock />, desc: 'Competitive coding challenges' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Header */}
        <section className="mb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">EVENTS</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Explore our upcoming, ongoing and past events. Learn, participate and grow with ACM KFUEIT.
          </p>
        </section>

        {/* 2. Categories */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <div key={i} className="glass-panel p-8 rounded-3xl flex items-center gap-6 hover:bg-white/5 transition-colors">
                <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center shrink-0">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-wide">{cat.name}</h3>
                  <p className="text-slate-400 text-sm">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* 3. Upcoming Events */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold text-blue-400 mb-8 uppercase tracking-widest border-b border-white/10 pb-4">UPCOMING EVENTS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center text-slate-500 py-10">Loading events...</div>
            ) : upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, i) => (
                <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-panel rounded-3xl overflow-hidden group flex flex-col h-full border border-white/10 hover:border-blue-500/50 transition-colors shadow-2xl">
                  <div className="relative aspect-video overflow-hidden">
                    <img loading="lazy" src={event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90"></div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow relative z-10 -mt-10">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex flex-col items-center justify-center text-white shadow-lg mb-4 border border-blue-400/50">
                      <span className="text-xs uppercase font-bold leading-none">{new Date(event.date).toLocaleDateString(undefined, { month: 'short' })}</span>
                      <span className="text-lg font-extrabold leading-none">{new Date(event.date).toLocaleDateString(undefined, { day: '2-digit' })}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 line-clamp-2">{event.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
                      <MapPin size={16} className="text-blue-400" /> KFUEIT, Rahim Yar Khan
                    </div>
                    <Link to={`/events/${event.id}`} className="mt-auto block text-center py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all font-bold shadow-lg shadow-blue-500/20">
                      Register Now
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center glass-panel rounded-3xl border border-dashed border-white/20">
                <Shield className="mx-auto text-slate-600 mb-4" size={48}/>
                <h3 className="text-white font-bold text-xl mb-2">No Upcoming Events</h3>
                <p className="text-slate-400">Stay tuned! Our committee is planning something amazing.</p>
              </div>
            )}
          </div>
        </section>

        {/* 4. Past Events */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold text-blue-400 mb-8 uppercase tracking-widest border-b border-white/10 pb-4">PAST EVENTS ARCHIVE</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pastEvents.length > 0 ? (
              pastEvents.map((event, i) => (
                <Link key={event.id} to={`/events/${event.id}`} className="block group">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-panel rounded-2xl overflow-hidden hover:border-blue-500/30 transition-colors">
                    <div className="relative aspect-video">
                      <img loading="lazy" src={event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'} alt={event.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-4 bg-slate-900/50 backdrop-blur-md">
                      <h3 className="text-sm font-bold text-white line-clamp-1">{event.title}</h3>
                      <p className="text-xs text-blue-400 mt-1 flex items-center gap-1"><CalendarIcon size={12}/> {new Date(event.date).toLocaleDateString()}</p>
                    </div>
                  </motion.div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-slate-500">No past events found.</div>
            )}
          </div>
        </section>

        {/* 5. Event Gallery */}
        <section className="mb-24">
           <h2 className="text-2xl font-bold text-blue-400 mb-8 uppercase tracking-widest border-b border-white/10 pb-4">EVENT HIGHLIGHTS</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {highlights.length > 0 ? (
               highlights.map((h) => (
                 <div key={h.id} className="relative aspect-square rounded-2xl overflow-hidden glass-panel group">
                   <img loading="lazy" src={h.image_url} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="Gallery"/>
                   <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 </div>
               ))
             ) : (
               [
                 'https://images.unsplash.com/photo-1515187029135-18ee286d815b',
                 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
                 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678',
                 'https://images.unsplash.com/photo-1522071820081-009f0129c71c'
               ].map((img, idx) => (
                 <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden glass-panel group">
                   <img loading="lazy" src={`${img}?auto=format&fit=crop&w=500&q=80`} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="Gallery"/>
                   <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 </div>
               ))
             )}
           </div>
        </section>

        {/* 6. Call for Speakers */}
        <section className="mt-24">
          <div className="glass-panel p-12 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-gradient-to-br from-[#060b24] to-[#020617] border-blue-500/20">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4 uppercase">Want to speak at our next event?</h3>
              <p className="text-slate-400 mb-6">We are always looking for passionate students and professionals to share their knowledge with the community.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-300"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Share your expertise</li>
                <li className="flex items-center gap-3 text-slate-300"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Build your personal brand</li>
                <li className="flex items-center gap-3 text-slate-300"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Connect with tech enthusiasts</li>
              </ul>
              <Link to="/join" className="inline-block px-8 py-3 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-200 transition-colors">Apply as Speaker</Link>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center p-8 bg-blue-950/20">
              <img loading="lazy" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPHaOyU7EMjnlbQp59hxvBpuJ7fQ2DDu6zCQ&s" alt="Speaker" className="max-w-full max-h-full object-contain" />
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
}
