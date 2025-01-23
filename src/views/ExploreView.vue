<script setup lang="ts">
import { ref, watchEffect } from 'vue';

import Header from '@/components/HeaderNavigation.vue'
import Footer from '@/components/Footer.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import LockIcon from '@/components/LockIcon.vue'
import { useExploreStore } from '@/stores/explore';

const exploreStore = useExploreStore();

const showAdvanced = ref(false)

const isValidUrl = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

const isDisabled = ref(true);
watchEffect(() => {
  if(isValidUrl(exploreStore.input.url) == false) {
    isDisabled.value = true
  } else {
    isDisabled.value = false
  }
})

const start = () => {
  exploreStore.explore()
}

const reset = () => {
  // exploreStore.reset()
}
</script>

<template>
  <div class="my-container">
    <Header />

    <div class="border-dashed border-4" style="background-color: #B598F5; border-color: #18181b;"></div>

    <section class="" style="background: rgb(215,200,243); background: linear-gradient(90deg, rgba(215,200,243,1) 0%, rgba(139,92,246,1) 100%);" >
      <div class="min-h-screen bg-no-repeat " style="background-size: 100%; background-image: url('/background.3.png');">
        <div class="flex lg:flex-row flex-col container mx-auto">
          <section class="lg:basis-1/2 flex items-stretch justify-center p-6 ">
            <div class="w-full shadow-2xl border-4 border-zinc-900 rounded-2">
              <div class="h-full bg-slate-100 p-8 text-gray-900">
                <h1 class="text-4xl text-center font-luckiest-guy">Explore</h1>
                <div class="mb-8">
                  <h2 class="text-2xl font-semibold">Input</h2>
                  <p class="text-sm">
                    Provide us some direction.
                  </p>
                  <div class="py-2">
                    <h3 class="mb-5 text-lg font-medium text-gray-900">Url</h3>
                    <input v-model="exploreStore.input.url" type="url" placeholder="http://httpbin.org/anything" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  />
                  </div>
                  
                  <div class="py-2">
                    <h3 class="mb-5 text-lg font-medium text-gray-900">Extract</h3>
                    <ul class="grid w-full gap-4 md:grid-cols-3">
                      <li>
                        <input v-model="exploreStore.input.extract" type="radio" id="extract-templates" name="extract" :value="0" class="hidden peer" required />
                        <label for="extract-templates" class="min-h-24 inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-300">
                          <div class="block">
                            <div class="w-full text-lg font-semibold">Templates</div>
                            <div class="w-full">Common predefined rules</div>
                          </div>
                          <LockIcon text-color="text-blue-600" state="unlocked" />
                        </label>
                      </li>
                      <li>
                        <input v-model="exploreStore.input.extract" type="radio" id="extract-query" name="extract" :value="1" class="hidden peer" required />
                        <label for="extract-query" class="min-h-24 inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-300">
                          <div class="block">
                            <div class="w-full text-lg font-semibold">Ai Query</div>
                            <div class="w-full">natural language query.</div>
                          </div>
                          <LockIcon text-color="text-gray-600" />
                        </label>
                      </li>
                      <li class="">
                        <input v-model="exploreStore.input.extract" type="radio" id="extract-rules" name="extract" :value="2" class="hidden peer">
                        <label for="extract-rules" class="min-h-24 inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-300">
                          <div class="block">
                            <div class="w-full text-lg font-semibold">Ai Rules</div>
                            <div class="w-full">Custom AI powered rules.</div>
                          </div>
                          <LockIcon textColor="text-yellow-500" />
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div class="mb-5">
                    <div class="py-2" v-if="exploreStore.input.extract==0">
                      <ul class="grid w-full gap-4 md:grid-cols-3">
                        <li>
                          <input v-model="exploreStore.input.template" type="radio" id="template-table" name="template" checked :value="0" class="hidden peer" required />
                          <label for="template-table" class="min-h-10 inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-300">
                            <div class="block">
                              <div class="w-full text-md font-semibold">Table</div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                            </svg>
                          </label>
                        </li>
                        <li>
                          <input v-model="exploreStore.input.template" type="radio" id="template-links" name="template" :value="1" class="hidden peer" required />
                          <label for="template-links" class="min-h-10 inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-300">
                            <div class="block">
                              <div class="w-full text-md font-semibold">Links</div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                          </label>
                        </li>
                        <li class="">
                          <input v-model="exploreStore.input.template" type="radio" id="template-headings" name="template" :value="2" class="hidden peer">
                          <label for="template-headings" class="min-h-10 inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-300">
                            <div class="block">
                              <div class="w-full text-md font-semibold">Headings</div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" />
                            </svg>
                          </label>
                        </li>
                        <li class="">
                          <input v-model="exploreStore.input.template" type="radio" id="template-emails" name="template" :value="3" class="hidden peer">
                          <label for="template-emails" class="min-h-10 inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-300">
                            <div class="block">
                              <div class="w-full text-md font-semibold">Emails</div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                            </svg>
                          </label>
                        </li>
                        <li class="">
                          <input v-model="exploreStore.input.template" type="radio" id="template-phones" name="template" :value="4" class="hidden peer">
                          <label for="template-phones" class="min-h-10 inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-300">
                            <div class="block">
                              <div class="w-full text-md font-semibold">Phones</div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                            </svg>
                          </label>
                        </li>
                        <li class="">
                          <input v-model="exploreStore.input.template" type="radio" id="template-images" name="template" :value="5" class="hidden peer">
                          <label for="template-images" class="min-h-10 inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-300">
                            <div class="block">
                              <div class="w-full text-md font-semibold">Images</div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                          </label>
                        </li>
                      </ul>
                    </div>
                    <div class="py-2" v-if="exploreStore.input.extract==1">
                      <div>
                        <input v-model="exploreStore.input.query" type="text" placeholder="Specify the information you want to extract from the webpage." class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>
                    </div>
                    <div class="py-2" v-if="exploreStore.input.extract==2">
                      <div class="h-32 flex items-center justify-center">
                        <img src="/coming-soon.png" class="h-full" />
                      </div>
                    </div>
                  </div>
                  <div class="py-2">
                    <h3 @click="showAdvanced = !showAdvanced" class=" text-lg font-medium text-gray-900 border-b cursor-pointer">Advanced</h3>
                  </div>
                  <div v-if="showAdvanced" class="py-2">
                    <h4 class="text-md font-medium text-gray-900">Proxy</h4>
                    <p class="mb-5 text-xs">
                      Tired of getting blocked? You're in the right place! We have a set of proxies and techniques to keep your crawl healthy.
                    </p>
                    <ul class="grid w-full gap-4 md:grid-cols-3">
                      <li>
                        <input v-model="exploreStore.input.proxy" type="radio" id="proxy-classic" name="proxy" :value="0" class="hidden peer" required />
                        <label for="proxy-classic" class="min-h-12 inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-300">
                          <div class="block">
                            <div class="w-full text-lg font-semibold">Classic</div>
                          </div>
                          <LockIcon text-color="text-blue-600" state="unlocked" />
                        </label>
                      </li>
                      <li>
                        <input v-model="exploreStore.input.proxy" type="radio" id="proxy-premium" name="proxy" :value="1" class="hidden peer" required />
                        <label for="proxy-premium" class="min-h-12 inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-300">
                          <div class="block">
                            <div class="w-full text-lg font-semibold">Premium</div>
                          </div>
                          <LockIcon text-color="text-gray-600"  />
                        </label>
                      </li>
                      <li>
                        <input v-model="exploreStore.input.proxy" type="radio" id="proxy-stealth" name="proxy" :value="2" class="hidden peer">
                        <label for="proxy-stealth" class="min-h-12 inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-300">
                          <div class="block">
                            <div class="w-full text-lg font-semibold">Stealth</div>
                          </div>
                          <LockIcon textColor="text-yellow-500" />
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div v-if="showAdvanced"  class="py-2">
                    <h4 class="text-md font-medium text-gray-900">Page</h4>
                    <p class="mb-5 text-xs">
                      Fetching the static HTML works for a large number of websites. 
                      But we also offer the ability to render the HTML via custom web browser. 
                      And even to execute some actions via javascript.
                    </p>
                    <ul class="grid w-full gap-4 md:grid-cols-3">
                      <li>
                        <input v-model="exploreStore.input.javascript" type="radio" id="javascript-none" name="javascript" :value="0" class="hidden peer" required />
                        <label for="javascript-none" class="min-h-12 inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-300">
                          <div class="block">
                            <div class="w-full text-lg font-semibold">Static</div>
                          </div>
                          <LockIcon text-color="text-blue-600" state="unlocked" />
                        </label>
                      </li>
                      <li>
                        <input v-model="exploreStore.input.javascript" type="radio" id="javascript-enabled" name="javascript" :value="1" class="hidden peer" required />
                        <label for="javascript-enabled" class="min-h-12 inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-300">
                          <div class="block">
                            <div class="w-full text-lg font-semibold">Rendered</div>
                          </div>
                          <LockIcon  />
                        </label>
                      </li>
                      <li class="">
                        <input v-model="exploreStore.input.javascript" type="radio" id="javascript-script" name="javascript" :value="2" class="hidden peer">
                        <label for="javascript-script" class="min-h-12 inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-300">
                          <div class="block">
                            <div class="w-full text-lg font-semibold">Javascript</div>
                          </div>
                          <LockIcon textColor="text-yellow-500" />
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="mb-8">
                  <h3 class="text-lg font-semibold">Explore</h3>
                  <span class="text-xs">Control the exploration.</span>
                  <div class="py-4 flex flex-row gap-2">
                    <div class="w-full">
                      <button 
                        v-if="!exploreStore.isRunning"
                        :disabled="isDisabled" 
                        @click="start"
                        :class="[
                          'py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center disabled:bg-zinc-500 bg-green-600 hover:bg-green-700 text-white', 
                          isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                        ]">
                        <span>Start</span>
                      </button>
                      <button
                        v-if="exploreStore.isRunning"
                        @click="exploreStore.stop"
                        class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white"
                      >
                        Stop
                      </button>
                    </div>
                  </div>
                  <div class="py-2">
                    <ProgressBar :progress="exploreStore.progress" />
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-semibold">Output</h3>
                  <span class="text-xs">Download the exploration file.</span>
                  <div class="py-4 flex flex-row gap-2">
                    <a
                    @click="reset" 
                    target="_blank"
                    download="enumeration.json"
                    :href="exploreStore?.output?.url" 
                    :class="[
                      'py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-zinc-600 hover:bg-zinc-700 text-white',
                      exploreStore.isCompleted ? '' : 'opacity-50 cursor-not-allowed'
                    ]">
                      Download Output
                    </a>
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
    
    <div class="border-dashed border-4" style="background-color: #18181b; border-color: #B598F5;"></div>

    <Footer />
  </div>
</template>

<style>
</style>