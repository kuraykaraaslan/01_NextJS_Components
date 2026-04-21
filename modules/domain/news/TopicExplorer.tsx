'use client';
import { TabGroup } from '@/modules/ui/TabGroup';
import { Badge } from '@/modules/ui/Badge';
import { Card } from '@/modules/ui/Card';

const TOPICS = [
  {
    id: 'climate',
    label: 'Climate',
    count: 312,
    articles: [
      { title: 'Geneva Carbon Accord: Full Text Analysis', date: 'Apr 21', readTime: '12 min' },
      { title: 'Is Net Zero 2050 Still Achievable?', date: 'Apr 20', readTime: '9 min' },
      { title: 'Carbon Markets Hit Record Volume', date: 'Apr 19', readTime: '5 min' },
      { title: 'Saharan Solar Megaproject Breaks Ground', date: 'Apr 18', readTime: '6 min' },
    ],
  },
  {
    id: 'ai',
    label: 'AI & Tech',
    count: 287,
    articles: [
      { title: 'GPT-5 Benchmarks: What They Mean for Enterprise', date: 'Apr 21', readTime: '8 min' },
      { title: 'EU AI Act: Implementation Timeline', date: 'Apr 20', readTime: '7 min' },
      { title: 'Deepfake Detection Arms Race Intensifies', date: 'Apr 19', readTime: '6 min' },
      { title: 'Quantum Supremacy Achieved for Chemistry Simulations', date: 'Apr 18', readTime: '9 min' },
    ],
  },
  {
    id: 'economy',
    label: 'Economy',
    count: 241,
    articles: [
      { title: 'IMF Revises Global Growth to 3.4%', date: 'Apr 21', readTime: '5 min' },
      { title: 'Inflation Cools to 2-Year Low in US', date: 'Apr 20', readTime: '4 min' },
      { title: 'Emerging Market Debt Reaches Crisis Levels', date: 'Apr 19', readTime: '8 min' },
      { title: 'China Export Slowdown Sends Shockwaves', date: 'Apr 18', readTime: '6 min' },
    ],
  },
  {
    id: 'health',
    label: 'Health',
    count: 198,
    articles: [
      { title: 'New Alzheimer\'s Drug Shows Landmark Results', date: 'Apr 21', readTime: '7 min' },
      { title: 'WHO Approves First Dengue Vaccine for Tropical Regions', date: 'Apr 20', readTime: '5 min' },
      { title: 'Ultra-Processed Foods Linked to Early Death', date: 'Apr 19', readTime: '6 min' },
      { title: 'mRNA Cancer Vaccine Enters Phase 3 Trial', date: 'Apr 18', readTime: '8 min' },
    ],
  },
];

export function TopicExplorer({ className }: { className?: string }) {
  return (
    <div className={className}>
      <TabGroup
        label="Explore by topic"
        tabs={TOPICS.map((topic) => ({
          id: topic.id,
          label: topic.label,
          badge: <Badge variant="neutral" size="sm">{topic.count}</Badge>,
          content: (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-text-secondary">
                  <span className="font-semibold text-text-primary">{topic.count}</span> articles on {topic.label}
                </p>
                <Badge variant="info" size="sm">Updated today</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topic.articles.map((a, i) => (
                  <Card key={i} className="hover:shadow-sm transition-shadow cursor-pointer">
                    <div className="p-3 space-y-1.5">
                      <div className={`h-20 rounded-md bg-gradient-to-br flex items-center justify-center text-white/40 text-2xl font-bold ${
                        ['from-sky-400 to-blue-600', 'from-green-400 to-teal-600', 'from-violet-400 to-purple-600', 'from-orange-400 to-red-500'][i % 4]
                      }`}>
                        {i + 1}
                      </div>
                      <p className="text-sm font-semibold text-text-primary leading-snug">{a.title}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-text-disabled">{a.date}</span>
                        <span className="text-xs text-text-disabled">· {a.readTime}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ),
        }))}
      />
    </div>
  );
}
