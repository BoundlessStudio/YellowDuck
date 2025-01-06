<script setup lang="ts">
defineProps<{
  progress: number
}>();
</script>

<template>
  <div class="w-full bg-zinc-200 rounded-full h-2.5 mb-4">
    <div 
      class="bg-zinc-700 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
      :style="{ width: `${progress}%` }"
    ></div>
    <div class="text-center">
      <span class="text-xs">{{ progress.toFixed(0) }}%</span>
    </div>
    
  </div>
</template>