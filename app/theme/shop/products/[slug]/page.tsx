import { notFound } from 'next/navigation';
import { PRODUCTS, getProductBySlug } from '../../shop.data';
import { ProductDetailView } from './ProductDetailView';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = PRODUCTS
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailView product={product} relatedProducts={related} />;
}
