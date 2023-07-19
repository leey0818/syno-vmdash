<script setup lang="ts">
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type ItemCardType = {
  icon: IconDefinition;
};

const props = defineProps<ItemCardType>();
</script>

<template>
  <div class="rounded-md bg-white px-5 py-5 flex gap-4 items-center text-xl shadow">
    <FaIcon :icon="props.icon" size="xl" fixed-width />
    <slot></slot>
  </div>
</template>
