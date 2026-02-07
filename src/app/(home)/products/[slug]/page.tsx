import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import { ChevronRight, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Article, BreadcrumbList, WithContext } from 'schema-dts';
import { JsonLd } from '@/components/json-ld';
import { productSource } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';

export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = productSource.getPage([params.slug]);
  if (!page) notFound();

  const MDX = page.data.body;

  const jsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.data.title,
    description: page.data.description,
    image: page.data.cover
      ? `https://stellarstudios.xyz${page.data.cover}`
      : 'https://stellarstudios.xyz/logo.png',
    publisher: {
      '@type': 'Organization',
      name: 'StellarStudios',
      logo: {
        '@type': 'ImageObject',
        url: 'https://stellarstudios.xyz/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://stellarstudios.xyz${page.url}`,
    },
  };

  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://stellarstudios.xyz',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: 'https://stellarstudios.xyz/products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.data.title,
        item: `https://stellarstudios.xyz${page.url}`,
      },
    ],
  };

  return (
    <article className="container mx-auto px-4 py-12 max-w-7xl">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/products" className="hover:text-foreground">
          Products
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground truncate">{page.data.title}</span>
      </nav>

      {page.data.cover && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-10">
          <Image
            src={page.data.cover}
            alt={page.data.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
        <div>
          {page.data.toc && page.data.toc.length > 0 && (
            <div className="mb-8">
              <InlineTOC items={page.data.toc} />
            </div>
          )}

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <MDX components={getMDXComponents()} />
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit space-y-6">
          {page.data.providers && page.data.providers.length > 0 && (
            <div className="rounded-xl border bg-card p-6">
              <h1 className="text-2xl font-bold mb-4">{page.data.title}</h1>

              {page.data.description && (
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
                  {page.data.description}
                </p>
              )}

              <div className="space-y-3">
                {page.data.providers.map((provider) => (
                  <a
                    key={provider.name}
                    href={provider.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted transition"
                  >
                    <div>
                      <div className="font-medium">
                        Get it from {provider.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {provider.currency} {provider.price}
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {page.data.guide && (
            <Link
              href={page.data.guide}
              className="block text-center rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90 transition"
            >
              View Installation Guide →
            </Link>
          )}

          <a
            href="https://discord.gg/sQjuWcDxBY"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center rounded-xl border px-6 py-3 font-medium hover:bg-muted transition"
          >
            Get Support on Discord
          </a>
        </aside>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  return productSource.generateParams().map((params) => ({
    slug: params.slug?.[0] ?? '',
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = productSource.getPage([params.slug]);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      images: page.data.cover,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: page.data.cover,
    },
  };
}
