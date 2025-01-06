<script setup lang="ts">
import { ref } from 'vue';
import ProgressBar from './ProgressBar.vue';

const progress = ref(0);
const isRunning = ref(false);
let intervalId: number | null = null;

const loop = () => {
  intervalId = setInterval(() => {
    progress.value += 10;
    if(progress.value >= 100) {
      clearLoop();
    }
  }, 200);
}

const clearLoop = () => {
  if(intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

const startLoop = () => {
  isRunning.value = true;
  progress.value = 0;
  loop();
};

const stopLoop = () => {
  isRunning.value = false;
  clearLoop();
};
</script>

<template>
  <div class="">
    <h3 class="text-lg font-semibold">Iterate</h3>
    <span class="text-xs">Control the enumeration.</span>
    <div class="py-4">
      <div v-if="isRunning" class="w-full">
          <button
            class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white"
            @click="stopLoop"
          >
            Stop
          </button>
        </div>
        <div v-else class="w-full">
          <button 
            class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white"
            @click="startLoop"
          >
            Start
          </button>
        </div>
      </div>
      <div class="py-2">
        <ProgressBar :progress="progress" :is-running="isRunning"/>
      </div>
    </div>
</template>