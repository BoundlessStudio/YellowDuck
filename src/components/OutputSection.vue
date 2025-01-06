<script setup lang="ts">
import { computed } from 'vue';
import ProgressBar from './ProgressBar.vue';

const props = defineProps<{
  progress: number;
}>();

const showDownload = computed(() => props.progress === 100);
</script>

<template>
  <h3 class="text-lg font-semibold mb-4">Output</h3>
  <span class="text-xs">Steps: {{ progress }} of 100</span>
  <ProgressBar :progress="progress" />
  <div class="h-10">
    <Transition
      enter-active-class="transition-opacity duration-500"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-500"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showDownload" class="pt-4 rounded text-center">
        <button 
          class="bg-zinc-700  hover:bg-zinc-600 text-white py-2 px-6 rounded transition-colors inline-flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download Enumerated Output
        </button>
      </div>
    </Transition>
  </div>
</template>