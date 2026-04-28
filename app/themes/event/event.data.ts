import type {
  EventCategory,
  Organizer,
  Venue,
  EventWithData,
  EventSectionPricing,
} from '@/modules/domains/event/types';

/* ================================================================
   CATEGORIES
================================================================ */

export const EVENT_CATEGORIES: EventCategory[] = [
  {
    categoryId: 'cat-music',
    title: 'Müzik',
    slug: 'muzik',
    description: 'Konserler, festivaller ve canlı performanslar',
    image: null,
    createdAt: new Date('2026-01-01'),
  },
  {
    categoryId: 'cat-sports',
    title: 'Spor',
    slug: 'spor',
    description: 'Maçlar, turnuvalar ve spor etkinlikleri',
    image: null,
    createdAt: new Date('2026-01-01'),
  },
  {
    categoryId: 'cat-theater',
    title: 'Tiyatro',
    slug: 'tiyatro',
    description: 'Müzikal, drama ve sahne sanatları',
    image: null,
    createdAt: new Date('2026-01-01'),
  },
  {
    categoryId: 'cat-conference',
    title: 'Konferans',
    slug: 'konferans',
    description: 'Summit, panel ve teknoloji etkinlikleri',
    image: null,
    createdAt: new Date('2026-01-01'),
  },
  {
    categoryId: 'cat-comedy',
    title: 'Stand-up',
    slug: 'standup',
    description: 'Komedi gösterileri ve stand-up performansları',
    image: null,
    createdAt: new Date('2026-01-01'),
  },
  {
    categoryId: 'cat-festival',
    title: 'Festival',
    slug: 'festival',
    description: 'Kültür, sanat ve müzik festivalleri',
    image: null,
    createdAt: new Date('2026-01-01'),
  },
];

/* ================================================================
   ORGANIZERS
================================================================ */

export const ORGANIZERS: Organizer[] = [
  {
    organizerId: 'org-live-nation',
    name: 'Live Nation Turkey',
    slug: 'live-nation-turkey',
    description: 'Türkiye\'nin en büyük konser organizatörü.',
    logo: null,
    website: 'https://example.com',
    email: 'info@livenation.com.tr',
    phone: '+90 212 000 0000',
    verified: true,
    createdAt: new Date('2025-06-01'),
  },
  {
    organizerId: 'org-stadium',
    name: 'İstanbul Stadium Events',
    slug: 'istanbul-stadium',
    description: 'Stadyum ve arena etkinlikleri.',
    logo: null,
    website: 'https://example.com',
    email: null,
    phone: null,
    verified: true,
    createdAt: new Date('2025-06-01'),
  },
  {
    organizerId: 'org-techsummit',
    name: 'TechSummit Organization',
    slug: 'techsummit',
    description: 'Teknoloji konferansları ve summit organizasyonu.',
    logo: null,
    website: 'https://example.com',
    email: 'hello@techsummit.io',
    phone: null,
    verified: true,
    createdAt: new Date('2025-08-01'),
  },
  {
    organizerId: 'org-comedy',
    name: 'Güldür Productions',
    slug: 'guldur-productions',
    description: 'Komedi şovları ve stand-up etkinlikleri.',
    logo: null,
    website: null,
    email: null,
    phone: null,
    verified: false,
    createdAt: new Date('2025-09-01'),
  },
];

/* ================================================================
   VENUES
================================================================ */

export const VENUES: Venue[] = [
  {
    venueId: 'venue-ataturk',
    name: 'Atatürk Olimpiyat Stadyumu',
    slug: 'ataturk-olimpiyat-stadyumu',
    description: '75.000 kişilik olimpiyat stadyumu',
    address: 'Bakırköy, İstanbul',
    city: 'İstanbul',
    country: 'Türkiye',
    image: null,
    latitude: 41.0038,
    longitude: 28.6741,
    createdAt: new Date('2025-01-01'),
  },
  {
    venueId: 'venue-zorlu',
    name: 'Zorlu PSM',
    slug: 'zorlu-psm',
    description: 'Çok amaçlı sanat ve kültür merkezi',
    address: 'Beşiktaş, İstanbul',
    city: 'İstanbul',
    country: 'Türkiye',
    image: null,
    latitude: 41.0736,
    longitude: 29.0131,
    createdAt: new Date('2025-01-01'),
  },
  {
    venueId: 'venue-haliç',
    name: 'Haliç Kongre Merkezi',
    slug: 'halic-kongre-merkezi',
    description: 'Modern kongre ve fuar alanı',
    address: 'Eyüpsultan, İstanbul',
    city: 'İstanbul',
    country: 'Türkiye',
    image: null,
    latitude: 41.0278,
    longitude: 28.9438,
    createdAt: new Date('2025-01-01'),
  },
  {
    venueId: 'venue-ankara',
    name: 'Congresium Ankara',
    slug: 'congresium-ankara',
    description: 'Ankara kongre ve etkinlik merkezi',
    address: 'Söğütözü, Ankara',
    city: 'Ankara',
    country: 'Türkiye',
    image: null,
    latitude: 39.9033,
    longitude: 32.8597,
    createdAt: new Date('2025-01-01'),
  },
];

