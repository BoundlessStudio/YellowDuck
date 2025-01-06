<script setup lang="ts">
import { ref } from 'vue';
import InputSection from './InputSection.vue';
import InstructionsInput from './InstructionsSection.vue';
import ActionSection from './ActionSection.vue';

const selectedFile = ref<File>();

const handleFileSelect = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    selectedFile.value = files[0];
  }
};
</script>

<template>
  <div class="w-full shadow-2xl border-4 border-gray-900 rounded">
    <div class="bg-slate-50 p-8 text-gray-900">
      <InputSection @file-select="handleFileSelect" />
      <InstructionsInput />
      <ActionSection />
    </div>
  </div>
</template>