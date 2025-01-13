<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import EnumerateInputSection from '@/components/enumerate/InputSection.vue';
import EnumerateInstructionsInput from '@/components/enumerate/InstructionsSection.vue';
import EnumerateActionSection from '@/components/enumerate/ActionSection.vue';
import ExtractInputSection from '@/components/extract/InputSection.vue';
import ExtractInstructionsInput from '@/components/extract/InstructionsSection.vue';
import ExtractActionSection from '@/components/extract/ActionSection.vue';

</script>

<template>
  <div class="my-container">
    <Header />

    <div class="border-dashed border-4" style="background-color: #D29401; border-color: #18181b;"></div>

    <section  id="extract" class="my-section bg-zinc-900" >
      <div class=" bg-no-repeat bg-cover" style="background-image: url('/background.0.png');">
        <div class="flex lg:flex-row flex-col container mx-auto">
          <div class="lg:basis-1/2 flex items-stretch justify-center p-6 ">
            <div class="w-full min-h-screen shadow-2xl border-4 border-zinc-900 rounded">
              <div class="h-full bg-slate-100  p-8 text-gray-900">
                <h1 class="text-4xl text-center" style="font-family: 'Luckiest Guy';">Extract</h1>
                <ExtractInputSection />
                <ExtractInstructionsInput />
                <ExtractActionSection />
                <div>
                  <h3 class="text-lg font-semibold">Output</h3>
                  <span class="text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
                  <div class="py-4 flex flex-row gap-2">
                    <button class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-zinc-600 hover:bg-zinc-700 text-white">
                      Download Chunks
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:basis-1/2 hidden">
          </div>
        </div>
      </div>
    </section>
    
    <div class="border-dashed border-4" style="background-color: #FFEA75; border-color: #78C8E3;"></div>
    
    <section id="enumerate" class="my-section bg-zinc-900 " >
      <div class="bg-no-repeat bg-cover" style="background-image: url('/background.1.png');">
        <div class="flex lg:flex-row flex-col container mx-auto">
          <section class="lg:basis-1/2 flex items-stretch justify-center p-6 ">
            <div class="w-full min-h-screen shadow-2xl border-4 border-zinc-900 rounded-2">
              <div class="h-full bg-slate-100 p-8 text-gray-900">
                <h1 class="text-4xl text-center"  style="font-family: 'Luckiest Guy';">Enumerate</h1>
                <EnumerateInputSection /> 
                <EnumerateInstructionsInput />
                <EnumerateActionSection />
                <div>
                  <h3 class="text-lg font-semibold">Output</h3>
                  <span class="text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
                  <div class="py-4 flex flex-row gap-2">
                    <button class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-zinc-600 hover:bg-zinc-700 text-white">
                      Download Collection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div class="lg:basis-1/2 hidden">
          </div>
        </div>
      </div>
    </section>
    
    <div class="border-dashed border-4" style="background-color: #18181b; border-color: #FFDD24;"></div> 

    <Footer />
  </div>
</template>

<style>
</style>