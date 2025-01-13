<script setup lang="ts">
import { computed, ref } from 'vue'
import { useIterateStore } from '@/stores/iterate'

const iterate = useIterateStore()

const mode = ref('chunks')

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
  <!--
  <div class="mb-10 pt-4">
    <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
      <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
        <div class="flex items-center ps-3">
          <input if="bfbc156a8e514cdb92fdaf39490ca477" v-model="mode" type="radio" value="chunks" name="enumerate-mode" checked class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 ">
          <label for="bfbc156a8e514cdb92fdaf39490ca477" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">Chunks</label>
        </div>
      </li>
      <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
        <div class="flex items-center ps-3">
          <input if="c6173caa89a04bf38938a5108f623e79" v-model="mode" type="radio" value="list" name="enumerate-mode" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
          <label for="c6173caa89a04bf38938a5108f623e79" class="w-full py-3 ms-2 text-sm font-medium text-gray-900">List</label>
        </div>
      </li>
      <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
        <div class="flex items-center ps-3">
          <input id="ceb574f463334e16a175fffe6552bd10" v-model="mode" type="radio" value="range" name="enumerate-mode" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
          <label for="ceb574f463334e16a175fffe6552bd10" class="w-full py-3 ms-2 text-sm font-medium text-gray-900">Range</label>
        </div>
      </li>
    </ul>
  </div>
  -->
  <div class="mb-10">
    <div v-if="mode==='chunks'">
      <h3 class="text-lg font-semibold">Input Chunks</h3>
      <span class="text-xs">We will use the chunks file created in the previous step. We'll process each chunk as a separate item for enumeration.</span>  
    </div>
    <div v-if="mode=='list'">
      <h3 class="text-lg font-semibold">Input Collection</h3>
      <span class="text-xs">Enter your text below. We'll process each line as a separate item for enumeration.</span>  
      <div class="pt-4">
        <textarea 
          :placeholder="'Enter your items, one on each line'"
          rows="3" 
          class="w-full bg-slate-50 border border-gray-600 rounded p-2 focus:outline-none focus:border-gray-400 transition-colors"
      ></textarea>
      </div>
    </div>
    <div v-if="mode=='range'">
      <h3 class="text-lg font-semibold">Input Range</h3>
      <span class="text-xs">We will enter the start and end of the range.  We'll process each index as a separate item for enumeration.</span>  
      <div class="pt-4 flex gap-2">
        <input type="number" value="" min="1" max="100000" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Start" />
        <input type="number" value="" min="1" max="100000" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="End" />
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
        <span>>10K</span>
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