<script setup lang="ts">
import { ref } from 'vue';
import ActionButton from './action/ActionButton.vue';
import ProgressBar from './action/ProgressBar.vue';

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
  progress.value = 0;
  clearLoop();
};
</script>

<template>
  <div class="">
    <h3 class="text-lg font-semibold">Iterate</h3>
    <span class="text-xs">Control the enumeration.</span>
    <div class="py-4">
      <ActionButton :is-running="isRunning"  @start="startLoop" @stop="stopLoop" />
      <ProgressBar :progress="progress" :is-running="isRunning"/>
    </div>
  </div>
</template>