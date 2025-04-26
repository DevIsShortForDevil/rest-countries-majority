<template>
  <div class="w-full flex flex-col justify-center">
    <div class="w-full h-14 flex justify-center items-center">
      <div class="flex h-full rounded-lg divide-x divide-gold border border-gold">
        <FieldSelect v-model="field" />
        <SearchInput v-model="selectedCountry" v-model:countries="countries" :field="field" />
        <button class="bg-gold w-30 h-full rounded-e-lg cursor-pointer">{{ t('search') }}</button>
      </div>
    </div>
    <div class="w-full flex justify-center items-center mt-8">
      <WorldMap />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Country } from '@/types/interfaces';
import { Fields } from '@/types/enums';
import FieldSelect from '@/components/page/FieldSelect.vue';
import SearchInput from '@/components/page/SearchInput.vue';
import WorldMap from '@/components/page/WorldMap.vue';

const { t } = useI18n();

const field = ref<Fields>(Fields.name);
const selectedCountry = ref<Country | null>(null);
const countries = ref<Country[]>([]);
</script>
