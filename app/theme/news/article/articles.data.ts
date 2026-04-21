export type ArticleData = {
  slug: string;
  category: string;
  categoryVariant: 'error' | 'info' | 'warning' | 'success' | 'neutral';
  title: string;
  subtitle: string;
  author: string;
  authorTitle: string;
  authorBio: string;
  authorArticleCount: number;
  authorFollowerCount: number;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  gradient: string;
  tags: string[];
  body: {
    lead: string;
    pullQuote: string;
    pullQuoteAuthor: string;
    para1: string;
    para2: string;
    para3: string;
  };
};

export const ARTICLES: ArticleData[] = [
  {
    slug: 'geneva-climate-accord',
    category: 'World',
    categoryVariant: 'info',
    title: 'Global Leaders Reach Landmark Climate Agreement at Geneva Summit',
    subtitle: 'After three days of intense negotiations, 147 nations signed the Geneva Carbon Accord — the most ambitious climate deal since Paris.',
    author: 'Sarah Mitchell',
    authorTitle: 'Senior World Affairs Correspondent',
    authorBio: 'Sarah Mitchell has covered international diplomacy and climate policy for over 12 years, reporting from more than 40 countries. She joined the newsroom in 2014 after a decade at the Associated Press.',
    authorArticleCount: 847,
    authorFollowerCount: 24300,
    publishedAt: 'April 21, 2026 at 10:30 AM GMT',
    updatedAt: 'April 21, 2026 at 2:45 PM GMT',
    readTime: '8 min read',
    gradient: 'from-blue-700 via-blue-800 to-slate-900',
    tags: ['Climate', 'Geneva', 'UN', 'Environment', 'Diplomacy'],
    body: {
      lead: 'GENEVA — After three days of marathon negotiations, 147 nations signed a landmark climate framework on Tuesday, committing to reduce greenhouse gas emissions by 60 percent before 2040.',
      pullQuote: '"This is not the end of the road — it is the beginning of the hardest part. Implementation must start today, not tomorrow."',
      pullQuoteAuthor: '— António Guterres, UN Secretary-General',
      para1: 'The accord introduces a novel "ratchet mechanism" requiring signatories to submit updated emissions plans every two years, with independent verification by a new body called the Global Climate Oversight Bureau.',
      para2: 'Developing nations secured $500 billion in annual climate finance — triple the amount promised at COP27. The pledge was brokered after a late-night session that saw the US and China agree to joint financing guarantees.',
      para3: 'The agreement was formally witnessed by all P5 members of the UN Security Council — a symbolic first that Swiss officials hailed as a testament to the forum\'s convening power.',
    },
  },
  {
    slug: 'ai-regulation-eu',
    category: 'Technology',
    categoryVariant: 'neutral',
    title: 'EU Parliament Passes World\'s First Comprehensive AI Regulation',
    subtitle: 'The landmark legislation classifies AI systems by risk level and imposes strict transparency and testing requirements on frontier models.',
    author: 'James Thornton',
    authorTitle: 'Technology & Policy Correspondent',
    authorBio: 'James Thornton covers the intersection of technology policy, regulation, and innovation across Europe and Silicon Valley. Former contributor to Wired and MIT Technology Review.',
    authorArticleCount: 512,
    authorFollowerCount: 18700,
    publishedAt: 'April 20, 2026 at 3:15 PM CET',
    updatedAt: 'April 21, 2026 at 9:00 AM CET',
    readTime: '11 min read',
    gradient: 'from-violet-700 via-purple-800 to-indigo-900',
    tags: ['AI', 'EU', 'Regulation', 'Policy', 'Technology'],
    body: {
      lead: 'BRUSSELS — The European Parliament voted 523 to 46 on Wednesday to adopt the Artificial Intelligence Act, making the EU the first major jurisdiction in the world to comprehensively regulate AI systems.',
      pullQuote: '"We are setting the global standard for trustworthy AI — just as we did with data protection."',
      pullQuoteAuthor: '— Thierry Breton, EU Commissioner for Internal Market',
      para1: 'The regulation classifies AI applications into four risk tiers — unacceptable, high, limited, and minimal — with the most stringent requirements reserved for systems used in critical infrastructure, law enforcement, and medical devices.',
      para2: 'Frontier AI model providers must submit to mandatory red-team testing and maintain public transparency registers before deploying systems in the EU market. Violations carry fines of up to 7% of global annual revenue.',
      para3: 'Critics from the tech industry argue the rules will hamper innovation and drive AI development outside Europe. Proponents counter that safety standards will ultimately build public trust and accelerate responsible adoption.',
    },
  },
  {
    slug: 'fed-rate-pause',
    category: 'Finance',
    categoryVariant: 'success',
    title: 'Federal Reserve Signals End of Rate Hike Cycle as Inflation Cools',
    subtitle: 'Chair Powell indicated rates may have peaked as CPI data fell to a two-year low of 2.1%, sending global equity markets surging.',
    author: 'Elena Vasquez',
    authorTitle: 'Financial Markets Editor',
    authorBio: 'Elena Vasquez is the Financial Markets Editor at NewsHub, covering central banking, macroeconomics, and global equity markets. Previously at Bloomberg and the Financial Times.',
    authorArticleCount: 1240,
    authorFollowerCount: 41000,
    publishedAt: 'April 19, 2026 at 2:00 PM EST',
    updatedAt: 'April 19, 2026 at 6:30 PM EST',
    readTime: '6 min read',
    gradient: 'from-emerald-700 via-teal-800 to-cyan-900',
    tags: ['Federal Reserve', 'Interest Rates', 'Inflation', 'Markets', 'Economy'],
    body: {
      lead: 'WASHINGTON — Federal Reserve Chair Jerome Powell signaled Wednesday that the central bank\'s aggressive rate hike campaign may be over, citing encouraging inflation data and a cooling labour market.',
      pullQuote: '"Policy is now meaningfully restrictive, and the data supports the case for holding — or moving lower — in the months ahead."',
      pullQuoteAuthor: '— Jerome Powell, Federal Reserve Chair',
      para1: 'The consumer price index rose just 2.1% year-over-year in March, the slowest pace since early 2024, driven by falling energy prices and easing shelter costs. Core inflation, which excludes food and energy, came in at 2.4%.',
      para2: 'Markets reacted immediately: the S&P 500 jumped 2.3% to a new all-time high, the 10-year Treasury yield fell 18 basis points to 3.82%, and the dollar weakened against most major currencies.',
      para3: 'Futures markets now price in a 78% probability of a 25 basis point cut at the June FOMC meeting, up from 31% before Wednesday\'s press conference. Goldman Sachs revised its year-end rate forecast to 4.0% from 4.5%.',
    },
  },
  {
    slug: 'mrna-cancer-vaccine',
    category: 'Health',
    categoryVariant: 'error',
    title: 'mRNA Cancer Vaccine Shows 90% Efficacy in Global Phase-3 Trial',
    subtitle: 'A personalised vaccine from BioNTech eliminated tumours in 18 of 20 participants in the largest clinical trial of its kind ever conducted.',
    author: 'Dr. Anna Chen',
    authorTitle: 'Health & Science Correspondent',
    authorBio: 'Dr. Anna Chen holds a PhD in Molecular Biology from Johns Hopkins and has reported on biomedical research for over a decade. She covers clinical trials, oncology, and public health policy.',
    authorArticleCount: 389,
    authorFollowerCount: 15900,
    publishedAt: 'April 18, 2026 at 11:00 AM EST',
    updatedAt: 'April 18, 2026 at 4:00 PM EST',
    readTime: '9 min read',
    gradient: 'from-rose-700 via-pink-800 to-red-900',
    tags: ['Cancer', 'mRNA', 'BioNTech', 'Clinical Trial', 'Medicine'],
    body: {
      lead: 'NEW YORK — A personalised mRNA cancer vaccine developed by BioNTech eliminated tumours in 90% of participants in a landmark global trial, raising hopes for a new era of oncology treatment.',
      pullQuote: '"This is arguably the most significant clinical data we have seen in oncology in the last 20 years."',
      pullQuoteAuthor: '— Dr. Özlem Türeci, BioNTech Co-founder',
      para1: 'The vaccine works by reading the genetic mutations unique to each patient\'s tumour and engineering mRNA sequences that instruct the immune system to attack those specific cancer cells. Each vaccine is manufactured within 42 days of biopsy.',
      para2: 'The Phase-3 trial enrolled 420 patients across 18 countries with late-stage melanoma, lung, and bladder cancers. Participants who received the personalised vaccine alongside pembrolizumab showed an 89% reduction in tumour volume at 12 months.',
      para3: 'Regulatory submissions are expected in the US, EU, and UK by the end of 2026. If approved, BioNTech projects the vaccine could be available to patients within 18 months. Pricing and insurance coverage remain under negotiation.',
    },
  },
  {
    slug: 'europa-ocean',
    category: 'Science',
    categoryVariant: 'warning',
    title: 'NASA Confirms Liquid Water Ocean Beneath Europa\'s Ice Shell',
    subtitle: 'Data from the Clipper probe reveals a vast subsurface ocean with chemical signatures that scientists say are consistent with the conditions for life.',
    author: 'Marcus Webb',
    authorTitle: 'Science & Space Correspondent',
    authorBio: 'Marcus Webb covers planetary science, space exploration, and emerging physics. He has reported from NASA\'s Jet Propulsion Laboratory and ESA headquarters for the past eight years.',
    authorArticleCount: 634,
    authorFollowerCount: 29800,
    publishedAt: 'April 17, 2026 at 9:00 AM PST',
    updatedAt: 'April 17, 2026 at 3:00 PM PST',
    readTime: '10 min read',
    gradient: 'from-sky-700 via-blue-800 to-indigo-900',
    tags: ['NASA', 'Europa', 'Ocean', 'Astrobiology', 'Space'],
    body: {
      lead: 'PASADENA — NASA scientists confirmed Thursday that the Europa Clipper spacecraft has detected a vast liquid water ocean beneath the icy surface of Jupiter\'s moon Europa, with chemical conditions that may support life.',
      pullQuote: '"We are not saying we found life. We are saying we found the conditions that, on Earth, have always been associated with life."',
      pullQuoteAuthor: '— Dr. Robert Pappalardo, NASA Europa Clipper Project Scientist',
      para1: 'Magnetometer and radar data from 27 close flybys reveal an ocean estimated to be 100 to 170 kilometres deep — containing more than twice the liquid water of all Earth\'s oceans combined. The ocean sits beneath an ice shell 15 to 25 kilometres thick.',
      para2: 'Spectrometer readings detected hydrogen, oxygen, carbon dioxide, and sodium chloride in plumes venting through the ice, consistent with hydrothermal activity on the ocean floor. Scientists caution that confirming life would require a future lander mission.',
      para3: 'NASA has fast-tracked a follow-on mission proposal called Europa Lander, which would drill through the ice and deploy an autonomous submersible. A decision on funding is expected in the 2027 NASA budget cycle.',
    },
  },
];

export function getArticleBySlug(slug: string): ArticleData | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return ARTICLES.map((a) => a.slug);
}
