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
  <section class="relative my-section bg-zinc-900 text-gray-600 body-font ">
    <div class="container mx-auto flex md:px-24 md:py-10 md:flex-row flex-col items-center">
      <div class="lg:flex-grow mt-5 md:mt-0 md:w-1.5/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 class="text-2xl font-extrabold leading-9 tracking-widest mb-3 text-white sm:text-4xl sm:leading-10 md:text-5xl md:leading-normal" style="font-family: 'Luckiest Guy';">
            Iterator.one
          </h1>
          <p class="text-white py-1 leading-relaxed">
            <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Extract</span> 
            refers to the process of identifying and retrieving specific pieces of information from a larger body of content. 
            In a practical sense, this could mean pulling out key details from a text document or collecting relevant data points from a massive dataset. 
            By focusing only on what is necessary, extractive methods help streamline information gathering and simplify subsequent analysis.
            The process of extraction is should highlight the most important elements and minimize noise.
          </p>
          <p class="text-white py-1 leading-relaxed">
            <span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Enumerate</span> 
            comes into play once relevant data has been chunked. 
            Enumeration involves walking through each piece of extracted information (in a loop) so that each element can be accessed, processed, or manipulated. 
            This allows for the Ai to be invoked on each iteration. 
            By enumerating in this manner, we can guarantee the complete iteration of the collection, instead of the Ai giving up or being lazy when dealing with a large number of items.
          </p>
      </div>
      <div class="lg:max-w-lg lg:w-full mb-5 md:mb-0 md:w-1/2 w-3/6">
          <img class="object-cover object-center rounded" alt="hero" src="https://i.imgur.com/QOhBhO1.png">
      </div>
    </div>
    <div class="absolute top-5 right-5">
      <a v-if="isAuthenticated" href="#" @click="logoutHandler" class="inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Logout</a>
      <a v-else href="#" @click="loginHandler" class="inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Login</a>
    </div>
  </section>
</template>
