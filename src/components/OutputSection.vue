<script setup lang="ts">
import { useIterateStore } from '@/stores/iterate'

const iterate = useIterateStore()
</script>

<template>
  <template v-if="!iterate.isPending">
    <div class="w-full h-fit shadow-2xl border-4 border-gray-900 rounded ">
      <div class="h-fit bg-slate-50 p-8 text-gray-900">
        <h3 class="text-lg font-semibold ">Output</h3>
        <span class="text-xs">ABC</span>
        <div class="mt-4">
          <ul class="list-decimal list-inside">
            <template v-for="(chunk, i) in iterate.output" :key="i">
              <li>{{chunk}}</li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </template>
</template>