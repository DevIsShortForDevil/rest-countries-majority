<template>
  <div
    id="app-countainer"
    class="flex flex-col w-screen h-screen bg-light-gray dark:bg-dark-gray transition-colors duration-300 ease-in-out"
  >
    <header
      class="flex justify-between items-center h-header-height md:h-header-height-md py-4 px-6 md:px-12"
    >
      <div class="flex items-center cursor-pointer" @click="router.push('/')">
        <LogoIcon />
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
      class="flex w-full overflow-auto h-main-height md:h-main-height-md [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
    >
      <div class="w-full h-full px-6 md:px-12">
        <!-- <RouterView /> -->
        <router-view v-slot="{ Component, route }">
          <transition name="slide-right">
            <component :is="Component" :key="route.fullPath" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import { useLayoutStore } from '@/stores/layout';
import MoonIcon from '@/assets/icons/MoonIcon.vue';
import SunIcon from '@/assets/icons/SunIcon.vue';
import LocaleSelect from '@/components/layout/LocaleSelect.vue';
import LogoIcon from '@/assets/icons/LogoIcon.vue';

const layoutStore = useLayoutStore();
const router = useRouter();
</script>
