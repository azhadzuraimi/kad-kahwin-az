export const PRESET_THEMES = [
  {
    id: 'luxury-floral',
    name: 'Jenis Luxury (Soft WaterColor)',
    description: 'Bunga WaterColor Lavender & Soft Pink dengan border kristal lutsinar (seperti dalam gambar promo).',
    bgClass: 'bg-rose-50/90',
    primaryColor: '#672e3b',
    accentColor: '#E8B4B8',
    cardBorder: 'border-pink-200',
    fontTitle: 'font-serif',
    previewBadge: 'MOST POPULAR'
  },
  {
    id: 'royal-gold',
    name: 'Royal Songket Gold',
    description: 'Rekabentuk Mewah berunsurkan Corak Songket & Garis Emas Diraja.',
    bgClass: 'bg-amber-50/90',
    primaryColor: '#713f12',
    accentColor: '#D4AF37',
    cardBorder: 'border-amber-300',
    fontTitle: 'font-serif',
    previewBadge: 'LUXURY'
  },
  {
    id: 'emerald-botanical',
    name: 'Emerald Garden & Gold Leaf',
    description: 'Gaya Moden Tropikal dengan Dedaun Hijau Emerald & Gold Accent.',
    bgClass: 'bg-emerald-50/90',
    primaryColor: '#1b4332',
    accentColor: '#52b788',
    cardBorder: 'border-emerald-200',
    fontTitle: 'font-serif',
    previewBadge: 'TRENDING'
  },
  {
    id: 'minimalist-boho',
    name: 'Minimalist Pastel Rose',
    description: 'Simple, bersih dan aesthetic dengan rona terracotta & dusty pink.',
    bgClass: 'bg-stone-50/90',
    primaryColor: '#9d174d',
    accentColor: '#f472b6',
    cardBorder: 'border-rose-200',
    fontTitle: 'font-sans',
    previewBadge: 'MODERN'
  }
];

