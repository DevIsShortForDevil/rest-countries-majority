<template>
  <div
    id="app-countainer"
    class="flex flex-col w-screen h-screen bg-light-gray dark:bg-dark-gray transition-colors duration-300 ease-in-out"
  >
    <header class="flex justify-between items-center h-14 md:h-18 py-4 px-6 md:px-12">
      <div class="flex items-center">
        <img src="@/assets/images/logo_slim.png" alt="" srcset="" class="h-16" />
        <!-- <img src="@/assets/images/logo_name.png" alt="" srcset="" class="h-12" /> -->
      </div>
      <div class="flex gap-2 items-center">
        <button
          class="w-9 h-9 p-2 bg-dark-gray text-light-gray rounded-lg dark:bg-light-gray dark:text-dark-gray relative flex justify-center items-center cursor-pointer transition-colors duration-300 ease-in-out"
          @click="layoutStore.setTheme(layoutStore.darkMode() ? 'light' : 'dark')"
        >
          <SunIcon
            id="sunIcon"
            :class="`absolute transition-transform duration-500 ${layoutStore.darkMode() ? 'scale-100 rotate-0' : 'scale-0 rotate-90'}`"
          />
          <MoonIcon
            id="moonIcon"
            :class="`absolute transition-transform duration-500 ${layoutStore.darkMode() ? 'scale-0 rotate-90' : 'scale-100 rotate-0'}`"
          />
        </button>
        <LocaleSelect />
      </div>
    </header>
    <main
      class="flex w-full grow overflow-y-auto [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
    >
      <div class="w-full px-6 md:px-12">
        <RouterView />
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { RouterView } from 'vue-router';
import { useLayoutStore } from '@/stores/layout';
import MoonIcon from '@/assets/icons/MoonIcon.vue';
import SunIcon from '@/assets/icons/SunIcon.vue';
import LocaleSelect from '@/components/layout/LocaleSelect.vue';

const { t } = useI18n();
const layoutStore = useLayoutStore();
</script>
