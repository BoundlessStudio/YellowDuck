<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import { useEnumeratorStore } from '@/stores/enumerator'
import { useUserStore } from '@/stores/user'
import { errorHandler } from '@/api/general';

import Header from '@/components/HeaderNavigation.vue'
import Footer from '@/components/Footer.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import RangeDialog from '@/components/RangeDialog.vue';
import ListDialog from '@/components/ListDialog.vue';
import LockIcon from '@/components/LockIcon.vue'

const enumeratorStore = useEnumeratorStore()
const userStore = useUserStore()

const showListDialog = ref(false);
const showRangeDialog = ref(false);

const limit = computed(() => {
  switch (userStore.plan) {
    case 'gold':
      return 100_000;
    case 'sliver':
      return 10_000;
    case 'bronze':
      return 1000;
    case 'free':
      return 100;
    default:
      return 0;
  }
});

const style = computed(() => {
  if (enumeratorStore.count === 1) {
    return 'bg-blue-700'
  } else if (enumeratorStore.count < limit.value) {
    return 'bg-green-700'
  } else {
    return 'bg-red-700'
  }
})

const group = computed(() => {
  if (enumeratorStore.count === 1) return 0
  if (enumeratorStore.count <= 100) return 0 + (enumeratorStore.count / 100)
  if (enumeratorStore.count <= 1000) return 1 + (enumeratorStore.count / 1000)
  if (enumeratorStore.count <= 10_000) return 2 + (enumeratorStore.count / 10_000)
  if (enumeratorStore.count <= 100_000) return 3 + (enumeratorStore.count / 100_000)
  else return 4
})

const isDisabled = ref(true);
watchEffect(() => {
  if(!enumeratorStore.instructions) {
    isDisabled.value = true
  } else if(enumeratorStore.count <= 0) {
    isDisabled.value = true
  } else if(enumeratorStore.count > limit.value) {
    isDisabled.value = true
  } else {
    isDisabled.value = false
  }
})

const start = async () => {
  isDisabled.value = true
  try {
    await enumeratorStore.start()
  } catch(error) {
    errorHandler(error)
  } finally {
    isDisabled.value = false
  }
}

const reset = () => {
  enumeratorStore.reset()
}

</script>

