import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        {
          type: 'main',
          text: 'Blog',
          url: '/blog',
        },
        {
          type: 'main',
          text: 'Documentation',
          url: '/docs',
        },
        {
          type: 'main',
          text: 'Guide',
          url: '/guide',
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
