import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCard } from '../context/CardContext';
import { useAuth } from '../context/AuthContext';
import EKadView from '../components/EKadView';

export default function PublicCardView() {
  const { slug } = useParams();
  const { getCardBySlug, activateCardWithCode } = useCard();
  const { user } = useAuth();
  const navigate = useNavigate();

  const card = getCardBySlug(slug || 'adam-hawa');
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [activationMsg, setActivationMsg] = useState(null);

  const handleActivateSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/auth');
      return;
    }
    const res = activateCardWithCode(card.id, user.email, codeInput);
    setActivationMsg(res);
    if (res.success) {
      setCodeInput('');
      setTimeout(() => setShowActivateModal(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-0 sm:p-6 select-none">
      
      <EKadView 
        card={card} 
        isEmbedded={false} 
        onActivateClick={() => setShowActivateModal(true)} 
      />

      {/* ACTIVATION MODAL OVERLAY IF CLICKED FROM WATERMARK */}
      {showActivateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md text-white relative shadow-2xl">
            <button
              onClick={() => setShowActivateModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <div className="text-center mb-4">
              <span className="p-3 bg-amber-500/20 text-amber-300 rounded-2xl inline-block mb-2 text-2xl">🔑</span>
              <h3 className="text-lg font-bold font-serif">Aktifkan Kad Kahwin (Versi Penuh)</h3>
              <p className="text-xs text-slate-400 mt-1">Masukkan Kod Aktivasi daripada kedai / admin untuk memadam watermark.</p>
            </div>

            <form onSubmit={handleActivateSubmit} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Contoh: IKZ-LUX-2026"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-center font-bold text-sm uppercase focus:ring-2 focus:ring-amber-400"
              />
              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg transition"
              >
                Sahkan Kod Aktivasi
              </button>
            </form>

            {activationMsg && (
              <div className={`mt-3 p-3 rounded-xl text-xs font-bold text-center ${
                activationMsg.success ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}>
                {activationMsg.message}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
