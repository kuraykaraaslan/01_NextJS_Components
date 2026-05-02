import { ShowcaseShell } from '@/modules/showcase/ui/ShowcaseShell';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ShowcaseShell selectedId={slug} />;
}
