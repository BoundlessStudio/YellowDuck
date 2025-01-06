<script setup lang="ts">
defineProps<{
  progress: number;
  isRunning: boolean;
}>();
</script>

<template>
 <div class="mt-4">
    <div class="w-full bg-zinc-200 rounded-full h-2.5">
      <div 
        class="bg-zinc-700 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
    <div class="mt-2 text-center text-xs text-gray-600">
      {{ progress }}%
    </div>
  </div>
</template>