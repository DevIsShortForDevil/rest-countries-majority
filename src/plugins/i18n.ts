import { createI18n } from 'vue-i18n';
import type { AppPlugin } from '@/types/plugin';
// import { getUserLang } from '@/services/auth';
import messages from '@/locales/messages';

export const i18n = createI18n({
  legacy: false,
  // locale: getUserLang(),
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

export const install: AppPlugin = (context) => {
  context.app.use(i18n);
};
