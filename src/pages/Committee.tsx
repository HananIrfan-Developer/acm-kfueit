import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '../supabase';
import { Facebook, Twitter, Instagram, Quote, GraduationCap, Users } from 'lucide-react';

export function Committee() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const { data } = await supabase.from('members').select('*').order('sort_order', { ascending: true });
        if (data) setMembers(data);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, []);

  const leadershipRoles = ['Supervisor', 'President', 'Vice President'];
  const upperCabinetRoles = [
    'General Secretary',
    'Assistant General Secretary',
    'Event Management Team Head',
    'Media Team Head',
    'Graphic Team Head',
    'Hosting Team Head',
    'Protocol Team Head',
    'Director of Protocol Team',
    'Stage & Decor Management Team Head',
    'Development Team Head'
  ];

  const chapterLeadership = members
    .filter(m => leadershipRoles.includes(m.role))
    .sort((a, b) => leadershipRoles.indexOf(a.role) - leadershipRoles.indexOf(b.role));
    
  const upperCabinet = members
    .filter(m => upperCabinetRoles.includes(m.role))
    .sort((a, b) => upperCabinetRoles.indexOf(a.role) - upperCabinetRoles.indexOf(b.role));
    
  const generalMembers = members
    .filter(m => !leadershipRoles.includes(m.role) && !upperCabinetRoles.includes(m.role) && m.team !== 'Member of the Week');

  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">EXECUTIVE COMMITTEE</h1>
          <p className="text-slate-400 text-lg">
            Meet the dedicated leaders working behind the success of ACM KFUEIT. Together we lead, we inspire, we create impact.
          </p>
        </div>

        {/* 2. President's Message */}
        <section className="mb-24">
          <div className="glass-panel p-10 rounded-3xl relative overflow-hidden bg-gradient-to-br from-slate-900 to-[#060b24]">
            <Quote size={120} className="absolute -top-10 -left-10 text-blue-500/10" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center relative z-10">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-4">PRESIDENT'S MESSAGE</h2>
                <p className="text-slate-300 italic text-lg leading-relaxed mb-6">
                  "At ACM KFUEIT, our mission is to cultivate an environment where ambition meets opportunity. We are building a community of relentless innovators, ready to tackle the challenges of tomorrow through technology."
                </p>
                <div className="text-blue-400 font-bold">Chapter President, 2026</div>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden glass-panel border border-blue-500/20 max-w-[250px] mx-auto md:ml-auto">
                <img loading="lazy" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPHaOyU7EMjnlbQp59hxvBpuJ7fQ2DDu6zCQ&s" alt="President" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Chapter Leadership */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold text-blue-400 mb-8 uppercase tracking-widest text-center">CHAPTER LEADERSHIP</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {chapterLeadership.length > 0 ? chapterLeadership.map((member, i) => (
              <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-panel p-6 rounded-3xl flex flex-col items-center text-center group hover:bg-white/5 transition-all">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-blue-500/50 group-hover:border-blue-400 transition-colors p-1 relative z-10">
                  <img loading="lazy" src={member.image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} alt={member.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-blue-400 text-sm mb-4">{member.role}</p>
                <div className="flex gap-3 text-slate-500 mt-auto">
                  <a href="#" className="hover:text-blue-400 transition-colors"><Facebook size={16} /></a>
                  <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={16} /></a>
                  <a href="#" className="hover:text-pink-500 transition-colors"><Instagram size={16} /></a>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full text-center text-slate-500 py-10">Loading leadership team...</div>
            )}
          </div>
        </section>

        {/* 4. Upper Cabinet */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold text-blue-400 mb-8 uppercase tracking-widest text-center">UPPER CABINET</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {upperCabinet.length > 0 ? upperCabinet.map((member, i) => (
              <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-panel p-6 rounded-3xl flex flex-col items-center text-center group hover:bg-white/5 transition-all">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-blue-500/50 group-hover:border-blue-400 transition-colors p-1 relative z-10">
                  <img loading="lazy" src={member.image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} alt={member.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-blue-400 text-sm mb-4">{member.role}</p>
                <div className="flex gap-3 text-slate-500 mt-auto">
                  <a href="#" className="hover:text-blue-400 transition-colors"><Facebook size={16} /></a>
                  <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={16} /></a>
                  <a href="#" className="hover:text-pink-500 transition-colors"><Instagram size={16} /></a>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full text-center text-slate-500 py-10">Loading upper cabinet...</div>
            )}
          </div>
        </section>

        {/* 5. General Members */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold text-blue-400 mb-8 uppercase tracking-widest text-center">GENERAL MEMBERS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {generalMembers.map((member, i) => (
              <motion.div key={member.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/5 transition-all">
                <div className="w-20 h-20 rounded-2xl overflow-hidden mb-4 border border-white/10">
                  <img loading="lazy" src={member.image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-md font-bold text-white mb-1">{member.name}</h3>
                <p className="text-slate-400 text-xs">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* 6. Call to action */}
        <section className="mt-24">
          <div className="glass-panel p-10 md:p-16 rounded-3xl text-center max-w-3xl mx-auto border border-blue-500/30 bg-blue-900/10">
            <Users size={48} className="mx-auto text-blue-400 mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4 uppercase">Want to become a leader?</h3>
            <p className="text-slate-400 mb-8 text-lg">Join ACM and start your leadership journey. Applications for the next term open soon.</p>
            <Link to="/join" className="inline-block px-10 py-4 bg-blue-600 rounded-lg text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">Apply for Committee</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
