import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Calendar as CalendarIcon, ArrowLeft, MapPin, Clock, Users } from 'lucide-react';

export function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'events', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEvent({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Event not found</h2>
        <Link to="/events" className="text-blue-600 hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/events" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8 font-medium">
          <ArrowLeft size={18} /> Back to Events
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100"
        >
          <div className="aspect-video w-full relative">
            <img 
              src={event.imageUrl || `https://picsum.photos/seed/${event.id}/1200/600`} 
              alt={event.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg font-bold text-sm uppercase tracking-wider text-slate-800">
              {event.status}
            </div>
          </div>

          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              {event.title}
            </h1>

            <div className="flex flex-wrap gap-6 mb-10 pb-10 border-b border-slate-100">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <CalendarIcon size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">Date</p>
                  <p className="font-bold text-slate-800">
                    {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">Location</p>
                  <p className="font-bold text-slate-800">KFUEIT Campus</p>
                </div>
              </div>
            </div>

            <div className="prose prose-lg prose-slate max-w-none">
              <h3 className="text-2xl font-bold mb-4 text-slate-800">About this event</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
            
            {event.status === 'upcoming' && (
              <div className="mt-12 pt-8 border-t border-slate-100 flex justify-center">
                <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                  Register for Event
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
