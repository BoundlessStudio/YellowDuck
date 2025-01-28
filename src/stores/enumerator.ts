import { defineStore } from 'pinia'
import { EnumeratorInput, EnumeratorModel, runEnumerator } from '@/api/enumerator'
import { ExtractorModel } from '@/api/extract'
import { Status } from '@/api/general'
import { computed, ref } from 'vue';

export const useEnumeratorStore = defineStore('enumerator', () => {
  // State
  const status = ref<Status>('Pending');
  const progress = ref(0);
  const input = ref<ExtractorModel | undefined>(undefined);
  const instructions = ref('');
  const output = ref<EnumeratorModel | undefined>(undefined);
  const cts = ref(new AbortController());

  // Getters
  const count = computed(() => input.value?.count || 0);
  const isPending = computed(() => status.value === 'Pending');
  const isRunning = computed(() => status.value === 'Running');
  const isDone = computed(() => ['Completed', 'Terminated', 'Failed'].includes(status.value));
  const isFailed = computed(() => status.value === 'Failed');
  const isCompleted = computed(() => status.value === 'Completed');
  const isTerminated = computed(() => status.value === 'Terminated');

  // Actions
  function transfer(newInput: ExtractorModel | undefined) {
    input.value = newInput;
  }

  async function start() {
    if (!input.value) return;

    try {
      const body: EnumeratorInput = {
        id: input.value.id,
        type: input.value.type,
        count: input.value.count,
        instructions: instructions.value,
      };
      cts.value = new AbortController();
      status.value = 'Running';
      output.value = await runEnumerator(body, cts.value.signal);
      status.value = 'Completed';
    } catch (error) {
      status.value = 'Failed';
    }
  }

  async function stop() {
    status.value = 'Terminated';
    cts.value.abort('user terminated');
  }

  function reset() {
    status.value = 'Pending';
    progress.value = 0;
    instructions.value = '';
    input.value = undefined;
    output.value = undefined;
  }

  return {
    // State
    status,
    progress,
    input,
    instructions,
    output,
    cts,

    // Getters
    count,
    isPending,
    isRunning,
    isDone,
    isFailed,
    isCompleted,
    isTerminated,

    // Actions
    transfer,
    start,
    stop,
    reset,
  };
});
