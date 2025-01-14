<script setup lang="ts">
import Header from '@/components/HeaderNavigation.vue'
import Footer from '@/components/Footer.vue'

import { useIterateStore } from '@/stores/iterate'
const iterate = useIterateStore()

</script>

<template>
  <div class="my-container">
    <Header />

    <div class="border-dashed border-4" style="background-color: #B598F5; border-color: #18181b;"></div>

    <section class="bg-zinc-900 " >
      <div class="bg-no-repeat bg-cover" style="background-image: url('/background.3.png');">
        <div class="flex lg:flex-row flex-col container mx-auto">
          <section class="lg:basis-1/2 flex items-stretch justify-center p-6 ">
            <div class="w-full min-h-screen shadow-2xl border-4 border-zinc-900 rounded-2">
              <div class="h-full bg-slate-100 p-8 text-gray-900">
                <h1 class="text-4xl text-center"  style="font-family: 'Luckiest Guy';">Explore</h1>
              </div>
            </div>
          </section>
          <div class="lg:basis-1/2 hidden">
          </div>
        </div>
      </div>
    </section>
    
    <div class="border-dashed border-4" style="background-color: #18181b; border-color: #B598F5;"></div>

    <Footer />
  </div>
</template>

<style>
</style>