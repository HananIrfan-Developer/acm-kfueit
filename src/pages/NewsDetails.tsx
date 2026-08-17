import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { ArrowLeft, Clock, User } from 'lucide-react';

export function NewsDetails() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      if (!id) return;
      if (id.startsWith('mock-')) {
        // Handle mock data
        setArticle({
          id,
          title: 'ACM KFUEIT Hosted an Amazing Seminar on AI & ML',
          content: 'An insightful seminar on Artificial Intelligence and Machine Learning was conducted successfully with overwhelming participation.\n\nACM KFUEIT successfully organized a highly informative seminar on Artificial Intelligence & Machine Learning. The event brought together students, faculty members and tech enthusiasts to explore the latest advancements and real-world applications of AI and ML.\n\nThis event is part of a larger initiative to build a strong tech community on campus and provide students with the opportunity to learn from industry experts.',
          date: '2026-05-11',
          image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
          author: 'ACM KFUEIT'
        });
        setLoading(false);
        return;
      }
      
      const { data } = await supabase.from('news').select('*').eq('id', id).single();
      if (data) setArticle(data);
      setLoading(false);
    }
    fetchNews();
  }, [id]);

  if (loading) return <div className="min-h-screen pt-32 pb-20 text-center text-white">Loading...</div>;
  if (!article) return <div className="min-h-screen pt-32 pb-20 text-center text-white">Article not found.</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/news" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to News
        </Link>
        
        <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full mb-6 uppercase tracking-wider">NEWS DETAILS</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">{article.title}</h1>
        
        <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm mb-12">
          <div className="flex items-center gap-2"><Clock size={16} className="text-blue-400" /> {new Date(article.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</div>
          <div className="flex items-center gap-2"><User size={16} className="text-blue-400" /> {article.author || 'ACM KFUEIT'}</div>
        </div>
        
        <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 glass-panel p-2">
          <img loading="lazy" src={article.image_url} alt={article.title} className="w-full h-full object-cover rounded-2xl" />
        </div>
        
        <div className="prose prose-invert prose-lg prose-blue max-w-none">
          {article.content.split('\n').map((paragraph: string, idx: number) => (
            <p key={idx} className="text-slate-300 leading-relaxed mb-6">{paragraph}</p>
          ))}
        </div>
        
      </div>
    </div>
  );
}
