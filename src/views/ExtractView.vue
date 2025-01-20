<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useEnumeratorStore } from '@/stores/enumerator'
import { useExtractStore } from '@/stores/extract'
import { useUserStore } from '@/stores/user'
import { errorHandler } from '@/api/general'
import router from '@/router'

import Header from '@/components/HeaderNavigation.vue'
import Footer from '@/components/Footer.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import FileUpload from '@/components/FileUpload.vue'
import LockIcon from '@/components/LockIcon.vue'

const enumerator = useEnumeratorStore()
const extractStore = useExtractStore()
const userStore = useUserStore()

const fileSizes = {
  '10gb': 1.074e+10,   // 10 GB in bytes
  '1gb': 1.074e+9,     // 1 GB in bytes
  '500mb': 5.243e+8,   // 500 MB in bytes
  '100mb': 1.049e+8,   // 100 MB in bytes
  '50mb': 5.243e+7,    // 50 MB in bytes
  '10mb': 1.049e+7,    // 10 MB in bytes
  '1mb': 1.049e+6,     // 1 MB in bytes
  '1kb': 1024,         // 1 KB in bytes
}

// Extensions accepted by this component
const acceptedExtensions = [
  '.json',
  '.docx',
  '.pdf',
  '.xls',
  '.xlsx',
  '.csv',
  '.ics',
  '.html',
  '.md',
  '.txt',
  '.rtf',
  // '.xml',
  // '.zip',
  // '.sqlite3',
  // '.mdb',
  // '.py'
]

const limit = computed(() => {
  switch (userStore.plan) {
    case 'gold':
      return fileSizes['1gb']; 
    case 'sliver': 
      return fileSizes['100mb']; 
    case 'bronze':
      return fileSizes['50mb']; 
    case 'free':
      return fileSizes['10mb'];
    default:
      return 0;
  }
})

const style = computed(() => {
  if(extractStore.size < fileSizes['1mb']) {
    return 'bg-blue-700'
  } else if (extractStore.size < limit.value) {
    return 'bg-green-700'
  } else {
    return 'bg-red-700'
  }
})

const group = computed(() => {
  if(extractStore.size < fileSizes['1mb']) return 0
  if(extractStore.size <= fileSizes['10mb']) return 0 + (extractStore.size/ fileSizes['10mb'])
  if(extractStore.size <= fileSizes['50mb']) return 1 + (extractStore.size / fileSizes['50mb'])
  if(extractStore.size <= fileSizes['100mb']) return 2 + (extractStore.size / fileSizes['100mb'])
  if(extractStore.size <= fileSizes['1gb']) return 3 + (extractStore.size / fileSizes['1gb'])
  else return 4
})

const isDisabled = ref(true);
watchEffect(() => {
  if(extractStore.size <= 0) {
    isDisabled.value = true
  } else if(extractStore.size > limit.value) {
    isDisabled.value = true
  } else {
    isDisabled.value = false
  }
})

const start = async () => {
  isDisabled.value = true
  try {
    await extractStore.extract()
  } catch (error) {
    errorHandler(error)
  } finally {
    isDisabled.value = false
  }
}

const reset = () => {
  extractStore.reset()
}

const sendtoEnumerate = () => {
  enumerator.transfer(extractStore.output)
  extractStore.reset()
  router.push('/enumerate')
}

</script>

