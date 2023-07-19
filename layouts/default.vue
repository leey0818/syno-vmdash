<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'max-w-screen-sm mx-auto bg-slate-100',
  },
});
</script>

<template>
  <div class="h-screen mx-4">
    <slot />
  </div>
</template>
