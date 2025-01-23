import { useUserStore } from '@/stores/user'

const URL_BASE = import.meta.env.VITE_API_URL

export interface ExploreInput {
  url: string,
  proxy: number,
  javascript: number,
  extract: number,
  query: string,
  template: number,
}

export interface ExploreModel {
  url: string
}

export async function runExplore(data: ExploreInput | undefined, signal: AbortSignal | undefined): Promise<ExploreModel> {
  const store = useUserStore()

  const headers = await store.headers({
    'Content-Type': 'application/json'
  })

  const request = {
    method: 'POST',
    headers: headers,
    signal: signal,
    body: JSON.stringify(data)
  }
  const response = await fetch(`${URL_BASE}/api/Explore_Run`, request) 

  if(response.ok) {
    const data = await response.json()
    return data as ExploreModel
  } else {
    throw response
  }
}