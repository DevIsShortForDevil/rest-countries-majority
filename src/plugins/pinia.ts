import { createPinia } from 'pinia';

import type { AppPlugin } from '@/types/plugin';

export const install: AppPlugin = (context) => {
  const store = createPinia();
  context.app.use(store);
};
