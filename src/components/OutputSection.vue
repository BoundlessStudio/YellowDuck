<script setup lang="ts">
import { ref } from 'vue';

const range = ref(0);
</script>

<template>
  <template v-if="range > 0">
    <div class="w-full h-fit shadow-2xl border-4 border-gray-900 rounded ">
      <div class="h-fit bg-slate-50 p-8 text-gray-900">
        <h3 class="text-lg font-semibold ">Output</h3>
        <span class="text-xs">ABC</span>
        <div class="mt-4">
          <ul class="list-decimal list-inside">
            <template v-for="i in range" :key="i">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </template>
</template>