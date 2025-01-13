<script setup lang="ts">
import { computed } from 'vue'
import { useIterateStore } from '@/stores/iterate'

const iterate = useIterateStore()

</script>

<template>
  <div class="mb-10">
    <h3 class="text-lg font-semibold">Input File</h3>
    <span class="text-xs">Upload a file or files and we will chunkify it based on your instructions.</span>  
    <div class="pt-4">
      <div class="border-2 border-dashed border-gray-700 rounded p-8 text-center cursor-pointer hover:border-gray-400 transition-colors drop-zone w-full h-full">
        <p>Drag and drop file here or click to select file</p>
        <input type="file"  class="hidden"  multiple />
      </div>
    </div>
  </div>
</template>

<style scoped>
 
</style>