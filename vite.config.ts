import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Приложение Курьера',
        short_name: 'Курьер',
        description: 'Приложение для курьеров доставки',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/courier-app/',
        scope: '/courier-app/',
        icons: [
          {
            src: 'icon55.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon55.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: '/courier-app/',
})
