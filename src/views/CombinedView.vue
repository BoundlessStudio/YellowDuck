<script setup lang="ts">
// import { computed, ref, watchEffect } from 'vue'
// import { useEnumeratorStore } from '@/stores/enumerator'
import { useExtractStore } from '@/stores/extract'
// import { useUserStore } from '@/stores/user'

// import Header from '@/components/HeaderNavigation.vue'
import Footer from '@/components/Footer.vue'
import FileUpload from '@/components/FileUpload.vue'
import ProgressBar from '@/components/ProgressBar.vue';

const extractStore = useExtractStore()

</script>

<template>
  <div>
    <!-- <Header /> -->

    <section class="bg-zinc-800">
      <div class="h-screen bg-no-repeat" style="background-size: 100%; background-position: 0 -100px; background-image: url('/background.1.png');backdrop-filter: brightness(60%);">
        <div class="flex lg:flex-row flex-col container mx-auto" >
          <div class="lg:basis-1/3 flex items-stretch justify-center p-6">

            <article class="w-full shadow-2xl border-4 border-zinc-900 rounded-2">
              <div class="h-full bg-slate-100 p-8 text-gray-900">
                <div class="mb-5">
                  <h2 class="text-lg font-luckiest-guy">.slice()</h2>
                  <p class="text-xs h-6">
                    Upload your data to kickstart your transformation journey.
                  </p>
                  <div>
                    <FileUpload v-model="extractStore.input" :extensions="extractStore.extensions" />
                  </div>
                  <div class="py-2">
                    <textarea
                      v-model="extractStore.evaluate"
                      placeholder="Enter your extraction instructions here"
                      rows="3"
                      class="w-full bg-slate-50 border border-gray-600 rounded p-2 focus:outline-none focus:border-gray-400 transition-colors"
                    ></textarea>
                  </div>
                  <div class="py-2">
                    <button 
                      disabled
                      class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white disabled:bg-zinc-500 disabled:opacity-50 disabled:cursor-not-allowed">
                      <span>Slice</span>
                    </button>
                  </div>
                  <div>
                    <ProgressBar :progress="0" />
                  </div>

                </div>
               
              </div>
            </article>
          </div>
          <div class="lg:basis-1/3 flex items-stretch justify-center p-6 ">

            <article class="w-full shadow-2xl border-4 border-zinc-900 rounded-2">
              <div class="h-full bg-slate-100 p-8 text-gray-900">
                <div class="mb-5">
                  <h2 class="text-lg font-luckiest-guy">.filter()</h2>
                  <p class="text-xs h-10">
                    Focus on the data that truly matters by applying clear, intuitive conditions.
                  </p>
                  <div class="py-2">
                    <textarea
                      v-model="extractStore.evaluate"
                      placeholder="Enter your predicate instructions here"
                      rows="7"
                      class="w-full bg-slate-50 border border-gray-600 rounded p-2 focus:outline-none focus:border-gray-400 transition-colors"
                    ></textarea>
                  </div>
                  <div class="py-2">
                    <button 
                    disabled
                    class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white disabled:bg-zinc-500 disabled:opacity-50 disabled:cursor-not-allowed">
                      <span>Filter</span>
                    </button>
                  </div>
                  <div>
                    <ProgressBar :progress="0" />
                  </div>

                </div>
               
              </div>
            </article>
            </div>
            <div class="lg:basis-1/3 flex items-stretch justify-center p-6 ">

            <article class="w-full shadow-2xl border-4 border-zinc-900 rounded-2">
              <div class="h-full bg-slate-100 p-8 text-gray-900">

                <div class="mb-5">
                  <h2 class="text-lg font-luckiest-guy">.map()</h2>
                  <p class="text-xs h-10">
                    Transform raw data into actionable insights with powerful custom logic. 
                  </p>
                  <div class="py-2">
                    <textarea
                      v-model="extractStore.enumerate"
                      placeholder="Enter your projection instructions here"
                      rows="7"
                      class="w-full bg-slate-50 border border-gray-600 rounded p-2 focus:outline-none focus:border-gray-400 transition-colors"
                    ></textarea>
                  </div>
                  <div class="py-2">
                    <button 
                    disabled
                    class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white disabled:bg-zinc-500 disabled:opacity-50 disabled:cursor-not-allowed">
                      <span>Map</span>
                    </button>
                  </div>
                  <div>
                    <ProgressBar :progress="0" />
                  </div>

                </div>
              </div>
            </article>
            </div>
        </div>
      </div>
    </section>

    <section class="h-screen w-full" style="background: linear-gradient(90deg, rgba(254,218,0,1) 0%, rgba(254,224,42,1) 32%, rgba(255,221,10,1) 65%, rgba(254,213,1,1) 100%);">
      <div class="flex lg:flex-row flex-col container mx-auto">
        <div class="w-full flex items-stretch justify-center p-6">

          <article class="min-h-96 w-full shadow-2xl border-4 border-zinc-900 rounded-2">
            <div class="h-full bg-slate-100 p-8 text-gray-900">
              <h2 class="text-lg font-luckiest-guy text-center">Output</h2>
            </div>
          </article>

        </div>
      </div>
    </section>
    
    <Footer />
  </div>
</template>

<style>
</style>