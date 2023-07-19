<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import ItemCard from './ItemCard.vue';

type NetworkCardType = {
    name: string
};

const props = defineProps<NetworkCardType>();
</script>

<template>
    <ItemCard class="text-neutral-800">
        <FontAwesomeIcon :icon="faNetworkWired" size="xl" fixed-width />
        <p class="truncate grow shrink min-w-0">
            {{ props.name }}
        </p>
    </ItemCard>
</template>
