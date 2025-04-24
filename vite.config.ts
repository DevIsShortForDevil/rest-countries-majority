import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import VueRouter from 'unplugin-vue-router/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    VueRouter({
      extensions: ['.vue'],
      routesFolder: [
        {
          src: 'src/pages',
          path: '',
        },
      ],
    }),
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 1313,
  },
});
