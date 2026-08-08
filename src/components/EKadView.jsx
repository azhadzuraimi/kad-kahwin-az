import React, { useState, useEffect, useRef } from 'react';
import { 
  RotateCcw, Calendar, Phone, MapPin, Mail, AlertCircle, Music, 
  ChevronUp, ChevronDown, Gift, Heart, Video, MessageSquare, 
  X, Check, Copy, ExternalLink, Share2, Sparkles, Volume2, VolumeX
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AUDIO_TRACKS } from '../data/mockData';
import { useCard } from '../context/CardContext';

export default function EKadView({ card, isEmbedded = false, onActivateClick = null }) {
  const { addRsvp, addGuestbookWish, toggleWishlistItem } = useCard();
  const [activeMajlisTab, setActiveMajlisTab] = useState(1); // 1 or 2
  const [activeModal, setActiveModal] = useState(null); // 'rsvp' | 'kalendar' | 'hubungi' | 'lokasi' | 'nota' | 'salamKaut' | 'wishlist' | 'liveStream' | 'bukuTetamu' | 'gallery'
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);
  const audioRef = useRef(null);

  // Form states
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    phone: '',
    relation: 'Sahabat',
    status: 'Hadir',
    session: '',
    count: 1
  });

  const [wishForm, setWishForm] = useState({
    name: '',
    wish: ''
  });

  const [reservingItem, setReservingItem] = useState(null);
  const [reserverName, setReserverName] = useState('');

  // Selected majlis data
  const currentMajlis = activeMajlisTab === 1 ? card.majlis1 : (card.majlis2 || card.majlis1);
  const currentAudio = AUDIO_TRACKS.find(t => t.id === card.songId) || AUDIO_TRACKS[0];

  useEffect(() => {
    if (currentMajlis?.sessions?.length > 0) {
      setRsvpForm(prev => ({ ...prev, session: currentMajlis.sessions[0].time }));
    }
  }, [activeMajlisTab, currentMajlis]);

  // Handle music play/pause
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch(err => console.log('Audio autoplay policy block:', err));
    }
  };

  const handleRefresh = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlayingMusic(true);
    }
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpForm.name.trim()) return;
    addRsvp(card.id, rsvpForm);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
    setActiveModal(null);
    alert('Terima kasih! RSVP anda telah berjaya disimpan.');
    setRsvpForm({ name: '', phone: '', relation: 'Sahabat', status: 'Hadir', session: currentMajlis.sessions?.[0]?.time || '', count: 1 });
  };

  const handleWishSubmit = (e) => {
    e.preventDefault();
    if (!wishForm.name.trim() || !wishForm.wish.trim()) return;
    addGuestbookWish(card.id, wishForm);
    confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
    setWishForm({ name: '', wish: '' });
  };

  const handleReserveWishlist = (itemId) => {
    if (!reserverName.trim()) return;
    toggleWishlistItem(card.id, itemId, reserverName);
    setReservingItem(null);
    setReserverName('');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  // Google Calendar link builder
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Walimatulurus: ${card.groomShort} & ${card.brideShort}`);
    const details = encodeURIComponent(`Jemputan Majlis Perkahwinan ${card.groomName} & ${card.brideName}`);
    const location = encodeURIComponent(currentMajlis.venueName + ', ' + currentMajlis.address);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <div className={`relative mx-auto bg-luxury-cardBg text-slate-800 rounded-[38px] shadow-2xl overflow-hidden border-[8px] border-slate-900 ${isEmbedded ? 'w-full max-w-[410px] h-[820px]' : 'w-full max-w-[430px] min-h-[850px]'}`}>
      
      {/* Background Audio element */}
      <audio ref={audioRef} src={currentAudio.src} loop />

      {/* UNACTIVATED WATERMARK OVERLAY */}
      {!card.isActivated && (
        <div className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-amber-500/90 to-amber-700/95 text-white p-3 text-center shadow-lg backdrop-blur-md">
          <div className="flex items-center justify-between gap-2 px-2">
            <span className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-spin-slow" /> Mod Pratonton (Demo)
            </span>
            {onActivateClick && (
              <button 
                onClick={onActivateClick} 
                className="bg-white text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full shadow hover:bg-yellow-100 transition"
              >
                Aktifkan Sekarang 🔑
              </button>
            )}
          </div>
          <p className="text-[10px] text-amber-100 mt-0.5">Sila masukkan Kod Aktivasi untuk padam watermark & akses versi penuh.</p>
        </div>
      )}

      {/* DUAL MAJLIS TAB SWITCHER (Matching Image 3: Boleh 2 majlis berbeza) */}
      {card.hasDualMajlis && card.majlis2 && (
        <div className={`flex bg-rose-900 text-white font-medium text-xs ${!card.isActivated ? 'mt-14' : ''}`}>
          <button
            onClick={() => setActiveMajlisTab(1)}
            className={`flex-1 py-2 px-2 text-center border-b-2 transition ${activeMajlisTab === 1 ? 'border-amber-300 bg-rose-800 font-bold' : 'border-transparent text-rose-200 hover:text-white'}`}
          >
            💒 Pihak Perempuan
          </button>
          <button
            onClick={() => setActiveMajlisTab(2)}
            className={`flex-1 py-2 px-2 text-center border-b-2 transition ${activeMajlisTab === 2 ? 'border-amber-300 bg-rose-800 font-bold' : 'border-transparent text-rose-200 hover:text-white'}`}
          >
            💍 Pihak Lelaki
          </button>
        </div>
      )}

      {/* CARD MAIN SCROLLABLE CONTAINER */}
      <div className={`overflow-y-auto pb-32 ${!card.isActivated && !card.hasDualMajlis ? 'pt-14' : ''} h-full select-none`}>
        
        {/* HERO FLORAL HEADER SECTION (Exact layout from image 1) */}
        <div className="relative pt-8 pb-10 px-6 text-center bg-gradient-to-b from-rose-50/80 via-white to-pink-50/40">
          
          {/* Floral Art background simulation */}
          <div className="absolute top-0 left-0 right-0 h-44 bg-[radial-gradient(circle_at_top,#fbcfe8,transparent_70%)] opacity-40 pointer-events-none" />
          
          <div className="relative z-10">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-rose-900/80 block mb-1">
              WALIMATULURUS
            </span>
            <span className="text-[10px] italic text-rose-700 block mb-4 font-serif">
              Wedding Invitation
            </span>

            {/* Groom & Bride Names */}
            <div className="my-6">
              <h1 className="text-3xl font-serif font-bold text-rose-950 tracking-tight leading-tight">
                {card.groomShort || card.groomName}
              </h1>
              <span className="text-2xl font-script text-rose-600 block my-1">&</span>
              <h1 className="text-3xl font-serif font-bold text-rose-950 tracking-tight leading-tight">
                {card.brideShort || card.brideName}
              </h1>
            </div>

            {/* Date Badge (Exact Sab, 01.07.2023 design) */}
            <div className="inline-block bg-white/80 border border-pink-200 rounded-2xl px-6 py-2.5 shadow-sm my-3 backdrop-blur-sm">
              <div className="text-xs uppercase font-bold tracking-widest text-rose-900">
                {currentMajlis.dateText.split(',')[0]}
              </div>
              <div className="text-2xl font-serif font-extrabold text-rose-950 my-0.5">
                {currentMajlis.dateText.split(',')[1] || currentMajlis.dateText}
              </div>
              <div className="text-[11px] italic text-rose-700">
                {currentMajlis.hijriDate || 'Saturday'}
              </div>
            </div>

            <p className="text-xs text-rose-900/80 mt-2 font-medium">
              {currentMajlis.timeText}
            </p>
            <p className="text-[11px] text-slate-600 mt-1 max-w-[260px] mx-auto">
              {currentMajlis.venueName}
            </p>
          </div>
        </div>

        {/* QUICK ACCESS MODULE BADGES (Salam Kaut, Wishlist, Live Stream, Guestbook, Gallery) */}
        <div className="px-4 py-4 grid grid-cols-2 gap-2.5 bg-gradient-to-r from-rose-100/50 via-white to-pink-100/50 border-y border-pink-100">
          
          {/* Salam Kaut Badge */}
          {card.modules.salamKaut && (
            <button
              onClick={() => setActiveModal('salamKaut')}
              className="flex items-center gap-2 p-2.5 bg-white border border-rose-200 rounded-xl shadow-sm hover:border-rose-400 hover:bg-rose-50/50 transition text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                💵
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-800 block">Salam Kaut</span>
                <span className="text-[9px] text-slate-500">Money Gift / QR</span>
              </div>
            </button>
          )}

          {/* Hadiah / Wishlist Badge */}
          {card.modules.wishlist && (
            <button
              onClick={() => setActiveModal('wishlist')}
              className="flex items-center gap-2 p-2.5 bg-white border border-rose-200 rounded-xl shadow-sm hover:border-rose-400 hover:bg-rose-50/50 transition text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm">
                🎁
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-800 block">Hadiah Wishlist</span>
                <span className="text-[9px] text-slate-500">Senarai Hadiah</span>
              </div>
            </button>
          )}

          {/* Tonton Live Badge */}
          {card.modules.liveStream && (
            <button
              onClick={() => setActiveModal('liveStream')}
              className="flex items-center gap-2 p-2.5 bg-white border border-rose-200 rounded-xl shadow-sm hover:border-rose-400 hover:bg-rose-50/50 transition text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm">
                📡
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-800 block">Tonton Live</span>
                <span className="text-[9px] text-slate-500">Siaran Langsung</span>
              </div>
            </button>
          )}

          {/* Buku Tetamu Badge */}
          {card.modules.guestbook && (
            <button
              onClick={() => setActiveModal('bukuTetamu')}
              className="flex items-center gap-2 p-2.5 bg-white border border-rose-200 rounded-xl shadow-sm hover:border-rose-400 hover:bg-rose-50/50 transition text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                ✍️
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-800 block">Buku Tetamu</span>
                <span className="text-[9px] text-slate-500">{card.guestbook?.length || 0} Ucapan</span>
              </div>
            </button>
          )}
        </div>

        {/* PHOTO GALLERY SLIDER SECTION (Matching Image 3 "SLIDE GAMBAR") */}
        {card.modules.gallery && card.galleryImages?.length > 0 && (
          <div className="py-6 px-4 bg-white">
            <h3 className="text-xs font-bold tracking-widest text-center uppercase text-rose-900 mb-3 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" /> Kenangan Indah (Slide Gambar)
            </h3>
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory py-2 no-scrollbar">
              {card.galleryImages.map((imgUrl, idx) => (
                <div 
                  key={idx} 
                  className="snap-center shrink-0 w-64 h-80 rounded-2xl overflow-hidden shadow-md border-2 border-rose-100 relative group cursor-pointer"
                  onClick={() => setActiveModal('gallery')}
                >
                  <img src={imgUrl} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[9px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {idx + 1} / {card.galleryImages.length}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INVITATION DETAIL SECTION */}
        <div className="p-6 text-center space-y-4 bg-gradient-to-b from-white to-rose-50/60">
          <div className="w-12 h-[1px] bg-rose-300 mx-auto" />
          <p className="text-xs italic text-slate-700 leading-relaxed font-serif px-2">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya..."
            <br />
            <span className="font-semibold text-rose-900 text-[10px] mt-1 block">(Surah Ar-Rum: 21)</span>
          </p>
          <div className="w-12 h-[1px] bg-rose-300 mx-auto" />

          {/* PARENTS & INVITATION TEXT */}
          <div className="pt-2">
            <p className="text-[11px] uppercase tracking-wider text-rose-900 font-bold mb-1">
              Dengan Penuh Kesyukuran, Kami:
            </p>
            <p className="text-xs font-semibold text-slate-800">
              {card.groomParents}
            </p>
            <span className="text-[10px] text-slate-500 block my-1">serta</span>
            <p className="text-xs font-semibold text-slate-800">
              {card.brideParents}
            </p>
            <p className="text-xs text-slate-600 mt-3 leading-snug">
              jemput Dato' / Datin / Tuan / Puan / Encik / Cik ke majlis perkahwinan anakanda kami:
            </p>
            <div className="my-3 py-2 px-4 bg-white/80 rounded-xl border border-pink-200 inline-block shadow-sm">
              <span className="text-sm font-bold text-rose-950 font-serif">{card.groomName}</span>
              <span className="text-xs text-rose-600 font-script mx-2">&</span>
              <span className="text-sm font-bold text-rose-950 font-serif">{card.brideName}</span>
            </div>
          </div>

          {/* ATUR CARA MAJLIS */}
          <div className="bg-white p-4 rounded-2xl border border-rose-200 shadow-sm text-left my-4">
            <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-2 border-b border-rose-100 pb-1.5 flex items-center justify-between">
              <span>Atur Cara Majlis</span>
              <span className="text-[10px] font-normal text-rose-700">{currentMajlis.dateText.split(',')[0]}</span>
            </h4>
            <div className="space-y-2 text-xs">
              {currentMajlis.sessions?.map((s, idx) => (
                <div key={idx} className="flex justify-between items-center bg-rose-50/50 p-2 rounded-lg border border-pink-100">
                  <span className="font-semibold text-slate-800">{s.time}</span>
                  <span className="text-[10px] bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full font-medium">{s.notes}</span>
                </div>
              )) || (
                <p className="text-[11px] text-slate-600">{currentMajlis.timeText}</p>
              )}
            </div>
          </div>
        </div>

        {/* GUESTBOOK COMMENTS PREVIEW WALL (Matching Image 2 "Tetamu boleh bagi komen") */}
        {card.modules.guestbook && (
          <div className="p-5 bg-white border-t border-rose-100">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-rose-600" /> Buku Tetamu ({card.guestbook?.length || 0})
              </h4>
              <button
                onClick={() => setActiveModal('bukuTetamu')}
                className="text-[11px] text-rose-700 font-bold hover:underline"
              >
                + Tulis Ucapan
              </button>
            </div>

            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {(card.guestbook || []).map((g) => (
                <div key={g.id} className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-rose-950 flex items-center gap-1">
                      👤 {g.name}
                    </span>
                    <span className="text-[9px] text-slate-400">{g.date}</span>
                  </div>
                  <p className="text-slate-700 italic">"{g.wish}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FLOATING AUDIO CONTROLLER (Bottom Right) */}
      <div className="absolute bottom-20 right-4 z-30 flex flex-col items-center gap-2">
        {isPlayingMusic && (
          <div className="text-rose-500 font-bold text-xs animate-float-note">
            🎵
          </div>
        )}
        <button
          onClick={toggleMusic}
          className={`w-11 h-11 rounded-full shadow-lg flex items-center justify-center border-2 transition ${
            isPlayingMusic 
              ? 'bg-rose-600 border-white text-white animate-pulse-slow' 
              : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700'
          }`}
          title="Pasang / Hentikan Lagu Background"
        >
          {isPlayingMusic ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>

      {/* EXACT FLOATING BOTTOM GLASSMORPHISM ACTION BAR (Matching Image 1 & 3 UI) */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-700/80 px-2 py-2 text-white">
        <div className="flex justify-around items-center">
          
          {/* Refresh */}
          <button 
            onClick={handleRefresh} 
            className="flex flex-col items-center gap-1 text-slate-300 hover:text-amber-300 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-[9px] font-medium">Refresh</span>
          </button>

          {/* Kalendar */}
          <button 
            onClick={() => setActiveModal('kalendar')} 
            className="flex flex-col items-center gap-1 text-slate-300 hover:text-amber-300 transition"
          >
            <Calendar className="w-4 h-4" />
            <span className="text-[9px] font-medium">Kalendar</span>
          </button>

          {/* Hubungi */}
          <button 
            onClick={() => setActiveModal('hubungi')} 
            className="flex flex-col items-center gap-1 text-slate-300 hover:text-amber-300 transition"
          >
            <Phone className="w-4 h-4" />
            <span className="text-[9px] font-medium">Hubungi</span>
          </button>

          {/* Lokasi */}
          <button 
            onClick={() => setActiveModal('lokasi')} 
            className="flex flex-col items-center gap-1 text-slate-300 hover:text-amber-300 transition"
          >
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="text-[9px] font-medium">Lokasi</span>
          </button>

          {/* RSVP (Primary Accent) */}
          <button 
            onClick={() => setActiveModal('rsvp')} 
            className="flex flex-col items-center gap-1 text-rose-400 hover:text-rose-300 transition font-bold"
          >
            <Mail className="w-4 h-4 text-rose-400" />
            <span className="text-[9px] font-bold">RSVP</span>
          </button>

          {/* Nota */}
          <button 
            onClick={() => setActiveModal('nota')} 
            className="flex flex-col items-center gap-1 text-slate-300 hover:text-amber-300 transition"
          >
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span className="text-[9px] font-medium">Nota</span>
          </button>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODALS SECTION (RSVP, Kalendar, Hubungi, Lokasi, Salam Kaut, Wishlist...) */}
      {/* ========================================================================= */}

      {/* 1. RSVP MODAL (Matching Image 2 "Tetamu Isi di eKad") */}
      {activeModal === 'rsvp' && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-2">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 text-slate-800 shadow-2xl relative max-h-[90%] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <button 
              onClick={() => setActiveModal(null)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 p-1.5 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-4">
              <span className="inline-block p-2 bg-rose-100 text-rose-700 rounded-full mb-1">✉️</span>
              <h3 className="text-lg font-bold text-rose-950 font-serif">Sahkan Kehadiran (RSVP)</h3>
              <p className="text-xs text-slate-500">Sila maklumkan kehadiran melalui borang di bawah.</p>
            </div>

            <form onSubmit={handleRsvpSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Nama Anda *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Haziq / Mohd Adam"
                  value={rsvpForm.name}
                  onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Nombor Telefon</label>
                <input
                  type="tel"
                  placeholder="Contoh: 0123456789"
                  value={rsvpForm.phone}
                  onChange={(e) => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Hubungan</label>
                <select
                  value={rsvpForm.relation}
                  onChange={(e) => setRsvpForm({ ...rsvpForm, relation: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                >
                  <option value="Keluarga/Saudara">Keluarga / Saudara</option>
                  <option value="Sahabat">Sahabat / Rakan</option>
                  <option value="Jiran">Jiran Tetangga</option>
                  <option value="Rakan Sekerja">Rakan Sekerja</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Status Kehadiran *</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRsvpForm({ ...rsvpForm, status: 'Hadir' })}
                    className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1 border transition ${
                      rsvpForm.status === 'Hadir' 
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow' 
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    <Check className="w-4 h-4" /> Hadir
                  </button>
                  <button
                    type="button"
                    onClick={() => setRsvpForm({ ...rsvpForm, status: 'Tidak Hadir', count: 0 })}
                    className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1 border transition ${
                      rsvpForm.status === 'Tidak Hadir' 
                        ? 'bg-rose-600 text-white border-rose-600 shadow' 
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    <X className="w-4 h-4" /> Tidak Hadir
                  </button>
                </div>
              </div>

              {rsvpForm.status === 'Hadir' && (
                <>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Pilihan Sesi Masa</label>
                    <select
                      value={rsvpForm.session}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, session: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-rose-500"
                    >
                      {currentMajlis.sessions?.map((s, i) => (
                        <option key={i} value={s.time}>{s.time}</option>
                      )) || <option value={currentMajlis.timeText}>{currentMajlis.timeText}</option>}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Jumlah Kehadiran (Ahli)</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={rsvpForm.count}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, count: parseInt(e.target.value) || 1 })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold rounded-xl shadow-lg transition mt-2 text-sm"
              >
                Hantar RSVP Sekarang
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. KALENDAR MODAL (Matching Image 2 "Simpan Dalam Kalendar untuk Reminder") */}
      {activeModal === 'kalendar' && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 text-slate-800 shadow-2xl relative text-center">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
              📅
            </div>
            <h3 className="text-base font-bold text-slate-900 font-serif">Simpan Dalam Kalendar</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Setkan peringatan kalendar telefon supaya tidak terlepas majlis indah kami.</p>
            
            <div className="space-y-2.5">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow transition"
              >
                <span>📅</span> Google Calendar
              </a>
              <a
                href={`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ASUMMARY:Walimatulurus ${card.groomShort} %26 ${card.brideShort}%0ALOCATION:${currentMajlis.venueName}%0AEND:VEVENT%0AEND:VCALENDAR`}
                download="wedding-event.ics"
                className="flex items-center justify-center gap-2.5 w-full py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-xs shadow transition"
              >
                <span>🍎</span> Apple Calendar / iCal
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 3. HUBUNGI MODAL (Matching Image 2 "Terus Call Atau WhatsApp") */}
      {activeModal === 'hubungi' && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 text-slate-800 shadow-2xl relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-4">
              <span className="p-2 bg-emerald-100 text-emerald-700 rounded-full inline-block mb-1">📞</span>
              <h3 className="text-base font-bold text-slate-900 font-serif">Hubungi Pengantin / Wakil</h3>
              <p className="text-xs text-slate-500">Klik untuk terus menelefon atau hantar WhatsApp.</p>
            </div>

            <div className="space-y-2.5 max-h-60 overflow-y-auto">
              {(card.contacts || []).map((c, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <span className="font-bold text-xs text-slate-900 block">{c.name}</span>
                    <span className="text-[10px] text-slate-500">{c.relation}</span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`tel:${c.phone}`}
                      className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200 transition"
                      title="Telefon"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <a
                      href={`https://wa.me/${c.phone}?text=Assalam%20jemputan%20majlis%20${encodeURIComponent(card.groomShort + ' %26 ' + card.brideShort)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition shadow"
                      title="WhatsApp"
                    >
                      💬
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. LOKASI MODAL (Matching Image 2 "Tetamu Guna Waze / Google Map") */}
      {activeModal === 'lokasi' && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 text-slate-800 shadow-2xl relative text-center">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2 text-xl">
              📍
            </div>
            <h3 className="text-base font-bold text-slate-900 font-serif">Lokasi Majlis Anda</h3>
            <p className="text-xs font-semibold text-rose-900 mt-1">{currentMajlis.venueName}</p>
            <p className="text-[11px] text-slate-500 my-2 px-2">{currentMajlis.address}</p>

            <div className="space-y-2 mt-4">
              <a
                href={currentMajlis.wazeUrl || `https://waze.com/ul?q=${encodeURIComponent(currentMajlis.venueName)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-bold text-xs shadow transition"
              >
                <span>🚘</span> Navigasi via Waze
              </a>
              <a
                href={currentMajlis.googleMapUrl || `https://maps.google.com/?q=${encodeURIComponent(currentMajlis.venueName + ', ' + currentMajlis.address)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow transition"
              >
                <span>🗺️</span> Navigasi via Google Maps
              </a>
              <a
                href={currentMajlis.appleMapUrl || `https://maps.apple.com/?q=${encodeURIComponent(currentMajlis.venueName + ', ' + currentMajlis.address)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-xs shadow transition border border-slate-700"
              >
                <span>🍎</span> Navigasi via Apple Maps
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 5. NOTA MODAL */}
      {activeModal === 'nota' && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 text-slate-800 shadow-2xl relative text-center">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-2 text-xl">
              ⚠️
            </div>
            <h3 className="text-base font-bold text-slate-900 font-serif">Nota & Panduan Tetamu</h3>
            <p className="text-xs text-slate-600 mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200 leading-relaxed text-left">
              {card.nota || 'Sila hadir mengikut sesi yang telah ditetapkan bagi melancarkan perjalanan majlis. Tema pakaian: Bebas & Sopan.'}
            </p>
          </div>
        </div>
      )}

      {/* 6. SALAM KAUT / MONEY GIFT MODAL (Matching Image 3 "SALAM KAUT ATAU MONEY GIFT") */}
      {activeModal === 'salamKaut' && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 text-slate-800 shadow-2xl relative text-center max-h-[90%] overflow-y-auto">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2 text-lg">
              💵
            </div>
            <h3 className="text-base font-bold text-slate-900 font-serif">Salam Kaut Digital</h3>
            <p className="text-[11px] text-slate-500 my-1">Bagi tetamu yang tidak dapat hadir atau berhajat memberi sumbangan ikhlas.</p>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 my-3 text-left space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Bank</span>
                <span className="text-xs font-bold text-slate-900">{card.salamKaut?.bankName || 'MAYBANK'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">No. Akaun</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-bold text-rose-900">{card.salamKaut?.accountNumber || '164254507111'}</span>
                  <button
                    onClick={() => copyToClipboard(card.salamKaut?.accountNumber || '164254507111')}
                    className="p-1 text-slate-500 hover:text-rose-600 bg-white rounded border border-slate-200"
                    title="Salin No Akaun"
                  >
                    {copiedBank ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Nama Penerima</span>
                <span className="text-xs font-semibold text-slate-800">{card.salamKaut?.accountHolder || card.groomName}</span>
              </div>
            </div>

            {card.salamKaut?.qrImageUrl && (
              <div className="p-3 bg-white rounded-2xl border border-rose-200 inline-block shadow-sm">
                <span className="text-[10px] font-bold text-slate-600 block mb-1.5">Imbas QR DuitNow</span>
                <img src={card.salamKaut.qrImageUrl} alt="DuitNow QR" className="w-40 h-40 object-contain mx-auto rounded-lg" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* 7. HADIAH & WISHLIST MODAL (Matching Image 3 "FUNGSI HADIAH + WISHLIST") */}
      {activeModal === 'wishlist' && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 text-slate-800 shadow-2xl relative max-h-[90%] overflow-y-auto">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-3">
              <span className="p-2 bg-purple-100 text-purple-700 rounded-full inline-block mb-1">🎁</span>
              <h3 className="text-base font-bold text-slate-900 font-serif">Hadiah & Wishlist</h3>
              <p className="text-[11px] text-slate-500">Senarai barang impian pengantin. Anda boleh menempah barang untuk elak pembelian bertindih.</p>
            </div>

            <div className="space-y-3">
              {(card.wishlist || []).map((item) => (
                <div key={item.id} className="flex gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-left items-center">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg shrink-0 border" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-xs text-slate-900 truncate">{item.name}</h5>
                    <span className="text-[10px] text-rose-700 font-semibold block">{item.price}</span>
                    {item.isReserved ? (
                      <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full inline-block mt-1">
                        Ditempah oleh: {item.reservedBy}
                      </span>
                    ) : (
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full inline-block mt-1">
                        Masih Masuk Senarai
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setReservingItem(item.id)}
                    disabled={item.isReserved}
                    className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg shrink-0 transition ${
                      item.isReserved
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-700 text-white shadow'
                    }`}
                  >
                    {item.isReserved ? 'Selesai' : 'Tempah'}
                  </button>
                </div>
              ))}
            </div>

            {/* Sub-modal input reserver name */}
            {reservingItem && (
              <div className="mt-4 p-3 bg-purple-50 rounded-xl border border-purple-200 text-left">
                <span className="text-xs font-bold text-purple-950 block mb-1">Masukkan Nama Anda</span>
                <input
                  type="text"
                  placeholder="Nama pengirim hadiah"
                  value={reserverName}
                  onChange={(e) => setReserverName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border rounded-lg mb-2 focus:ring-2 focus:ring-purple-500"
                />
                <div className="flex justify-end gap-2">
                  <button onClick={() => setReservingItem(null)} className="text-xs px-2.5 py-1 text-slate-600">Batal</button>
                  <button onClick={() => handleReserveWishlist(reservingItem)} className="text-xs px-3 py-1 bg-purple-700 text-white rounded-lg font-bold">Sahkan Tempahan</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. TONTON LIVE MODAL (Matching Image 3 "TETAMU BOLEH TONTON LIVE MAJLIS ANDA") */}
      {activeModal === 'liveStream' && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 text-slate-800 shadow-2xl relative text-center">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center mx-auto mb-2 text-xl">
              📡
            </div>
            <h3 className="text-base font-bold text-slate-900 font-serif">Siaran Langsung Majlis</h3>
            <p className="text-xs text-slate-500 my-1">{card.liveStream?.timeText || 'Saksikan majlis kami secara live di platform sosial'}</p>

            <div className="space-y-2.5 mt-4">
              <a
                href={card.liveStream?.url || '#'}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-3 bg-black hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow transition"
              >
                <span>🎵</span> TikTok Live Streaming
              </a>
              {card.liveStream?.youtubeUrl && (
                <a
                  href={card.liveStream.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs shadow transition"
                >
                  <span>▶️</span> YouTube Live Stream
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 9. BUKU TETAMU INPUT MODAL */}
      {activeModal === 'bukuTetamu' && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 text-slate-800 shadow-2xl relative text-left">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-rose-950 font-serif mb-1">Tulis Ucapan & Doa</h3>
            <p className="text-xs text-slate-500 mb-3">Tinggalkan bait ucapan murni untuk mempelai.</p>

            <form onSubmit={handleWishSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Nama Anda *</label>
                <input
                  type="text"
                  required
                  placeholder="Nama pengirim"
                  value={wishForm.name}
                  onChange={(e) => setWishForm({ ...wishForm, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Ucapan & Doa Murni *</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Selamat pengantin baru..."
                  value={wishForm.wish}
                  onChange={(e) => setWishForm({ ...wishForm, wish: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow transition"
              >
                Hantar Ucapan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 10. GALLERY LIGHTBOX MODAL */}
      {activeModal === 'gallery' && (
        <div className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
          <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-white p-2">
            <X className="w-6 h-6" />
          </button>
          <div className="w-full max-w-sm space-y-3">
            <p className="text-white text-xs font-bold text-center">Slide Gambar Mempelai</p>
            <div className="space-y-3 max-h-[70vh] overflow-y-auto">
              {(card.galleryImages || []).map((img, i) => (
                <img key={i} src={img} alt="Gallery" className="w-full rounded-2xl shadow border border-slate-700" />
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
