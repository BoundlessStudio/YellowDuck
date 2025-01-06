<script setup lang="ts">
import Card from './components/Card.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <main class="flex flex-row min-h-screen p-5 bg-cover bg-no-repeat bg-center" style="background-image: url('https://i.imgur.com/9yt5WWI.jpg');">
    <section class="basis-1/2 flex items-center justify-center pl-6 pr-48">
      <Card />
    </section>
    <section class="basis-1/2"></section>
  </main>
  <Footer />
</template>