/* ================================================================
   EVENTS (with data)
================================================================ */

export const EVENTS: EventWithData[] = [
  {
    eventId: 'evt-coldplay',
    title: 'Coldplay – Music of the Spheres World Tour',
    slug: 'coldplay-music-spheres-tour-istanbul',
    description: `
      Coldplay, ikonik "Music of the Spheres World Tour" ile İstanbul'a geliyor!
      Chris Martin ve ekibinin görsel şölene dönüştürdüğü bu tur; çevre dostu sahne tasarımı,
      LED bileklikler ve interaktif ışık gösterileriyle unutulmaz bir deneyim vadediyor.
      Yellow, The Scientist, Fix You ve yeni albümden parçalar eşliğinde geçireceğiniz bir gece
      müzik tarihine geçecek.
    `,
    shortDescription: 'Coldplay\'in efsanevi dünya turu İstanbul\'da!',
    categoryId: 'cat-music',
    organizerId: 'org-live-nation',
    format: 'PHYSICAL',
    startAt: new Date('2026-07-12T20:00:00'),
    endAt: new Date('2026-07-12T23:30:00'),
    timezone: 'Europe/Istanbul',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80',
    status: 'PUBLISHED',
    visibility: 'PUBLIC',
    minPrice: 1500,
    maxPrice: 8500,
    currency: 'TRY',
    totalCapacity: 75000,
    remainingCapacity: 12400,
    tags: ['coldplay', 'konser', 'rock', 'pop', 'dünya turu'],
    keywords: ['coldplay', 'music of the spheres', 'istanbul konser'],
    publishedAt: new Date('2026-04-01'),
    createdAt: new Date('2026-03-15'),
    category: {
      categoryId: 'cat-music',
      title: 'Müzik',
      slug: 'muzik',
      image: null,
    },
    organizer: {
      organizerId: 'org-live-nation',
      name: 'Live Nation Turkey',
      slug: 'live-nation-turkey',
      logo: null,
      verified: true,
    },
  },
  {
    eventId: 'evt-techsummit',
    title: 'Istanbul Tech Summit 2026',
    slug: 'istanbul-tech-summit-2026',
    description: `
      Türkiye'nin en büyük teknoloji konferansı geri dönüyor! Yapay zeka, blockchain, cloud computing
      ve girişimcilik alanlarında 80'den fazla konuşmacı ve 5.000+ katılımcı.
      Workshop'lar, networking oturumları ve startuplar için pitch competition ile dolu dolu 2 gün.
    `,
    shortDescription: 'Türkiye\'nin en büyük teknoloji zirvesi.',
    categoryId: 'cat-conference',
    organizerId: 'org-techsummit',
    format: 'HYBRID',
    startAt: new Date('2026-09-15T09:00:00'),
    endAt: new Date('2026-09-16T18:00:00'),
    timezone: 'Europe/Istanbul',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80',
    status: 'PUBLISHED',
    visibility: 'PUBLIC',
    minPrice: 0,
    maxPrice: 4999,
    currency: 'TRY',
    totalCapacity: 5000,
    remainingCapacity: 2100,
    tags: ['teknoloji', 'yapay zeka', 'girişimcilik', 'konferans'],
    keywords: ['tech summit', 'istanbul', 'ai', 'startup'],
    publishedAt: new Date('2026-04-10'),
    createdAt: new Date('2026-04-01'),
    category: {
      categoryId: 'cat-conference',
      title: 'Konferans',
      slug: 'konferans',
      image: null,
    },
    organizer: {
      organizerId: 'org-techsummit',
      name: 'TechSummit Organization',
      slug: 'techsummit',
      logo: null,
      verified: true,
    },
  },
  {
    eventId: 'evt-hamilton',
    title: 'Hamilton – The Musical',
    slug: 'hamilton-muzikali-istanbul',
    description: `
      Broadway'in en çok konuşulan müzikali Hamilton, ilk kez Türkçe sahneye taşınıyor!
      Alexander Hamilton'ın efsanevi hayat hikâyesini hip-hop, caz ve Broadway müziğiyle anlatan
      bu muhteşem prodüksiyon 6 hafta boyunca Zorlu PSM'de sahne alacak.
    `,
    shortDescription: 'Broadway\'in efsane müzikali Türkçe sahneye çıkıyor.',
    categoryId: 'cat-theater',
    organizerId: 'org-live-nation',
    format: 'PHYSICAL',
    startAt: new Date('2026-05-20T20:00:00'),
    endAt: new Date('2026-05-20T23:00:00'),
    timezone: 'Europe/Istanbul',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1600&q=80',
    status: 'PUBLISHED',
    visibility: 'PUBLIC',
    minPrice: 750,
    maxPrice: 3500,
    currency: 'TRY',
    totalCapacity: 2200,
    remainingCapacity: 86,
    tags: ['tiyatro', 'müzikal', 'hamilton', 'broadway'],
    keywords: ['hamilton', 'musical', 'zorlu psm'],
    publishedAt: new Date('2026-03-01'),
    createdAt: new Date('2026-02-15'),
    category: {
      categoryId: 'cat-theater',
      title: 'Tiyatro',
      slug: 'tiyatro',
      image: null,
    },
    organizer: {
      organizerId: 'org-live-nation',
      name: 'Live Nation Turkey',
      slug: 'live-nation-turkey',
      logo: null,
      verified: true,
    },
  },
  {
    eventId: 'evt-formula-e',
    title: 'Formula E – Istanbul ePrix 2026',
    slug: 'formula-e-istanbul-eprix-2026',
    description: `
      Elektrikli araçların Formula 1'i olan Formula E serisi İstanbul sokaklarına geliyor!
      Park Yolu pisti üzerinde düzenlenen bu yarışta dünyanın en hızlı elektrikli araçlarını
      canlı izleme fırsatı yakalayacaksınız.
    `,
    shortDescription: 'Elektrikli Formula yarışı İstanbul\'da!',
    categoryId: 'cat-sports',
    organizerId: 'org-stadium',
    format: 'PHYSICAL',
    startAt: new Date('2026-06-07T14:00:00'),
    endAt: new Date('2026-06-07T17:00:00'),
    timezone: 'Europe/Istanbul',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80',
    status: 'PUBLISHED',
    visibility: 'PUBLIC',
    minPrice: 500,
    maxPrice: 12000,
    currency: 'TRY',
    totalCapacity: 40000,
    remainingCapacity: 8300,
    tags: ['formula e', 'yarış', 'elektrikli', 'spor'],
    keywords: ['formula e', 'eprix', 'istanbul', 'elektrikli yarış'],
    publishedAt: new Date('2026-03-20'),
    createdAt: new Date('2026-03-01'),
    category: {
      categoryId: 'cat-sports',
      title: 'Spor',
      slug: 'spor',
      image: null,
    },
    organizer: {
      organizerId: 'org-stadium',
      name: 'İstanbul Stadium Events',
      slug: 'istanbul-stadium',
      logo: null,
      verified: true,
    },
  },
  {
    eventId: 'evt-standup',
    title: 'Cem Yılmaz – Yaşasın Hayat Turu',
    slug: 'cem-yilmaz-yasasin-hayat-turu',
    description: `
      Türkiye'nin en sevilen stand-up komedyeni Cem Yılmaz, yeni şovu "Yaşasın Hayat" ile sahnede!
      2 saatlik bu stand-up performansında güncel konular, hayat gözlemleri ve Cem'in imza tarzıyla
      buluşacaksınız.
    `,
    shortDescription: 'Cem Yılmaz\'ın yeni stand-up şovu sahnede!',
    categoryId: 'cat-comedy',
    organizerId: 'org-comedy',
    format: 'PHYSICAL',
    startAt: new Date('2026-05-30T21:00:00'),
    endAt: new Date('2026-05-30T23:00:00'),
    timezone: 'Europe/Istanbul',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1600&q=80',
    status: 'SOLD_OUT',
    visibility: 'PUBLIC',
    minPrice: 600,
    maxPrice: 1200,
    currency: 'TRY',
    totalCapacity: 3000,
    remainingCapacity: 0,
    tags: ['standup', 'komedi', 'cem yılmaz'],
    keywords: ['cem yılmaz', 'stand-up', 'komedi'],
    publishedAt: new Date('2026-03-01'),
    createdAt: new Date('2026-02-20'),
    category: {
      categoryId: 'cat-comedy',
      title: 'Stand-up',
      slug: 'standup',
      image: null,
    },
    organizer: {
      organizerId: 'org-comedy',
      name: 'Güldür Productions',
      slug: 'guldur-productions',
      logo: null,
      verified: false,
    },
  },
  {
    eventId: 'evt-istanbul-jazz',
    title: 'İstanbul Caz Festivali 2026',
    slug: 'istanbul-caz-festivali-2026',
    description: `
      30. yılına giren İstanbul Caz Festivali, bu yıl 10 gün boyunca 40'tan fazla konser ile
      şehrin dört bir yanında müzikseverlerle buluşuyor. Dünyadan ve Türkiye'den usta müzisyenler,
      açık hava ve kapalı mekânlarda nefes kesen performanslar sunacak.
    `,
    shortDescription: '30. yılında İstanbul Caz Festivali başlıyor!',
    categoryId: 'cat-festival',
    organizerId: 'org-live-nation',
    format: 'PHYSICAL',
    startAt: new Date('2026-07-01T18:00:00'),
    endAt: new Date('2026-07-10T23:59:00'),
    timezone: 'Europe/Istanbul',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=1600&q=80',
    status: 'PUBLISHED',
    visibility: 'PUBLIC',
    minPrice: 200,
    maxPrice: 2500,
    currency: 'TRY',
    totalCapacity: null,
    remainingCapacity: null,
    tags: ['caz', 'festival', 'müzik', 'istanbul'],
    keywords: ['istanbul jazz festival', 'caz', 'festival'],
    publishedAt: new Date('2026-04-15'),
    createdAt: new Date('2026-04-01'),
    category: {
      categoryId: 'cat-festival',
      title: 'Festival',
      slug: 'festival',
      image: null,
    },
    organizer: {
      organizerId: 'org-live-nation',
      name: 'Live Nation Turkey',
      slug: 'live-nation-turkey',
      logo: null,
      verified: true,
    },
  },
];