<template>
  <div>

    <Header />

    <div class="border-dashed border-4" style="background-color: #FFDD24; border-color: #18181b;"></div>
    
    <section class="bg-zinc-900">
      <div class="min-h-screen bg-no-repeat bg-cover" style="background-image: url('/background.1.png');">
        <div class="flex lg:flex-row flex-col container mx-auto">
          <section class="lg:basis-1/2 flex items-stretch justify-center p-6">
            <div class="w-full shadow-2xl border-4 border-zinc-900 rounded-2">
              <div class="h-full bg-slate-100 p-8 text-gray-900">
                <h1 class="text-4xl text-center font-luckiest-guy" >
                  Enumerate
                </h1>
                <div class="mb-10">
                  <h3 class="text-lg font-semibold pb-4">Input</h3>
                  <div  class="flex flex-row gap-4 rounded-md shadow-sm w-full mt-2 mb-4" role="group">
                    <RouterLink to="/extract" class="w-full px-4 py-2 text-sm font-medium text-center rounded bg-zinc-600 hover:bg-zinc-700 text-white">
                      Extract
                    </RouterLink>
                    <RouterLink to="/explore" class="w-full px-4 py-2 text-sm font-medium text-center rounded bg-zinc-600 hover:bg-zinc-700 text-white">
                      Explore
                    </RouterLink>
                    <a
                      href="#"
                      @click="showRangeDialog = true"
                      type="button"
                      class="w-full px-4 py-2 text-sm font-medium text-center rounded bg-zinc-600 hover:bg-zinc-700 text-white"
                    >
                      Range
                    </a>
                    <a
                      href="#"
                      @click="showListDialog = true"
                      type="button"
                      class="w-full px-4 py-2 text-sm font-medium text-center rounded bg-zinc-600 hover:bg-zinc-700 text-white"
                    >
                      List
                    </a>
                  </div>
                  <div>
                    <div
                      v-if="enumeratorStore.input"
                      class="border-2 border-dashed border-gray-700 rounded p-4 text-center  hover:border-gray-400 transition-colors drop-zone w-full h-full border-green-500 bg-green-50"
                    >
                      <div  class="text-green-600 font-semibold">
                        {{ enumeratorStore.input.name }} Ready.
                      </div>
                    </div>
                  </div>

                  <!-- Range slider -->
                  <div class="pt-4">
                    <input id="labels-range-input" type="range" disabled :value="group" min="0" max="4" step="0.01" :class="['w-full h-2 rounded-lg appearance-none range-lg', style]" />
                  </div>
                  <div class="flex flex-row justify-between text-center">
                    <div class="text-sm text-gray-500 w-full flex items-center justify-center">
                      <span>&#8249;1</span>
                    </div>
                    <div title="Free Tier" class="w-full">
                      <div class="flex items-center justify-center h-6">
                        <span class="grow border border-dashed border-blue-600 h-0"></span>
                        <LockIcon text-color="text-blue-600" state="unlocked" />
                        <span class="grow border border-dashed border-blue-600 h-0"></span>
                      </div>
                    </div>
                    <div class="text-sm text-gray-500 w-full flex items-center justify-center">
                      <span>100</span>
                    </div>
                    <div title="Bronze Tier" class="w-full">
                      <div v-if="limit < 1000"  class="flex items-center justify-center">
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
                      <span>1K</span>
                    </div>
                    <div title="Sliver Tier" class="w-full">
                      <div v-if="limit < 10_000" class="flex items-center justify-center">
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
                      <span>10K</span>
                    </div>
                    <div title="Gold Tier" class="w-full">
                      <div v-if="limit < 100_000" class="flex items-center justify-center">
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
                      <span>&#8250;100K</span>
                    </div>
                  </div>
                </div>

                <!-- Instructions -->
                <div class="mb-8">
                  <h3 class="text-lg font-semibold">Instructions</h3>
                  <span class="text-xs"
                    >The task for the AI to perform in each iteration.</span
                  >
                  <div class="pt-4">
                    <textarea
                      v-model="enumeratorStore.instructions"
                      placeholder="Enter your instructions here"
                      rows="3"
                      class="w-full bg-slate-50 border border-gray-600 rounded p-2 focus:outline-none focus:border-gray-400 transition-colors"
                    ></textarea>
                  </div>
                </div>

                <!-- Iterate -->
                <div class="mb-8">
                  <h3 class="text-lg font-semibold">Iterate</h3>
                  <span class="text-xs">Control the enumeration.</span>
                  <div class="py-4 flex flex-row gap-2">
                    <div v-if="enumeratorStore.isRunning" class="w-full">
                      <button
                        @click="enumeratorStore.stop"
                        class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white"
                      >
                        Stop
                      </button>
                    </div>
                    <div v-if="enumeratorStore.isPending || enumeratorStore.isDone" class="w-full">
                      <button
                        @click="start"
                        :disabled="isDisabled"
                        :class="[
                          'py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center disabled:bg-zinc-500 bg-green-600 hover:bg-green-700 text-white',
                          isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                        ]"
                      >
                        <span>Start</span>
                      </button>
                    </div>
                    <div v-if="enumeratorStore.isDone" class="w-full">
                      <button
                        @click="enumeratorStore.reset"
                        class="py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-zinc-600 hover:bg-zinc-700 text-white"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                  <div class="py-2">
                    <ProgressBar :progress="enumeratorStore.progress" />
                  </div>
                </div>

                <!-- Output -->
                <div>
                  <h3 class="text-lg font-semibold">Output</h3>
                  <span class="text-xs">Download the enumeration file.</span>
                  <div class="py-4 flex flex-row gap-2">
                    <a
                    @click="reset" 
                    target="_blank"
                    download="enumeration.json"
                    :href="enumeratorStore?.output?.url" 
                    :class="[
                      'py-2 px-6 w-full rounded transition-colors inline-flex items-center justify-center bg-zinc-600 hover:bg-zinc-700 text-white',
                      enumeratorStore.isCompleted ? '' : 'opacity-50 cursor-not-allowed'
                    ]">
                      Download Output
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div class="lg:basis-1/2 hidden"></div>
        </div>
      </div>
    </section>

    <div class="border-dashed border-4" style="background-color: #18181b; border-color: #FFDD24;"></div>

    <Footer />

    <!-- Dialogs -->
    <RangeDialog v-model="enumeratorStore.input" v-model:show="showRangeDialog" />
    <ListDialog v-model="enumeratorStore.input" v-model:show="showListDialog" />
  </div>
</template>