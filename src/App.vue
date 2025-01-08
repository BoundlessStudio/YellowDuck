<script setup lang="ts">
import Header from '@/components/HeaderSection.vue';
import InputSection from '@/components/InputSection.vue';
import InstructionsInput from '@/components/InstructionsSection.vue';
import ActionSection from '@/components/ActionSection.vue';
import OutputSection from '@/components/OutputSection.vue'
import Footer from '@/components/Footer.vue'
</script>
 
<template>
  <div style="background: linear-gradient(270deg, rgba(255,214,2,1) 0%, rgba(255,223,40,1) 50%, rgba(254,218,0,1) 100%);" >
    <main class="flex lg:flex-row flex-col min-h-screen bg-no-repeat bg-top bg-size-100" style="background-image: url('https://i.imgur.com/w5cvnXU.jpg');">
      <section class="lg:basis-1/3 lg:pt-6 pt-20 flex items-stretch justify-center p-6">
        <div class="w-full h-fit shadow-2xl border-4 border-zinc-900 rounded">
          <div class="h-fit bg-slate-50 p-8 text-gray-900">
            <Header />
            <InputSection />
            <InstructionsInput />
            <ActionSection />
          </div>
        </div>
      </section>
      <section class="lg:basis-2/3 flex items-stretch justify-center p-6">
        <OutputSection />
      </section>
      
    </main>
    <Footer />
  </div>
</template>

<style scoped>
</style>