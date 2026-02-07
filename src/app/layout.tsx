import '@/global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata, Viewport } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { Organization, WithContext } from 'schema-dts';
import { Toaster } from 'sonner';
import { JsonLd } from '@/components/json-ld';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL('https://stellarstudios.xyz'),
  title: {
    default: 'StellarStudios',
    template: '%s - StellarStudios',
  },
  description:
    'We make websites, themes and extensions for Blueprint, Pterodactyl and Paymenter!',
  applicationName: 'StellarStudios',
  icons: {
    icon: '/favicon.ico',
  },
  generator: 'Next.js',
  appleWebApp: {
    title: 'StellarStudios',
  },
  other: {
    'msapplication-TileColor': '#7040ff',
  },
  twitter: {
    site: 'https://stellarstudios.xyz',
    card: 'summary',
    images: '/logo.png',
  },
  openGraph: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    url: './',
    siteName: 'StellarStudios',
    locale: 'en_US',
    type: 'website',
    images: '/logo.png',
  },
  alternates: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    canonical: './',
    types: {
      'application/rss+xml': [
        {
          title: 'StellarStudios Blog Feed',
          url: '/blog/feed.xml',
        },
      ],
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#7040ff',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'StellarStudios',
    url: 'https://stellarstudios.xyz',
    logo: 'https://stellarstudios.xyz/logo.png',
    description:
      'We make websites, themes and extensions for Blueprint, Pterodactyl and Paymenter!',
    sameAs: [
      'https://github.com/StellarStudiosXYZ',
      'https://discord.gg/sQjuWcDxBY',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Technical Support',
      url: 'https://discord.gg/sQjuWcDxBY',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          'flex size-full min-h-svh flex-col antialiased',
        )}
        suppressHydrationWarning
      >
        <NuqsAdapter>
          <RootProvider>
            <JsonLd data={organizationJsonLd} />
            {children}
            <Toaster richColors />
          </RootProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
