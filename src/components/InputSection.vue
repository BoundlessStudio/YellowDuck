<script setup lang="ts">
import { ref } from 'vue';
import FileInput from './FileInput.vue';

const selectedInput = ref('file');

defineEmits(['file-select', 'start-loop']);
</script>

<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">Input</h3>
    <span class="text-xs">Upload a file and we will divide items for enumeration.</span>
    <div class="px-4 rounded mb-6">
      <FileInput 
        v-if="selectedInput === 'file'" 
        class="mt-4"
        @file-select="$emit('file-select', $event)" 
      />
    </div>
  </div>
</template>