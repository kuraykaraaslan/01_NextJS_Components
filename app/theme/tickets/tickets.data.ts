export type EventCategory = 'concert' | 'sports' | 'theater' | 'comedy' | 'family' | 'festival';

export type TicketTier = {
  id: string;
  name: string;
  price: number;
  available: number;
  perks: string[];
};

export type EventItem = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: EventCategory;
  date: string;
  time: string;
  venue: string;
  city: string;
  address: string;
  emoji: string;
  accent: string;
  rating: number;
  reviewCount: number;
  minPrice: number;
  maxPrice: number;
  soldOut: boolean;
  hot: boolean;
  description: string;
  performers: string[];
  tags: string[];
  tiers: TicketTier[];
};

export type CategoryItem = {
  id: string;
  slug: EventCategory;
  label: string;
  emoji: string;
  count: number;
};

export const CATEGORIES: CategoryItem[] = [
  { id: '1', slug: 'concert',  label: 'Concerts',  emoji: '🎤', count: 3 },
  { id: '2', slug: 'sports',   label: 'Sports',    emoji: '⚽', count: 3 },
  { id: '3', slug: 'theater',  label: 'Theater',   emoji: '🎭', count: 2 },
  { id: '4', slug: 'comedy',   label: 'Comedy',    emoji: '😂', count: 2 },
  { id: '5', slug: 'family',   label: 'Family',    emoji: '👨‍👩‍👧', count: 1 },
  { id: '6', slug: 'festival', label: 'Festivals', emoji: '🎪', count: 1 },
];

