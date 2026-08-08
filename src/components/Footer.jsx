import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800/80 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <span className="font-serif text-lg font-bold text-white tracking-tight">IKRIZANVITE</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Platform Kad Kahwin Digital Luxury #1 di Malaysia. Terus siap dengan 100+ pilihan design aesthetic, fungsi RSVP lengkap, Buku Tetamu, Salam Kaut QR & Wishlist.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">Ciri-Ciri Utama</h4>
          <ul className="space-y-2">
            <li>✓ Fungsi RSVP & Export CSV</li>
            <li>✓ 2 Majlis Berbeza (1 Link)</li>
            <li>✓ Salam Kaut / DuitNow QR</li>
            <li>✓ Hadiah & Wishlist Registry</li>
            <li>✓ Tonton Live (TikTok / YouTube)</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">Pautan Penting</h4>
          <ul className="space-y-2">
            <li><a href="#pricing" className="hover:text-white">Pakej & Lesen Activation</a></li>
            <li><a href="#designs" className="hover:text-white">Galeri Tema Luxury</a></li>
            <li><a href="#features" className="hover:text-white">Panduan Pengguna</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">Hubungi Kami</h4>
          <p className="text-slate-400 mb-2">Perlukan bantuan atau pembelian secara pukal?</p>
          <a
            href="https://wa.me/60123456789?text=Assalam%20saya%20berminat%20beli%20kod%20aktifkan%20kad%20kahwin"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition shadow"
          >
            💬 WhatsApp Bantuan Live
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/60 text-center text-slate-500">
        <p>© 2026 Ikrizanvite Digital Invitation. Hak Cipta Terelihara.</p>
      </div>
    </footer>
  );
}
