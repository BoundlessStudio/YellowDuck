import { defineStore } from 'pinia';
import { Status } from '@/api/general';
import { ExploreInput, ExploreModel, runExplore } from '@/api/explore';
import { computed, ref } from 'vue';

// https://app.scrapingbee.com/request-builder

export const useExploreStore = defineStore('explore', () => {
  const status = ref<Status>('Pending');
  const progress = ref(0);
  const input = ref<ExploreInput>({
    url: '',
    proxy: 0,
    javascript: 0,
    query: '',
    extract: 0,
    template: 0,
  });
  const output = ref<ExploreModel | undefined>(undefined);
  const cts = ref(new AbortController());

  const isPending = computed(() => status.value === 'Pending');
  const isRunning = computed(() => status.value === 'Running');
  const isDone = computed(() => ['Completed', 'Terminated', 'Failed'].includes(status.value));
  const isFailed = computed(() => status.value === 'Failed');
  const isCompleted = computed(() => status.value === 'Completed');
  const isTerminated = computed(() => status.value === 'Terminated');

  async function explore(): Promise<void> {
    try {
      cts.value = new AbortController();
      status.value = 'Running';
      output.value = await runExplore(input.value, cts.value.signal);
      status.value = 'Completed';
    } catch (error) {
      status.value = 'Failed';
    }
  }

  function stop(): void {
    status.value = 'Terminated';
    cts.value.abort('user terminated');
  }

  function reset(): void {
    status.value = 'Pending';
    input.value = {
      url: '',
      proxy: 0,
      javascript: 0,
      query: '',
      extract: 0,
      template: 0,
    };
    output.value = undefined;
  }

  return {
    // State
    status,
    progress,
    input,
    output,
    cts,

    // Getters
    isPending,
    isRunning,
    isDone,
    isFailed,
    isCompleted,
    isTerminated,

    // Actions
    explore,
    stop,
    reset,
  };
});
