<script setup lang="ts">
import ProgressBar from '@/components/ProgressBar.vue';
import { useIterateStore } from '@/stores/iterate'
import { ref } from 'vue';
import { toast } from "vue3-toastify";

const iterate = useIterateStore()
const isLocked = ref(false)

const error_toast = (error: string) => {
  toast(error, { "theme": "auto", "type": "error" })
}

const start = async () => {
  isLocked.value = true
  try {
    await iterate.start()
  } catch(error) {
    
    if(error instanceof Error) {
      error_toast("Error: " + error.message)
    }

    if(error instanceof Response) {
      let message = '';
      switch (error.status) {
        case 401:
          message = 'Unauthorized: Access denied.';
          break;
        case 429:
          const body = await error.text()
          console.log('RetryAfter', body)
          message = 'Timeout: Please come back tomorrow.';
          break;
        case 500:
          message = 'Error: We messed up.';
          break;
        default:
          message = 'Error: Something Unexpected.';
          break;
      }
      error_toast(message)
    }

    console.error('Error', error)
  } finally {
    isLocked.value = false
  }
}
</script>

<template>
  <div class="">
    <h3 class="text-lg font-semibold">Chunkify</h3>
    <span class="text-xs">Control the extraction.</span>
    <div class="py-4 flex flex-row gap-2">
      <div v-if="iterate.isRunning" class="w-full">
        <button @click="iterate.stop" class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white">
          Stop
        </button>
      </div>
      <div v-if="iterate.isPending || iterate.isDone" class="w-full">
        <button 
          @click="start" 
          :disabled="isLocked" 
          :class="[
            'py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center disabled:bg-zinc-500 bg-green-600 hover:bg-green-700 text-white', 
            isLocked ? 'opacity-50 cursor-not-allowed' : ''
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