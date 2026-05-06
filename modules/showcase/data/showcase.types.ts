export type ComponentStatus = 'stable' | 'beta' | 'deprecated';

export type ShowcaseVariant = {
  title: string;
  preview: React.ReactNode;
  code: string;
  layout?: 'side' | 'stack';
};

export type ControlDef =
  | { key: string; label: string; type: 'select'; options: readonly string[]; default: string }
  | { key: string; label: string; type: 'boolean'; default: boolean }
  | { key: string; label: string; type: 'text'; default: string }
  | { key: string; label: string; type: 'number'; min?: number; max?: number; step?: number; default: number };

export type PlaygroundDef = {
  controls: ControlDef[];
  render: (props: Record<string, unknown>) => React.ReactNode;
  generateCode?: (props: Record<string, unknown>) => string;
};

export type ShowcaseComponent = {
  id: string;
  title: string;
  category: 'Atom' | 'Molecule' | 'Organism' | 'App' | 'Domain';
  abbr: string;
  description: string;
  filePath: string;
  sourceCode: string;
  variants: ShowcaseVariant[];
  status?: ComponentStatus;
  since?: string;
  playground?: PlaygroundDef;
};