<template>
  <div>
    <Header />

    <div class="border-dashed border-4" style="background-color: #D29401; border-color: #18181b;"></div>

    <section class="bg-zinc-900 " >
      <div class="min-h-screen bg-no-repeat bg-cover" style="background-image: url('/background.0.png');">
        <div class="flex lg:flex-row flex-col container mx-auto">
          <section class="lg:basis-1/2 flex items-stretch justify-center p-6 ">
            <div class="w-full shadow-2xl border-4 border-zinc-900 rounded-2">
              <div class="h-full bg-slate-100 p-8 text-gray-900">
                <h1 class="text-4xl text-center"  style="font-family: 'Luckiest Guy';">Extract</h1>
                <div class="mb-10">
                  <h3 class="text-lg font-semibold">Input File</h3>
                  <p class="text-sm">
                    Upload file and we will split it into chunks for iteration.
                  </p>
                  <div>
                    <FileUpload v-model="extractStore.input" :extensions="acceptedExtensions" />
                  </div>
                  <div class="pt-4">
                    <input id="labels-range-input" type="range" disabled :value="group" min="0" max="4" step="0.01" :class="['w-full h-2 rounded-lg appearance-none range-lg', style]">
                  </div>
                  <div class="flex flex-row justify-between text-center">
                    <div class="text-sm text-gray-500 w-full flex items-center justify-center">
                      <span>&#8249;1 MB</span>
                    </div>
                    <div title="Free Tier" class="w-full">
                      <div class="flex items-center justify-center h-6">
                        <span class="grow border border-dashed border-blue-600 h-0"></span>
                        <LockIcon text-color="text-blue-600" state="unlocked" />
                        <span class="grow border border-dashed border-blue-600 h-0"></span>
                      </div>
                    </div>
                    <div class="text-sm text-gray-500 w-full flex items-center justify-center">
                      <span>10 MB</span>
                    </div>
                    <div title="Bronze Tier" class="w-full">
                      <div v-if="limit < fileSizes['50mb']"  class="flex items-center justify-center">
                        <span class="grow border border-amber-600 h-0"></span>
                        <LockIcon text-color="text-amber-600" />
                        <span class="grow border border-amber-600 h-0"></span>
                      </div>
                      <div v-else class="flex items-center justify-center h-6">
                        <span class="grow border border-dashed border-amber-600 h-0"></span>
                        <LockIcon text-color="text-amber-600" state="unlocked" />
                        <span class="grow border border-dashed border-amber-600 h-0"></span>
                      </div>
                    </div>
                    <div class="text-sm text-gray-500 w-full flex items-center justify-center">
                      <span>50 MB</span>
                    </div>
                    <div title="Sliver Tier" class="w-full">
                      <div v-if="limit < fileSizes['100mb']" class="flex items-center justify-center">
                        <span class="grow border border-gray-600 h-0"></span>
                        <LockIcon text-color="text-gray-600"  />
                        <span class="grow border border-gray-600 h-0"></span>
                      </div>
                      <div v-else class="flex items-center justify-center h-6">
                        <span class="grow border border-dashed border-gray-600 h-0"></span>
                        <LockIcon text-color="text-gray-600" state="unlocked" />
                        <span class="grow border border-dashed border-gray-600 h-0"></span>
                      </div>
                    </div>
                    <div class="text-sm text-gray-500 w-full flex items-center justify-center">
                      <span>100 MB</span>
                    </div>
                    <div title="Gold Tier" class="w-full">
                      <div v-if="limit < fileSizes['1gb']" class="flex items-center justify-center">
                        <span class="grow border border-yellow-500 h-0"></span>
                        <LockIcon textColor="text-yellow-500" />
                        <span class="grow border border-yellow-500 h-0"></span>
                      </div>
                      <div v-else class="flex items-center justify-center h-6">
                        <span class="grow border border-dashed border-yellow-500 h-0"></span>
                        <LockIcon textColor="text-yellow-500" state="unlocked" />
                        <span class="grow border border-dashed border-yellow-500 h-0"></span>
                      </div>
                    </div>
                    <div class="text-sm text-gray-500 w-full flex items-center justify-center">
                      <span>&#8250;1 GB</span>
                    </div>
                  </div>
                </div>
                <div class="mb-8">
                  <h3 class="text-lg font-semibold">Extract</h3>
                  <span class="text-xs">Control the extraction.</span>
                  <div class="py-4 flex flex-row gap-2">
                    <div class="w-full">
                      <button v-if="!extractStore.isRunning"
                        @click="start" 
                        :disabled="isDisabled" 
                        :class="[
                          'py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center disabled:bg-zinc-500 bg-green-600 hover:bg-green-700 text-white', 
                          isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                        ]">
                        <span>Start</span>
                      </button>
                      <button
                        v-if="extractStore.isRunning"
                        @click="extractStore.stop"
                        class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white"
                      >
                        Stop
                      </button>
                    </div>
                  </div>
                  <div class="py-2">
                    <ProgressBar :progress="extractStore.progress" />
                  </div>
                </div>
                <div>
                  <h3 class="text-lg font-semibold">Output File</h3>
                  <span class="text-sm">Download the chunks file or send it to another one of our tools to be used as input.</span>
                  <div class="py-4 flex flex-col gap-2">
                    <a
                    @click="reset" 
                    target="_blank"
                    download="chunks.json"
                    :href="extractStore?.output?.url" 
                    :class="[
                      'py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-zinc-600 hover:bg-zinc-700 text-white',
                      extractStore.isCompleted ? '' : 'opacity-50 cursor-not-allowed'
                    ]">
                      Download Output
                    </a>
                    <button 
                      @click="sendtoEnumerate" 
                      :disabled="!extractStore.isCompleted" 
                      :class="[
                        'py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-zinc-600 hover:bg-zinc-700 text-white',
                        extractStore.isCompleted ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'
                      ]"
                    >
                      Send to Enumerate
                    </button>
                    <button 
                      :disabled="!extractStore.isCompleted" 
                      :class="[
                        'py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-zinc-600 hover:bg-zinc-700 text-white',
                        extractStore.isCompleted ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'
                      ]"
                    >
                      Send to Execute
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
    
    <div class="border-dashed border-4" style="background-color: #18181b; border-color: #78C8E3;"></div>

    <Footer />
  </div>
</template>

<style>
</style>