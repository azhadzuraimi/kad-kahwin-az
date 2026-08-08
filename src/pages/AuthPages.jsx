import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Heart, ShieldCheck, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Custom SVG component for official Google Logo
function GoogleIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#EA4335"
        d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
      />
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
      />
      <path
        fill="#FBBC05"
        d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.8s.7 5.1 1.9 7.5l3.7-2.9c-.6-.7-1-1.6-1-2.6z"
      />
      <path
        fill="#34A853"
        d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
      />
    </svg>
  );
}

export default function AuthPages() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, loginWithGoogle, register, user, loading: authLoading } = useAuth();

  const initialTab = searchParams.get('tab') || 'login';
  const [activeTab, setActiveTab] = useState(initialTab); // 'login' | 'register' | 'admin'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    setIsSubmitting(true);
    const res = await loginWithGoogle();
    if (!res.success) {
      setErrorMsg(res.error);
      setIsSubmitting(false);
    }
  };

  const handleCustomerLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);
    const res = await login(email || 'pengantin@gmail.com', password || 'user123');
    setIsSubmitting(false);
    if (!res.success) {
      setErrorMsg(res.error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMsg('Sila lengkapkan borang pendaftaran.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);
    const res = await register(name, email, password);
    setIsSubmitting(false);
    if (!res.success) {
      setErrorMsg(res.error);
    } else if (res.message) {
      setErrorMsg(res.message);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);
    const res = await login(email || 'admin@ikrizanvite.my', password || 'admin123');
    setIsSubmitting(false);
    if (!res.success) {
      setErrorMsg(res.error || 'Log masuk admin gagal.');
    }
  };

  const fillCustomerDemo = () => {
    setEmail('pengantin@gmail.com');
    setPassword('user123');
    setErrorMsg('');
  };

  const fillAdminDemo = () => {
    setEmail('admin@ikrizanvite.my');
    setPassword('admin123');
    setErrorMsg('');
  };

  if (authLoading) {
    return (
      <div className="min-h-[85vh] bg-slate-950 flex flex-col items-center justify-center text-slate-300 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
        <p className="text-sm font-medium">Pengesahan sesi Supabase...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 blur-2xl pointer-events-none" />

        {/* Top Header Logo */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-rose-500/20">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">IKRIZANVITE PORTAL</h2>
          <p className="text-xs text-slate-400 mt-1">Sistem Pengurusan Kad Kahwin Digital (Supabase Auth)</p>
        </div>

        {/* Auth Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-xl mb-6 border border-slate-800 text-xs font-bold">
          <button
            onClick={() => { setActiveTab('login'); setErrorMsg(''); setEmail(''); setPassword(''); }}
            className={`flex-1 py-2 rounded-lg transition ${activeTab === 'login' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Pengguna
          </button>
          <button
            onClick={() => { setActiveTab('register'); setErrorMsg(''); }}
            className={`flex-1 py-2 rounded-lg transition ${activeTab === 'register' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Daftar
          </button>
          <button
            onClick={() => { setActiveTab('admin'); setErrorMsg(''); setEmail(''); setPassword(''); }}
            className={`flex-1 py-2 rounded-lg transition ${activeTab === 'admin' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
          >
            👑 Admin
          </button>
        </div>

        {/* Quick Google Login Button (Available for all tabs) */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            className="w-full py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl shadow-md transition text-xs flex items-center justify-center gap-3 border border-slate-200"
          >
            <GoogleIcon className="w-5 h-5" />
            <span>{isSubmitting ? 'Mengakses Google...' : 'Log Masuk dengan Akaun Google'}</span>
          </button>
          
          <div className="relative my-5 flex items-center justify-center">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-900 px-3 text-[10px] text-slate-500 uppercase tracking-widest absolute">atau emel</span>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs rounded-xl text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* TAB 1: CUSTOMER LOGIN */}
        {activeTab === 'login' && (
          <form onSubmit={handleCustomerLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Alamat Emel</label>
              <input
                type="email"
                required
                placeholder="pengantin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Kata Laluan</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold rounded-xl shadow-lg transition text-sm flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Log Masuk Akaun <ArrowRight className="w-4 h-4" /></>}
            </button>

            <button
              type="button"
              onClick={fillCustomerDemo}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700"
            >
              <Sparkles className="w-3.5 h-3.5" /> Isi Demo Akaun Pengantin (Klik Sini)
            </button>
          </form>
        )}

        {/* TAB 2: REGISTER */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Nama Penuh Pengantin</label>
              <input
                type="text"
                required
                placeholder="Ahmad Adam"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Alamat Emel</label>
              <input
                type="email"
                required
                placeholder="adam@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Kata Laluan</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-lg transition text-sm flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Daftar Akaun Baru (Supabase)'}
            </button>
          </form>
        )}

        {/* TAB 3: ADMIN LOGIN */}
        {activeTab === 'admin' && (
          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-amber-300 font-semibold mb-1">Emel Admin</label>
              <input
                type="email"
                required
                placeholder="admin@ikrizanvite.my"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-amber-300 font-semibold mb-1">Kata Laluan Admin</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl shadow-lg transition text-sm flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ShieldCheck className="w-4 h-4" /> Log Masuk Admin Portal</>}
            </button>

            <button
              type="button"
              onClick={fillAdminDemo}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-amber-500/30"
            >
              <Sparkles className="w-3.5 h-3.5" /> Isi Demo Admin (admin@ikrizanvite.my)
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
