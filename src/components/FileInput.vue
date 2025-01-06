<script setup lang="ts">
const emit = defineEmits(['fileSelect']);
</script>

<template>
  <div class="border-2 border-dashed border-gray-700 rounded p-8 text-center cursor-pointer hover:border-gray-400 transition-colors drop-zone w-full h-full">
    <p>Drag and drop file here or click to select file.</p>
    <input 
      type="file" 
      class="hidden" 
      multiple 
      @change="(e) => emit('fileSelect', e)"
    />
  </div>
</template>