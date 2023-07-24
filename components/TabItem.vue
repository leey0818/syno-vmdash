<script setup lang="ts">
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

type TabItemProps = {
  icon: IconDefinition;
  active?: boolean;
  label?: string;
};

const props = withDefaults(defineProps<TabItemProps>(), {
  active: false,
  label: '',
});
</script>

<template>
  <div class="h-full w-full border-b-4 border-transparent text-sm flex flex-col justify-center items-center cursor-pointer" :class="{ 'text-neutral-700/60': !props.active }">
    <FaIcon :icon="props.icon" size="lg" fixed-width />
    <slot><p>{{ $props.label }}</p></slot>
  </div>
</template>
