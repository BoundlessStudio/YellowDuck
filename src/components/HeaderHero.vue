<script setup lang="ts">
  import { useUserStore } from '@/stores/user'
  const store = useUserStore()
</script>

<template>
  <section class="relative bg-zinc-900 text-gray-600 body-font">
    <div class="container mx-auto flex py-10 flex-row items-center">
      <div class="lg:flex-grow mt-0 w-1.5/2 pr-24 md:pr-16 flex flex-col items-start text-left mb-0 ">
        <h1 class="font-extrabold leading-9 tracking-widest mb-3 text-white text-5xl leading-normal font-luckiest-guy" >
          Iterator.one
        </h1>
        <p class="text-white py-4">
          Meet the <b>Iterator.one</b>, your trusty sidekick for everything loop-tastic! 
          We all know AI can be a tough nut to crack, especially when it comes to looping through tasks. 
          But guess what? Iteration is exactly what makes the magic happen! 
        </p>
        <p class="text-white py-4">
          All these essential tasks—Extract (chunkify your data!), Enumerate (transform it!), Explore (crawl a web page!), Execute (run your tasks!), Evaluate (filter it!), and Examine (prompt better!)—require repeating cycles. That’s where our Iterator shines, delivering the looping muscle behind each process to keep your AI rolling smoothly.
          No truncation, No laziness, just enumeration to the end of the iterator, guaranteed!
        </p>
        <p class="text-white py-4">
          Think of it as the ultimate ride, whisking you through each loop while you sit back and watch your AI do the heavy lifting. 
          Ready to hop on? Let’s iterate!
        </p>
        <div class="py-10 flex gap-2">
          <RouterLink to="/extract" class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white">
            Extract
          </RouterLink>
          <RouterLink to="/explore" class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-violet-500 hover:bg-violet-600 text-white">
            Explore
          </RouterLink>
          <RouterLink to="/enumerate" class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white">
            Enumerate
          </RouterLink>
          <RouterLink to="/execute" class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white">
            Execute
          </RouterLink>
          <RouterLink to="/evaluate" class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white">
            Evaluate
          </RouterLink>
          <RouterLink to="/enhance" class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white">
            Enhance
          </RouterLink>
        </div>
      </div>
      <div class="lg:max-w-lg lg:w-full mb-5 md:mb-0 md:w-1/2 w-3/6">
        <img class="object-cover object-center rounded" alt="hero" src="/logo-white.png">
      </div>
    </div>
    <div class="absolute top-5 right-5">
      <a v-if="store.isAuthenticated" href="#" @click="store.logout" class="inline-flex text-gray-700 bg-gray-100 border-0 py-1 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Logout</a>
      <a v-else href="#" @click="store.login" class="inline-flex text-gray-700 bg-gray-100 border-0 py-1 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Login</a>
    </div>
  </section>
</template>
