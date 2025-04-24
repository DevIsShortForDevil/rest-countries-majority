<template>
  <Listbox :model-value="locale" @update:model-value="onLocaleChange">
    <div class="relative">
      <ListboxButton
        class="h-9 p-2 bg-dark-gray text-light-gray rounded-lg dark:bg-light-gray dark:text-dark-gray flex items-center gap-2 transition-colors duration-300 ease-in-out"
      >
        <LanguageIcon />
        <span class="text-light-gray dark:text-dark-gray">{{ locale.toUpperCase() }}</span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-dark-gray dark:bg-light-gray py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="localeOp in availableLocales"
            :key="localeOp"
            :value="localeOp"
            as="template"
          >
            <li
              :class="`
                relative text-light-gray dark:text-dark-gray transition-colors duration-200 ease-in-out cursor-pointer py-2 ${active ? 'bg-gold-light !text-dark-gray' : ''}
              `"
            >
              <div
                :class="`truncate w-full flex justify-center items-center ${selected ? 'font-medium' : 'font-normal'}`"
              >
                {{ localeOp.toUpperCase() }}
              </div>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import LanguageIcon from '@/assets/icons/LanguageIcon.vue';
import { ArrayElement } from '@/types/interfaces';

const { locale, availableLocales } = useI18n();

const onLocaleChange = (val: ArrayElement<typeof availableLocales>) => {
  console.log('locale change val: ', val);
  locale.value = val;
};
</script>
