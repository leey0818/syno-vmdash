<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHardDrive } from '@fortawesome/free-solid-svg-icons';
import ItemCard from './ItemCard.vue';

type StorageCardType = {
    name: string;
};

const props = defineProps<StorageCardType>();
</script>

<template>
    <ItemCard class="text-neutral-800">
        <FontAwesomeIcon :icon="faHardDrive" size="xl" fixed-width />
        <p class="truncate grow shrink min-w-0">
            {{ props.name }}
        </p>
    </ItemCard>
</template>
