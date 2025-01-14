<script setup lang="ts">
  import { useAuth0 } from '@auth0/auth0-vue';
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  
  const loginHandler = () => {
    loginWithRedirect();
  }
  const logoutHandler = () => {
    logout();
  }
</script>

<template>
  <section class="relative bg-zinc-900 text-gray-600 body-font">
    <div class="container mx-auto flex py-10 flex-row items-center">
      <div class="lg:flex-grow mt-0 w-1.5/2 pr-24 md:pr-16 flex flex-col items-start text-left mb-0 ">
        <h1 class="font-extrabold leading-9 tracking-widest mb-3 text-white text-5xl leading-normal" style="font-family: 'Luckiest Guy';">
          Iterator.one
        </h1>
        <p class="text-white py-4">
          In today’s data-driven world, you need an AI process that won’t skip a beat—or a single element. That is where Iterators shine.
        </p>
        <p class="text-white py-1 leading-relaxed">
          <strong>No Data Left Behind</strong>
          Our iterator-based method guarantees you process every last piece of information. No missed items, no abrupt truncations.
        </p>
        <p class="text-white py-1 leading-relaxed">
          <strong>Uninterrupted Flow</strong>
          By automatically stepping through each chunk, you maintain momentum in your AI tasks—without the hassle of manual handling.
        </p>
        <p class="text-white py-1 leading-relaxed">
          <strong>Scalable & Efficient</strong>
          As your data grows, our iterator-driven approach effortlessly scales, need more buy more, so you can focus on innovation.
        </p>
        <p class="text-white py-1 leading-relaxed">
          <strong>Holistic & Independent</strong>
          From extraction to enumerate, explore to evaluate, each tool is optimized to work together, but each tool is isolated allowing, you to mix and match to fit your needs.
        </p>
        <div class="py-10 flex gap-2">
          <RouterLink to="/extract" class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white">
            Extract
          </RouterLink>
          <RouterLink to="/enumerate" class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white">
            Enumerate
          </RouterLink>
          <RouterLink to="/explore" class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-violet-500 hover:bg-violet-600 text-white">
            Explore
          </RouterLink>
          <RouterLink to="/execute" class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white">
            Execute
          </RouterLink>
          <RouterLink to="/evaluate" class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white">
            Evaluate
          </RouterLink>
        </div>
      </div>
      <div class="lg:max-w-lg lg:w-full mb-5 md:mb-0 md:w-1/2 w-3/6">
        <img class="object-cover object-center rounded" alt="hero" src="/logo-white.png">
      </div>
    </div>
    <div class="absolute top-5 right-5">
      <a v-if="isAuthenticated" href="#" @click="logoutHandler" class="inline-flex text-gray-700 bg-gray-100 border-0 py-1 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Logout</a>
      <a v-else href="#" @click="loginHandler" class="inline-flex text-gray-700 bg-gray-100 border-0 py-1 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Login</a>
    </div>
  </section>
</template>
