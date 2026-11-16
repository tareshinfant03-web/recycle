import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['recy-link-icon.svg'],
      manifest: {
        name: 'RecyLink',
        short_name: 'RecyLink',
        description: 'Kabadiwala Connect for scrap collectors and recyclers',
        theme_color: '#1f7a45',
        background_color: '#f4fbf5',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/recy-link-icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
});
