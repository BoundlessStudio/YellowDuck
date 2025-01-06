<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  isRunning: boolean;
}>();

const isStarted = ref(false);

const emit = defineEmits(['start', 'stop']);

function handleStart() {
  isStarted.value = true;
  emit('start');
}

function handleStop() {
  isStarted.value = false;
  emit('stop');
}

</script>

<template>
  <div class="flex flex-row gap-2">
    <div v-if="isStarted" class="w-full">
      <button
        class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white"
        @click="handleStop"
      >
        Stop
      </button>
    </div>
    <div v-else class="w-full">
      <button 
        class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white"
        @click="handleStart"
      >
        Start
      </button>
    </div>
  </div>
</template>