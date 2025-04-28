<template>
  <Combobox v-model="selectedValue">
    <div class="relative w-4/6 md:w-120">
      <div
        class="relative flex items-center w-full h-full cursor-default overflow-hidden bg-light-gray dark:bg-dark-gray text-left focus:outline-none focus-visible:ring-offset-0 sm:text-sm transition-colors duration-300 ease-in-out"
      >
        <ComboboxInput
          class="w-full h-full border-none py-2 ps-3 pe-10 text-sm leading-5 text-dark-gray dark:text-light-gray focus:outline-none focus:ring-0 ocus-visible:ring-offset-0"
          :displayValue="(country) => (country as Country)?.name?.common"
          :placeholder="t('searchPlaceholder')"
          @change="onQueryChange($event.target.value)"
        />
        <div class="relative right-7 h-full w-10 flex justify-center items-center">
          <LoadingIcon :loading="loading" />
        </div>
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>
      </div>
      <TransitionRoot
        leave="transition ease-in-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        @after-enter="
          () => {
            // Since the search menu is rendered only when is opened, the observer had to be created after it was opened, so this was the best and probably only place it could've been put.
            if (!observer) createObserver();
          }
        "
        @after-leave="
          () => {
            query = '';
            selectedValue = null;
          }
        "
      >
        <ComboboxOptions
          v-show="!loading"
          id="observerRoot"
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-light-gray dark:bg-dark-gray py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
        >
          <div
            v-if="countries.length === 0 && query !== '' && !loading"
            class="relative cursor-default select-none px-4 py-2 text-dark-gray dark:text-light-gray"
          >
            {{ t('noItems') }}
          </div>

          <ComboboxOption
            v-for="country in displayedCountries"
            as="template"
            :key="country.name.common"
            :value="country"
            v-slot="{ selected, active }"
          >
            <li
              class="relative cursor-default select-none py-2 pl-10 pr-4 transition-colors duration-200 ease-in-out"
              :class="{
                'bg-gold text-dark-gray': active,
                'bg-light-gray text-dark-gray dark:bg-dark-gray dark:text-light-gray': !active,
              }"
            >
              <span
                class="block truncate"
                :class="{ 'font-medium': selected, 'font-normal': !selected }"
              >
                {{ country.name.common }}
              </span>
            </li>
          </ComboboxOption>
          <ComboboxOption
            v-if="countries.length > displayedCountries.length"
            id="observerTarget"
            class="relative h-9 flex justify-center items-center"
          >
            <LoadingIcon :loading="true" />
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, toRefs, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import axios, { AxiosResponse, AxiosError } from 'axios';
import debounce from 'lodash.debounce';
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue';
import { Country } from '@/types/interfaces';
import { Fields } from '@/types/enums';
import ChevronDownIcon from '@/assets/icons/ChevronDownIcon.vue';
import LoadingIcon from '@/assets/icons/LoadingIcon.vue';

interface Props {
  field: Fields;
}
const props = defineProps<Props>();
const { field } = toRefs(props); // The field prop is passed as prop to be used in the API call.

const selectedValue = defineModel<Country | null>({ required: true });
const countries = defineModel<Country[]>('countries', { required: true });
const query = defineModel<string>('query', { required: true });
const loading = defineModel<boolean>('loading', { required: true });

const { t } = useI18n();

const onQueryChange = (q: string) => {
  query.value = q;
  loading.value = true;
  debouncedFetch(field.value, q);
};

watch(field, (val) => {
  debouncedFetch(val, query.value);
});

// This is a response filter to limit the properties of the country object and to optimize the size of the response.
const responseFilter =
  'fields=name,independent,unmember,idd,cca2,currencies,capital,region,languages,translations,area,flag,flags,maps,population,timezones';
const fetchCountries = (f: Fields, q: string) => {
  loading.value = true;
  axios
    .get<Country[], AxiosResponse<Country[]>>(
      `https://restcountries.com/v3.1/${!q.length ? 'all/' : f + '/' + q}?${responseFilter}`
    )
    .then((res) => {
      countries.value = res.data;
    })
    .catch((err: AxiosError) => {
      if (err.response?.status === 404) countries.value = [];
      else alert(err.message);
    })
    .finally(() => {
      loading.value = false;
    });
};

// the fetch function is put of a debounce to optimize API calls based on query changes.
const debouncedFetch = debounce(
  (f: Fields, q: string) => {
    fetchCountries(f, q);
  },
  500,
  {
    leading: false,
    trailing: true,
  }
);

// Fetching 249 countries in a single API is not a good idea, but since I can't change the backend and it is relatively optimized and fast it should be fine,
// But what is not fine is to want to render all of those records at the same time on function that should appear instant.
// So using a pagination system and "Observation API" I can break those numbers and render the search options (countries) a page at a time.
// This way the "page" and "pageSize" variables determine how many countries are displayed at any time.
const page = ref(1);
const pageSize = ref(20);
const displayedCountries = computed<Country[]>(() => {
  return countries.value.slice(0, page.value * pageSize.value);
});

// Since the observer should be accessed in multiple lines outside the "createObserver" function, and could not be created in "onMounted", it was defined as separated ref.
const observer = ref<IntersectionObserver | null>(null);

// Standard Intersect handler
const handleIntersect = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      page.value++;
    }
  });
};

// Standard Intersection Observer Creation with a root.
const createObserver = () => {
  const rootEl = document.getElementById('observerRoot');
  const options = {
    root: rootEl,
    rootMargin: '100px',
    threshold: 1.0,
  };
  observer.value = new IntersectionObserver(handleIntersect, options);
  const loadingEl = document.getElementById('observerTarget');
  if (loadingEl) observer.value.observe(loadingEl);
};

onMounted(() => {
  fetchCountries(field.value, query.value);
});

// The fetch function is exposed to be used by the search button in the parent.
defineExpose({
  search: () => {
    debouncedFetch(field.value, query.value);
  },
});
</script>
