'use client';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';

type VideoRec = {
  id: string;
  title: string;
  genre: string;
  rating: string;
  emoji: string;
};

const RECS: VideoRec[] = [
  { id: 'r1', title: 'State of AI 2026', genre: 'Technology', rating: '9.2', emoji: '🤖' },
  { id: 'r2', title: 'Design Systems Deep Dive', genre: 'Design', rating: '8.8', emoji: '🎨' },
  { id: 'r3', title: 'Rust for Web Developers', genre: 'Programming', rating: '9.0', emoji: '🦀' },
  { id: 'r4', title: 'The Startup Playbook', genre: 'Business', rating: '8.5', emoji: '🚀' },
];

export function RecommendationCarousel() {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-text-primary">You Might Also Like</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {RECS.map((r) => (
          <Card key={r.id}>
            <div className="p-3 space-y-2">
              <div className="h-20 bg-surface-sunken rounded-lg flex items-center justify-center text-3xl">
                {r.emoji}
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-text-primary line-clamp-2">{r.title}</p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="primary" size="sm">{r.genre}</Badge>
                  <Badge variant="success" size="sm">⭐ {r.rating}</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" fullWidth>Watch</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
