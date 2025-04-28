import type { ArrayElement } from '@/types/interfaces';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

type Theme = 'dark' | 'light' | 'auto';

export const useLayoutStore = defineStore('layout', () => {
  const theme = ref<Theme>('auto');
  const checkTheme = () => {
    // Checks for darkMode and returns a boolean value
    return (
      localStorage.getItem('theme') === 'dark' ||
      (localStorage.getItem('theme') === null &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  };

  const setTheme = (val: Theme, setInStorage: boolean = true) => {
    if (setInStorage) localStorage.setItem('theme', val);
    const container = document.getElementById('app');
    container?.setAttribute('data-theme', val);
    theme.value = val;
  };

  const darkMode = () => {
    return theme.value === 'dark';
  };

  const { locale, availableLocales } = useI18n();
  const setLocale = (l: ArrayElement<typeof availableLocales>, setInStorage: boolean = true) => {
    locale.value = l;
    if (setInStorage) localStorage.setItem('locale', l);
  };

  const init = () => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) setTheme(storedTheme);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark', false);
    // The goal is to only set the theme value in localStorage if the user has set the value manually
    // If not the value follows the system settings and only uses that as a reference
    const storedLocale = localStorage.getItem('locale');
    if (storedLocale) locale.value = storedLocale;
  };

  init(); // Called at load time to keep the theme values between the parent element (mainly for tw usage) and storage in sync

  return { theme, checkTheme, setTheme, darkMode, setLocale, init };
});
