<script setup lang="ts">
import { useIterateStore } from '@/stores/iterate'

const iterate = useIterateStore()
</script>

<template>
  <div class="mb-8">
    <h3 class="text-lg font-semibold">Instructions</h3>
    <span class="text-xs">The task for the AI to perform in each iteration.</span>
    <div class="pt-4 rounded ">
      <textarea 
        v-model="iterate.instructions"
        placeholder="Enter your instructions here..."
        rows="3" 
        class="w-full bg-slate-50 border border-gray-600 rounded p-2 focus:outline-none focus:border-gray-400 transition-colors"
      ></textarea>
    </div>
  </div>
</template>