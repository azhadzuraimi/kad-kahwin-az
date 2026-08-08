import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Key, Sparkles, User, ShieldCheck, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-rose-400 to-amber-300 flex items-center justify-center text-white shadow-lg shadow-rose-500/20 group-hover:scale-105 transition">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-tight bg-gradient-to-r from-white via-rose-100 to-amber-200 bg-clip-text text-transparent block">
                IKRIZANVITE
              </span>
              <span className="text-[10px] text-rose-300 uppercase tracking-widest block font-medium">
                Digital Invitation Luxury
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link to="/" className="hover:text-rose-300 transition">Utama</Link>
            <a href="#features" className="hover:text-rose-300 transition">Fungsi Lengkap</a>
            <a href="#designs" className="hover:text-rose-300 transition">Pilihan Design</a>
            <a href="#pricing" className="hover:text-rose-300 transition">Pakej & Harga</a>
            <Link to="/card/adam-hawa" target="_blank" className="text-amber-300 flex items-center gap-1 hover:text-amber-200 font-semibold">
              <Sparkles className="w-4 h-4" /> Live Demo
            </Link>
          </nav>

          {/* Desktop Right CTA / User State */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                {user.role === 'ADMIN' ? (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500/20 border border-amber-500/50 text-amber-300 hover:bg-amber-500/30 rounded-xl text-xs font-bold transition shadow"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-400" /> Admin Portal 👑
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-rose-600/30"
                  >
                    <User className="w-4 h-4" /> Dashboard Saya
                  </Link>
                )}

                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition"
                  title="Log Keluar"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth"
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition"
                >
                  Log Masuk
                </Link>
                <Link
                  to="/auth?tab=register"
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-rose-500/20"
                >
                  <Key className="w-3.5 h-3.5" /> Beli / Aktifkan Kad
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3 text-sm">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300">Utama</Link>
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300">Fungsi Lengkap</a>
          <a href="#designs" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300">Pilihan Design</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300">Pakej & Harga</a>
          <Link to="/card/adam-hawa" target="_blank" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-amber-300 font-bold">Live Demo eKad</Link>
          
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {user ? (
              user.role === 'ADMIN' ? (
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-center">Portal Admin</Link>
              ) : (
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="py-2.5 bg-rose-600 text-white font-bold rounded-xl text-center">Dashboard Saya</Link>
              )
            ) : (
              <>
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="py-2.5 bg-slate-800 text-white font-bold rounded-xl text-center">Log Masuk</Link>
                <Link to="/auth?tab=register" onClick={() => setMobileMenuOpen(false)} className="py-2.5 bg-rose-600 text-white font-bold rounded-xl text-center">Aktifkan Kad Kahwin</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
