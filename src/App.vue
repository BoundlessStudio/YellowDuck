<script setup lang="ts">
import Header from '@/components/HeaderSection.vue';
import InputSection from '@/components/InputSection.vue';
import InstructionsInput from '@/components/InstructionsSection.vue';
import ActionSection from '@/components/ActionSection.vue';
import OutputSection from '@/components/OutputSection.vue'
import Footer from '@/components/Footer.vue'
</script>
 
<template>
  <main class="flex flex-row min-h-screen p-5 bg-no-repeat bg-top " style="background-size: 100%; background-image: url('https://i.imgur.com/2xhsiql.jpg');">
    <section class="basis-1/3 flex items-stretch justify-center p-6">
      <div class="w-full h-fit shadow-2xl border-4 border-zinc-900 rounded">
        <div class="h-fit bg-slate-50 p-8 text-gray-900">
          <Header />
          <InputSection />
          <InstructionsInput />
          <ActionSection />
        </div>
      </div>
    </section>
    <section class="basis-2/3 flex items-stretch justify-center p-6">
      <OutputSection />
    </section>
  </main>
  <Footer />
</template>