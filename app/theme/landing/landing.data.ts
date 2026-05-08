import type {
  Hero,
  Feature,
  PricingPlan,
  Testimonial,
  FaqItem,
  Stat,
  TeamMember,
  PartnerLogo,
  HowItWorksStep,
} from '@/modules/domains/landing/types';

export const HERO: Hero = {
  eyebrow: 'Now in public beta — join 5,000+ teams',
  headline: 'Ship better products, faster.',
  subheadline:
    'Velox gives your team a single workspace for planning, building, and shipping — without the context switching.',
  primaryCta: { label: 'Start for free', href: '#pricing' },
  secondaryCta: { label: 'Watch demo', href: '#demo', external: false },
  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80',
};

export const FEATURES: Feature[] = [
  {
    featureId: 'f1',
    icon: 'bolt',
    title: 'Blazing fast deploys',
    description: 'Push to production in under 60 seconds with zero-downtime rolling releases.',
  },
  {
    featureId: 'f2',
    icon: 'shield-halved',
    title: 'SOC 2 compliant',
    description: 'Enterprise-grade security with end-to-end encryption and audit logs.',
  },
  {
    featureId: 'f3',
    icon: 'chart-line',
    title: 'Real-time analytics',
    description: 'Monitor performance, errors, and user behaviour from a single pane of glass.',
  },
  {
    featureId: 'f4',
    icon: 'code-branch',
    title: 'Git-native workflow',
    description: 'Connect any repo. Preview branches auto-deploy and expire on merge.',
  },
  {
    featureId: 'f5',
    icon: 'users',
    title: 'Team collaboration',
    description: 'Built-in review flows, comments, and approval gates — no extra tooling.',
  },
  {
    featureId: 'f6',
    icon: 'plug',
    title: '100+ integrations',
    description: 'Slack, GitHub, Jira, PagerDuty, and more — connect your stack in minutes.',
  },
];

export const PRICING_MONTHLY: PricingPlan[] = [
  {
    planId: 'starter-m',
    name: 'Starter',
    description: 'Perfect for indie hackers and small projects.',
    price: 0,
    currency: 'USD',
    interval: 'MONTHLY',
    features: ['1 project', '3 team members', '1 GB storage', 'Community support'],
    cta: { label: 'Get started free', href: '#' },
  },
  {
    planId: 'pro-m',
    name: 'Pro',
    description: 'For growing teams that need more power.',
    price: 29,
    currency: 'USD',
    interval: 'MONTHLY',
    features: [
      'Unlimited projects',
      '10 team members',
      '50 GB storage',
      'Priority support',
      'Custom domains',
      'Advanced analytics',
    ],
    isPopular: true,
    cta: { label: 'Start free trial', href: '#' },
  },
  {
    planId: 'scale-m',
    name: 'Scale',
    description: 'For larger teams with advanced needs.',
    price: 99,
    currency: 'USD',
    interval: 'MONTHLY',
    features: [
      'Unlimited projects',
      'Unlimited members',
      '500 GB storage',
      'Dedicated support',
      'SSO & SAML',
      'SLA guarantee',
    ],
    cta: { label: 'Talk to sales', href: '#' },
  },
];

export const PRICING_YEARLY: PricingPlan[] = PRICING_MONTHLY.map((plan) => ({
  ...plan,
  planId: plan.planId.replace('-m', '-y'),
  price: Math.floor(plan.price * 0.8),
  interval: 'YEARLY' as const,
  cta: plan.cta
    ? { ...plan.cta, label: plan.price === 0 ? plan.cta.label : plan.cta.label }
    : undefined,
}));

export const ALL_PLANS: PricingPlan[] = [...PRICING_MONTHLY, ...PRICING_YEARLY];

