import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState, ReactNode } from 'react';
import { supabase } from '../supabase';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const email = session.user.email;
      if (email === 'hananirfan91@gmail.com' || email === 'acmkfueitt@gmail.com') {
        setIsAuthenticated(true);
      } else {
        // Check if user has roles in user_roles table
        const { data, error } = await supabase
          .from('user_roles')
          .select('*')
          .eq('email', email)
          .single();
          
        if (data && (data.role_events || data.role_news || data.role_members)) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // If they were trying to access admin, send them to profile
    if (location.pathname.startsWith('/admin')) {
        return <Navigate to="/profile" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
