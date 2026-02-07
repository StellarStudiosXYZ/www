import { Clock } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { CollectionPage, WithContext } from 'schema-dts';
import { JsonLd } from '@/components/json-ld';
import { guideSource } from '@/lib/source';

function getReadingTime(structuredData: {
  contents: { content: string }[];
}): number {
  const text = structuredData.contents.map((c) => c.content).join(' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export const metadata: Metadata = {
  title: 'Guide',
  description:
    'Step-by-step guides for installing products from StellarStudios.',
};

export default function GuideIndex() {
  const posts = guideSource.getPages().sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
    const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
    return dateB - dateA;
  });

  const jsonLd: WithContext<CollectionPage> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'StellarStudios Guides',
    description:
      'Step-by-step guides for installing products from StellarStudios.',
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
      author: post.data.author
        ? {
            '@type': 'Person',
            name: post.data.author,
          }
        : undefined,
    })),
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      <JsonLd data={jsonLd} />
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">Guide</h1>
        <p className="text-xl text-muted-foreground">
          Step-by-step guides for installing products from StellarStudios.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="group flex flex-col overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
          >
            {post.data.cover && (
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <Image
                  src={post.data.cover}
                  alt={post.data.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.data.title}
                </h2>
                {post.data.description && (
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.data.description}
                  </p>
                )}
                {post.data.tags && post.data.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.data.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t">
                {post.data.author && <span>{post.data.author}</span>}
                {post.data.date && (
                  <time dateTime={new Date(post.data.date).toISOString()}>
                    {new Date(post.data.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                )}
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {getReadingTime(post.data.structuredData)} min read
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