export const TESTIMONIALS: Testimonial[] = [
  {
    testimonialId: 't1',
    quote:
      'Velox cut our deployment pipeline from 20 minutes to under 60 seconds. The team adopted it the same afternoon.',
    authorName: 'Sarah Chen',
    authorTitle: 'CTO',
    companyName: 'Luminary Labs',
    rating: 5,
  },
  {
    testimonialId: 't2',
    quote:
      "We evaluated six platforms. Velox was the only one that didn't require us to rewrite our CI config from scratch.",
    authorName: 'Marcus Webb',
    authorTitle: 'Lead Engineer',
    companyName: 'Stackable',
    rating: 5,
  },
  {
    testimonialId: 't3',
    quote:
      'The branch preview feature alone saves us three back-and-forth review cycles per sprint.',
    authorName: 'Priya Kapoor',
    authorTitle: 'Head of Product',
    companyName: 'Nodo',
    rating: 5,
  },
  {
    testimonialId: 't4',
    quote:
      "Analytics are finally in one place. I stopped stitching Grafana dashboards together at 2 AM.",
    authorName: 'Tom Alvarez',
    authorTitle: 'Founding Engineer',
    companyName: 'Warpgate',
    rating: 4,
  },
  {
    testimonialId: 't5',
    quote:
      'SOC 2 compliance was a blocker for our enterprise sales. Velox resolved that in a week.',
    authorName: 'Amira Hassan',
    authorTitle: 'VP Engineering',
    companyName: 'ClearBridge',
    rating: 5,
  },
  {
    testimonialId: 't6',
    quote:
      'Finally a tool my non-technical co-founder can use to check deploy status without pinging me.',
    authorName: 'Jake Nordström',
    authorTitle: 'Founder',
    companyName: 'Feather',
    rating: 5,
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    faqId: 'q1',
    question: 'How does the free trial work?',
    answer:
      'You get 14 days of the Pro plan with no credit card required. At the end of your trial you can downgrade to Starter (free forever) or pick a paid plan.',
  },
  {
    faqId: 'q2',
    question: 'Can I change my plan at any time?',
    answer:
      'Yes. Upgrades take effect immediately and are prorated. Downgrades apply at the start of your next billing cycle.',
  },
  {
    faqId: 'q3',
    question: 'Which git providers do you support?',
    answer:
      'GitHub, GitLab, and Bitbucket. We also support self-hosted GitLab instances on the Scale plan.',
  },
  {
    faqId: 'q4',
    question: 'Is there a limit on build minutes?',
    answer:
      'Starter includes 500 minutes/month, Pro includes 5 000 minutes/month, and Scale is unlimited. Additional minutes are billed at $0.008 per minute.',
  },
  {
    faqId: 'q5',
    question: 'Where is my data stored?',
    answer:
      'All data is stored in the EU (Frankfurt) by default. US East and AP Singapore regions are available on Scale.',
  },
  {
    faqId: 'q6',
    question: 'Do you offer discounts for startups or non-profits?',
    answer:
      'Yes — email us at hello@velox.dev with a brief description of your organisation and we will set you up.',
  },
];

export const STATS: Stat[] = [
  { statId: 's1', value: '5 000+', label: 'Teams shipped', description: 'Across 90 countries' },
  { statId: 's2', value: '99.98%', label: 'Uptime SLA', description: 'Over the last 12 months' },
  { statId: 's3', value: '<60s', label: 'Avg. deploy time', description: 'p95 across all regions' },
  { statId: 's4', value: '4.9 / 5', label: 'Customer rating', description: 'Based on 800+ reviews' },
];

export const TEAM: TeamMember[] = [
  {
    memberId: 'm1',
    name: 'Elena Markov',
    role: 'CEO & Co-founder',
    bio: 'Ex-Vercel, ex-Stripe. Obsessed with developer experience.',
    socialLinks: [
      { platform: 'twitter', url: 'https://x.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
  },
  {
    memberId: 'm2',
    name: 'David Park',
    role: 'CTO & Co-founder',
    bio: 'Infrastructure nerd. Previously built deploy pipelines at Shopify.',
    socialLinks: [
      { platform: 'github', url: 'https://github.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
  },
  {
    memberId: 'm3',
    name: 'Fatima Al-Rashid',
    role: 'Head of Design',
    bio: 'Design systems and accessibility advocate. Formerly at Linear.',
    socialLinks: [
      { platform: 'twitter', url: 'https://x.com' },
    ],
  },
  {
    memberId: 'm4',
    name: 'Lucas Brandt',
    role: 'Head of Growth',
    bio: 'PLG specialist. Helped two developer tools reach $10M ARR.',
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
  },
];

export const PARTNERS: PartnerLogo[] = [
  { partnerId: 'p1', name: 'GitHub', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg' },
  { partnerId: 'p2', name: 'Vercel', logo: 'https://assets.vercel.com/image/upload/front/favicon/vercel/57x57.png' },
  { partnerId: 'p3', name: 'Stripe', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' },
  { partnerId: 'p4', name: 'Cloudflare', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg' },
  { partnerId: 'p5', name: 'Datadog', logo: 'https://imgix.datadoghq.com/img/about/presskit/logo-v/dd_vertical_purple.png' },
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    stepId: 'h1',
    order: 1,
    icon: 'plug',
    title: 'Connect your repo',
    description: 'Link GitHub, GitLab, or Bitbucket in under 30 seconds. No YAML required.',
  },
  {
    stepId: 'h2',
    order: 2,
    icon: 'wand-magic-sparkles',
    title: 'Auto-detect your stack',
    description: 'Velox reads your repo and configures the right build pipeline automatically.',
  },
  {
    stepId: 'h3',
    order: 3,
    icon: 'rocket',
    title: 'Ship on every push',
    description: 'Every branch gets a preview URL. Merge to main and go live instantly.',
  },
];
