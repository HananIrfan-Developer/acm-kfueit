import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../supabase';
import { Search, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '../lib/utils';

import { Link } from 'react-router-dom';

export function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: false });
          
        if (error) throw error;
        setEvents(data || []);
      } catch (error: any) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || event.status === filter;
    return matchesSearch && matchesFilter;
  });

  const upcomingEvents = filteredEvents.filter(e => e.status === 'upcoming');
  const pastEvents = filteredEvents.filter(e => e.status === 'completed');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-100/50 to-transparent pointer-events-none"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-teal-100/50 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-blue-600"
          >
            Events & Activities
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Discover our upcoming workshops, seminars, and hackathons. Join us to learn, build, and innovate.
          </motion.p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12 bg-white p-4 rounded-2xl border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
            <input 
              type="text" 
              placeholder="Search events..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-inner"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <Filter size={20} className="text-blue-500 mr-2 flex-shrink-0" />
            {(['all', 'upcoming', 'completed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold capitalize whitespace-nowrap transition-all duration-300",
                  filter === f 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse bg-white rounded-3xl h-[400px] border border-slate-200 shadow-sm"></div>
            ))}
          </div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 bg-red-50 rounded-3xl border border-red-200 shadow-sm"
          >
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-200">
              <span className="text-red-500 text-3xl font-bold">!</span>
            </div>
            <h3 className="text-2xl font-bold text-red-800 mb-2">Error Loading Events</h3>
            <p className="text-red-600 text-lg">{error}</p>
          </motion.div>
        ) : (
          <>
            {(filter === 'all' || filter === 'upcoming') && upcomingEvents.length > 0 && (
              <div className="mb-20">
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-slate-900">
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600"></span>
                  </span>
                  Upcoming Events
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {upcomingEvents.map((event, i) => (
                    <EventCard key={event.id} event={event} index={i} />
                  ))}
                </div>
              </div>
            )}

            {(filter === 'all' || filter === 'completed') && pastEvents.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-8 text-slate-500 flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-slate-400"></div>
                  Past Events
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pastEvents.map((event, i) => (
                    <EventCard key={event.id} event={event} index={i} isPast />
                  ))}
                </div>
              </div>
            )}

            {filteredEvents.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
                  <CalendarIcon size={40} className="text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">No events found</h3>
                <p className="text-slate-500 text-lg">Try adjusting your search or filters to find what you're looking for.</p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function EventCard({ event, index, isPast = false }: { event: any, index: number, isPast?: boolean, key?: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={cn(
        "group rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex flex-col h-full transition-all duration-500",
        isPast ? "opacity-80 hover:opacity-100" : "hover:shadow-[0_8px_24px_rgba(37,99,235,0.12)] hover:-translate-y-2"
      )}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10"></div>
        <img 
          src={(event.image_urls && event.image_urls.length > 0) ? event.image_urls[0] : (event.image_url || `https://picsum.photos/seed/${event.id}/800/600`)} 
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className={cn(
          "absolute top-4 right-4 z-20 px-4 py-1.5 text-white text-xs font-bold rounded-full uppercase tracking-wider backdrop-blur-md",
          event.status === 'upcoming' 
            ? "bg-blue-600/90 shadow-sm border border-blue-400/50" 
            : "bg-slate-600/90 border border-slate-500/50"
        )}>
          {event.status}
        </div>
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-blue-300 font-medium text-sm bg-slate-900/50 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10">
          <CalendarIcon size={14} />
          {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow relative">
        <h3 className={cn(
          "text-2xl font-bold mb-3 line-clamp-2 transition-colors duration-300 text-slate-900",
          !isPast && "group-hover:text-blue-600"
        )}>
          {event.title}
        </h3>
        <p className="text-slate-600 mb-6 flex-grow line-clamp-3 leading-relaxed">
          {event.description}
        </p>
        
        {!isPast ? (
          <div className="mt-auto pt-4 border-t border-slate-100">
            <Link to={`/events/${event.id}`} className="w-full py-3 rounded-xl bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
              Learn More
            </Link>
          </div>
        ) : (
          <div className="mt-auto pt-4 border-t border-slate-100">
            <Link to={`/events/${event.id}`} className="w-full py-3 rounded-xl bg-slate-50 text-slate-600 font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
              View Details
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
