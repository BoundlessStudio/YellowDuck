import { defineStore } from 'pinia'
import { fileExtractor, ExtractorModel } from '@/api/extract'
import { Status } from '@/api/general'

export const useExtractStore = defineStore('extract', {
  state: () => {
    return {
      status: 'Pending' as Status,
      progress: 0,
      input: undefined as File | undefined,
      output: undefined as ExtractorModel | undefined,
      cts: new AbortController()
    }
  },
  getters: {
    size(state) {
      return state.input?.size || 0
    },
    isPending (state): boolean {
      return state.status === 'Pending'
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
    async extract(): Promise<void> {
      try {
        this.cts = new AbortController()
        this.status = 'Running'
        this.output = await fileExtractor(this.input, this.cts.signal)
        this.status = 'Completed'
      } catch (error) {
        this.status = 'Failed' 
      }
    },
    stop(){
      this.status = 'Terminated'
      this.cts.abort('user terminated')
    },
    reset() {
      this.status = 'Pending'
      this.input = undefined
      this.output = undefined
    }
  },
})