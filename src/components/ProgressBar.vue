<script setup lang="ts">
defineProps<{
  progress: number
}>();
</script>

<template>
  <div class="flex flex-row gap-2">
    <div class="w-full bg-zinc-200 rounded-full h-6 mb-4">
      <div class="bg-zinc-700 h-6 rounded-full transition-all duration-300 ease-in-out" :style="{ width: `${progress}%` }"></div>
    </div>
    <div class="text-center mb-4">
      <span class="text-sm font-bold">{{ progress.toFixed(0) }}%</span>
    </div>
  </div>
  
</template>