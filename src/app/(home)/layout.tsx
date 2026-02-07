import { baseOptions } from '@/lib/layout.shared';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      links={[
        {
          type: 'main',
          text: 'Documentation',
          url: '/docs',
        },
        {
          type: 'main',
          text: 'Blog',
          url: '/blog',
        },
        {
          type: 'main',
          text: 'Guide',
          url: '/guide',
        },
        {
          type: 'main',
          text: 'Products',
          url: '/products',
        },
        ...(baseOptions.links || []),
      ]}
    >
      {children}
    </HomeLayout>
  );
}
