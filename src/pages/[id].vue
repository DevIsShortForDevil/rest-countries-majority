<template>
  <div class="w-full h-full flex justify-center items-center">
    <LoadingIcon v-if="loading" :loading="true" />
    <div v-else-if="country" class="w-full h-full flex flex-col pt-4 divide-y divide-gold">
      <div class="w-full flex flex-col-reverse sm:flex-row-reverse sm:justify-between items-center">
        <button
          class="bg-gold py-3 px-6 rounded-lg cursor-pointer text-xs sm:text-sm md:text-base mb-6 sm:mb-0"
          @click="router.push('/')"
        >
          {{ t('back') }}
        </button>
        <div class="w-full flex flex-col sm:flex-row items-center gap-8 sm:gap-12 p-10">
          <div class="w-50 h-28 md:max-w-1/2 flex justify-center items-center">
            <img
              :src="country.flags.svg"
              :alt="`${country.name.common}'s flag'`"
              class="h-full w-auto shadow-lg"
            />
          </div>

          <div
            class="text-dark-gray dark:text-light-gray text-2xl md:text-4xl text-bold font-serif text-wrap transition-colors duration-300 ease-in-out"
          >
            {{ country.name.common }} ({{ country.cca2 }})
          </div>
        </div>
      </div>

      <div
        class="w-full grid grid-flow-col grid-cols-1 md:grid-cols-2 grid-rows-10 md:grid-rows-5 p-10 gap-6 text-dark-gray dark:text-light-gray transition-colors duration-300 ease-in-out"
      >
        <div class="h-12 flex items-center gap-2 truncate">
          <div class="w-1/4">{{ t('region') }}:</div>
          <div class="w-3/4 truncate">{{ country.region }}</div>
        </div>
        <div class="h-12 flex items-center gap-2 truncate">
          <div class="w-1/4">{{ t('capital') }}:</div>
          <div class="w-3/4 truncate">{{ country.capital[0] }}</div>
        </div>
        <div class="h-12 flex items-center gap-2 truncate">
          <div class="w-1/4">{{ t('languages') }}:</div>
          <div class="w-3/4 truncate">
            {{
              Object.values(country.languages).reduce(
                (a, b, i, arr) => a + b + (i === arr.length - 1 ? '' : ', '),
                ''
              )
            }}
          </div>
        </div>
        <div class="h-12 flex items-center gap-2 truncate">
          <div class="w-1/4">{{ t('population') }}:</div>
          <div class="w-3/4 truncate">{{ country.population }}</div>
        </div>
        <div class="h-12 flex items-center gap-2 truncate">
          <div class="w-1/4">{{ t('area') }}:</div>
          <div class="w-3/4 truncate">{{ country.area }} KM<sup>2</sup></div>
        </div>
        <div class="h-12 flex items-center gap-2 truncate">
          <div class="w-1/4">{{ t('timezones') }}:</div>
          <div class="w-3/4 truncate">
            {{
              country.timezones.reduce(
                (a, b, i, arr) => a + b + (i === arr.length - 1 ? '' : ', '),
                ''
              )
            }}
          </div>
        </div>
        <div class="h-12 flex items-center gap-2 truncate">
          <div class="w-1/4">{{ t('currencies') }}:</div>
          <div class="w-3/4 truncate">
            {{
              Object.values(country.currencies).reduce(
                (a, b, i, arr) =>
                  a + `${b.name} (${b.symbol})` + (i === arr.length - 1 ? '' : ', '),
                ''
              )
            }}
          </div>
        </div>
        <div class="h-12 flex items-center gap-2 truncate">
          <div class="w-1/4">{{ t('idd') }}:</div>
          <div class="w-3/4 truncate">
            {{
              country.idd.suffixes.reduce(
                (a, b, i, arr) => a + country?.idd.root + b + (i === arr.length - 1 ? '' : ', '),
                ''
              )
            }}
          </div>
        </div>
        <div class="h-12 flex items-center gap-2 truncate">
          <div class="w-1/4">{{ t('independent') }}:</div>
          <div class="w-3/4 truncate">{{ t(country.independant ? 'yes' : 'no') }}</div>
        </div>
        <div class="h-12 flex items-center gap-2 truncate">
          <div class="w-1/4">{{ t('unmember') }}:</div>
          <div class="w-3/4 truncate">{{ t(country.unmember ? 'yes' : 'no') }}</div>
        </div>
      </div>
    </div>
    <div v-else-if="notFound" class="flex flex-col items-center gap-8">
      <div
        class="text-dark-gray dark:text-light-gray text-2xl sm:text-4xl font-serif transition-colors duration-300 ease-in-out"
      >
        {{ t('notFound') }}
      </div>
      <button
        class="bg-gold py-3 px-6 rounded-lg cursor-pointer text-xs sm:text-sm md:text-base mb-6 sm:mb-0"
        @click="router.push('/')"
      >
        {{ t('back') }}
      </button>
    </div>

    <div v-else class="flex flex-col items-center gap-8">
      <div
        class="text-dark-gray dark:text-light-gray text-2xl sm:text-4xl font-serif transition-colors duration-300 ease-in-out"
      >
        {{ t('loadError') }}
      </div>
      <div class="flex items-center gap-8">
        <button
          class="bg-dark-gray text-light-gray dark:bg-light-gray dark:text-dark-gray py-3 px-6 rounded-lg cursor-pointer text-xs sm:text-sm md:text-base transition-colors duration-300 ease-in-out"
          @click="router.push('/')"
        >
          {{ t('back') }}
        </button>
        <button
          class="bg-gold py-3 px-6 rounded-lg cursor-pointer text-xs sm:text-sm md:text-base"
          @click="reloadPage"
        >
          {{ t('reload') }}
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Country } from '@/types/interfaces';
import LoadingIcon from '@/assets/icons/LoadingIcon.vue';

const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const countryId = computed<string>(() =>
  Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
);
const country = ref<Country | null>(null);
const loading = ref(true);
const notFound = ref(false);

const fetchCountry = (id: string) => {
  loading.value = true;
  axios
    .get<Country[], AxiosResponse<Country[]>>(`https://restcountries.com/v3.1/alpha/${id}`)
    .then((res) => {
      country.value = res.data[0];
    })
    .catch((err: AxiosError) => {
      if (err.response?.status === 404 || err.response?.status === 400) notFound.value = true;
    })
    .finally(() => {
      loading.value = false;
    });
};

const reloadPage = () => {
  window.location.reload();
};

onMounted(() => {
  fetchCountry(countryId.value);
});
</script>
