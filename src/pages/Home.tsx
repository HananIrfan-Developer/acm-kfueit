import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Globe, Users, Zap, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';

export function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, 'events'), orderBy('date', 'asc'), limit(3));
        const querySnapshot = await getDocs(q);
        const eventsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
        const filtered = eventsData.filter((e: any) => e.status === 'upcoming');
        setUpcomingEvents(filtered);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-slate-50 z-0">
          {/* Subtle background pattern or gradient */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-teal-50/50 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Text Content - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
               ACM KFUEIT Chapter
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-slate-900">
                Connecting Minds,<br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Creating the Future</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                ACM is an International society's chapter working in KFUEIT for the development of Candidates. Exploring technology is an unforgettable adventure.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/signup"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  Join the Community <ArrowRight size={18} />
                </Link>
                <Link
                  to="/events"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-bold transition-all flex items-center justify-center gap-2"
                >
                  View Events
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6 text-sm font-medium text-slate-500">
                <div className="flex items-center gap-2">
                  <Code size={18} className="text-blue-600" /> Collaboration
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-teal-500" /> Networking
                </div>
              </div>
            </motion.div>

            {/* Image Content - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative lg:ml-auto w-full max-w-lg mx-auto lg:max-w-none"
            >
              <div className="relative aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/5] xl:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                <img 
                  src="476164860_956447869924460_6236266839002281023_n.jpg"
                  alt="ACM Team"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 sm:-left-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Users size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">72+</div>
                  <div className="text-sm font-medium text-slate-500">Active Members</div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 relative z-20 -mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">72+</div>
              <div className="text-sm text-slate-500 font-medium">Total Members</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">10+</div>
              <div className="text-sm text-slate-500 font-medium">Events Hosted</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">10+</div>
              <div className="text-sm text-slate-500 font-medium">Workshops</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">4.9</div>
              <div className="text-sm text-slate-500 font-medium">Average Rating</div>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Upcoming Events Preview */}
      <section className="py-24 relative bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
          >
            <div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Featured Events</div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Our upcoming events</h2>
            </div>
            <Link to="/events" className="group flex items-center gap-2 text-slate-600 font-medium hover:text-blue-600 transition-colors">
              View All Events 
              <span className="group-hover:translate-x-1 transition-transform"><ChevronRight size={20} /></span>
            </Link>
          </motion.div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group rounded-3xl overflow-hidden bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500"
                >
                  <div className="aspect-[4/3] overflow-hidden relative m-3 rounded-2xl">
                    <img 
                      src={event.imageUrl || `https://picsum.photos/seed/${event.id}/800/600`} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold rounded-full shadow-sm">
                      {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  <div className="p-6 pt-2">
                    <h3 className="text-xl font-bold mb-2 line-clamp-1 text-slate-900">{event.title}</h3>
                    <p className="text-slate-500 line-clamp-2 mb-4 text-sm leading-relaxed">
                      {event.description}
                    </p>
                    <Link to="/events" className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-slate-100 text-slate-900 font-medium hover:bg-slate-900 hover:text-white transition-colors">
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <CalendarIcon className="text-slate-400" />
              </div>
              <p className="text-slate-500 text-lg">No upcoming events at the moment. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>

      {/* How it works / What we do */}
      <section className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                alt="Team working" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">How it works</div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">How Our Platform Works</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Join our community to discover your dream career path, where innovation and collaboration meet.
                </p>
              </motion.div>

              <div className="space-y-8">
                {[
                  { title: "Organize Events", desc: "We help coordinate and manage university events efficiently, making it easier to plan, schedule, and execute activities across different departments and societies.", icon: <Globe size={24} /> },
                  { title: "Host Webinars & Sessions", desc: "Our platform supports webinars, workshops, and online sessions where students and professionals can share knowledge, learn new skills, and engage with a wider audience.", icon: <Users size={24} /> },
                  { title: "Collaborate with Societies", desc: "We enable collaboration between different university societies, encouraging teamwork, shared initiatives, and cross-disciplinary projects.", icon: <Code size={24} /> },
      { title: "Grow Together", desc: "By bringing students, societies, and external partners onto one platform, we foster a community built on innovation, collaboration, and continuous learning.", icon: <Code size={24} /> },
                  { title: "Streamlined Communication", desc: "Stay connected through centralized communication channels that keep all members updated about events, collaborations, and announcements.", icon: <Zap size={24} /> }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to shape the future?</h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Become a part of the most active tech community at KFUEIT. Enhance your skills, build your network, and create impact.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
            >
              Join ACM KFUEIT Now
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
}

