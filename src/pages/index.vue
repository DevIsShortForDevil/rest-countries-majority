<template>
  <div class="w-full h-full flex flex-col justify-center">
    <div
      class="w-full h-searchbar-height md:h-searchbar-height-md flex justify-center items-center"
    >
      <div class="w-full md:w-auto flex h-full rounded-lg divide-x divide-gold border border-gold">
        <!-- Field select to be able to search based on country name, region or language -->
        <FieldSelect v-model="field" />
        <!-- The main search component to call the search APIs and display the results  -->
        <!-- Various values are defined as models to be accessible here -->
        <SearchInput
          v-model="selectedCountry"
          v-model:countries="countries"
          v-model:query="query"
          v-model:loading="loading"
          :field="field"
        />
        <button
          class="bg-gold w-1/6 md:w-30 h-full rounded-e-lg cursor-pointer text-xs sm:text-sm md:text-base"
        >
          {{ t('search') }}
        </button>
      </div>
    </div>
    <div
      class="w-full h-worldmap-height md:h-worldmap-height-md flex justify-center items-center pt-8"
    >
      <WorldMap
        :countries="!loading && query.length ? countries : null"
        @click="goToCountryDetails"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Country } from '@/types/interfaces';
import { Fields } from '@/types/enums';
import FieldSelect from '@/components/page/FieldSelect.vue';
import SearchInput from '@/components/page/SearchInput.vue';
import WorldMap from '@/components/page/WorldMap.vue';

const { t } = useI18n();
const router = useRouter();

const field = ref<Fields>(Fields.name);
const selectedCountry = ref<Country | null>(null);
const countries = ref<Country[]>([]);
const query = ref('');
const loading = ref(false);

watch(selectedCountry, (val) => {
  if (val) goToCountryDetails(val.cca2);
});

const goToCountryDetails = (id: string) => {
  router.push(`/${id}`);
};
</script>
