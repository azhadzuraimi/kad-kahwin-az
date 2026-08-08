import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, Save, Eye, Sparkles, Plus, Trash2, Heart, Music, 
  MapPin, Gift, DollarSign, Tv, CheckCircle2, Play, Pause, Volume2 
} from 'lucide-react';
import { useCard } from '../context/CardContext';
import { PRESET_THEMES, AUDIO_TRACKS } from '../data/mockData';

export default function CardEditor() {
  const [searchParams] = useSearchParams();
  const cardId = searchParams.get('id');
  const navigate = useNavigate();
  const { cards, saveCard } = useCard();

  const existingCard = cards.find(c => c.id === cardId) || cards[0];

  const [formData, setFormData] = useState({
    ...existingCard
  });

  const [activeStep, setActiveStep] = useState(1); // 1: Pengantin, 2: Majlis & Dual, 3: Theme & Music, 4: Modules & Wishlist
  const [testingSongId, setTestingSongId] = useState(null);
  const audioPreviewRef = React.useRef(null);

  const toggleTestAudio = (song) => {
    if (testingSongId === song.id) {
      if (audioPreviewRef.current) audioPreviewRef.current.pause();
      setTestingSongId(null);
    } else {
      if (audioPreviewRef.current) audioPreviewRef.current.pause();
      audioPreviewRef.current = new Audio(song.src);
      audioPreviewRef.current.play().then(() => {
        setTestingSongId(song.id);
      }).catch(err => console.log('Audio error:', err));
      audioPreviewRef.current.onended = () => setTestingSongId(null);
    }
  };

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleMajlis1Change = (field, val) => {
    setFormData(prev => ({
      ...prev,
      majlis1: { ...prev.majlis1, [field]: val }
    }));
  };

  const handleMajlis2Change = (field, val) => {
    setFormData(prev => ({
      ...prev,
      majlis2: { ...prev.majlis2, [field]: val }
    }));
  };

  const handleModuleToggle = (moduleKey) => {
    setFormData(prev => ({
      ...prev,
      modules: { ...prev.modules, [moduleKey]: !prev.modules[moduleKey] }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const saved = saveCard(formData);
    alert('Kad Kahwin Digital telah BERJAYA DISIMPAN!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between bg-slate-900 p-5 rounded-3xl border border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold font-serif text-white">Sunting Kad Kahwin Digital</h1>
              <p className="text-xs text-slate-400">Sesuaikan maklumat majlis, tema & fungsi eKad.</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-xl text-xs font-bold shadow-lg transition"
            >
              <Save className="w-4 h-4" /> Simpan Kad
            </button>
          </div>
        </div>

        {/* Step Navigation Tabs */}
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold gap-1">
          <button
            onClick={() => setActiveStep(1)}
            className={`flex-1 py-2.5 rounded-xl transition ${activeStep === 1 ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            1. Maklumat Mempelai
          </button>
          <button
            onClick={() => setActiveStep(2)}
            className={`flex-1 py-2.5 rounded-xl transition ${activeStep === 2 ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            2. Majlis & Dual Event
          </button>
          <button
            onClick={() => setActiveStep(3)}
            className={`flex-1 py-2.5 rounded-xl transition ${activeStep === 3 ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            3. Tema & Lagu
          </button>
          <button
            onClick={() => setActiveStep(4)}
            className={`flex-1 py-2.5 rounded-xl transition ${activeStep === 4 ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            4. Modul & Wishlist
          </button>
        </div>

        {/* FORM CONTENT */}
        <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-6 text-xs">
          
          {/* STEP 1: MEMPELAI & IBU BAPA */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                1. Maklumat Mempelai & Ibu Bapa
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nama Penuh Pengantin Lelaki</label>
                  <input
                    type="text"
                    value={formData.groomName}
                    onChange={(e) => handleChange('groomName', e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nama Panggilan (Short)</label>
                  <input
                    type="text"
                    value={formData.groomShort}
                    onChange={(e) => handleChange('groomShort', e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Nama Ibu Bapa / Penjaga Pengantin Lelaki</label>
                  <input
                    type="text"
                    value={formData.groomParents}
                    onChange={(e) => handleChange('groomParents', e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nama Penuh Pengantin Perempuan</label>
                  <input
                    type="text"
                    value={formData.brideName}
                    onChange={(e) => handleChange('brideName', e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nama Panggilan (Short)</label>
                  <input
                    type="text"
                    value={formData.brideShort}
                    onChange={(e) => handleChange('brideShort', e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Nama Ibu Bapa / Penjaga Pengantin Perempuan</label>
                  <input
                    type="text"
                    value={formData.brideParents}
                    onChange={(e) => handleChange('brideParents', e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: MAJLIS & DUAL EVENT */}
          {activeStep === 2 && (
            <div className="space-y-6">
              
              <div className="flex justify-between items-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h4 className="font-bold text-white text-sm">Fungsi Dual Majlis (2 Majlis Dalam 1 Link)</h4>
                  <p className="text-[11px] text-slate-400">Aktifkan jika majlis lelaki & perempuan diadakan berasingan.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleChange('hasDualMajlis', !formData.hasDualMajlis)}
                  className={`px-4 py-2 rounded-xl font-bold transition ${
                    formData.hasDualMajlis ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {formData.hasDualMajlis ? 'Aktif (2 Majlis)' : 'Tidak (1 Majlis)'}
                </button>
              </div>

              {/* Majlis 1 */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-amber-300 text-sm">Majlis Pertama (Pihak Utama)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Tajuk Majlis</label>
                    <input
                      type="text"
                      value={formData.majlis1?.title}
                      onChange={(e) => handleMajlis1Change('title', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Tarikh Paparan (cth: SABTU, 01.07.2023)</label>
                    <input
                      type="text"
                      value={formData.majlis1?.dateText}
                      onChange={(e) => handleMajlis1Change('dateText', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Masa Majlis</label>
                    <input
                      type="text"
                      value={formData.majlis1?.timeText}
                      onChange={(e) => handleMajlis1Change('timeText', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Nama Dewan / Lokasi</label>
                    <input
                      type="text"
                      value={formData.majlis1?.venueName}
                      onChange={(e) => handleMajlis1Change('venueName', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-slate-300 font-semibold mb-1">Alamat Penuh Dewan</label>
                    <input
                      type="text"
                      value={formData.majlis1?.address}
                      onChange={(e) => handleMajlis1Change('address', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Link Waze</label>
                    <input
                      type="text"
                      value={formData.majlis1?.wazeUrl}
                      onChange={(e) => handleMajlis1Change('wazeUrl', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Link Google Maps</label>
                    <input
                      type="text"
                      value={formData.majlis1?.googleMapUrl}
                      onChange={(e) => handleMajlis1Change('googleMapUrl', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-slate-300 font-semibold mb-1">Link Apple Maps</label>
                    <input
                      type="text"
                      value={formData.majlis1?.appleMapUrl || ''}
                      onChange={(e) => handleMajlis1Change('appleMapUrl', e.target.value)}
                      placeholder="https://maps.apple.com/..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Majlis 2 (If Dual Majlis) */}
              {formData.hasDualMajlis && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-amber-300 text-sm">Majlis Kedua (Pihak Lelaki / Menyambut Menantu)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Tajuk Majlis 2</label>
                      <input
                        type="text"
                        value={formData.majlis2?.title}
                        onChange={(e) => handleMajlis2Change('title', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Tarikh Paparan Majlis 2</label>
                      <input
                        type="text"
                        value={formData.majlis2?.dateText}
                        onChange={(e) => handleMajlis2Change('dateText', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Nama Dewan / Lokasi Majlis 2</label>
                      <input
                        type="text"
                        value={formData.majlis2?.venueName}
                        onChange={(e) => handleMajlis2Change('venueName', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Masa Majlis 2</label>
                      <input
                        type="text"
                        value={formData.majlis2?.timeText}
                        onChange={(e) => handleMajlis2Change('timeText', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-slate-300 font-semibold mb-1">Link Apple Maps (Majlis 2)</label>
                      <input
                        type="text"
                        value={formData.majlis2?.appleMapUrl || ''}
                        onChange={(e) => handleMajlis2Change('appleMapUrl', e.target.value)}
                        placeholder="https://maps.apple.com/..."
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* STEP 3: THEME & MUSIC */}
          {activeStep === 3 && (
            <div className="space-y-6">
              
              <div>
                <h4 className="font-bold text-white text-sm mb-3">Pilih Tema Rekabentuk Luxury</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRESET_THEMES.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => handleChange('themeId', t.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition ${
                        formData.themeId === t.id ? 'border-amber-400 bg-amber-400/10' : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-white">{t.name}</span>
                        {formData.themeId === t.id && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                      </div>
                      <p className="text-[11px] text-slate-400">{t.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-white text-sm">Pilih Lagu Background Instrumental</h4>
                  <span className="text-[10px] text-amber-300 font-semibold flex items-center gap-1">
                    <Music className="w-3 h-3" /> Klik tombol ▶️ untuk Uji/Dengar Lagu
                  </span>
                </div>
                <div className="space-y-2">
                  {AUDIO_TRACKS.map((song) => (
                    <div 
                      key={song.id} 
                      className={`flex items-center justify-between p-3 rounded-xl border transition ${
                        formData.songId === song.id 
                          ? 'bg-rose-950/40 border-rose-500/60' 
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <label className="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                        <input
                          type="radio"
                          name="songRadio"
                          checked={formData.songId === song.id}
                          onChange={() => handleChange('songId', song.id)}
                          className="text-rose-600 focus:ring-rose-500"
                        />
                        <span className="font-bold text-slate-200 text-xs truncate">{song.title}</span>
                      </label>

                      {/* Song Test Button */}
                      <button
                        type="button"
                        onClick={() => toggleTestAudio(song)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-[11px] transition shrink-0 ml-2 ${
                          testingSongId === song.id 
                            ? 'bg-rose-600 text-white animate-pulse' 
                            : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700'
                        }`}
                      >
                        {testingSongId === song.id ? (
                          <>
                            <Pause className="w-3.5 h-3.5" /> Henti Test
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5" /> Uji Lagu
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* STEP 4: MODULES & WISHLIST */}
          {activeStep === 4 && (
            <div className="space-y-6">
              
              <h4 className="font-bold text-white text-sm mb-3">Aktif / Nyahaktif Modul eKad</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.keys(formData.modules || {}).map((modKey) => (
                  <button
                    key={modKey}
                    type="button"
                    onClick={() => handleModuleToggle(modKey)}
                    className={`p-3 rounded-xl font-bold uppercase text-[10px] tracking-wider border transition ${
                      formData.modules[modKey] ? 'bg-rose-600 text-white border-rose-500' : 'bg-slate-950 text-slate-500 border-slate-800'
                    }`}
                  >
                    {modKey}
                  </button>
                ))}
              </div>

              {/* Salam Kaut Setup */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-emerald-400 text-sm">Tetapan Salam Kaut (DuitNow QR)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Nama Bank</label>
                    <input
                      type="text"
                      value={formData.salamKaut?.bankName || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, salamKaut: { ...prev.salamKaut, bankName: e.target.value } }))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Nombor Akaun</label>
                    <input
                      type="text"
                      value={formData.salamKaut?.accountNumber || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, salamKaut: { ...prev.salamKaut, accountNumber: e.target.value } }))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Nama Pemegang Akaun</label>
                    <input
                      type="text"
                      value={formData.salamKaut?.accountHolder || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, salamKaut: { ...prev.salamKaut, accountHolder: e.target.value } }))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            {activeStep > 1 && (
              <button
                type="button"
                onClick={() => setActiveStep(activeStep - 1)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold"
              >
                Langkah Sebelumnya
              </button>
            )}
            {activeStep < 4 ? (
              <button
                type="button"
                onClick={() => setActiveStep(activeStep + 1)}
                className="ml-auto px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold"
              >
                Seterusnya
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg"
              >
                Sahkan & Simpan Kad
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
