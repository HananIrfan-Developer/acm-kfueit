import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { supabase } from '../supabase';
import toast from 'react-hot-toast';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate('/');
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Members', path: '/members' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 border-b border-slate-200/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link to="/" className="flex items-center gap-3">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPHaOyU7EMjnlbQp59hxvBpuJ7fQ2DDu6zCQ&s" alt="ACM KFUEIT Logo" className="h-12 w-auto object-contain rounded-full" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <span className="font-bold text-xl text-slate-900 tracking-tight hidden sm:block">
                ACM <span className="text-blue-600">KFUEIT</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-600 relative",
                  location.pathname === link.path 
                    ? "text-blue-600" 
                    : "text-slate-600"
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div layoutId="underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </Link>
            ))}
            
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
              {user ? (
                <div className="flex items-center gap-4">
                  {user.email === 'hananirfan81@gmail.com' && (
                    <Link to="/admin/dashboard" className="text-sm font-medium text-blue-600 hover:underline">
                      Dashboard
                    </Link>
                  )}
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <User size={16} className="text-blue-600" />
                    <span className="hidden lg:block">{user.email}</span>
                  </div>
                  <button onClick={handleLogout} className="text-sm font-medium text-slate-600 hover:text-red-600 flex items-center gap-1 transition-colors">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600 flex items-center gap-1">
                    <LogIn size={16} /> Login
                  </Link>
                  <Link to="/signup" className="text-sm font-medium px-4 py-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-1 border border-blue-100">
                    <UserPlus size={16} /> Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-blue-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200"
        >
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-xl text-base font-medium transition-all",
                  location.pathname === link.path
                    ? "bg-blue-50 text-blue-600 border border-blue-100"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-slate-200 flex flex-col gap-3">
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm text-slate-500 flex items-center gap-2">
                    <User size={16} /> {user.email}
                  </div>
                  {user.email === 'hananirfan81@gmail.com' && (
                    <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-center rounded-xl bg-blue-600 text-white font-medium">
                      Dashboard
                    </Link>
                  )}
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block px-4 py-3 text-center rounded-xl border border-red-200 text-red-600 font-medium hover:bg-red-50">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-center rounded-xl border border-slate-200 font-medium">
                    Login
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-center rounded-xl bg-blue-600 text-white font-medium">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
