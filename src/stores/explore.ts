import { defineStore } from 'pinia'
import { Status } from '@/api/general'
import { ExploreInput, ExploreModel, runExplore } from '@/api/explore'

// https://app.scrapingbee.com/request-builder

export const useExploreStore = defineStore('explore', {
  state: () => {
    return {
      status: 'Pending' as Status,
      progress: 0,
      input: {
        url: '',
        proxy: 0,
        javascript: 0,
        query: '',
        extract: 0,
        template: 0,
      } as ExploreInput,
      output: undefined as ExploreModel | undefined,
      cts: new AbortController()
    }
  },
  getters: {
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
    async explore(): Promise<void> {
      try {
        this.cts = new AbortController()
        this.status = 'Running'
        this.output = await runExplore(this.input, this.cts.signal)
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
      this.input = {
        url: '',
        proxy: 0,
        javascript: 0,
        query: '',
        extract: 0,
        template: 0,
      } as ExploreInput
      this.output = undefined
    }
  },
})