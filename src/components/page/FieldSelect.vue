<template>
  <Listbox v-model="selectedValue">
    <div class="relative">
      <ListboxButton
        class="w-30 h-full p-2 text-dark-gray rounded-s-lg dark:text-light-gray hover:bg-gold-lighter hover:text-dark-gray flex justify-between items-center cursor-pointer transition-colors duration-300 ease-in-out"
      >
        <span>
          {{ t(`searchFields.${selectedValue}`) }}
        </span>
        <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gold py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="field in fields"
            :key="field.key"
            :value="field.value"
            as="template"
          >
            <li
              :class="`
                  relative text-dark-gray dark:text-light-gray transition-colors duration-200 ease-in-out cursor-pointer py-2 ${active ? 'bg-gold-lighter !text-dark-gray' : ''}
                `"
            >
              <div
                :class="`truncate w-full flex justify-center items-center ${selected ? 'font-medium' : 'font-normal'}`"
              >
                {{ t(`searchFields.${field.value}`) }}
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
import ChevronDownIcon from '@/assets/icons/ChevronDownIcon.vue';
import { Fields } from '@/types/enums';
import { stringEnumToArray } from '@/utils/enumToArray';

const { t } = useI18n();

const selectedValue = defineModel<Fields>({ required: true });

const fields = stringEnumToArray(Fields);
</script>
