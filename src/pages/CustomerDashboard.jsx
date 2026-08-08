import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Key, Sparkles, Plus, Edit3, Eye, Share2, Download, Check, 
  AlertCircle, Copy, Users, MessageSquare, Trash2, Calendar, MapPin
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCard } from '../context/CardContext';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { cards, activateCardWithCode, deleteCard } = useCard();
  const navigate = useNavigate();

  // Find cards belonging to this user or fallback to demo card
  const userCards = cards.filter(c => c.userEmail === user?.email || c.userId === user?.id) || [];
  const primaryCard = userCards[0] || cards[0];

  const [codeInput, setCodeInput] = useState('');
  const [activationMsg, setActivationMsg] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'rsvp' | 'guestbook'
  const [copiedLink, setCopiedLink] = useState(false);

  // Handle activation submit
  const handleActivateSubmit = (e) => {
    e.preventDefault();
    setActivationMsg(null);
    if (!primaryCard) return;

    const res = activateCardWithCode(primaryCard.id, user.email, codeInput);
    setActivationMsg(res);
    if (res.success) {
      setCodeInput('');
    }
  };

  // Export RSVP to CSV (Image 2 feature)
  const exportRsvpCsv = () => {
    if (!primaryCard?.rsvps || primaryCard.rsvps.length === 0) {
      alert('Tiada rekod RSVP lagi untuk diexport.');
      return;
    }

    const headers = ['Bil', 'Nama Tetamu', 'Hubungan', 'Status Kehadiran', 'Pilihan Sesi', 'Jumlah Kehadiran', 'No Telefon', 'Tarikh Masa'];
    const rows = primaryCard.rsvps.map((r, i) => [
      i + 1,
      `"${r.name}"`,
      `"${r.relation}"`,
      `"${r.status}"`,
      `"${r.session || '-'}"`,
      r.count,
      `"${r.phone || '-'}"`,
      `"${r.createdAt || '-'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `RSVP_${primaryCard.slug}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyCardLink = () => {
    const fullUrl = `${window.location.origin}/card/${primaryCard.slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Calculate RSVP stats
  const totalRsvpResponses = primaryCard?.rsvps?.length || 0;
  const totalHadir = primaryCard?.rsvps?.filter(r => r.status === 'Hadir').reduce((acc, r) => acc + (r.count || 1), 0) || 0;
  const totalTidakHadir = primaryCard?.rsvps?.filter(r => r.status === 'Tidak Hadir').length || 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <div>
            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Dashboard Pengantin</span>
            <h1 className="text-2xl font-serif font-bold text-white mt-1">
              Selamat Datang, {user?.name || 'Ahmad Adam'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">Urus kad kahwin digital, aktifkan lesen, dan pantau senarai kehadiran RSVP.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/editor')}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-xl text-xs font-bold shadow-lg transition"
            >
              <Plus className="w-4 h-4" /> Bina Kad Kahwin Baru
            </button>
          </div>
        </div>

        {/* ACTIVATION STATUS BADGE & UNLOCK CARD BANNER */}
        {primaryCard && (
          <div className={`p-6 rounded-3xl border ${
            primaryCard.isActivated 
              ? 'bg-gradient-to-r from-emerald-950/60 to-slate-900 border-emerald-500/50' 
              : 'bg-gradient-to-r from-amber-950/60 via-slate-900 to-rose-950/40 border-amber-500/60'
          }`}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                  primaryCard.isActivated ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  {primaryCard.isActivated ? '🔑' : '🔒'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white font-serif">
                      Kad Kahwin: {primaryCard.groomShort} & {primaryCard.brideShort}
                    </h3>
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                      primaryCard.isActivated ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {primaryCard.isActivated ? 'VERSI PENUH LUXURY AKTIF' : 'MOD PRATONTON (FREE DEMO)'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    {primaryCard.isActivated 
                      ? `Kad kahwin telah berdaftar sepenuhnya dengan Kod: ${primaryCard.activationCode}` 
                      : 'Kad anda dalam mod demo. Masukkan Kod Aktivasi untuk padam watermark & aktifkan semua fungsi!'
                    }
                  </p>
                </div>
              </div>

              {/* Activation Code Form */}
              {!primaryCard.isActivated && (
                <form onSubmit={handleActivateSubmit} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Contoh: IKZ-LUX-2026"
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    className="px-4 py-2.5 bg-slate-950 border border-amber-500/50 rounded-xl text-white text-xs font-mono uppercase font-bold focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg transition flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <Key className="w-4 h-4" /> Aktifkan Kad
                  </button>
                </form>
              )}

            </div>

            {activationMsg && (
              <div className={`mt-4 p-3 rounded-xl text-xs font-bold text-center ${
                activationMsg.success ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}>
                {activationMsg.message}
              </div>
            )}
          </div>
        )}

        {/* CARD CONTROL ACTIONS & LINK SHARE */}
        {primaryCard && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Direct Link Share Card */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <span className="text-xs text-slate-400 font-semibold block mb-2">Pautan eKad Anda</span>
              <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs text-rose-300 font-mono overflow-hidden">
                <span className="truncate">{`${window.location.origin}/card/${primaryCard.slug}`}</span>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={copyCardLink}
                  className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedLink ? 'Telah Disalin!' : 'Salin Link'}
                </button>
                <Link
                  to={`/card/${primaryCard.slug}`}
                  target="_blank"
                  className="py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs flex items-center gap-1 transition"
                  title="Buka eKad"
                >
                  <Eye className="w-4 h-4" /> Buka
                </Link>
              </div>
            </div>

            {/* Quick Edit */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-1">Tetapan & Rekabentuk</span>
                <h4 className="text-sm font-bold text-white">Sunting Maklumat & Tema</h4>
                <p className="text-[11px] text-slate-400 mt-1">Ubah nama pengantin, atur cara majlis, lokasi Waze, lagu & wishlist.</p>
              </div>
              <Link
                to={`/editor?id=${primaryCard.id}`}
                className="w-full mt-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-1.5 transition border border-slate-700"
              >
                <Edit3 className="w-3.5 h-3.5" /> Sunting Maklumat Kad
              </Link>
            </div>

            {/* Export CSV RSVP */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-1">Fail Anda (RSVP)</span>
                <h4 className="text-sm font-bold text-white">Muat Turun Senarai Tetamu</h4>
                <p className="text-[11px] text-slate-400 mt-1">Eksport senarai RSVP ke format CSV Excel untuk cetakan & pengurusan meja.</p>
              </div>
              <button
                onClick={exportRsvpCsv}
                className="w-full mt-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition shadow"
              >
                <Download className="w-3.5 h-3.5" /> Export CSV (Excel)
              </button>
            </div>

          </div>
        )}

        {/* RSVP SUMMARY CARDS (Matching Image 2 "Fungsi RSVP - fail anda") */}
        {primaryCard && (
          <div className="space-y-6">
            
            {/* Tabs */}
            <div className="flex border-b border-slate-800 text-xs font-bold">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 px-4 border-b-2 transition ${activeTab === 'overview' ? 'border-rose-500 text-rose-400' : 'border-transparent text-slate-400 hover:text-white'}`}
              >
                Ringkasan RSVP ({totalRsvpResponses})
              </button>
              <button
                onClick={() => setActiveTab('guestbook')}
                className={`pb-3 px-4 border-b-2 transition ${activeTab === 'guestbook' ? 'border-rose-500 text-rose-400' : 'border-transparent text-slate-400 hover:text-white'}`}
              >
                Buku Tetamu ({primaryCard.guestbook?.length || 0})
              </button>
            </div>

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Stats Counters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-center">
                    <span className="text-xs text-slate-400 font-bold uppercase block mb-1">TOTAL RSVP</span>
                    <span className="text-3xl font-bold text-amber-400 font-serif">{totalRsvpResponses}</span>
                    <span className="text-[10px] text-slate-500 block mt-1">respon diterimanya</span>
                  </div>
                  <div className="bg-slate-900 p-5 rounded-2xl border border-emerald-500/30 text-center">
                    <span className="text-xs text-emerald-400 font-bold uppercase block mb-1">HADIR (KESELURUHAN)</span>
                    <span className="text-3xl font-bold text-emerald-400 font-serif">{totalHadir}</span>
                    <span className="text-[10px] text-slate-500 block mt-1">orang tetamu akan hadir</span>
                  </div>
                  <div className="bg-slate-900 p-5 rounded-2xl border border-rose-500/30 text-center">
                    <span className="text-xs text-rose-400 font-bold uppercase block mb-1">TIDAK HADIR</span>
                    <span className="text-3xl font-bold text-rose-400 font-serif">{totalTidakHadir}</span>
                    <span className="text-[10px] text-slate-500 block mt-1">tetamu tidak hadir</span>
                  </div>
                </div>

                {/* RSVP TABLE (Matching Image 2 "LIST RSVP - HADIR / TIDAK HADIR") */}
                <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
                  <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-rose-400" /> Senarai Kehadiran Tetamu
                    </h3>
                    <button
                      onClick={exportRsvpCsv}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Export Excel
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                        <tr>
                          <th className="px-4 py-3">#</th>
                          <th className="px-4 py-3">Nama Tetamu</th>
                          <th className="px-4 py-3">Hubungan</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Pilihan Sesi Masa</th>
                          <th className="px-4 py-3 text-center">Jumlah Ahli</th>
                          <th className="px-4 py-3">Telefon</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-300">
                        {(primaryCard.rsvps || []).map((r, idx) => (
                          <tr key={r.id || idx} className="hover:bg-slate-850 transition">
                            <td className="px-4 py-3 text-slate-500">{idx + 1}</td>
                            <td className="px-4 py-3 font-bold text-white">{r.name}</td>
                            <td className="px-4 py-3 text-slate-400">{r.relation}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                r.status === 'Hadir' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              }`}>
                                {r.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-400">{r.session || '-'}</td>
                            <td className="px-4 py-3 text-center font-bold text-amber-300">{r.status === 'Hadir' ? r.count || 1 : 0}</td>
                            <td className="px-4 py-3 text-slate-400 font-mono">{r.phone || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* GUESTBOOK TAB */}
            {activeTab === 'guestbook' && (
              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-rose-400" /> Senarai Ucapan Tetamu ({primaryCard.guestbook?.length || 0})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(primaryCard.guestbook || []).map((g) => (
                    <div key={g.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-amber-300 text-sm">👤 {g.name}</span>
                        <span className="text-[10px] text-slate-500">{g.date}</span>
                      </div>
                      <p className="text-slate-300 italic">"{g.wish}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
