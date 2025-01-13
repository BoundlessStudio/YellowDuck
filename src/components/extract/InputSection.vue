<script setup lang="ts">
import { computed } from 'vue'
import { useIterateStore } from '@/stores/iterate'

const iterate = useIterateStore()

const style = computed(() => {
  if(iterate.collection.length === 1) {
    return 'bg-blue-700'
  } else if (iterate.collection.length < iterate.limit) {
    return 'bg-green-700'
  } else {
    return 'bg-red-700'
  }
})
</script>

<template>
  <div class="mb-10">
    <h3 class="text-lg font-semibold">Input File</h3>
    <span class="text-xs">Upload file(s) and we will chunkify them based on your instructions.</span>  
    <div class="pt-4">
      <div class="border-2 border-dashed border-gray-700 rounded p-8 text-center cursor-pointer hover:border-gray-400 transition-colors drop-zone w-full h-full">
        <p>Drag and drop files here or click to select files</p>
        <input type="file"  class="hidden" multiple />
      </div>
    </div>
    <div class="relative">
      <input id="labels-range-input" type="range" disabled :value="iterate.group" min="0" max="4" step="0.01" :class="['w-full h-2 rounded-lg appearance-none range-lg', style]">
      <div class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
        <span>10 KB</span>
      </div>
      <div class="text-sm text-gray-500 dark:text-gray-400 absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 flex items-center gap-1">
        <span>1 MB</span>
      </div>
      <div class="text-sm text-gray-500 dark:text-gray-400 absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 flex items-center gap-1">
        <span>10 MB</span>
        <svg v-if="iterate.limit <= 100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-amber-800">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      </div>
      <div class="text-sm text-gray-500 dark:text-gray-400 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 flex items-center gap-1">
        <span>100 MB</span>
        <svg v-if="iterate.limit <= 1000" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-gray-600">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      </div>
      <div class="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6 flex items-center gap-1">
        <span>>1 GB</span>
        <svg v-if="iterate.limit <= 10000" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-yellow-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
 #labels-range-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4a4a4d;
    cursor: pointer;
    border: 2px solid #fff;
  }

  #labels-range-input::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4a4a4d;
    cursor: pointer;
    border: 2px solid #fff;
  }

  #labels-range-input::-ms-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4a4a4d;
    cursor: pointer;
    border: 2px solid #fff;
  }
</style>