import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { CollectionPage, WithContext } from 'schema-dts';
import { JsonLd } from '@/components/json-ld';
import { productSource } from '@/lib/source';

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(price);
}

function getCheapestProvider(
  providers?: {
    price: number;
    currency: string;
  }[],
) {
  if (!providers || providers.length === 0) return null;

  return providers.reduce((min, p) => (p.price < min.price ? p : min));
}

export const metadata: Metadata = {
  title: 'Guide',
  description:
    'Step-by-step guides for installing products from StellarStudios.',
};

export default function GuideIndex() {
  const posts = productSource.getPages().sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
    const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
    return dateB - dateA;
  });

  const jsonLd: WithContext<CollectionPage> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'StellarStudios Products',
    description: 'Browse our products.',
    url: 'https://stellarstudios.xyz/guide',
    publisher: {
      '@type': 'Organization',
      name: 'StellarStudios',
      logo: {
        '@type': 'ImageObject',
        url: 'https://stellarstudios.xyz/logo.png',
      },
    },
    mainEntity: posts.map((post) => ({
      '@type': 'Article',
      headline: post.data.title,
      description: post.data.description,
      url: `https://stellarstudios.xyz${post.url}`,
    })),
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <JsonLd data={jsonLd} />

      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">Products</h1>
        <p className="text-xl text-muted-foreground">Browse our products.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const cheapest = getCheapestProvider(post.data.providers);

          return (
            <Link
              key={post.url}
              href={post.url}
              className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg"
            >
              {post.data.cover && (
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image
                    src={post.data.cover}
                    alt={post.data.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />

                  {cheapest && (
                    <div className="absolute bottom-3 right-3 rounded-full px-3 py-1 text-sm font-semibold backdrop-blur-md  bg-white/70 dark:bg-black/40 text-foreground border border-white/40 dark:border-white/10 shadow-sm">
                      {formatPrice(cheapest.price, cheapest.currency)}
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-1 group-hover:text-primary transition-colors">
                    {post.data.title}
                  </h2>

                  {post.data.description && (
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.data.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
