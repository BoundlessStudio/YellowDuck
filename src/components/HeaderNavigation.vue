<script setup lang="ts">
</script>

<template>
  <nav class="border-zinc-200 bg-zinc-900">
    <div class="max-w-screen-xl flex flex-wrap gap-4 items-center mx-auto p-4">
      <RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/logo-white.png" class="h-8" alt="Iterator.one Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white" style="font-family: 'Luckiest Guy';">Iterator.one</span>
      </RouterLink>
      <div class="w-full block w-auto pl-8" >
        <ul class="font-medium flex flex-row space-x-8 mt-0">
          <li>
            <RouterLink to="/extract" class="text-white hover:text-blue-700">Extract</RouterLink>
          </li>
          <li>
            <RouterLink to="/enumerate" class="text-white hover:text-blue-700">Enumerate</RouterLink>
          </li>
          <li>
            <RouterLink to="/evaluate" class="text-white hover:text-blue-700">Evaluate</RouterLink>
          </li>
          <li>
            <RouterLink to="/crawl" class="text-white hover:text-blue-700">Crawl</RouterLink>
          </li>
          <li>
            <RouterLink to="/generate" class="text-white hover:text-blue-700">Generate</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
