import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '../supabase';
import { Search, Tag, Mail, Newspaper, ArrowRight, PlayCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export function News() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    try {
      const { error } = await supabase.from('newsletters').insert([{ email }]);
      if (error) throw error;
      toast.success('Successfully subscribed!');
      setEmail('');
    } catch (err) {
      toast.error('Failed to subscribe. You might already be on the list.');
    } finally {
      setSubscribing(false);
    }
  };

  useEffect(() => {
    async function fetchNews() {
      const { data } = await supabase.from('news').select('*').order('date', { ascending: false });
      if (data && data.length > 0) {
        setNews(data);
      } else {
        setNews([
          {
            id: 'mock-1',
            title: 'ACM KFUEIT Hosted an Amazing Seminar on AI & ML',
            content: 'An insightful seminar on Artificial Intelligence and Machine Learning was conducted successfully with overwhelming participation. We covered the basics of neural networks...',
            date: '2026-05-11',
            image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
          }
        ]);
      }
      setLoading(false);
    }
    fetchNews();
  }, []);

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || 
                            item.title.toLowerCase().includes(activeCategory.toLowerCase()) || 
                            item.content.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Header & Search */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-white/10 pb-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 uppercase tracking-tight">NEWSROOM</h1>
            <p className="text-slate-400 text-lg max-w-xl">Stay updated with the latest announcements, achievements, and insights from the computing world.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-900/10 transition-all shadow-inner" 
            />
          </div>
        </section>

        {/* 2. Popular Categories */}
        <section className="mb-16">
          <div className="flex flex-wrap gap-4">
            <span className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-wider text-sm mr-4"><Tag size={16}/> Topics:</span>
            {['All', 'Announcements', 'Achievements', 'Events', 'Tech', 'AI'].map((cat, i) => (
              <button 
                key={i} 
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
        
        {/* 3. Featured News */}
        {filteredNews.length > 0 && (
          <section className="mb-20">
            <Link to={`/news/${filteredNews[0].id}`} className="block group">
              <div className="glass-panel rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 hover:border-blue-500/50 transition-colors shadow-2xl">
                <div className="relative aspect-video lg:aspect-auto h-full overflow-hidden">
                  <img loading="lazy" src={filteredNews[0].image_url} alt={filteredNews[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent opacity-60 lg:opacity-0"></div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center bg-[#020617]/50 backdrop-blur-md">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full w-max mb-6 uppercase tracking-wider border border-blue-500/30"><Newspaper size={14}/> Featured Story</span>
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-6 group-hover:text-blue-400 transition-colors leading-tight">{filteredNews[0].title}</h2>
                  <div className="text-slate-400 text-sm mb-6 flex gap-4 uppercase tracking-widest font-bold">
                    <span>{new Date(filteredNews[0].date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed line-clamp-3 mb-8 text-lg">{filteredNews[0].content}</p>
                  <span className="text-blue-400 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">Read Full Article <ArrowRight size={18} /></span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* 4. Latest News Grid */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold text-white mb-8 uppercase tracking-widest border-b border-white/10 pb-4">LATEST UPDATES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.slice(1).map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Link to={`/news/${item.id}`} className="glass-panel rounded-3xl overflow-hidden group flex flex-col h-full hover:border-blue-500/50 transition-colors">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img loading="lazy" src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="text-blue-400 text-xs font-bold mb-3 uppercase tracking-widest">{new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                    <p className="text-slate-400 line-clamp-3 text-sm mb-6 flex-grow leading-relaxed">{item.content}</p>
                    <span className="text-blue-400 font-bold text-sm mt-auto flex items-center gap-2">Read More <ArrowRight size={14}/></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. Media & Press */}
        <section className="mb-24">
          <div className="glass-panel p-10 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center bg-blend-overlay bg-[#020617]/90">
             <div>
               <h3 className="text-2xl font-bold text-white mb-2 uppercase">Press Kit & Media Assets</h3>
               <p className="text-slate-300">Download official ACM KFUEIT logos, branding guidelines, and press release templates.</p>
             </div>
             <Link to="/join" className="shrink-0 px-8 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2">
               <PlayCircle size={18} /> Access Media Kit
             </Link>
          </div>
        </section>

        {/* 6. Newsletter */}
        <section className="glass-panel p-12 rounded-3xl text-center bg-gradient-to-t from-blue-900/20 to-transparent border-t border-blue-500/20">
          <Mail className="mx-auto text-blue-400 mb-6" size={48} />
          <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-widest">Never Miss an Update</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">Subscribe to our monthly newsletter to get the latest tech news, event invites, and opportunities directly in your inbox.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-center sm:text-left" required/>
            <button type="submit" disabled={subscribing} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors shadow-lg">
              {subscribing ? 'Wait...' : 'Subscribe'}
            </button>
          </form>
        </section>
        
      </div>
    </div>
  );
}
