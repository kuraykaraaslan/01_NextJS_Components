import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { ModelCard } from '@/modules/domains/ai/model/ModelCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faCubes,
  faBuilding,
  faComments,
  faSparkles,
} from '@fortawesome/free-solid-svg-icons';
import { MODELS, CHAT_SESSIONS } from './ai.data';

const STATS = [
  { label: 'Models',    value: '6',  icon: faCubes    },
  { label: 'Providers', value: '5',  icon: faBuilding },
  { label: 'Sessions',  value: '3',  icon: faComments },
];

export default function AIThemePage() {
  const featuredModels = MODELS.filter((m) => m.active).slice(0, 3);
  const recentSessions = CHAT_SESSIONS.slice(0, 3);

  return (
    <div className="bg-surface-base text-text-primary">
      <style>{`
        @keyframes ai-fade {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ai-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-14px); }
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_60%_-5%,_var(--primary-subtle),_transparent_70%)]" />
          <div className="absolute -top-20 right-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl motion-safe:animate-[ai-float_20s_ease-in-out_infinite]" />
          <div className="absolute top-40 -left-20 h-80 w-80 rounded-full bg-secondary/10 blur-3xl motion-safe:animate-[ai-float_28s_ease-in-out_infinite]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pt-16 pb-20">
          <div className="max-w-3xl mx-auto text-center space-y-6 motion-safe:animate-[ai-fade_0.8s_ease-out]">
            <Badge variant="primary" size="sm">
              <FontAwesomeIcon icon={faSparkles} className="w-3 h-3" aria-hidden="true" />
              6 models available now
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight tracking-tight">
              Explore the<br />
              <span className="text-primary">AI Model Universe</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
              Compare, benchmark, and interact with the best AI models from OpenAI, Anthropic, Google, and more — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <Button
                as="a"
                href="/theme/ai/models"
                variant="primary"
                size="lg"
                iconRight={<FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" aria-hidden="true" />}
              >
                Browse Models
              </Button>
              <Button
                as="a"
                href="/theme/ai/playground"
                variant="outline"
                size="lg"
              >
                Try Playground
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-y border-border bg-surface-raised">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="grid grid-cols-3 divide-x divide-border">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 px-4 text-center">
                <FontAwesomeIcon icon={stat.icon} className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="text-2xl font-bold text-text-primary">{stat.value}</span>
                <span className="text-xs text-text-secondary">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured models ── */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Featured Models</h2>
          <a
            href="/theme/ai/models"
            className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
          >
            View all <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredModels.map((model) => (
            <ModelCard
              key={model.modelId}
              model={model}
              href={`/theme/ai/models/${model.modelId}`}
            />
          ))}
        </div>
      </section>

      {/* ── Recent sessions ── */}
      <section className="bg-surface-raised border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary">Recent Chat Sessions</h2>
            <a
              href="/theme/ai/playground"
              className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
            >
              Open playground <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recentSessions.map((session) => (
              <a
                key={session.sessionId}
                href="/theme/ai/playground"
                className="block rounded-xl border border-border bg-surface-base p-4 hover:border-border-focus hover:shadow-sm transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                    {session.title ?? 'Untitled session'}
                  </h3>
                  <Badge variant="neutral" size="sm">{session.modelId}</Badge>
                </div>
                <p className="mt-2 text-xs text-text-secondary">
                  {session.createdAt ? new Date(session.createdAt).toLocaleDateString() : ''}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-2xl bg-primary px-8 py-10 text-center space-y-4">
          <h2 className="text-2xl font-bold text-primary-fg">Ready to build with AI?</h2>
          <p className="text-primary-fg/80 max-w-md mx-auto text-sm leading-relaxed">
            Get your API key in seconds and start integrating world-class AI models into your products.
          </p>
          <Button variant="secondary" size="lg">Get Started — It&apos;s Free</Button>
        </div>
      </section>
    </div>
  );
}