export const EVENTS: EventItem[] = [
  {
    id: '1',
    slug: 'nova-midnight-chapters-tour',
    title: 'Nova — Midnight Chapters Tour',
    subtitle: 'Special guests: The Echoes & Lyra Voss',
    category: 'concert',
    date: 'Sat, May 10, 2026',
    time: '8:00 PM',
    venue: 'Madison Square Garden',
    city: 'New York, NY',
    address: '4 Pennsylvania Plaza, New York, NY 10001',
    emoji: '🎤',
    accent: '#3b82f6',
    rating: 4.9,
    reviewCount: 2841,
    minPrice: 75,
    maxPrice: 450,
    soldOut: false,
    hot: true,
    description: 'Nova returns to the stage for the most anticipated tour of 2026. The Midnight Chapters tour spans 40 cities across North America and Europe, showcasing tracks from the critically acclaimed album alongside fan favorites. With stunning LED visuals and special guest performers, this is the live experience of the year.',
    performers: ['Nova', 'The Echoes', 'Lyra Voss'],
    tags: ['Pop', 'R&B', 'Live Experience', 'Chart-topping'],
    tiers: [
      { id: 'ga', name: 'General Admission', price: 75, available: 320, perks: ['Standing floor access', 'Digital program'] },
      { id: 'reserved', name: 'Reserved Seating', price: 145, available: 180, perks: ['Assigned seat', 'Digital program', 'Early entry'] },
      { id: 'vip', name: 'VIP Package', price: 280, available: 48, perks: ['Front section seat', 'Backstage lounge', 'Merch bundle', 'Meet & greet entry'] },
      { id: 'platinum', name: 'Platinum', price: 450, available: 12, perks: ['Floor pit access', 'Pre-show reception', 'Exclusive merch', 'Signed poster', 'Early entry'] },
    ],
  },
  {
    id: '2',
    slug: 'coldplay-music-of-spheres',
    title: 'Coldplay — Music of the Spheres',
    subtitle: 'World Tour 2026 · Eco-powered stadium show',
    category: 'concert',
    date: 'Fri, Jun 5, 2026',
    time: '7:30 PM',
    venue: 'MetLife Stadium',
    city: 'East Rutherford, NJ',
    address: '1 MetLife Stadium Dr, East Rutherford, NJ 07073',
    emoji: '🌍',
    accent: '#8b5cf6',
    rating: 4.9,
    reviewCount: 5123,
    minPrice: 65,
    maxPrice: 380,
    soldOut: false,
    hot: true,
    description: "Coldplay's Music of the Spheres World Tour returns to North America as the most eco-conscious stadium show in history. Powered 100% by renewable energy, the show lights up with LED wristbands for every fan, kinetic dance floors, and a drone-and-fireworks finale. A night that will stay with you forever.",
    performers: ['Coldplay'],
    tags: ['Rock', 'Alternative', 'Stadium', 'Eco-concert'],
    tiers: [
      { id: 'ga', name: 'General Admission', price: 65, available: 800, perks: ['Standing field access', 'LED wristband'] },
      { id: 'seated', name: 'Seated', price: 120, available: 400, perks: ['Assigned stadium seat', 'LED wristband'] },
      { id: 'vip', name: 'VIP Diamond', price: 250, available: 60, perks: ['Front pit access', 'Pre-show event', 'Exclusive merch'] },
      { id: 'platinum', name: 'Platinum Hospitality', price: 380, available: 20, perks: ['Premium lounge', 'Gourmet catering', 'Premium seating', "Collector's gift"] },
    ],
  },
  {
    id: '3',
    slug: 'post-malone-f1-trillion-tour',
    title: 'Post Malone — F-1 Trillion Tour',
    subtitle: 'Featuring Morgan Wallen & Hardy',
    category: 'concert',
    date: 'Thu, Jul 17, 2026',
    time: '7:00 PM',
    venue: 'Crypto.com Arena',
    city: 'Los Angeles, CA',
    address: '1111 S Figueroa St, Los Angeles, CA 90015',
    emoji: '🤠',
    accent: '#f59e0b',
    rating: 4.7,
    reviewCount: 1892,
    minPrice: 85,
    maxPrice: 350,
    soldOut: false,
    hot: false,
    description: 'Post Malone brings his country-infused F-1 Trillion Tour to LA. With surprise guests, a massive production, and fan-favorite setlists from both his hip-hop and country eras, Posty delivers the full package in one unforgettable night.',
    performers: ['Post Malone', 'Morgan Wallen', 'Hardy'],
    tags: ['Country', 'Hip-Hop', 'Crossover'],
    tiers: [
      { id: 'ga', name: 'General Admission', price: 85, available: 500, perks: ['Floor access', 'Digital ticket'] },
      { id: 'reserved', name: 'Reserved', price: 155, available: 220, perks: ['Assigned seat', 'Merch discount'] },
      { id: 'vip', name: 'VIP', price: 280, available: 35, perks: ['Pit access', 'Early entry', 'Merch bundle'] },
      { id: 'platinum', name: 'Platinum', price: 350, available: 8, perks: ['Premium pit', 'Meet & greet', 'Signed vinyl'] },
    ],
  },
  {
    id: '4',
    slug: 'nba-finals-game-5',
    title: 'NBA Finals — Game 5',
    subtitle: 'Boston Celtics vs Golden State Warriors',
    category: 'sports',
    date: 'Sun, Jun 15, 2026',
    time: '8:30 PM ET',
    venue: 'TD Garden',
    city: 'Boston, MA',
    address: '100 Legends Way, Boston, MA 02114',
    emoji: '🏀',
    accent: '#22c55e',
    rating: 4.8,
    reviewCount: 3201,
    minPrice: 180,
    maxPrice: 1200,
    soldOut: false,
    hot: true,
    description: "The NBA Finals return to TD Garden for a decisive Game 5. With the series tied at 2-2, Boston looks to their home crowd for the advantage they need. Don't miss what could be the moment that defines this generation of basketball.",
    performers: ['Boston Celtics', 'Golden State Warriors'],
    tags: ['NBA', 'Basketball', 'Playoffs', 'Championship'],
    tiers: [
      { id: 'upper', name: 'Upper Bowl', price: 180, available: 400, perks: ['Upper deck seating', 'Souvenir game ticket'] },
      { id: 'lower', name: 'Lower Bowl', price: 450, available: 120, perks: ['Lower level seating', 'Souvenir ticket', 'Priority entry'] },
      { id: 'court', name: 'Courtside Club', price: 890, available: 30, perks: ['Courtside adjacent', 'Club access', 'Catering', 'Exclusive lounge'] },
      { id: 'suite', name: 'Suite Experience', price: 1200, available: 8, perks: ['Private suite', 'In-suite catering', 'Parking', 'Pre-game access'] },
    ],
  },
  {
    id: '5',
    slug: 'ufc-305-championship',
    title: 'UFC 305 — Championship Night',
    subtitle: 'Middleweight Title Fight · 5 Bouts',
    category: 'sports',
    date: 'Sat, Aug 2, 2026',
    time: '10:00 PM ET',
    venue: 'T-Mobile Arena',
    city: 'Las Vegas, NV',
    address: '3780 Las Vegas Blvd S, Las Vegas, NV 89158',
    emoji: '🥊',
    accent: '#ef4444',
    rating: 4.7,
    reviewCount: 2104,
    minPrice: 200,
    maxPrice: 2500,
    soldOut: false,
    hot: false,
    description: 'UFC 305 brings one of the most stacked fight cards in recent memory. The main event sees the middleweight champion defend his title in a highly anticipated rematch. Five PPV-caliber bouts, all under one roof in Las Vegas.',
    performers: ['Alex Pereira', 'Jan Blachowicz', "Sean O'Malley"],
    tags: ['UFC', 'MMA', 'Boxing', 'Championship'],
    tiers: [
      { id: 'upper', name: 'Upper Level', price: 200, available: 600, perks: ['Upper arena seating'] },
      { id: 'lower', name: 'Lower Level', price: 500, available: 200, perks: ['Lower arena seating', 'Walkout access zone'] },
      { id: 'vip', name: 'Octagon Side', price: 1100, available: 40, perks: ['Octagon-side seats', 'Weigh-in access', 'Fighter meet & greet'] },
      { id: 'platinum', name: 'Platinum Cage', price: 2500, available: 6, perks: ['Front row octagon', 'Exclusive dinner', 'Signed gloves'] },
    ],
  },
  {
    id: '6',
    slug: 'premier-league-city-vs-arsenal',
    title: 'Man City vs Arsenal',
    subtitle: 'Premier League Matchday 35 · Title Decider',
    category: 'sports',
    date: 'Sat, May 2, 2026',
    time: '3:00 PM BST',
    venue: 'Etihad Stadium',
    city: 'Manchester, UK',
    address: 'Etihad Campus, Manchester M11 3FF',
    emoji: '⚽',
    accent: '#06b6d4',
    rating: 4.9,
    reviewCount: 4788,
    minPrice: 55,
    maxPrice: 320,
    soldOut: false,
    hot: true,
    description: 'The title race comes to a thrilling conclusion as Manchester City host Arsenal at the Etihad in a top-of-the-table clash that could decide the Premier League champion. With only three points between the sides, every tackle, every goal, every minute matters.',
    performers: ['Manchester City FC', 'Arsenal FC'],
    tags: ['Premier League', 'Football', 'Title Race'],
    tiers: [
      { id: 'away', name: 'Away Supporters', price: 55, available: 200, perks: ['Away end seating'] },
      { id: 'home', name: 'Home Supporters', price: 75, available: 800, perks: ['Home stand seating'] },
      { id: 'business', name: 'Business Club', price: 180, available: 60, perks: ['Club-level seating', 'Lounge access', 'Matchday program'] },
      { id: 'vip', name: 'Hospitality Box', price: 320, available: 12, perks: ['Private box', 'Fine dining', 'Pre-match access', 'Parking'] },
    ],
  },
  {
    id: '7',
    slug: 'hamilton-broadway',
    title: 'Hamilton',
    subtitle: 'The Original Broadway Musical',
    category: 'theater',
    date: 'Multiple dates — May–Aug 2026',
    time: '7:30 PM',
    venue: 'Richard Rodgers Theatre',
    city: 'New York, NY',
    address: '226 W 46th St, New York, NY 10036',
    emoji: '🎭',
    accent: '#8b5cf6',
    rating: 5.0,
    reviewCount: 12540,
    minPrice: 10,
    maxPrice: 550,
    soldOut: false,
    hot: false,
    description: "The story of America then, told by America now. Hamilton has revolutionized Broadway with its hip-hop-infused score, diverse cast, and electrifying choreography. The founding father's story has never felt more urgent, more relevant, or more exhilarating.",
    performers: ['Original Broadway Company'],
    tags: ['Musical', 'Broadway', 'Hip-Hop', 'Historical'],
    tiers: [
      { id: 'orchestra', name: 'Orchestra', price: 149, available: 40, perks: ['Ground floor seating', 'Program included'] },
      { id: 'mezzanine', name: 'Mezzanine', price: 220, available: 25, perks: ['Elevated center view', 'Program included'] },
      { id: 'front', name: 'Front Orchestra', price: 350, available: 15, perks: ['Premium front rows', 'Priority entry', 'Signed program'] },
      { id: 'lottery', name: 'Ham4Ham Lottery', price: 10, available: 20, perks: ['Front row lottery', 'Same-day digital entry'] },
    ],
  },
  {
    id: '8',
    slug: 'phantom-of-the-opera',
    title: 'The Phantom of the Opera',
    subtitle: '35th Anniversary Revival Production',
    category: 'theater',
    date: 'Wed, Jul 8, 2026',
    time: '8:00 PM',
    venue: "Her Majesty's Theatre",
    city: 'London, UK',
    address: 'Haymarket, London SW1Y 4QL',
    emoji: '🎼',
    accent: '#6366f1',
    rating: 4.8,
    reviewCount: 8912,
    minPrice: 35,
    maxPrice: 280,
    soldOut: false,
    hot: false,
    description: "Andrew Lloyd Webber's magnificent musical returns in a stunning 35th anniversary revival. This new production brings breathtaking staging, a reimagined chandelier sequence, and fresh choreography while preserving all the Gothic romance that has captivated audiences for decades.",
    performers: ['Original Revival Cast', 'Cameron Mackintosh Production'],
    tags: ['Musical', 'West End', 'Opera', 'Classic'],
    tiers: [
      { id: 'grand', name: 'Grand Circle', price: 35, available: 100, perks: ['Upper balcony seating'] },
      { id: 'stalls', name: 'Stalls', price: 55, available: 80, perks: ['Ground floor seating'] },
      { id: 'dress', name: 'Dress Circle', price: 95, available: 50, perks: ['First balcony', 'Great sightlines'] },
      { id: 'gold', name: 'Gold Circle', price: 280, available: 10, perks: ['Front center stalls', 'Interval champagne', 'Signed playbill'] },
    ],
  },
  {
    id: '9',
    slug: 'dave-chappelle-comeback-kid',
    title: 'Dave Chappelle — The Comeback Kid',
    subtitle: 'World Stand-Up Tour 2026 · No phones',
    category: 'comedy',
    date: 'Fri, May 30, 2026',
    time: '9:00 PM',
    venue: 'Beacon Theatre',
    city: 'New York, NY',
    address: '2124 Broadway, New York, NY 10023',
    emoji: '😂',
    accent: '#f59e0b',
    rating: 4.8,
    reviewCount: 3341,
    minPrice: 95,
    maxPrice: 280,
    soldOut: false,
    hot: true,
    description: "The most talked-about stand-up comedian of his generation returns with a brand-new hour. Chappelle's masterful storytelling, sharp social commentary, and unmatched stage presence make every show a historic event. Strict no-phones policy — experience comedy the way it was meant to be.",
    performers: ['Dave Chappelle'],
    tags: ['Stand-Up', 'Comedy', 'No phones'],
    tiers: [
      { id: 'general', name: 'General Seating', price: 95, available: 200, perks: ['Assigned seat', 'No phone policy enforced'] },
      { id: 'premium', name: 'Premium', price: 170, available: 80, perks: ['Close seating', 'Preferred section'] },
      { id: 'vip', name: 'VIP', price: 280, available: 20, perks: ['Front section', 'Meet & greet', 'Signed merch'] },
    ],
  },
  {
    id: '10',
    slug: 'trevor-noah-off-the-record',
    title: 'Trevor Noah — Off the Record',
    subtitle: 'Global Comedy Tour · 50+ Cities',
    category: 'comedy',
    date: 'Sat, Jun 21, 2026',
    time: '8:00 PM',
    venue: 'Royal Albert Hall',
    city: 'London, UK',
    address: 'Kensington Gore, London SW7 2AP',
    emoji: '🎙',
    accent: '#06b6d4',
    rating: 4.7,
    reviewCount: 2109,
    minPrice: 45,
    maxPrice: 195,
    soldOut: false,
    hot: false,
    description: "Trevor Noah brings his Off the Record world tour to the iconic Royal Albert Hall. Fresh material on global politics, AI, culture clashes, and the absurdity of modern life — delivered with his signature warmth and razor-sharp wit.",
    performers: ['Trevor Noah'],
    tags: ['Stand-Up', 'Comedy', 'Global Tour'],
    tiers: [
      { id: 'arena', name: 'Arena Seating', price: 45, available: 500, perks: ['Main floor seating'] },
      { id: 'stalls', name: 'Stalls', price: 85, available: 200, perks: ['Close-up seating', 'Program'] },
      { id: 'box', name: 'Grand Tier Box', price: 195, available: 30, perks: ['Private box seating', 'Interval drinks', 'Premium view'] },
    ],
  },
  {
    id: '11',
    slug: 'disney-on-ice-frozen',
    title: 'Disney on Ice — Frozen',
    subtitle: 'Let It Go Live! · All Ages Welcome',
    category: 'family',
    date: 'Sun, Apr 27, 2026',
    time: '2:00 PM',
    venue: 'Barclays Center',
    city: 'Brooklyn, NY',
    address: '620 Atlantic Ave, Brooklyn, NY 11217',
    emoji: '⛸',
    accent: '#06b6d4',
    rating: 4.6,
    reviewCount: 1877,
    minPrice: 25,
    maxPrice: 120,
    soldOut: false,
    hot: false,
    description: 'Bring the whole family to experience the magic of Arendelle live on ice! Join Elsa, Anna, Olaf, and all your Frozen favorites in a spectacular skating extravaganza with stunning costumes, special effects, and beloved songs. Recommended for ages 3 and up.',
    performers: ['Disney on Ice Production', 'Elsa · Anna · Olaf · Kristoff'],
    tags: ['Disney', 'Ice Skating', 'Family', 'Kids'],
    tiers: [
      { id: 'value', name: 'Value', price: 25, available: 800, perks: ['Upper bowl seating'] },
      { id: 'select', name: 'Select', price: 55, available: 400, perks: ['Mid-tier seating', 'Better views'] },
      { id: 'premium', name: 'Premium', price: 85, available: 150, perks: ['Lower bowl', 'Pre-show skater experience'] },
      { id: 'vip', name: 'VIP Front Row', price: 120, available: 40, perks: ['Rinkside seats', 'Character photo op', 'Gift bag'] },
    ],
  },
  {
    id: '12',
    slug: 'ultra-music-festival-2026',
    title: 'Ultra Music Festival 2026',
    subtitle: '3 Days · 200 Artists · 10 Stages',
    category: 'festival',
    date: 'Fri–Sun, Mar 27–29, 2026',
    time: 'Gates open 2:00 PM daily',
    venue: 'Bayfront Park',
    city: 'Miami, FL',
    address: '301 N Biscayne Blvd, Miami, FL 33132',
    emoji: '🎪',
    accent: '#ec4899',
    rating: 4.8,
    reviewCount: 6721,
    minPrice: 150,
    maxPrice: 2200,
    soldOut: false,
    hot: true,
    description: "The world's premier electronic music festival returns to downtown Miami for its 28th edition. Three days, ten stages, 200 of the world's top DJs and producers across EDM, techno, house, trance, and bass. Ultra is where legends perform and new artists break into the global stage.",
    performers: ['Martin Garrix', 'Tiësto', 'Eric Prydz', 'Skrillex', 'Charlotte de Witte', '+195 more'],
    tags: ['EDM', 'Techno', 'House', 'Festival', '3-Day'],
    tiers: [
      { id: 'single', name: 'Single Day GA', price: 150, available: 2000, perks: ['One day access', 'All stages', 'Wristband'] },
      { id: '3day', name: '3-Day GA', price: 350, available: 800, perks: ['3-day access', 'All stages', 'Wristband', 'Re-entry'] },
      { id: 'vip', name: '3-Day VIP', price: 850, available: 200, perks: ['3-day VIP access', 'VIP viewing decks', 'Dedicated bars', 'Lounge areas'] },
      { id: 'ultra', name: 'Ultra Worldwide VIP', price: 2200, available: 25, perks: ['Stage-side viewing', 'Artist meet & greet', 'Exclusive hotel package'] },
    ],
  },
];

