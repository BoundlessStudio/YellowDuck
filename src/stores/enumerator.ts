import { defineStore } from 'pinia'
import { EnumeratorInput, EnumeratorModel, runEnumerator } from '@/api/enumerator'
import { ExtractorModel } from '@/api/extract'
import { Status } from '@/api/general'

export const useEnumeratorStore = defineStore('enumerator', {
  state: () => {
    return {
      status: 'Pending' as Status,
      progress: 0,
      input: undefined as ExtractorModel | undefined,
      instructions: '',
      output: undefined as EnumeratorModel | undefined,
      cts: new AbortController()
      // // Timer
      // interval: undefined as NodeJS.Timeout | undefined,
      // // Instance Id / State / Progression
      // id: '',
      // status: 'Pending' as Status,
      // progress: 0,
      // // Input 
      // instructions: '',
      // input: undefined as ExtractorModel | undefined,
      // // Output
      // output: undefined as File | undefined,
      // // collection: [] as string[],
    }
  },
  getters: {
    count(state): number {
      return state.input?.count || 0;
    },
    isPending (state): boolean {
      return state.status === 'Pending';
    },
    isRunning(state): boolean {
      return state.status === 'Running'
    },
    isDone(state): boolean {
      return state.status === 'Completed' || state.status === 'Terminated' || state.status === 'Failed';
    },
    isFailed(state): boolean {
      return state.status === 'Failed'
    },
    isCompleted(state): boolean {
      return state.status === 'Completed'
    },
    isTerminated(state): boolean {
      return state.status === 'Terminated'
    },
  },
  actions: {
    transfer(input: ExtractorModel | undefined) {
      this.input = input
    },
    async start() {
      if(!this.input) return

      try {
        const body = {
          id: this.input.id,
          type: this.input.type,
          count: this.input.count,
          instructions: this.instructions,
        } as EnumeratorInput
        this.cts = new AbortController()
        this.status = 'Running'
        this.output = await runEnumerator(body, this.cts.signal)
        this.status = 'Completed'
      } catch (error) {
        this.status = 'Failed' 
      }
    },
    async stop() {
      this.status = 'Terminated'
      this.cts.abort('user terminated')
    },
    reset() {
      this.status = 'Pending'
      this.progress = 0
      this.instructions = ''
      this.input = undefined
      this.output = undefined
    }
  }
})