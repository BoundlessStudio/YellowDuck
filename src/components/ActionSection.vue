<script setup lang="ts">
import ProgressBar from '@/components/ProgressBar.vue';
import { useIterateStore } from '@/stores/iterate'
import { ref, watch } from 'vue';

const iterate = useIterateStore()

const isLocked = ref(false)

const start = () => {
  isLocked.value = true
  iterate.start()
}

watch(() => iterate.isRunning, (value) => {
  if(value) {
    isLocked.value = false
  }
})

</script>

<template>
  <div class="">
    <h3 class="text-lg font-semibold">Iterate</h3>
    <span class="text-xs">Control the enumeration.</span>
    <div class="py-4 flex flex-row gap-2">
      <div v-if="iterate.isRunning" class="w-full">
        <button @click="iterate.stop" class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white">
          Stop
        </button>
      </div>
      <div v-if="iterate.isPending || iterate.isDone" class="w-full">
        <button 
          @click="start" 
          :disabled="iterate.isLocked || isLocked" 
          :class="[
            'py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center disabled:bg-zinc-500 bg-green-600 hover:bg-green-700 text-white', 
            iterate.isLocked ? 'opacity-50 cursor-not-allowed' : ''
        ]">
          <span>Start</span>
        </button>
      </div>
      <div v-if="iterate.isDone" class="w-full">
        <button @click="iterate.reset" class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-zinc-600 hover:bg-zinc-700 text-white">
          Clear
        </button>
      </div>
    </div>
    <div class="py-2">
      <ProgressBar :progress="iterate.progress" />
    </div>
  </div>
</template>