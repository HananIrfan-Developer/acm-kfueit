import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { Calendar, MapPin, Clock, Users, ArrowLeft } from 'lucide-react';

export function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      if (!id) return;
      const { data } = await supabase.from('events').select('*').eq('id', id).single();
      if (data) setEvent(data);
      setLoading(false);
    }
    fetchEvent();
  }, [id]);

  if (loading) return <div className="min-h-screen pt-32 pb-20 text-center text-white">Loading...</div>;
  if (!event) return <div className="min-h-screen pt-32 pb-20 text-center text-white">Event not found.</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/events" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Events
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{event.title}</h1>
            
            <div className="flex flex-wrap gap-6 mb-10 text-slate-300">
              <div className="flex items-center gap-2"><Calendar size={20} className="text-blue-400" /> {new Date(event.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</div>
              <div className="flex items-center gap-2"><Clock size={20} className="text-blue-400" /> 10:00 AM - 02:00 PM</div>
              <div className="flex items-center gap-2"><MapPin size={20} className="text-blue-400" /> KFUEIT, Rahim Yar Khan</div>
            </div>
            
            <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 glass-panel p-2">
              <img loading="lazy" src={event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'} alt={event.title} className="w-full h-full object-cover rounded-2xl" />
            </div>
            
            <div className="glass-panel p-8 md:p-12 rounded-3xl mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">ABOUT THIS EVENT</h2>
              <div className="prose prose-invert prose-blue max-w-none">
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{event.description}</p>
              </div>
            </div>

            <div className="glass-panel p-8 md:p-12 rounded-3xl">
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">EVENT HIGHLIGHTS</h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-300"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> HTML, CSS, JavaScript framework</li>
                <li className="flex items-center gap-3 text-slate-300"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Hands-on Coding Sessions</li>
                <li className="flex items-center gap-3 text-slate-300"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Real-world Projects</li>
                <li className="flex items-center gap-3 text-slate-300"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Certificates for Participants</li>
              </ul>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            <div className="glass-panel p-8 rounded-3xl sticky top-32">
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">EVENT DETAILS</h3>
              
              <div className="space-y-6 mb-8">
                <div>
                  <p className="text-slate-500 text-sm mb-1 uppercase">Date</p>
                  <p className="text-white font-medium">{new Date(event.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm mb-1 uppercase">Time</p>
                  <p className="text-white font-medium">10:00 AM - 02:00 PM</p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm mb-1 uppercase">Venue</p>
                  <p className="text-white font-medium">KFUEIT, Rahim Yar Khan</p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm mb-1 uppercase">Organized by</p>
                  <p className="text-white font-medium">ACM KFUEIT</p>
                </div>
              </div>
              
              <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg text-center">
                Register Now
              </button>
            </div>
            
            <div className="glass-panel p-8 rounded-3xl">
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest">SPEAKERS / ORGANIZERS</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20"></div>
                <div>
                  <p className="text-white font-bold">Ahmad Ali</p>
                  <p className="text-slate-400 text-sm">Tech Lead</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
