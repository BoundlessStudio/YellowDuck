import { useUserStore } from '@/stores/user'

const URL_BASE = import.meta.env.VITE_API_URL

export interface ExtractorModel {
  type: string,
  id: string,
  name: string;
  url: string;
  count: number;
  size: number;
}

// const controller = new AbortController();

export async function rangeExtractor(max: number): Promise<ExtractorModel> {
  const store = useUserStore()
  const headers = await store.headers({
    'Content-Type': 'application/json'
  })
  const request = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      max: max
    })
  }
  const response = await fetch(`${URL_BASE}/api/Extractor_Range`, request) 

  if(response.ok) {
    const data = await response.json()
    return data as ExtractorModel
  } else {
    throw response
  }
}

export async function listExtractor(input: string): Promise<ExtractorModel> {
  const store = useUserStore()
  const headers = await store.headers({
    'Content-Type': 'application/json'
  })
  const request = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      input: input
    })
  }
  const response = await fetch(`${URL_BASE}/api/Extractor_List`, request) 

  if(response.ok) {
    const data = await response.json()
    return data as ExtractorModel
  } else {
    throw response
  }
}

export async function fileExtractor(file: File | undefined, signal: AbortSignal | undefined): Promise<ExtractorModel> {
  const store = useUserStore()

  const headers = await store.headers()
  const form = new FormData();
  if(file) form.append("input", file);

  const request = {
    method: 'POST',
    headers: headers,
    signal: signal,
    body: form
  }
  const response = await fetch(`${URL_BASE}/api/Extractor_File`, request) 

  if(response.ok) {
    const data = await response.json()
    return data as ExtractorModel
  } else {
    throw response
  }
}