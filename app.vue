<script setup lang="ts">
import { faArrowRightFromBracket, faComputer } from '@fortawesome/free-solid-svg-icons';
</script>

<template>
  <NuxtLayout>
    <NuxtPage />

    <div class="fixed mx-auto max-w-screen-sm bottom-0 left-0 right-0">
      <div class="h-8 bg-gradient-to-b from-transparent via-slate-100/60 to-slate-100"></div>
      <div class="h-16 bg-slate-100 text-neutral-700 flex">
        <div class="h-full w-full border-b-4 border-sky-600 text-sm flex flex-col justify-center items-center cursor-pointer">
          <FaIcon :icon="faComputer" size="lg" fixed-width />
          <p>VMs</p>
        </div>
        <!-- <div class="h-full w-full border-b-4 border-transparent text-sm flex flex-col justify-center items-center cursor-pointer text-neutral-700/60">
          <FontAwesomeIcon :icon="faHardDrive" size="lg" fixed-width />
          <p>Storages</p>
        </div>
        <div class="h-full w-full border-b-4 border-transparent text-sm flex flex-col justify-center items-center cursor-pointer text-neutral-700/60">
          <FontAwesomeIcon :icon="faNetworkWired" size="lg" fixed-width />
          <p>Networks</p>
        </div> -->
        <div class="h-full w-full border-b-4 border-transparent text-sm flex flex-col justify-center items-center cursor-pointer text-neutral-700/60">
          <FaIcon :icon="faArrowRightFromBracket" size="lg" fixed-width />
          <p>Logout</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