/* ================================================================
   SECTION PRICINGS (per event)
================================================================ */

export const PRICINGS: Record<string, EventSectionPricing[]> = {
  'evt-coldplay': [
    {
      eventSectionPricingId: 'price-coldplay-vip',
      eventId: 'evt-coldplay',
      hallId: 'hall-ataturk-ana',
      sectionId: 'sec-vip',
      name: 'VIP Tribün',
      description: 'En yakın tribün, özel karşılama, LED bileklik ve hediye çantası dahil.',
      price: 8500,
      currency: 'TRY',
      capacity: 2000,
      soldCount: 1850,
      active: true,
    },
    {
      eventSectionPricingId: 'price-coldplay-gold',
      eventId: 'evt-coldplay',
      hallId: 'hall-ataturk-ana',
      sectionId: 'sec-gold',
      name: 'Gold Saha',
      description: 'Sahneye en yakın açık alan, ayakta deneyim.',
      price: 4500,
      currency: 'TRY',
      capacity: 15000,
      soldCount: 13200,
      active: true,
    },
    {
      eventSectionPricingId: 'price-coldplay-standard',
      eventId: 'evt-coldplay',
      hallId: 'hall-ataturk-ana',
      sectionId: 'sec-standard',
      name: 'Standart Tribün',
      description: 'Numaralı koltuk, harika görüş açısı.',
      price: 1500,
      currency: 'TRY',
      capacity: 30000,
      soldCount: 24000,
      active: true,
    },
  ],
  'evt-techsummit': [
    {
      eventSectionPricingId: 'price-tech-free',
      eventId: 'evt-techsummit',
      hallId: 'hall-halic-main',
      sectionId: 'sec-online',
      name: 'Online Katılım',
      description: 'Tüm konuşmalara canlı yayın erişimi.',
      price: 0,
      currency: 'TRY',
      capacity: null,
      soldCount: 3200,
      active: true,
    },
    {
      eventSectionPricingId: 'price-tech-standard',
      eventId: 'evt-techsummit',
      hallId: 'hall-halic-main',
      sectionId: 'sec-general',
      name: 'Standart Bilet',
      description: '2 günlük tam erişim, networking alanı, öğle yemeği dahil.',
      price: 1999,
      currency: 'TRY',
      capacity: 3000,
      soldCount: 1800,
      active: true,
    },
    {
      eventSectionPricingId: 'price-tech-vip',
      eventId: 'evt-techsummit',
      hallId: 'hall-halic-main',
      sectionId: 'sec-vip',
      name: 'VIP Pass',
      description: 'Tüm workshop\'lar, VIP networking dinner ve sertifika dahil.',
      price: 4999,
      currency: 'TRY',
      capacity: 200,
      soldCount: 180,
      active: true,
    },
  ],
  'evt-hamilton': [
    {
      eventSectionPricingId: 'price-hamilton-balkon',
      eventId: 'evt-hamilton',
      hallId: 'hall-zorlu-main',
      sectionId: 'sec-balkon',
      name: 'Balkon',
      description: 'Üst katta, genel görüş açısı.',
      price: 750,
      currency: 'TRY',
      capacity: 500,
      soldCount: 480,
      active: true,
    },
    {
      eventSectionPricingId: 'price-hamilton-genel',
      eventId: 'evt-hamilton',
      hallId: 'hall-zorlu-main',
      sectionId: 'sec-genel',
      name: 'Genel Salon',
      description: 'Numaralı koltuk, orta kat.',
      price: 1500,
      currency: 'TRY',
      capacity: 1200,
      soldCount: 1200,
      active: true,
    },
    {
      eventSectionPricingId: 'price-hamilton-premium',
      eventId: 'evt-hamilton',
      hallId: 'hall-zorlu-main',
      sectionId: 'sec-premium',
      name: 'Premium',
      description: 'Sahneye en yakın sıra, merkezi konum.',
      price: 3500,
      currency: 'TRY',
      capacity: 200,
      soldCount: 194,
      active: true,
    },
  ],
  'evt-formula-e': [
    {
      eventSectionPricingId: 'price-fe-genel',
      eventId: 'evt-formula-e',
      hallId: 'hall-park-yolu',
      sectionId: 'sec-genel-tribun',
      name: 'Genel Tribün',
      description: 'Açık tribün, yarış pistini takip et.',
      price: 500,
      currency: 'TRY',
      capacity: 20000,
      soldCount: 17000,
      active: true,
    },
    {
      eventSectionPricingId: 'price-fe-premium',
      eventId: 'evt-formula-e',
      hallId: 'hall-park-yolu',
      sectionId: 'sec-premium-tribun',
      name: 'Premium Tribün',
      description: 'Örtülü alan, numaralı koltuk.',
      price: 2500,
      currency: 'TRY',
      capacity: 10000,
      soldCount: 7200,
      active: true,
    },
    {
      eventSectionPricingId: 'price-fe-paddock',
      eventId: 'evt-formula-e',
      hallId: 'hall-park-yolu',
      sectionId: 'sec-paddock',
      name: 'Paddock Kulübü',
      description: 'Ekip bölgesi ziyareti, kokteyl, özel tribün.',
      price: 12000,
      currency: 'TRY',
      capacity: 200,
      soldCount: 160,
      active: true,
    },
  ],
};

/* ================================================================
   HELPERS
================================================================ */

export function getEventBySlug(slug: string): EventWithData | null {
  return EVENTS.find((e) => e.slug === slug) ?? null;
}

export function getPricingsByEventId(eventId: string): EventSectionPricing[] {
  return PRICINGS[eventId] ?? [];
}

export function getOrganizerById(id: string): Organizer | null {
  return ORGANIZERS.find((o) => o.organizerId === id) ?? null;
}

export function getVenueById(id: string): Venue | null {
  return VENUES.find((v) => v.venueId === id) ?? null;
}

export const FEATURED_EVENT = EVENTS[0];
export const UPCOMING_EVENTS = EVENTS.filter((e) => e.status !== 'ARCHIVED');
