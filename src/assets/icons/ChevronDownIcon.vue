<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 7.5L10 12.5L15 7.5"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="classes"
    />
  </svg>
</template>
<script lang="ts" setup>
import { toRefs } from 'vue';

const props = withDefaults(
  defineProps<{ classes?: string; width?: number; height?: number; strokeWidth?: number }>(),
  {
    classes: 'stroke-dark-gray dark:stroke-light-gray',
    width: 20,
    height: 20,
    strokeWidth: 1.66667,
  }
);

// const props = withDefaults(defineProps<IconProps>(), {
//   color: '#667085',
//   width: 20,
//   height: 20,
//   strokeWidth: 1.66667,
// });

const { classes, width, height, strokeWidth } = toRefs(props);
</script>
