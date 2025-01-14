<script setup lang="ts">
import { ref, computed } from 'vue';
import { useIterateStore } from '@/stores/iterate'
import { toast } from "vue3-toastify";

import Header from '@/components/HeaderNavigation.vue'
import Footer from '@/components/Footer.vue'
import ProgressBar from '@/components/ProgressBar.vue'

const iterate = useIterateStore()

const isLocked = ref(false)

const style = computed(() => {
  if(iterate.collection.length === 1) {
    return 'bg-blue-700'
  } else if (iterate.collection.length < iterate.limit) {
    return 'bg-green-700'
  } else {
    return 'bg-red-700'
  }
})

const start = async () => {
  isLocked.value = true
  try {
    await iterate.start()
  } catch(error) {
    
    if(error instanceof Error) {
      toast("Error: " + error.message, { "theme": "auto", "type": "error" })
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
      toast(message, { "theme": "auto", "type": "error" })
    }

    console.error('Error', error)
  } finally {
    isLocked.value = false
  }
}
</script>

<template>
  <div>
    <Header />

    <div class="border-dashed border-4" style="background-color: #FFDD24; border-color: #18181b;"></div>
    
    <section class="bg-zinc-900">
      <div class="bg-no-repeat bg-cover" style="background-image: url('/background.1.png');">
        <div class="flex lg:flex-row flex-col container mx-auto">
          <section class="lg:basis-1/2 flex items-stretch justify-center p-6 ">
            <div class="w-full min-h-screen shadow-2xl border-4 border-zinc-900 rounded-2">
              <div class="h-full bg-slate-100 p-8 text-gray-900">
                <h1 class="text-4xl text-center"  style="font-family: 'Luckiest Guy';">Enumerate</h1>
                <div class="mb-10">
                  <h3 class="text-lg font-semibold">Input File</h3>
                  <span class="text-xs">Upload a chunks file. We'll process each chunk as a separate item for enumeration.</span>  
                  <div class="pt-4">
                    <div class="border-2 border-dashed border-gray-700 rounded p-8 text-center cursor-pointer hover:border-gray-400 transition-colors drop-zone w-full h-full">
                      <p>Drag and drop file here or click to select file</p>
                      <input type="file"  class="hidden" multiple />
                    </div>
                  </div>
                  <div class="relative pt-4">
                    <input id="labels-range-input" type="range" disabled :value="iterate.group" min="0" max="4" step="0.01" :class="['w-full h-2 rounded-lg appearance-none range-lg', style]">
                    <div class="text-sm text-gray-500  absolute start-0 -bottom-6">
                      <span>1</span>
                    </div>
                    <div class="text-sm text-gray-500  absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 flex items-center gap-1">
                      <span>10</span>
                    </div>
                    <div class="text-sm text-gray-500  absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 flex items-center gap-1">
                      <span>100</span>
                      <svg v-if="iterate.limit <= 100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-amber-800">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                    </div>
                    <div class="text-sm text-gray-500 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 flex items-center gap-1">
                      <span>1K</span>
                      <svg v-if="iterate.limit <= 1000" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-gray-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                    </div>
                    <div class="text-sm text-gray-500 absolute end-0 -bottom-6 flex items-center gap-1">
                      <span>&#8250;10K</span>
                      <svg v-if="iterate.limit <= 10000" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-yellow-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="mb-8">
                  <h3 class="text-lg font-semibold">Instructions</h3>
                  <span class="text-xs">The task for the AI to perform in each iteration.</span>
                  <div class="pt-4">
                    <textarea 
                      v-model="iterate.instructions"
                      :placeholder="'Enter your instructions here'"
                      rows="3" 
                      class="w-full bg-slate-50 border border-gray-600 rounded p-2 focus:outline-none focus:border-gray-400 transition-colors"
                    ></textarea>
                  </div>
                </div>
                <div class="mb-8">
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
                <div>
                  <h3 class="text-lg font-semibold">Output</h3>
                  <span class="text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
                  <div class="py-4 flex flex-row gap-2">
                    <button class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-zinc-600 hover:bg-zinc-700 text-white">
                      Download Collection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div class="lg:basis-1/2 hidden">
          </div>
        </div>
      </div>
    </section>
    
    <div class="border-dashed border-4" style="background-color: #18181b; border-color: #FFDD24;"></div> 

    <Footer />
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