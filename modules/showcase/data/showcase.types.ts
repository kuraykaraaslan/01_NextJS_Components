export type ShowcaseVariant = {
  title: string;
  preview: React.ReactNode;
  code: string;
  layout?: 'side' | 'stack';
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
};
