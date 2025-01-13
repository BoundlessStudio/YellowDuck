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

    <section id="extract" class="my-section bg-zinc-900" >
      <div class="h-screen bg-no-repeat bg-cover" style="background-image: url('/background.0.png');">
        <div class="flex lg:flex-row flex-col h-screen">
          <div class="lg:basis-1/3 flex items-stretch justify-center p-6 ">
            <div class="w-full h-full shadow-2xl border-4 border-zinc-900 rounded">
              <div class="h-full bg-slate-100  p-8 text-gray-900">
                <h1 class="text-4xl text-center" style="font-family: 'Luckiest Guy';">Extract</h1>
                <ExtractInputSection />
                <ExtractInstructionsInput />
                <ExtractActionSection />
              </div>
            </div>
          </div>
          <div class="lg:basis-2/3 hidden">
          </div>
        </div>
      </div>
    </section>
    
    <div class="border-dashed border-4" style="background-color: #FFEA75; border-color: #78C8E3;"></div>
    
    <section  id="enumerate" class="my-section bg-zinc-900 " >
      <div class="h-screen bg-no-repeat bg-cover" style="background-image: url('/background.1.png');">
        <div class="flex lg:flex-row flex-col h-screen">
          <div class="lg:basis-1/3">
          </div>
          <section class="lg:basis-1/3 flex items-stretch justify-center p-6 ">
            <div class="w-full h-full shadow-2xl border-4 border-zinc-900 rounded-2">
              <div class="h-full bg-slate-100 p-8 text-gray-900">
                <h1 class="text-4xl text-center"  style="font-family: 'Luckiest Guy';">Enumerate</h1>
                <EnumerateInputSection />
                <EnumerateInstructionsInput />
                <EnumerateActionSection />
              </div>
            </div>
          </section>
          <div class="lg:basis-1/3">
          </div>
        </div>
      </div>
    </section>
    
    <div class="border-dashed border-4" style="background-color: #57C28E; border-color: #FFDD24;"></div> 

    <section  id="evaluate" class="my-section bg-zinc-900 " >
      <div class="h-screen bg-no-repeat bg-cover" style="background-image: url('/background.2.png');">
        <div class="flex lg:flex-row flex-col h-screen">
          <div class="lg:basis-2/3 flex items-stretch justify-center p-6">
          </div>
          <section class="lg:basis-1/3 flex items-stretch justify-center p-6 ">
            <div class="w-full h-full shadow-2xl border-4 border-zinc-900 rounded">
              <div class="h-full bg-slate-100 p-8 text-gray-900">
                <h1 class="text-4xl text-center"  style="font-family: 'Luckiest Guy';">Evaluate</h1>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>

    <div class="border-dashed border-4" style="background-color: #18181b; border-color: #57C28E;"></div> 

    <Footer />
  </div>
</template>

<style>
/* .my-container {
  height: 100vh;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
	overflow-x: hidden;
}
.my-section {
  scroll-snap-align: start;
} */
</style>