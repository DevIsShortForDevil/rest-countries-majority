import { createRouter, createWebHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';
import type { AppPlugin } from '@/types/plugin';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export const install: AppPlugin = (context) => {
  context.app.use(router);
};
