<script setup lang="ts">
import { useIterateStore } from '@/stores/iterate'
import Markdown from 'vue3-markdown-it';

const iterate = useIterateStore()
</script>

<template>
  <div v-if="iterate.isDone" class="w-full h-fit shadow-2xl border-4 border-gray-900 rounded fade-in">
    <div class="h-fit bg-slate-50 p-8 text-gray-900">
      <h3 class="text-lg font-semibold ">Output</h3>
      <span v-if="iterate.isCompleted" class="text-xs text-green-500">Completed</span>
      <span v-if="iterate.isTerminated" class="text-xs text-amber-500">Canceled</span>
      <span v-if="iterate.isFailed" class="text-xs text-red-500">Error</span>
      <div class="mt-4">
        <ul class="list-none">
          <template v-for="(chunk, i) in iterate.output" :key="i">
            <li :data-index="i" class="odd:bg-zinc-100 even:bg-zinc-300 my-2 p-2">
              <Markdown :source="chunk" />
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>