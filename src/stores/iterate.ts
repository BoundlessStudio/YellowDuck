import { defineStore } from 'pinia'

type State = 'Pending' | 'Running' | 'Completed' | 'Failed' | 'Terminated'

const URL_BASE = import.meta.env.VITE_API_URL

export const useIterateStore = defineStore('iterate', {
  state: () => {
    return {
      id: '',
      interval: 0,
      limit: 100,
      state: 'Pending' as State,
      progress: 0,
      instructions: '',
      input: '',
      output: [] as string[],
    }
  },
  getters: {
    collection(state): string[] {
      const collection = state.input.split("\n")
      if(collection.length === 1)
        return collection[0].split(",")
      else
        return collection
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
      return lock
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
      fetch(`${URL_BASE}/runtime/webhooks/durabletask/instances/${this.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(data => {
        this.state = data.runtimeStatus
        this.progress = data?.customStatus?.progress || 0

        switch(this.state) {
          case 'Completed':
            this.output = data.output
            this.progress = 100
            clearInterval(this.interval)
            break
          case 'Failed':
            clearInterval(this.interval)
            break
          case 'Terminated':
            clearInterval(this.interval)
            break
          default:
            break
        }
      })
      .catch(error => {
        clearInterval(this.interval)
        console.error('Error:', error)
      });
    },
    start() {
      fetch(`${URL_BASE}/api/Iterator_Start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          values: this.collection,
          instructions: this.instructions
        })
      })
      .then(response => response.json())
      .then(data => {
        const { Id } = data;

        console.log('IteratorStart', data)
       
        this.id = Id
        this.interval = setInterval(() => this.next(), 1000)
      })
      .catch(error => {
        console.error('Error:', error);
      });
    },
    stop() {
      fetch(`${URL_BASE}/runtime/webhooks/durabletask/instances/${this.id}/terminate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      .catch(error => {
        console.error('Error:', error)
        clearInterval(this.interval)
      });
    },
    reset() {
      clearInterval(this.interval)
      this.state = 'Pending'
      this.progress = 0
      this.id = ''
      this.instructions = ''
      this.input = ''
      this.output = []
    }
  },
})