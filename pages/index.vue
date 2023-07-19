<template>
  <div class="pb-16">
    <div class="py-8">
      <p class="text-neutral-400 font-bold mb-2 text-sm">VMs</p>
      <div class="flex flex-col gap-3">
        <VirtualMachineCard name="Windows 11" status="running" />
        <VirtualMachineCard name="Windows 11" status="shutdown" />
        <VirtualMachineCard name="Windows 11" status="inaccessible" />
        <VirtualMachineCard name="Windows 11" status="running" />
        <VirtualMachineCard name="Windows 11" status="shutdown" />
        <VirtualMachineCard name="Windows 11" status="inaccessible" />
        <VirtualMachineCard name="Windows 11" status="running" />
        <VirtualMachineCard name="Windows 11" status="shutdown" />
        <VirtualMachineCard name="Windows 11" status="inaccessible" />
        <VirtualMachineCard name="Windows 11" status="booting" />
        <VirtualMachineCard name="Windows 11" status="shutting_down" />
        <VirtualMachineCard name="윈도우 11" status="moving" />
        <VirtualMachineCard name="Windows 11" status="stor_migrating" />
        <VirtualMachineCard name="Windows 11" status="creating" />
        <VirtualMachineCard name="Windows 11" status="importing" />
        <VirtualMachineCard name="Windows 11" status="preparing" />
        <VirtualMachineCard name="Windows 11" status="ha_standby" />
        <VirtualMachineCard name="Windows 11" status="unknown" />
        <VirtualMachineCard name="Windows 11" status="crashed" />
      </div>

      <!-- <p class="text-neutral-400 font-bold mb-2 mt-8 text-sm">Storages</p>
        <div class="flex flex-col gap-3">
          <StorageCard name="Synology - VM Storage 1"></StorageCard>
        </div>

        <p class="text-neutral-400 font-bold mb-2 mt-8 text-sm">Networks</p>
        <div class="flex flex-col gap-3">
          <NetworkCard name="Default VM Network"></NetworkCard>
        </div> -->
    </div>
  </div>
</template>
