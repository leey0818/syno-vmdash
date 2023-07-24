<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/app';
import { listAllGuests, powerOffGuest, powerOnGuest, shutdownGuest } from '@/api/virtualization';

const appStore = useAppStore();
const { domain, sid } = storeToRefs(appStore);

const { data, pending, error, refresh } = await useAsyncData('guests', () => listAllGuests(domain.value, sid.value));

// VM 실행
const doStartVM = async (guestId: string) => {
  if (!confirm('Booting VM?')) return;

  try {
    await powerOnGuest(domain.value, sid.value, guestId);
    alert('Send boot signal successfully!');
    refresh();
  } catch (e) {
    alert('Signal Error!');
  }
};

// VM 종료
const doStopVM = async (guestId: string, forceStop: boolean) => {
  if (!confirm('Shutdown VM?')) return;

  try {
    if (forceStop) {
      await powerOffGuest(domain.value, sid.value, guestId);
    } else {
      await shutdownGuest(domain.value, sid.value, guestId);
    }
    alert('Send shutdown signal successfully!');
    refresh();
  } catch (e) {
    alert('Signal Error!');
  }
};
</script>

<template>
  <div class="pb-16">
    <div class="py-8">
      <p class="text-neutral-400 font-bold mb-2 text-sm">VMs</p>
      <button @click="refresh()">Refresh</button>
      <div class="flex flex-col gap-3">
        <template v-if="pending">
          <div class="bg-white border-b-4 border-neutral-300 flex gap-4 items-center px-5 py-5 rounded-md shadow text-neutral-400/70 text-xl">
            <div class="animate-pulse flex space-x-4 w-full">
              <div class="rounded-full bg-slate-200 h-10 w-10"></div>
              <div class="flex-1 space-y-3 py-1">
                <div class="h-2 bg-slate-200 rounded"></div>
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                  <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white border-b-4 border-neutral-300 flex gap-4 items-center px-5 py-5 rounded-md shadow text-neutral-400/70 text-xl">
            <div class="animate-pulse flex space-x-4 w-full">
              <div class="rounded-full bg-slate-200 h-10 w-10"></div>
              <div class="flex-1 space-y-3 py-1">
                <div class="h-2 bg-slate-200 rounded"></div>
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="error">
          Error!!
        </template>
        <template v-else-if="data">
          <VirtualMachineCard
            v-for="guest in data.guests"
            :key="guest.guest_id"
            :name="guest.guest_name"
            :status="guest.status"
            @start="doStartVM(guest.guest_id)"
            @stop="doStopVM(guest.guest_id, false)"
            @force-stop="doStopVM(guest.guest_id, true)" />
        </template>
      </div>
    </div>
  </div>
</template>
