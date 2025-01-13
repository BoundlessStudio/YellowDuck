import { defineStore } from 'pinia'

type State = 'Pending' | 'Running' | 'Completed' | 'Failed' | 'Terminated'

const URL_BASE = import.meta.env.VITE_API_URL
const API_CODE = import.meta.env.VITE_API_CODE

export const useIterateStore = defineStore('iterate', {
  state: () => {
    return {
      // Timer
      interval: undefined as NodeJS.Timeout | undefined,
      // Instance Id / State / Progression
      id: '',
      state: 'Pending' as State,
      progress: 0,
      // Input Instructions / Collection
      instructions: '',
      input: '',
      // Output
      output: [] as string[],
      // Auth0
      token: '',
      isAuthenticated: false,
      plan: 'free',
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
    limit(state): number {
      switch (state.plan) {
        case 'gold':
          return 10000;
        case 'sliver':
          return 10000;
        case 'bronze':
          return 1000;
        case 'free':
        default:
          return 100;
      }
    },
    group(_): number {
      if(this.collection.length === 1) return 0
      if(this.collection.length <= 10) return 0 + (this.collection.length / 10)
      if(this.collection.length <= 100) return 1 + (this.collection.length / 100)
      if(this.collection.length <= 1000) return 2 + (this.collection.length / 1000)
      if(this.collection.length <= 10000) return 3 + (this.collection.length / 10000)
      else return 4
    },
    isLocked(_): boolean | undefined {
      let lock = this.collection.length >= this.limit ? true : undefined
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
    },
    headers(state): HeadersInit {
      if(state.isAuthenticated) {
        return { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.token
        }
      } else {
        return { 
          'Content-Type': 'application/json'
        }
      }
    }
  },
  actions: {
    authenticateLoaded(isAuthenticated: boolean, token: string, plan: string) {
      this.isAuthenticated = isAuthenticated
      this.token = token
      this.plan = plan
    },
    next() {
      const url = `${URL_BASE}/runtime/webhooks/durabletask/instances/${this.id}?code=${API_CODE}`
      fetch(url, {
        method: 'GET',
        headers: this.headers,
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
    async start() {
      if(this.isLocked === true) {
        throw new Error('Exceeds enumeration limit.')
      }
      if(this.collection.length === 0) {
        throw new Error('Input Collection is blank.')
      }
      if(this.collection.length === 1 && this.collection[0] === '') {
        throw new Error('Input Collection is blank.')
      }
      if(this.instructions === '') {
        throw new Error('Instructions is blank.')
      }

      const url = `${URL_BASE}/api/Iterator_Start`
      const response = await fetch(url, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          values: this.collection,
          instructions: this.instructions
        })
      })

      if(response.ok) {
        const { id } = await response.json();
        this.id = id
        this.interval = setInterval(() => this.next(), 1000)
        this.next()
      } else {
        throw response
      }
    },
    async stop() {
      try {
        const url = `${URL_BASE}/runtime/webhooks/durabletask/instances/${this.id}/terminate?reason=Canceled&code=${API_CODE}`;
        await fetch(url, {
          method: 'POST',
          headers: this.headers,
        })
      } catch (error) {
        clearInterval(this.interval)
      }
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