export const AUDIO_TRACKS = [
  { id: 'song-1', title: 'Instrumental Melayu Gamelan Romantic', src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113543.mp3' },
  { id: 'song-2', title: 'Violin Acoustic Wedding Serenade', src: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a81691.mp3?filename=wedding-piano-10702.mp3' },
  { id: 'song-3', title: 'Piano & Strings Walimatulurus', src: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=gentle-ocean-waves-birdsong-10829.mp3' },
  { id: 'song-4', title: 'Kompang & Selawat Elegance (Tradisional)', src: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c352a912e7.mp3?filename=soft-piano-10651.mp3' },
  { id: 'song-5', title: 'Acoustic Guitar Romance', src: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_4a0e980315.mp3?filename=acoustic-guitar-love-8812.mp3' }
];

export const SEED_ACTIVATION_CODES = [
  {
    code: 'IKZ-LUX-2026',
    type: 'LUXURY FULL VERSION',
    generatedAt: '2026-08-01',
    status: 'ACTIVE',
    usedBy: 'pengantin@gmail.com',
    usedForCardId: 'card-adam-hawa',
    usedAt: '2026-08-02'
  },
  {
    code: 'IKZ-GOLD-9988',
    type: 'LUXURY FULL VERSION',
    generatedAt: '2026-08-05',
    status: 'UNUSED',
    usedBy: null,
    usedForCardId: null,
    usedAt: null
  },
  {
    code: 'IKZ-VIP-7733',
    type: 'VIP DUAL MAJLIS UNLIMITED',
    generatedAt: '2026-08-06',
    status: 'UNUSED',
    usedBy: null,
    usedForCardId: null,
    usedAt: null
  },
  {
    code: 'IKZ-TEST-1122',
    type: 'LUXURY FULL VERSION',
    generatedAt: '2026-08-07',
    status: 'UNUSED',
    usedBy: null,
    usedForCardId: null,
    usedAt: null
  }
];

export const INITIAL_CARDS = [
  {
    id: 'card-adam-hawa',
    slug: 'adam-hawa',
    userId: 'user-1',
    userEmail: 'pengantin@gmail.com',
    isActivated: true,
    activationCode: 'IKZ-LUX-2026',
    themeId: 'luxury-floral',
    groomName: 'Ahmad Adam',
    groomShort: 'Adam',
    groomParents: 'Encik Ahmad Bin Sidek & Puan Aminah Binti Ali',
    brideName: 'Dr. Hawa',
    brideShort: 'Hawa',
    brideParents: 'Dato\' Dr. Osman Bin Kassim & Datin Halimah Binti Salleh',
    
    // Dual majlis support!
    hasDualMajlis: true,
    
    majlis1: {
      title: 'Majlis Walimatulurus (Pihak Perempuan)',
      dateText: 'SABTU, 01.07.2023',
      isoDate: '2023-07-01',
      hijriDate: '12 Zulhijjah 1444H',
      timeText: '11:00 Pagi - 4:00 Petang',
      venueName: 'Dewan Glamour Event Hall, Melaka',
      address: 'No 123, Jalan Tun Fatimah, Hang Tuah Jaya, 75450 Melaka',
      wazeUrl: 'https://waze.com/ul/hw21u8m41x',
      googleMapUrl: 'https://maps.google.com/?q=Melaka+Event+Hall',
      appleMapUrl: 'https://maps.apple.com/?q=Dewan+Glamour+Event+Hall+Melaka',
      maxNames: 4,
      sessions: [
        { id: 's1', time: 'Sesi 1: 11:00 pagi - 1:00 tengah hari', notes: 'Keluarga Terdekat' },
        { id: 's2', time: 'Sesi 2: 1:00 tengah hari - 4:00 petang', notes: 'Rakan & Sahabat' }
      ]
    },

    majlis2: {
      title: 'Majlis Menyambut Menantu (Pihak Lelaki)',
      dateText: 'AHAD, 09.07.2023',
      isoDate: '2023-07-09',
      hijriDate: '20 Zulhijjah 1444H',
      timeText: '12:00 Tengah Hari - 5:00 Petang',
      venueName: 'Grand Ballroom Hotel & Suites, Shah Alam',
      address: 'No 5, Persiaran Selangor, Seksyen 14, 40000 Shah Alam, Selangor',
      wazeUrl: 'https://waze.com/ul/hw281n7p3x',
      googleMapUrl: 'https://maps.google.com/?q=Shah+Alam+Hotel',
      appleMapUrl: 'https://maps.apple.com/?q=Grand+Ballroom+Hotel+Shah+Alam',
      maxNames: 4,
      sessions: [
        { id: 's1', time: '12:00 t/hari - 5:00 petang', notes: 'Semua Jemputan' }
      ]
    },

    songId: 'song-1',
    
    // Modules config
    modules: {
      rsvp: true,
      gallery: true,
      calendar: true,
      location: true,
      contacts: true,
      guestbook: true,
      salamKaut: true,
      wishlist: true,
      liveStream: true,
      songPlayer: true,
    },

    // Salam Kaut / Money Gift
    salamKaut: {
      bankName: 'MAYBANK',
      accountNumber: '564254507111',
      accountHolder: 'AHMAD ADAM BIN AHMAD',
      qrImageUrl: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=400&q=80',
      paynote: 'Terima kasih atas ucapan dan keikhlasan anda mendoakan kebahagiaan kami.'
    },

    // Hadiah & Wishlist
    wishlist: [
      { id: 'w1', name: 'Periuk Pressure Cooker Tefal 6L', price: 'RM 399', reservedBy: 'Kak Shila', isReserved: true, image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=300&q=80' },
      { id: 'w2', name: 'Air Fryer Philips XXL', price: 'RM 450', reservedBy: null, isReserved: false, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=300&q=80' },
      { id: 'w3', name: 'Pengisar Stand Mixer KitchenAid', price: 'RM 899', reservedBy: null, isReserved: false, image: 'https://images.unsplash.com/photo-1578643463396-0997cb5328c1?auto=format&fit=crop&w=300&q=80' }
    ],

    // Tonton Live
    liveStream: {
      platform: 'TikTok Live & YouTube',
      url: 'https://tiktok.com/@adam_hawa_wedding',
      youtubeUrl: 'https://youtube.com/live/wedding_stream_demo',
      timeText: 'Siaran Langsung pada 01.07.2023 Jam 12:30 Tengah Hari'
    },

    // Contacts
    contacts: [
      { name: 'Encik Ahmad', relation: 'Bapa Pengantin Lelaki', phone: '60123456789' },
      { name: 'Haziq', relation: 'Abang Pengantin', phone: '60198765432' },
      { name: 'Dr. Hawa', relation: 'Pengantin Perempuan', phone: '60171112233' }
    ],

    // Gallery images (matching luxury photos)
    galleryImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80'
    ],

    // Initial RSVPs (matching image stats: Hadir, Tidak Hadir, Sesi breakdown)
    rsvps: [
      { id: 'r1', name: 'Adam', relation: 'Sahabat', status: 'Hadir', session: 'Sesi 1: 11:00 pagi - 1:00 tengah hari', count: 2, phone: '0129998877' },
      { id: 'r2', name: 'Datin Shuryati Datuk Shuaib', relation: 'Keluarga/Saudara', status: 'Hadir', session: 'Sesi 1: 11:00 pagi - 1:00 tengah hari', count: 4, phone: '0192223344' },
      { id: 'r3', name: 'Qis and Syafiq', relation: 'Sahabat', status: 'Hadir', session: 'Sesi 2: 1:00 tengah hari - 4:00 petang', count: 2, phone: '0173334455' },
      { id: 'r4', name: 'Fariz Rakan Universiti', relation: 'Rakan', status: 'Tidak Hadir', session: 'Sesi 1: 11:00 pagi - 1:00 tengah hari', count: 0, phone: '0134445566' }
    ],

    // Guestbook comments
    guestbook: [
      { id: 'g1', name: 'Haziq', wish: 'Tahniah Adam & Hawa! Semoga kekal hingga ke anak cucu dan dipermudahkan segala urusan majlis.', date: '2023-06-28 14:30' },
      { id: 'g2', name: 'Datin Shuryati', wish: 'Selamat Pengantin Baru buat pasangan mempelai yang sama cantik sama padan. Barrakallahulakuma.', date: '2023-06-29 09:15' },
      { id: 'g3', name: 'Ketty', wish: 'Tahniah bro Adam! Nanti kami geng U datang serbu!', date: '2023-06-30 18:40' }
    ],

    // Important Notice / SOP
    nota: 'Sila maklumkan kehadiran anda sekurang-kurangnya 3 hari sebelum majlis. Parkir kenderaan disediakan di basement dewan.'
  }
];
