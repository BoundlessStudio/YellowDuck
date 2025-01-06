import { defineStore } from 'pinia'

type State = 'Pending' | 'Running' | 'Completed' | 'Failed' | 'Terminated'

export const useIterateStore = defineStore('iterate', {
  state: () => {
    return {
      interval: 0,
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
    progress(state): number {
      return (state.index / this.collection.length) * 100
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