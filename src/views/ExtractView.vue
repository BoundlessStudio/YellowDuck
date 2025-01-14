<script setup lang="ts">
// import { useIterateStore } from '@/stores/iterate'
import { ref } from 'vue';

import Header from '@/components/HeaderNavigation.vue'
import Footer from '@/components/Footer.vue'

const style = ref('bg-blue-700')
const limit = ref(1)
const group = ref(0)
</script>

<template>
  <div class="my-container">
    <Header />

    <div class="border-dashed border-4" style="background-color: #D29401; border-color: #18181b;"></div>

    <section class="bg-zinc-900 " >
      <div class="bg-no-repeat bg-cover" style="background-image: url('/background.0.png');">
        <div class="flex lg:flex-row flex-col container mx-auto">
          <section class="lg:basis-1/2 flex items-stretch justify-center p-6 ">
            <div class="w-full min-h-screen shadow-2xl border-4 border-zinc-900 rounded-2">
              <div class="h-full bg-slate-100 p-8 text-gray-900">
                <h1 class="text-4xl text-center"  style="font-family: 'Luckiest Guy';">Extract</h1>
                <div class="mb-10">
                  <h3 class="text-lg font-semibold">Input File</h3>
                  <span class="text-xs">Upload a file. We support a large array of file types.</span>
                  <div class="pt-4">
                    <div class="border-2 border-dashed border-gray-700 rounded p-8 text-center cursor-pointer hover:border-gray-400 transition-colors drop-zone w-full h-full">
                      <p>Drag and drop file here or click to select file</p>
                      <input type="file"  class="hidden" multiple />
                    </div>
                  </div>
                  <div class="relative pt-4">
                    <input id="labels-range-input" type="range" disabled :value="group" min="0" max="4" step="0.01" :class="['w-full h-2 rounded-lg appearance-none range-lg', style]">
                    <div class="text-sm text-gray-500  absolute start-0 -bottom-6">
                      <span>&#8249;1K</span>
                    </div>
                    <div class="text-sm text-gray-500  absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 flex items-center gap-1">
                      <span>1MB</span>
                    </div>
                    <div class="text-sm text-gray-500  absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 flex items-center gap-1">
                      <span>10MB</span>
                      <svg v-if="limit <= 100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-amber-800">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                    </div>
                    <div class="text-sm text-gray-500 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 flex items-center gap-1">
                      <span>100MB</span>
                      <svg v-if="limit <= 1000" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-gray-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                    </div>
                    <div class="text-sm text-gray-500 absolute end-0 -bottom-6 flex items-center gap-1">
                      <span>&#8250;1GB</span>
                      <svg v-if="limit <= 10000" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-yellow-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="mb-8">
                  <h3 class="text-lg font-semibold">Instructions</h3>
                  <span class="text-xs">The task for the AI to perform to break it chunks.</span>
                  <div class="pt-4">
                    <textarea 
                      :placeholder="'Enter your instructions here'"
                      rows="3" 
                      class="w-full bg-slate-50 border border-gray-600 rounded p-2 focus:outline-none focus:border-gray-400 transition-colors"
                    ></textarea>
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
    
    <div class="border-dashed border-4" style="background-color: #18181b; border-color: #78C8E3;"></div>

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