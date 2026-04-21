import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllSlugs } from '../articles.data';
import { ArticleDetailView } from '../ArticleDetailView';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: 'Not Found — NewsHub' };
  return {
    title: `${article.title} — NewsHub`,
    description: article.subtitle,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  return <ArticleDetailView article={article} />;
}
