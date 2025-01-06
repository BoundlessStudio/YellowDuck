<script setup lang="ts">
import { ref } from 'vue';
import FileInput from './FileInput.vue';
const itemsCount = ref(0);
defineEmits(['file-select']);
</script>

<template>
  <div class="mb-6">
    <h3 class="text-lg font-semibold">Input</h3>
    <span class="text-xs">We will divide up the input into items for enumeration automagically based on file type.</span>  
    <div class="px-4 rounded">
      <FileInput  class="mt-4" @file-select="$emit('file-select', $event)" />
    </div>
    <div>
      <span class="text-xs">{{itemsCount}} Items detected</span>
    </div>
  </div>
</template>