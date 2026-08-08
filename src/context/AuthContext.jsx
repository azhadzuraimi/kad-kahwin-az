import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ikz_auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  // Helper to format Supabase user object into app standard user
  const formatUser = (sbUser) => {
    if (!sbUser) return null;
    const isEmailAdmin = sbUser.email === 'admin@ikrizanvite.my';
    const metadataRole = sbUser.user_metadata?.role || sbUser.app_metadata?.role;
    const role = (isEmailAdmin || metadataRole === 'ADMIN') ? 'ADMIN' : 'USER';
    
    return {
      id: sbUser.id,
      email: sbUser.email,
      name: sbUser.user_metadata?.full_name || sbUser.user_metadata?.name || sbUser.email.split('@')[0],
      avatar: sbUser.user_metadata?.avatar_url || null,
      role
    };
  };

  useEffect(() => {
    // Check initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const formatted = formatUser(session.user);
          setUser(formatted);
        }
      } catch (err) {
        console.error('Error fetching Supabase session:', err);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen to Auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const formatted = formatUser(session.user);
        setUser(formatted);
        localStorage.setItem('ikz_auth_user', JSON.stringify(formatted));
      } else {
        // If Supabase session cleared, fallback check if local mock user exists
        const saved = localStorage.getItem('ikz_auth_user');
        if (saved) {
          try {
            setUser(JSON.parse(saved));
          } catch (e) {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('ikz_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ikz_auth_user');
    }
  }, [user]);

  // Google OAuth Login
  const loginWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message || 'Gagal log masuk dengan Google.' };
    }
  };

  // Email & Password Login
  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Demo fallback for local development testing
        if (email === 'admin@ikrizanvite.my' && password === 'admin123') {
          const adminUser = {
            id: 'admin-1',
            email: 'admin@ikrizanvite.my',
            name: 'Super Admin Ikrizanvite',
            role: 'ADMIN'
          };
          setUser(adminUser);
          return { success: true, user: adminUser };
        }

        if (email === 'pengantin@gmail.com' && password === 'user123') {
          const customerUser = {
            id: 'user-1',
            email: 'pengantin@gmail.com',
            name: 'Ahmad Adam',
            role: 'USER'
          };
          setUser(customerUser);
          return { success: true, user: customerUser };
        }

        return { success: false, error: error.message || 'Emel atau kata laluan tidak sah.' };
      }

      const formatted = formatUser(data.user);
      setUser(formatted);
      return { success: true, user: formatted };
    } catch (err) {
      return { success: false, error: err.message || 'Ralat semasa log masuk.' };
    }
  };

  // Register New User
  const register = async (name, email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: 'USER'
          }
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        const formatted = formatUser(data.user);
        setUser(formatted);
        return { success: true, user: formatted };
      }

      return { success: true, message: 'Pendaftaran berjaya! Sila semak emel anda jika pengesahan diperlukan.' };
    } catch (err) {
      return { success: false, error: err.message || 'Ralat pendaftaran.' };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Supabase signout notice:', e);
    }
    setUser(null);
    localStorage.removeItem('ikz_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
