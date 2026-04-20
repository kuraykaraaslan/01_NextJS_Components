type Category = 'Atom' | 'Molecule' | 'Organism';

const categoryStyles: Record<Category, string> = {
  Atom:     'bg-info-subtle text-info-fg',
  Molecule: 'bg-primary-subtle text-primary',
  Organism: 'bg-success-subtle text-success-fg',
};

export function ShowcaseSection({
  title,
  category,
  description,
  preview,
  code,
}: {
  title: string;
  category: Category;
  description: string;
  preview: React.ReactNode;
  code: string;
}) {
  return (
    <section className="border border-border rounded-xl overflow-hidden bg-surface-base">
      <div className="px-6 py-5 bg-surface-raised border-b border-border">
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${categoryStyles[category]}`}>
            {category}
          </span>
        </div>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>

      <div className="px-6 py-6 border-b border-border">
        <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-4">Preview</p>
        <div className="flex flex-wrap gap-3 items-center">
          {preview}
        </div>
      </div>

      <div className="bg-surface-sunken">
        <p className="px-6 py-3 text-xs font-medium text-text-secondary uppercase tracking-wider border-b border-border">
          Code
        </p>
        <pre className="px-6 py-5 overflow-x-auto text-sm font-mono text-text-primary leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </section>
  );
}
