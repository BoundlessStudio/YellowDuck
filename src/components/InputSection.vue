<script setup lang="ts">
</script>

<template>
  <div class="mb-6">
    <h3 class="text-lg font-semibold">Input</h3>
    <span class="text-xs">Enter your text below. We'll process each line as a separate item for enumeration.</span>  
    <div class="p-4 rounded ">
      <textarea 
        placeholder="Enter your items here..."
        rows="5" 
        class="w-full bg-slate-50 border border-gray-600 rounded p-2 focus:outline-none focus:border-gray-400 transition-colors"
      ></textarea>
    </div>
  </div>
</template>