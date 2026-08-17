import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { motion } from 'motion/react';
import { User, Mail, LogOut, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

export function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        navigate('/login');
      }
      setLoading(false);
    });
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out successfully');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-8 py-12 text-white flex flex-col items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000')] bg-cover opacity-10 mix-blend-overlay"></div>
            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border-2 border-white/40 shadow-lg relative z-10">
              <User size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold relative z-10">{user?.user_metadata?.full_name || 'ACM Member'}</h1>
            <p className="text-blue-100 flex items-center gap-2 mt-2 relative z-10">
              <Mail size={16} /> {user?.email}
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">Account Details</h2>
                <p className="text-slate-500 text-sm">Manage your personal information and preferences.</p>
              </div>
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-bold transition-colors"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Status</div>
                <div className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span> Active Member
                </div>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Role</div>
                <div className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Shield size={20} className="text-blue-500" /> Standard User
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
