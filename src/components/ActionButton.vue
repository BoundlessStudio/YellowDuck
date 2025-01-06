<script setup lang="ts">
defineProps<{
  isRunning: boolean;
}>();

defineEmits(['click']);
</script>

<template>
  <div class="text-center mb-6">
    <button class="py-2 px-6 rounded transition-colors inline-flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
      </svg>
      Once
    </button>
    <span class="p-2">.</span>
    <button 
      :class="[
        'py-2 px-6 rounded transition-colors inline-flex items-center gap-2',
        isRunning 
          ? 'bg-red-600 hover:bg-red-700 text-white'
          : 'bg-zinc-700 hover:bg-zinc-600 text-white'
      ]"
      @click="$emit('click')"
    >
      <svg v-if="isRunning" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
      {{ isRunning ? 'Stop' : 'Iterate' }}
    </button>
  </div>
</template>