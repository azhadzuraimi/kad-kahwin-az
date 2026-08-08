import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, CheckCircle2, Heart, Key, ShieldCheck, PhoneCall, 
  Share2, ArrowRight, Zap, Gift, Image, Music, MapPin, Calendar, MessageSquare, DollarSign, Tv
} from 'lucide-react';
import EKadView from '../components/EKadView';
import { useCard } from '../context/CardContext';
import { PRESET_THEMES } from '../data/mockData';

export default function LandingPage() {
  const { cards } = useCard();
  const demoCard = cards[0];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-rose-500 selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-rose-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-rose-400 animate-spin-slow" /> Platform Kad Kahwin Digital #1 Malaysia
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-white tracking-tight leading-[1.1]">
              KAD KAHWIN DIGITAL <br />
              <span className="bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300 bg-clip-text text-transparent">
                TERUS SIAP — JENIS LUXURY
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Cipta e-Kad perkahwinan seawal 5 minit! Lengkap dengan fungsi RSVP, Buku Tetamu, Salam Kaut QR, Hadiah Wishlist, Navigasi Waze, Lagu Background & Tonton Live.
            </p>

            {/* Core Specs Checklist (From Image 1) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs font-semibold text-slate-200">
              <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Fungsi RSVP & Export
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Salam Kaut DuitNow QR
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Hadiah & Wishlist
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Boleh 2 Majlis Berbeza
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Buku Tetamu Live
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 100+ Design Choices
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/auth?tab=register"
                className="flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold rounded-2xl shadow-xl shadow-rose-600/30 text-sm transition transform hover:-translate-y-0.5"
              >
                <Key className="w-5 h-5" /> Masukkan Kod / Aktifkan Kad
              </Link>
              <Link
                to="/card/adam-hawa"
                target="_blank"
                className="flex items-center justify-center gap-2 px-7 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 font-bold rounded-2xl text-sm transition"
              >
                <Sparkles className="w-5 h-5" /> Lihat Live Demo eKad
              </Link>
            </div>
          </div>

          {/* Right Mobile Live Preview Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-rose-500 to-amber-500 rounded-[50px] blur-xl opacity-30 animate-pulse-slow" />
              <EKadView card={demoCard} isEmbedded={true} onActivateClick={() => navigate('/auth?tab=register')} />
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES BREAKDOWN SECTION (Exact features from user photos) */}
      <section id="features" className="py-20 bg-slate-900 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-rose-400">Pakej Fungsi Lengkap</h2>
            <p className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Semua Fungsi Eksklusif Di Dalam 1 Link eKad Kahwin
            </p>
            <p className="text-slate-400 text-sm">
              Rekabentuk mewah yang intuitif untuk memudahkan jemputan tetamu dan pengurusan majlis anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 hover:border-rose-500/40 transition group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition">
                📋
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Fungsi RSVP & Fail Anda</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tetamu boleh isi borang kehadiran mengikut sesi. Pengantin boleh lihat ringkasan jumlah tetamu & muat turun fail CSV Excel!
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 hover:border-rose-500/40 transition group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition">
                💵
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Salam Kaut / Money Gift</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sokongan pindahan bank direct & paparan Kod QR DuitNow instant bagi tetamu yang mahu memberi sumbangan ikhlas.
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 hover:border-rose-500/40 transition group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition">
                🎁
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Hadiah & Wishlist Registry</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Senarai barang keperluan perkahwinan. Tetamu boleh tempah hadiah pilihan mereka untuk elak pembelian bertindih.
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 hover:border-rose-500/40 transition group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition">
                💒
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2 Majlis Berbeza (1 Link)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Satu pautan eKad mengandungi 2 majlis berasingan (cth: Majlis Pihak Perempuan & Majlis Menyambut Menantu Pihak Lelaki).
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 hover:border-rose-500/40 transition group">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition">
                ✍️
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Buku Tetamu (Guestbook)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ruangan ucapan & doa murni daripada sahabat dan saudara mara yang dipaparkan secara langsung di eKad.
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 hover:border-rose-500/40 transition group">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition">
                📡
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Tonton Live Majlis</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sematan siaran langsung TikTok Live & YouTube khas untuk tetamu jauh yang tidak berkesempatan hadir secara fizikal.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* DESIGN THEMES SHOWCASE */}
      <section id="designs" className="py-20 bg-slate-950 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400">100+ Pilihan Design</h2>
            <p className="text-3xl font-serif font-bold text-white">Koleksi Tema Luxury Perkahwinan</p>
            <p className="text-slate-400 text-sm">Pilih pelbagai rona warna dan corak mengikut tema majlis perkahwinan anda.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRESET_THEMES.map((theme) => (
              <div key={theme.id} className="bg-slate-900 rounded-3xl p-5 border border-slate-800 hover:border-amber-400/50 transition flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-amber-400/20 text-amber-300 rounded-full">
                      {theme.previewBadge}
                    </span>
                  </div>
                  <h3 className="text-base font-serif font-bold text-white mb-1">{theme.name}</h3>
                  <p className="text-xs text-slate-400 mb-4">{theme.description}</p>
                </div>
                <Link
                  to="/auth?tab=register"
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-rose-300 font-bold rounded-xl text-xs text-center block transition"
                >
                  Pilih Design Ini
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING & ACTIVATION SECTION */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-rose-400">Harga Telus Tanpa Caj Tersembunyi</h2>
          <p className="text-3xl sm:text-5xl font-serif font-bold text-white">Pilih Pakej Kad Kahwin Anda</p>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Boleh terus bina secara percuma dalam mod pratonton. Guna Kod Aktivasi untuk aktifkan ke Versi Penuh Luxury!
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Free Demo Card */}
          <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 relative flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Mod Pratonton</span>
              <h3 className="text-2xl font-bold text-white mt-1">Free Demo Draft</h3>
              <div className="my-4 text-4xl font-extrabold text-white font-serif">
                RM 0 <span className="text-xs font-normal text-slate-400">/ selamanya</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 my-6 text-left">
                <li className="flex items-center gap-2">✓ Bina & Preview Kad serta-merta</li>
                <li className="flex items-center gap-2">✓ Isi maklumat pengantin & majlis</li>
                <li className="flex items-center gap-2 text-slate-500">❌ Watermark Pratonton dipaparkan</li>
                <li className="flex items-center gap-2 text-slate-500">❌ Export CSV RSVP terhad</li>
              </ul>
            </div>
            <Link
              to="/auth?tab=register"
              className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold text-xs transition"
            >
              Mula Bina Pratonton
            </Link>
          </div>

          {/* Luxury Full Version (PROMO) */}
          <div className="bg-gradient-to-b from-rose-950/60 to-slate-950 p-8 rounded-3xl border-2 border-rose-500/80 relative flex flex-col justify-between shadow-2xl shadow-rose-900/20">
            <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full shadow">
              PALING POPULAR (JENIS LUXURY)
            </div>
            <div>
              <span className="text-xs font-bold uppercase text-rose-300 tracking-wider">Versi Penuh Aktif</span>
              <h3 className="text-2xl font-bold text-white mt-1">Ikrizanvite Luxury Unlimited</h3>
              <div className="my-4 text-4xl font-extrabold text-rose-400 font-serif">
                RM 39 <span className="text-xs font-normal text-slate-400 line-through ml-2">RM 79</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-200 my-6 text-left">
                <li className="flex items-center gap-2 text-emerald-300 font-semibold">✓ Tiada Watermark (Versi Penuh)</li>
                <li className="flex items-center gap-2">✓ Sokongan Dual Majlis (2 Majlis 1 Link)</li>
                <li className="flex items-center gap-2">✓ Fungsi RSVP Tanpa Had & Export CSV</li>
                <li className="flex items-center gap-2">✓ Salam Kaut DuitNow QR & Hadiah Wishlist</li>
                <li className="flex items-center gap-2">✓ Custom Music Background & Tonton Live</li>
              </ul>
            </div>

            <div className="space-y-2">
              <Link
                to="/auth?tab=register"
                className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-2xl font-bold text-sm shadow-xl shadow-rose-600/30 flex items-center justify-center gap-2 transition"
              >
                <Key className="w-4 h-4" /> Masukkan Kod Aktivasi
              </Link>
              <p className="text-[10px] text-slate-400 text-center">
                Dapatkan Kod Aktivasi daripada Admin atau ejen sah. (Kod Demo: <code className="text-amber-300 font-mono">IKZ-LUX-2026</code>)
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
