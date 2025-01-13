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
  <section class="relative my-section bg-zinc-900 text-gray-600 body-font pb-96">
    <div class="container mx-auto flex md:px-24 md:py-10 md:flex-row flex-col items-center">
      <div class="lg:flex-grow mt-5 md:mt-0   md:w-1.5/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 class="text-2xl font-extrabold leading-9 tracking-widest mb-3 text-white sm:text-4xl sm:leading-10 md:text-5xl md:leading-normal" style="font-family: 'Luckiest Guy';">
            Iterator.one
          </h1>
          <p class="mb-8 md:pl-0 text-white pl-2 pr-2 leading-relaxed">
              Short description here, Short description here Short description here Short description here Short
              description here Short description here.
          </p>
          <div class="flex justify-center">
            <a href="#extract" class="inline-flex text-gray-700 bg-sky-400 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Extract</a>
            <a href="#enumerate" class="ml-4 inline-flex text-gray-700 bg-amber-400 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Enumerate</a>
            <a href="#evaluate" class="ml-4 inline-flex text-gray-700 bg-emerald-400 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Evaluate</a>
          </div>
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
