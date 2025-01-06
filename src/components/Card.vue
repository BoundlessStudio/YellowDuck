<script setup lang="ts">
import { ref } from 'vue';
import InputSection from './InputSection.vue';
import InstructionsInput from './InstructionsSection.vue';
import OutputSection from './OutputSection.vue';
import ActionButton from './ActionButton.vue';

const progress = ref(0);
const selectedFile = ref<File>();
const isRunning = ref(false);
let intervalId: number | null = null;

const handleFileSelect = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    selectedFile.value = files[0];
  }
};

const handleLoop = () => {
  if (isRunning.value) {
    // Stop the loop
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    progress.value = 0;
    isRunning.value = false;
    return;
  }

  // Start the loop
  isRunning.value = true;
  progress.value = 0;
  intervalId = setInterval(() => {
    progress.value += 10;
    if (progress.value >= 100) {
      clearInterval(intervalId!);
      intervalId = null;
      isRunning.value = false;
    }
  }, 200);
};
</script>

<template>
  <div class="w-full shadow-2xl border-4 border-gray-900 rounded">
    <div class="bg-slate-50 p-8 text-gray-900">
      <InputSection @file-select="handleFileSelect" @start-loop="handleLoop"/>
      <InstructionsInput />
      <ActionButton 
        :is-running="isRunning"
        @click="handleLoop" 
      />
      <OutputSection :progress="progress" />
    </div>
  </div>
</template>