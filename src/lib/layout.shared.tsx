import { SiDiscord } from '@icons-pack/react-simple-icons';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image
          src="/logo.png"
          width={32}
          height={32}
          alt="StellarStudios Logo"
        />
        <span className="font-medium">StellarStudios</span>
      </>
    ),
    transparentMode: 'top',
  },

  links: [
    {
      type: 'icon',
      label: 'Discord',
      icon: <SiDiscord />,
      text: 'Discord',
      url: 'https://discord.gg/sQjuWcDxBY',
    },
  ],

  githubUrl: 'https://github.com/StellarStudiosXYZ/',
};