export const FEATURED_EVENT_IDS = ['1', '2', '4', '12'];

export function getRelatedEvents(event: EventItem, count = 3): EventItem[] {
  return EVENTS
    .filter((e) => e.category === event.category && e.id !== event.id)
    .slice(0, count);
}

// ─── Artist ───────────────────────────────────────────────────────────────────

export type ArtistItem = {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  genre: string;
  subGenres: string[];
  accent: string;
  bio: string;
  hometown: string;
  monthlyListeners: number;
  followers: number;
  verified: boolean;
};

export const ARTISTS: ArtistItem[] = [
  {
    id: '1', slug: 'nova', name: 'Nova', emoji: '🌟',
    genre: 'Pop / R&B', subGenres: ['Pop', 'R&B', 'Soul', 'Dance'],
    accent: '#3b82f6',
    bio: 'Nova is a genre-blending pop and R&B powerhouse who burst onto the scene in 2021 with her debut album "Chapters." Known for her powerhouse vocals, introspective lyrics, and electrifying live performances, Nova has sold out arenas across 5 continents. Her latest album, "Midnight Chapters," debuted at #1 in 42 countries.',
    hometown: 'Atlanta, GA', monthlyListeners: 42_800_000, followers: 28_500_000, verified: true,
  },
  {
    id: '2', slug: 'coldplay', name: 'Coldplay', emoji: '🌍',
    genre: 'Alternative Rock', subGenres: ['Alternative', 'Rock', 'Pop Rock', 'Arena Rock'],
    accent: '#8b5cf6',
    bio: 'Coldplay are a British rock band formed in London in 1996. Led by vocalist Chris Martin, the band has sold over 100 million records worldwide and are known for their anthemic songs, innovative live shows powered by renewable energy, and their distinctive blend of rock and pop. Their Music of the Spheres World Tour is the highest-grossing tour in history.',
    hometown: 'London, UK', monthlyListeners: 88_000_000, followers: 65_000_000, verified: true,
  },
  {
    id: '3', slug: 'post-malone', name: 'Post Malone', emoji: '🤠',
    genre: 'Hip-Hop / Country', subGenres: ['Hip-Hop', 'Country', 'Pop', 'Trap'],
    accent: '#f59e0b',
    bio: 'Post Malone — born Austin Richard Post — is a multi-platinum American rapper, singer, and songwriter from Syracuse, NY. Known for blending rap, pop, and country into a uniquely his own sound, Posty has broken streaming records and crossed genre barriers like no artist before him. His F-1 Trillion album debuted at #1 and marked his definitive pivot into country.',
    hometown: 'Syracuse, NY', monthlyListeners: 59_400_000, followers: 44_200_000, verified: true,
  },
  {
    id: '4', slug: 'dave-chappelle', name: 'Dave Chappelle', emoji: '😂',
    genre: 'Stand-Up Comedy', subGenres: ['Stand-Up', 'Observational', 'Social Commentary'],
    accent: '#f59e0b',
    bio: 'Dave Chappelle is widely regarded as one of the greatest stand-up comedians of all time. Known for his masterful storytelling, sharp cultural commentary, and unmatched stage presence, Chappelle has won multiple Grammy Awards for Best Comedy Album. His specials on Netflix have broken viewership records, and his live shows remain the hottest tickets in comedy.',
    hometown: 'Washington, D.C.', monthlyListeners: 0, followers: 12_800_000, verified: true,
  },
  {
    id: '5', slug: 'trevor-noah', name: 'Trevor Noah', emoji: '🎙',
    genre: 'Stand-Up Comedy', subGenres: ['Stand-Up', 'Political Comedy', 'Global'],
    accent: '#06b6d4',
    bio: 'Trevor Noah is a South African comedian, writer, and television host who became a global sensation as the host of The Daily Show for 7 years. Born in apartheid-era South Africa, his unique perspective on race, politics, and culture has made him one of the most distinctive voices in comedy. His "Off the Record" tour spans 50+ cities across 6 continents.',
    hometown: 'Johannesburg, South Africa', monthlyListeners: 0, followers: 18_600_000, verified: true,
  },
  {
    id: '6', slug: 'martin-garrix', name: 'Martin Garrix', emoji: '🎧',
    genre: 'EDM / House', subGenres: ['EDM', 'House', 'Big Room', 'Future Bass'],
    accent: '#ec4899',
    bio: "Martin Garrix is a Dutch DJ and producer who became one of the youngest artists to top the DJ Mag Top 100 list at age 17. Known for his euphoric melodies, massive festival drops, and relentless touring schedule, Garrix has headlined every major music festival in the world including Ultra, Tomorrowland, and Coachella. \"Animals\" remains one of the most-played EDM tracks of all time.",
    hometown: 'Amsterdam, Netherlands', monthlyListeners: 24_500_000, followers: 19_800_000, verified: true,
  },
  {
    id: '7', slug: 'the-echoes', name: 'The Echoes', emoji: '🎸',
    genre: 'Indie Rock', subGenres: ['Indie Rock', 'Dream Pop', 'Shoegaze'],
    accent: '#6366f1',
    bio: "The Echoes are an indie rock quartet from Brooklyn, NY, known for their dreamy soundscapes and introspective lyrics. After years of playing underground venues, their 2024 single \"Reverb\" went viral on TikTok and propelled them to international audiences. They're currently supporting Nova on the Midnight Chapters Tour.",
    hometown: 'Brooklyn, NY', monthlyListeners: 3_200_000, followers: 2_100_000, verified: false,
  },
];

