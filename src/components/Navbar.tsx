import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { auth, logOut } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
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
              <img src="https://vui.unsplash.com/resize?height=256&quality=60&type=auto&url=https%3A%2F%2Fsearched-images.s3.us-west-2.amazonaws.com%2F3ec28cc8-6486-4a1f-9f4f-7d3d09d4d592%3FX-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIAQ4GRIA4QTG2PSHUB%252F20260404%252Fus-west-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20260404T091013Z%26X-Amz-Expires%3D86400%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Signature%3Da6e14384e355f8346be50ba8a97b3baa120eb28b3cc87fe6aef2863905ef2165&sign=WjU_fZ2nNFX1oUXEY8Pqd3FMDOLpvJ2at0PmgvT1Ps8" alt="ACM KFUEIT Logo" className="h-12 w-auto object-contain rounded-full" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
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
