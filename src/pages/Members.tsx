import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../supabase';
import { Instagram, Youtube, Users, Video } from 'lucide-react';

export function Members() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .order('created_at', { ascending: true });
          
        if (error) throw error;
        setMembers(data || []);
      } catch (error: any) {
        console.error("Error fetching members:", error);
        setError("Failed to load members. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const roleOrder = [
    "president",
    "vice president",
    "chair",
    "general secretary",
    "assistant general secretary",
    "event management head",
    "graphics head",
    "media head",
    "protocol director",
    "hosting"
  ];

  const getRoleRank = (role: string) => {
    const lowerRole = role.toLowerCase().trim();
    
    // 1. Check for exact match first
    const exactIndex = roleOrder.indexOf(lowerRole);
    if (exactIndex !== -1) return exactIndex;
    
    // 2. Handle the "vice president" vs "president" substring issue
    if (lowerRole.includes("vice president")) return 1;
    if (lowerRole.includes("president")) return 0;
    
    // 3. Fallback to substring match for other roles
    for (let i = 0; i < roleOrder.length; i++) {
      if (lowerRole.includes(roleOrder[i])) {
        return i;
      }
    }
    return 999;
  };

  const sortMembers = (membersList: any[]) => {
    return [...membersList].sort((a, b) => {
      // 1. Sort by explicit sort_order if it exists and is not 999
      const orderA = a.sort_order ?? 999;
      const orderB = b.sort_order ?? 999;
      
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      
      // 2. Fallback to role rank
      const rankA = getRoleRank(a.role);
      const rankB = getRoleRank(b.role);
      if (rankA !== rankB) {
        return rankA - rankB;
      }
      
      // 3. Fallback to name
      return a.name.localeCompare(b.name);
    });
  };

  const coreMembers = sortMembers(members.filter(m => m.team === 'Core' || (!m.team && (m.role.toLowerCase().includes('president') || m.role.toLowerCase().includes('chair')))));
  const upperCabinet = sortMembers(members.filter(m => m.team === 'Upper Cabinet'));
  const lowerCabinet = sortMembers(members.filter(m => m.team === 'Lower Cabinet'));
  const otherMembers = sortMembers(members.filter(m => m.team !== 'Core' && m.team !== 'Upper Cabinet' && m.team !== 'Lower Cabinet' && !m.role.toLowerCase().includes('president') && !m.role.toLowerCase().includes('chair')));

  const renderMemberGroup = (title: string, groupMembers: any[]) => {
    if (groupMembers.length === 0) return null;
    return (
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-slate-800 mb-10 text-center relative inline-block left-1/2 -translate-x-1/2">
          {title}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-full"></div>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {groupMembers.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.12)] hover:-translate-y-2 transition-all duration-500 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <img 
                  src={member.image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.id}`} 
                  alt={member.name}
                  className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-md group-hover:border-blue-100 transition-colors duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 text-slate-900 transition-colors">{member.name}</h3>
              <p className="text-blue-600 font-medium text-sm mb-2">{member.role}</p>
              {member.registration_number && (
                <p className="text-slate-500 text-xs mb-6 font-mono">{member.registration_number}</p>
              )}
              {!member.registration_number && <div className="mb-6"></div>}
              
              {member.skills && member.skills.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {member.skills.slice(0, 3).map((skill: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs rounded-full border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex justify-center gap-4 mt-auto relative z-10">
                {member.social_links?.instagram && (
                  <a href={member.social_links.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-pink-600 hover:bg-pink-50 transition-all border border-slate-100">
                    <Instagram size={18} />
                  </a>
                )}
                {member.social_links?.youtube && (
                  <a href={member.social_links.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all border border-slate-100">
                    <Youtube size={18} />
                  </a>
                )}
                {member.social_links?.tiktok && (
                  <a href={member.social_links.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-black hover:bg-slate-100 transition-all border border-slate-100">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="18" r="4"/><path d="M12 18V2l7 4"/></svg>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-teal-100/50 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-40 left-10 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-blue-600"
          >
            Our Team
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Meet the dedicated individuals driving the ACM KFUEIT Chapter forward.
          </motion.p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="animate-pulse bg-white rounded-3xl h-80 border border-slate-200 shadow-sm"></div>
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
            <h3 className="text-2xl font-bold text-red-800 mb-2">Error Loading Members</h3>
            <p className="text-red-600 text-lg">{error}</p>
          </motion.div>
        ) : members.length > 0 ? (
          <>
            {renderMemberGroup("Core Team", coreMembers)}
            {renderMemberGroup("Upper Cabinet", upperCabinet)}
            {renderMemberGroup("Lower Cabinet", lowerCabinet)}
            {renderMemberGroup("Other Members", otherMembers)}
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm"
          >
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
              <Users size={40} className="text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No members found</h3>
            <p className="text-slate-500 text-lg">Our team directory is currently being updated.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