// ─── Venue ────────────────────────────────────────────────────────────────────

export type VenueType = 'arena' | 'stadium' | 'theater' | 'park' | 'hall';

export type VenueItem = {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  city: string;
  country: string;
  address: string;
  capacity: number;
  type: VenueType;
  accent: string;
  description: string;
  amenities: string[];
  yearOpened: number;
};

export const VENUES: VenueItem[] = [
  {
    id: '1', slug: 'madison-square-garden', name: 'Madison Square Garden', emoji: '🏟',
    city: 'New York, NY', country: 'United States', address: '4 Pennsylvania Plaza, New York, NY 10001',
    capacity: 20_789, type: 'arena', accent: '#3b82f6',
    description: "The world's most famous arena. Madison Square Garden has hosted everything from championship boxing matches to presidential conventions to the greatest concerts in history. Located atop Penn Station in Midtown Manhattan, MSG is the gold standard of live entertainment venues.",
    amenities: ['Premium suites', 'Club lounges', 'Accessible seating', 'Multiple bars', 'Merchandise stores', 'VIP parking', 'Coat check', 'ATMs'],
    yearOpened: 1968,
  },
  {
    id: '2', slug: 'metlife-stadium', name: 'MetLife Stadium', emoji: '🏟',
    city: 'East Rutherford, NJ', country: 'United States', address: '1 MetLife Stadium Dr, East Rutherford, NJ 07073',
    capacity: 82_500, type: 'stadium', accent: '#8b5cf6',
    description: 'MetLife Stadium is a state-of-the-art outdoor stadium in the Meadowlands Sports Complex. Home to both the New York Giants and Jets, it is also one of the premier concert venues on the East Coast. The stadium hosted Super Bowl XLVIII and will host matches in the 2026 FIFA World Cup.',
    amenities: ['Premium clubs', 'Field-level suites', 'Accessible ramps', 'Giant HD screens', 'Fan zones', 'NJ Transit rail access', 'Tailgate areas', 'Multiple dining options'],
    yearOpened: 2010,
  },
  {
    id: '3', slug: 'cryptocom-arena', name: 'Crypto.com Arena', emoji: '🏟',
    city: 'Los Angeles, CA', country: 'United States', address: '1111 S Figueroa St, Los Angeles, CA 90015',
    capacity: 20_000, type: 'arena', accent: '#f59e0b',
    description: 'Located in downtown Los Angeles, Crypto.com Arena is one of the most recognizable venues in the world. Home to the Lakers and Kings, the arena hosts over 200 events per year including major concerts, award shows, and sports championships. Its central location and world-class facilities make it the crown jewel of LA entertainment.',
    amenities: ['Premium suites', 'Club level', 'Celebrity row', 'Multiple restaurants', 'VIP lounges', 'Metro access', 'Interactive fan zones'],
    yearOpened: 1999,
  },
  {
    id: '4', slug: 'td-garden', name: 'TD Garden', emoji: '🏟',
    city: 'Boston, MA', country: 'United States', address: '100 Legends Way, Boston, MA 02114',
    capacity: 19_156, type: 'arena', accent: '#22c55e',
    description: "TD Garden is the heart of Boston sports and entertainment. Home to the Celtics and Bruins, the Garden has an unmatched atmosphere and passionate fan base. Located above North Station, it's easily accessible and surrounded by Boston's vibrant West End neighborhood.",
    amenities: ['Legends Club', 'Premium suites', 'Accessible seating', 'TD Garden Proshop', 'Multiple concession areas', 'North Station access', 'VIP entrance'],
    yearOpened: 1995,
  },
  {
    id: '5', slug: 'tmobile-arena', name: 'T-Mobile Arena', emoji: '🏟',
    city: 'Las Vegas, NV', country: 'United States', address: '3780 Las Vegas Blvd S, Las Vegas, NV 89158',
    capacity: 20_000, type: 'arena', accent: '#ef4444',
    description: "T-Mobile Arena sits at the heart of the Las Vegas Strip, making it the most electric arena experience in the world. Home to the Golden Knights, the venue hosts major UFC events, world championship boxing, and A-list concerts year-round.",
    amenities: ['Toshiba Plaza outdoor area', 'Premium suites', 'Club seats', 'Multiple bars', 'Fine dining', 'Valet parking', 'Vegas Strip access'],
    yearOpened: 2016,
  },
  {
    id: '6', slug: 'etihad-stadium', name: 'Etihad Stadium', emoji: '🏟',
    city: 'Manchester, UK', country: 'United Kingdom', address: 'Etihad Campus, Manchester M11 3FF',
    capacity: 55_017, type: 'stadium', accent: '#06b6d4',
    description: 'The home of Manchester City Football Club, the Etihad Stadium is one of the finest football grounds in the world. Continuously expanded since its construction for the 2002 Commonwealth Games, the stadium offers excellent sightlines from every seat and a state-of-the-art supporter experience.',
    amenities: ['Club lounges', 'Executive boxes', 'City Square fan zone', 'Multiple bars', 'MCFC megastore', 'Stadium tours', 'Accessible facilities'],
    yearOpened: 2003,
  },
  {
    id: '7', slug: 'richard-rodgers-theatre', name: 'Richard Rodgers Theatre', emoji: '🎭',
    city: 'New York, NY', country: 'United States', address: '226 W 46th St, New York, NY 10036',
    capacity: 1_319, type: 'theater', accent: '#8b5cf6',
    description: "One of the most beloved Broadway houses, the Richard Rodgers Theatre has been home to some of theater's greatest productions, including Oklahoma!, Pal Joey, and most recently Hamilton. With intimate sight lines and superb acoustics, every seat feels like the best seat in the house.",
    amenities: ['Orchestra seating', 'Mezzanine', 'Balcony', 'Bars and lounges', 'Coat check', 'Accessible seating', 'Merchandise counter'],
    yearOpened: 1925,
  },
  {
    id: '8', slug: 'her-majestys-theatre', name: "Her Majesty's Theatre", emoji: '🎭',
    city: 'London, UK', country: 'United Kingdom', address: 'Haymarket, London SW1Y 4QL',
    capacity: 1_216, type: 'theater', accent: '#6366f1',
    description: "Her Majesty's Theatre on the Haymarket is one of London's most storied theatrical venues. Famous as the home of The Phantom of the Opera since 1986, the theatre boasts stunning Victorian architecture, outstanding acoustics, and an intimate atmosphere that has made it the definitive home of Andrew Lloyd Webber's masterwork.",
    amenities: ['Stalls', 'Royal Circle', 'Grand Circle', 'Balcony', 'Bars on each level', 'Programme shop', 'Wheelchair access'],
    yearOpened: 1705,
  },
  {
    id: '9', slug: 'beacon-theatre', name: 'Beacon Theatre', emoji: '🎶',
    city: 'New York, NY', country: 'United States', address: '2124 Broadway, New York, NY 10023',
    capacity: 2_894, type: 'theater', accent: '#f59e0b',
    description: "A legendary New York City music and entertainment venue, the Beacon Theatre has hosted some of the greatest performances in rock, pop, comedy, and jazz history. Its landmarked interior features stunning Art Deco architecture and offers an intimate concert experience that larger venues simply can't match.",
    amenities: ['Orchestra', 'Loge', 'Mezzanine', 'Balcony', 'Full bars', 'Coat check', 'Accessible seating', 'Merchandise'],
    yearOpened: 1929,
  },
  {
    id: '10', slug: 'royal-albert-hall', name: 'Royal Albert Hall', emoji: '🎼',
    city: 'London, UK', country: 'United Kingdom', address: 'Kensington Gore, London SW7 2AP',
    capacity: 5_544, type: 'hall', accent: '#06b6d4',
    description: "One of the UK's most treasured and distinctive buildings, the Royal Albert Hall has been the home of great music and culture since 1871. Its iconic dome hosts everything from classical concerts and comedy to rock legends and boxing. The BBC Proms, held here every summer, is one of the world's greatest classical music events.",
    amenities: ['Stalls', 'Arena floor', 'Loggia boxes', 'Grand Tier', 'Second Tier', 'Gallery', 'Bars on every level', 'Fine dining', 'Private hire'],
    yearOpened: 1871,
  },
  {
    id: '11', slug: 'barclays-center', name: 'Barclays Center', emoji: '🏟',
    city: 'Brooklyn, NY', country: 'United States', address: '620 Atlantic Ave, Brooklyn, NY 11217',
    capacity: 19_000, type: 'arena', accent: '#06b6d4',
    description: "Opened in 2012, Barclays Center transformed the Brooklyn waterfront and has quickly become one of America's premier live entertainment arenas. Home to the Brooklyn Nets and NY Liberty, the arena is known for its unique rust-colored steel exterior, world-class acoustics, and vibrant Brooklyn atmosphere.",
    amenities: ['Premium suites', 'Club seats', 'Champions Club', 'Multiple dining options', 'Atlantic Terminal access', 'Accessible seating'],
    yearOpened: 2012,
  },
  {
    id: '12', slug: 'bayfront-park', name: 'Bayfront Park', emoji: '🌴',
    city: 'Miami, FL', country: 'United States', address: '301 N Biscayne Blvd, Miami, FL 33132',
    capacity: 65_000, type: 'park', accent: '#ec4899',
    description: "Bayfront Park is Miami's crown jewel waterfront venue and the permanent home of Ultra Music Festival. Set against the stunning backdrop of Biscayne Bay and the Miami skyline, this outdoor park transforms into an otherworldly festival grounds each spring. The combination of the tropical climate, waterfront setting, and world-class production makes it a truly unique event destination.",
    amenities: ['Multiple festival stages', 'VIP viewing decks', 'Hospitality suites', 'Dedicated festival entrance', 'Food courts', 'Water stations', 'Medical stations', 'Waterfront views'],
    yearOpened: 1925,
  },
];

export function getEventsByArtist(artistName: string): EventItem[] {
  return EVENTS.filter((e) =>
    e.performers.some((p) => p.toLowerCase() === artistName.toLowerCase())
  );
}

export function getEventsByVenue(venueName: string): EventItem[] {
  return EVENTS.filter((e) => e.venue === venueName);
}

export function getRelatedArtists(artist: ArtistItem, count = 4): ArtistItem[] {
  const primaryGenre = artist.genre.split(' / ')[0];
  return ARTISTS
    .filter((a) => a.id !== artist.id)
    .sort((a, b) => {
      const aMatch = a.genre.split(' / ')[0] === primaryGenre ? 0 : 1;
      const bMatch = b.genre.split(' / ')[0] === primaryGenre ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, count);
}

export function getRelatedVenues(venue: VenueItem, count = 4): VenueItem[] {
  return VENUES
    .filter((v) => v.id !== venue.id)
    .sort((a, b) => {
      const aScore = (a.type === venue.type ? 2 : 0) + (a.city === venue.city ? 1 : 0);
      const bScore = (b.type === venue.type ? 2 : 0) + (b.city === venue.city ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, count);
}
