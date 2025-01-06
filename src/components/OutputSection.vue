<script setup lang="ts">
import { useIterateStore } from '@/stores/iterate'

const iterate = useIterateStore()
</script>

<template>
  <div v-if="iterate.isDone" class="w-full h-fit shadow-2xl border-4 border-gray-900 rounded ">
    <div class="h-fit bg-slate-50 p-8 text-gray-900">
      <h3 class="text-lg font-semibold ">Output</h3>
      <span v-if="iterate.isCompleted" class="text-xs text-green-500">Completed</span>
      <span v-if="iterate.isTerminated" class="text-xs text-amber-500">Canceled</span>
      <span v-if="iterate.isFailed" class="text-xs text-red-500">Error</span>
      <div class="mt-4">
        <ul class="list-decimal list-inside">
          <template v-for="(chunk, i) in iterate.output" :key="i">
            <li :data-index="i">{{chunk}}</li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>