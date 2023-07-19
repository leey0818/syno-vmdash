<script setup lang="ts">
import { faComputer, faPlay, faPowerOff, faStop, faTriangleExclamation, faQuestion, faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import { VMStatus } from '../util/types';
import { computed } from 'vue';
import ItemCard from './ItemCard.vue';

type VirtualMachineCardType = {
  name: string
  status: VMStatus
};

const COND_PLAY_STATUS: VMStatus[] = ['shutdown'];
const COND_STOP_STATUS: VMStatus[] = ['booting', 'crashed', 'ha_standby', 'running', 'shutting_down'];

const props = defineProps<VirtualMachineCardType>();
const isCanPlay = computed(() => COND_PLAY_STATUS.includes(props.status));
const isCanStop = computed(() => COND_STOP_STATUS.includes(props.status));
const vmIcon = computed(() => {
  switch (props.status) {
    case 'inaccessible':
    case 'crashed': return faTriangleExclamation;
    case 'stor_migrating': return faBarsProgress;
    case 'unknown': return faQuestion;
    default: return faComputer;
  }
});
const vmTextColor = computed(() => {
  switch (props.status) {
    case 'booting':
    case 'running': return 'text-green-700/80';
    case 'shutting_down': return 'text-yellow-600';
    case 'ha_standby': return 'text-cyan-600';
    case 'crashed': return 'text-red-700/80';
    default: return 'text-neutral-400/70';
  }
});
const vmCardBorderColor = computed(() => {
  switch (props.status) {
    case 'running': return 'border-green-700';
    case 'crashed': return 'border-red-700';
    case 'shutting_down': return 'border-yellow-600';
    case 'ha_standby': return 'border-cyan-600';
    default: return 'border-neutral-300';
  }
});
const statusName = computed(() => {
  switch (props.status) {
    case 'booting': return '전원 켜는 중';
    case 'running': return '실행 중';
    case 'shutdown': return '전원 꺼짐';
    case 'shutting_down': return '종료 중';
    case 'moving': return '이동 중';
    case 'stor_migrating': return '마이그레이션 중';
    case 'creating': return '생성 중';
    case 'importing': return '가져오는 중';
    case 'inaccessible': return '제어할 수 없음';
    case 'preparing': return '준비 중';
    case 'ha_standby': return 'HA 준비됨';
    case 'crashed': return '충돌됨';
    case 'unknown': return '알 수 없음';
    default: return `알 수 없음(${props.status})`;
  }
});

const handleClickPlay = () => {
  if (isCanPlay.value) {
    confirm('play?');
  }
};

const handleClickStop = (forceStop = false) => {
  if (isCanStop.value) {
    confirm(`stop? ${forceStop}`);
  }
}
</script>

<template>
  <ItemCard :class="[vmCardBorderColor, vmTextColor]" :icon="vmIcon" class="border-b-4">
    <div class="leading-tight grow shrink min-w-0">
      <p class="truncate">{{ props.name }}</p>
      <p class="text-xs">{{ statusName }}</p>
    </div>
    <div class="flex gap-4 ml-auto">
      <a class="leading-none cursor-pointer" @click="handleClickPlay" v-if="isCanPlay">
        <FaIcon :icon="faPlay" class="text-neutral-700"/>
      </a>
      <a class="leading-none cursor-pointer" @click="handleClickStop(false)" v-if="isCanStop">
        <FaIcon :icon="faPowerOff" />
      </a>
      <a class="leading-none cursor-pointer" @click="handleClickStop(true)" v-if="isCanStop">
        <FaIcon :icon="faStop" />
      </a>
    </div>
  </ItemCard>
</template>
../util/types
