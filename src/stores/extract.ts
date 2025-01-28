import { defineStore } from 'pinia'
import { fileExtractor, ExtractorModel } from '@/api/extract'
import { Status } from '@/api/general'
import { computed, ref } from 'vue'

export const useExtractStore = defineStore('extract', () => {
  // Const
  const extensions = [
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
  
  // State
  const status = ref<Status>('Pending')
  const progress = ref(0)
  const input = ref<File | undefined>(undefined)
  const evaluate = ref('')
  const enumerate = ref('')
  const output = ref<ExtractorModel | undefined>(undefined)
  const cts = ref(new AbortController())

  // Getters
  const size = computed(() => input.value?.size || 0)
  const isPending = computed(() => status.value === 'Pending')
  const isRunning = computed(() => status.value === 'Running')
  const isDone = computed(() => 
    ['Completed', 'Terminated', 'Failed'].includes(status.value)
  )
  const isFailed = computed(() => status.value === 'Failed')
  const isCompleted = computed(() => status.value === 'Completed')
  const isTerminated = computed(() => status.value === 'Terminated')

  // Actions
  async function extract(): Promise<void> {
    try {
      cts.value = new AbortController()
      status.value = 'Running'
      output.value = await fileExtractor(input.value, cts.value.signal)
      status.value = 'Completed'
    } catch (error) {
      status.value = 'Failed'
    }
  }

  function stop() {
    status.value = 'Terminated'
    cts.value.abort('user terminated')
  }

  function reset() {
    status.value = 'Pending'
    input.value = undefined
    output.value = undefined
  }

  return {
    // Const
    extensions,
    // State
    status,
    progress,
    input,
    evaluate,
    enumerate,
    output,
    cts,
    // Getters
    size,
    isPending,
    isRunning,
    isDone,
    isFailed,
    isCompleted,
    isTerminated,
    // Actions
    extract,
    stop,
    reset,
  }
})
