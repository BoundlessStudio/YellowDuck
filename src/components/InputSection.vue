<script setup lang="ts">
import { computed } from 'vue'
import { useIterateStore } from '@/stores/iterate'

const iterate = useIterateStore()

const group = computed(() => {
  if(iterate.collection.length === 1) return 0
  if(iterate.collection.length <= 10) return 0 + (iterate.collection.length / 10)
  if(iterate.collection.length <= 100) return 1 + (iterate.collection.length / 100)
  if(iterate.collection.length <= 1000) return 2 + (iterate.collection.length / 1000)
  if(iterate.collection.length <= 10000) return 3 + (iterate.collection.length / 10000)
  else return 4
})
const style = computed(() => {
  if(iterate.collection.length === 1) return 'bg-blue-700'
  if(iterate.collection.length <= 10) return 'bg-green-700'
  if(iterate.collection.length <= 100) return 'bg-green-700'
  if(iterate.collection.length <= 1000) return 'bg-green-700'
  if(iterate.collection.length <= 10000) return 'bg-red-700'
  else return 'bg-red-700'
})
</script>

<template>
  <div class="mb-6">
    <h3 class="text-lg font-semibold">Input</h3>
    <span class="text-xs">Enter your text below. We'll process each line as a separate item for enumeration.</span>  
    <div class="pt-4 rounded ">
      <textarea 
        v-model="iterate.input"
        placeholder="Enter your items here..."
        rows="5" 
        class="w-full bg-slate-50 border border-gray-600 rounded p-2 focus:outline-none focus:border-gray-400 transition-colors"
      ></textarea>
    </div>
    <div>
      <div class="relative mb-6">
        <input id="labels-range-input" type="range" disabled :value="group" min="0" max="4" step="0.1" :class="['w-full h-2 bg-red-700 rounded-lg appearance-none cursor-pointer', style]">
        <div class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
          <span>1</span>
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400 absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
          <span>10</span>
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400 absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
          <span>100</span>
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 flex items-center gap-1">
          <span>1K</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6 flex items-center gap-1">
          <span>>10K</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>