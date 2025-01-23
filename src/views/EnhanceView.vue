<script setup lang="ts">
import Header from '@/components/HeaderNavigation.vue'
import Footer from '@/components/Footer.vue'

</script>

<template>
  <div class="my-container">
    <Header />

    <div class="border-dashed border-4" style="background-color: #f97316; border-color: #18181b;"></div>

    <section class="bg-zinc-900 " >
      <div class="min-h-screen bg-no-repeat bg-cover" style="background-image: url('/background.5.png');">
        <div class="flex lg:flex-row flex-col container mx-auto">
          <section class="lg:basis-1/2 flex items-stretch justify-center p-6 ">
            <div class="w-full shadow-2xl border-4 border-zinc-900 rounded-2">
              <div class="h-96 bg-slate-100 p-8 text-gray-900">
                <h1 class="text-4xl text-center font-luckiest-guy" >Enhance</h1>
                <p class="text-center">Enhance your prompts for better results.</p>
              </div>
            </div>
          </section>
          <div class="lg:basis-1/2 hidden">
          </div>
        </div>
      </div>
    </section>
    
    <div class="border-dashed border-4" style="background-color: #18181b; border-color: #f97316;"></div>

    <Footer />
  </div>
</template>

<style>
</style>