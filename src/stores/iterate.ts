import { defineStore } from 'pinia'

type State = 'Pending' | 'Running' | 'Completed' | 'Failed' | 'Terminated'

export const useIterateStore = defineStore('iterate', {
  state: () => {
    return {
      interval: 0,
      limit: 100,
      state: 'Pending' as State,
      index: 0,
      input: '',
      output: [] as string[],
    }
  },
  getters: {
    collection(state): string[] {
      return state.input.split("\n")
    },
    group(state): number {
      let collection = state.input.split("\n")
      if(collection.length === 1) return 0
      if(collection.length <= 10) return 0 + (collection.length / 10)
      if(collection.length <= 100) return 1 + (collection.length / 100)
      if(collection.length <= 1000) return 2 + (collection.length / 1000)
      if(collection.length <= 10000) return 3 + (collection.length / 10000)
      else return 4
    },
    isLocked(state): boolean | undefined {
      let collection = state.input.split("\n")
      let lock = collection.length >= state.limit ? true : undefined
      console.log('lock',lock)
      return lock
    },
    progress(state): number {
      return Math.min((state.index / this.collection.length) * 100, 100)
    },
    isPending (state): boolean {
      return state.state === 'Pending';
    },
    isRunning(state): boolean {
      return state.state === 'Running'
    },
    isDone(state): boolean {
      return state.state === 'Completed' || state.state === 'Terminated' || state.state === 'Failed';
    },
    isFailed(state): boolean {
      return state.state === 'Failed'
    },
    isCompleted(state): boolean {
      return state.state === 'Completed'
    },
    isTerminated(state): boolean {
      return state.state === 'Terminated'
    }
  },
  actions: {
    next() {
      // TODO Fetch Status from API and update index and state
      this.index++
      if(this.index >= this.collection.length) {
        clearInterval(this.interval)
        this.output = new Array(this.collection.length).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
        this.state = 'Completed'
      }
    },
    start() {
      this.state = 'Running'
      this.interval = setInterval(() => this.next(), 10)
    },
    stop() {
      clearInterval(this.interval)
      this.state = 'Terminated'
    },
    reset() {
      clearInterval(this.interval)
      this.state = 'Pending'
      this.index = 0
      this.input = ''
      this.output = []
    },
    
  },
})