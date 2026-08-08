import React, { useState } from 'react';
import { 
  ShieldCheck, Key, Plus, Copy, Check, Download, Users, 
  Sparkles, Search, CheckCircle2, AlertTriangle, Eye, RefreshCw 
} from 'lucide-react';
import { useCard } from '../context/CardContext';

export default function AdminDashboard() {
  const { activationCodes, generateActivationCodes, cards, activateCardWithCode } = useCard();

  const [genCount, setGenCount] = useState(5);
  const [genPrefix, setGenPrefix] = useState('IKZ-LUX');
  const [genType, setGenType] = useState('LUXURY FULL VERSION');
  const [newlyGenerated, setNewlyGenerated] = useState([]);
  const [copiedBatch, setCopiedBatch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Stats calculation
  const totalCodes = activationCodes.length;
  const unusedCodes = activationCodes.filter(c => c.status === 'UNUSED').length;
  const activeCodes = activationCodes.filter(c => c.status === 'ACTIVE' || c.status === 'USED').length;
  const totalCardsCount = cards.length;
  const activatedCardsCount = cards.filter(c => c.isActivated).length;

  const handleGenerateSubmit = (e) => {
    e.preventDefault();
    const created = generateActivationCodes(parseInt(genCount) || 1, genPrefix, genType);
    setNewlyGenerated(created);
  };

  const copyBatchToClipboard = () => {
    const textList = newlyGenerated.map(c => c.code).join('\n');
    navigator.clipboard.writeText(textList);
    setCopiedBatch(true);
    setTimeout(() => setCopiedBatch(false), 2000);
  };

  const downloadBatchTxt = () => {
    const textList = newlyGenerated.map(c => `${c.code} (${c.type})`).join('\n');
    const blob = new Blob([textList], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Kod_Aktivasi_Batch_${Date.now()}.txt`;
    link.click();
  };

  // Filtered activation codes list
  const filteredCodes = activationCodes.filter(c => {
    const matchSearch = c.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        (c.usedBy && c.usedBy.toLowerCase().includes(searchTerm.toLowerCase()));
    if (statusFilter === 'ALL') return matchSearch;
    return matchSearch && c.status === statusFilter;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-2xl font-bold">
              👑
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Portal Admin Utama
              </span>
              <h1 className="text-2xl font-serif font-bold text-white mt-0.5">
                Pengurusan Kod Aktivasi & Lesen Kad Kahwin
              </h1>
            </div>
          </div>
        </div>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-center">
            <span className="text-xs text-slate-400 font-bold uppercase block mb-1">JUMLAH KOD AKTIVASI</span>
            <span className="text-3xl font-serif font-bold text-white">{totalCodes}</span>
            <span className="text-[10px] text-slate-500 block mt-1">dalam pangkalan data</span>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-emerald-500/30 text-center">
            <span className="text-xs text-emerald-400 font-bold uppercase block mb-1">KOD BELUM GUNA (UNUSED)</span>
            <span className="text-3xl font-serif font-bold text-emerald-400">{unusedCodes}</span>
            <span className="text-[10px] text-slate-500 block mt-1">sedia untuk dijual/diberi</span>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-rose-500/30 text-center">
            <span className="text-xs text-rose-400 font-bold uppercase block mb-1">KOD TELAH DIAKTIFKAN</span>
            <span className="text-3xl font-serif font-bold text-rose-400">{activeCodes}</span>
            <span className="text-[10px] text-slate-500 block mt-1">digunakan oleh pelanggan</span>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-amber-500/30 text-center">
            <span className="text-xs text-amber-400 font-bold uppercase block mb-1">KAD DIAKTIFKAN</span>
            <span className="text-3xl font-serif font-bold text-amber-300">{activatedCardsCount} / {totalCardsCount}</span>
            <span className="text-[10px] text-slate-500 block mt-1">kad versi penuh</span>
          </div>
        </div>

        {/* CODE GENERATOR TOOL SECTION */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 p-6 rounded-3xl border border-amber-500/40 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white font-serif">Alat Penjana Kod Aktivasi (Generator)</h2>
          </div>
          <p className="text-xs text-slate-300">Jana kod aktivasi secara pukal (bulk) untuk dijual kepada pelanggan atau ejen.</p>

          <form onSubmit={handleGenerateSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs pt-2">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Jumlah Kod (Batch)</label>
              <select
                value={genCount}
                onChange={(e) => setGenCount(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold"
              >
                <option value={1}>1 Kod</option>
                <option value={5}>5 Kod Batch</option>
                <option value={10}>10 Kod Batch</option>
                <option value={50}>50 Kod Batch</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Awalan Kod (Prefix)</label>
              <input
                type="text"
                value={genPrefix}
                onChange={(e) => setGenPrefix(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono uppercase font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Jenis Lesen</label>
              <select
                value={genType}
                onChange={(e) => setGenType(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
              >
                <option value="LUXURY FULL VERSION">LUXURY FULL VERSION</option>
                <option value="VIP DUAL MAJLIS UNLIMITED">VIP DUAL MAJLIS UNLIMITED</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl shadow-lg transition flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Jana Kod Baru
              </button>
            </div>
          </form>

          {/* NEWLY GENERATED CODES BATCH DISPLAY */}
          {newlyGenerated.length > 0 && (
            <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-amber-500/40 text-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-amber-300 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {newlyGenerated.length} Kod Berjaya Dijana!
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={copyBatchToClipboard}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold flex items-center gap-1 text-[11px]"
                  >
                    {copiedBatch ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedBatch ? 'Telah Disalin!' : 'Salin Semua'}
                  </button>
                  <button
                    onClick={downloadBatchTxt}
                    className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg font-bold flex items-center gap-1 text-[11px]"
                  >
                    <Download className="w-3.5 h-3.5" /> Muat Turun .TXT
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {newlyGenerated.map((c, i) => (
                  <div key={i} className="p-2 bg-slate-900 rounded-lg border border-slate-800 font-mono text-amber-300 font-bold text-center">
                    {c.code}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ACTIVATION CODES REGISTRY TABLE */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden space-y-4">
          
          <div className="p-5 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" /> Senarai Lesen & Kod Aktivasi
            </h3>

            <div className="flex flex-col sm:flex-row gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder="Cari kod / emel..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs font-bold"
              >
                <option value="ALL">Semua Status</option>
                <option value="UNUSED">Belum Guna (UNUSED)</option>
                <option value="ACTIVE">Aktif (ACTIVE)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Kod Aktivasi</th>
                  <th className="px-4 py-3">Jenis Pakej</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Digunakan Oleh</th>
                  <th className="px-4 py-3">Tarikh Dijana</th>
                  <th className="px-4 py-3">Tarikh Guna</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredCodes.map((c, idx) => (
                  <tr key={c.code || idx} className="hover:bg-slate-850 transition">
                    <td className="px-4 py-3 text-slate-500">{idx + 1}</td>
                    <td className="px-4 py-3 font-mono font-bold text-amber-300 text-sm">{c.code}</td>
                    <td className="px-4 py-3 text-slate-400">{c.type}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        c.status === 'UNUSED' 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{c.usedBy || '-'}</td>
                    <td className="px-4 py-3 text-slate-500">{c.generatedAt}</td>
                    <td className="px-4 py-3 text-slate-500">{c.usedAt || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}
