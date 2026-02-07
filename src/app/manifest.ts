import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'StellarStudios',
    short_name: 'StellarStudios',
    description:
      'We make websites, themes and extensions for Blueprint, Pterodactyl and Paymenter!',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#7040ff',
    icons: [
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
