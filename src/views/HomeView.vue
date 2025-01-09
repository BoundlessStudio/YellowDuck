<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useIterateStore } from '@/stores/iterate'

import Header from '@/components/HeaderSection.vue';
import InputSection from '@/components/InputSection.vue';
import InstructionsInput from '@/components/InstructionsSection.vue';
import ActionSection from '@/components/ActionSection.vue';
import OutputSection from '@/components/OutputSection.vue'

const router = useRouter();
const iterate = useIterateStore()

onMounted(() => {
  const query = router.currentRoute.value.query;
  if(Array.isArray(query.i)) {
    iterate.input = query.i.map((item) => item as string).join('\n');
  } else if(query.i) {
    iterate.input = query.i.trim();
  }
})
</script>
 
<template>
  <main class="flex lg:flex-row flex-col min-h-screen ">
    <section class="lg:basis-1/3 lg:pt-6 pt-20 flex items-stretch justify-center p-6 ">
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
</template>

<style scoped>
</style>