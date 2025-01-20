import { useUserStore } from '@/stores/user'

const URL_BASE = import.meta.env.VITE_API_URL

export interface EnumeratorInput {
  type: string,
  id: string,
  count: number;
  instructions: string;
}

export interface EnumeratorModel {
  url: string
}

export async function runEnumerator(body: EnumeratorInput, signal: AbortSignal | undefined): Promise<EnumeratorModel> {
  const store = useUserStore()

  const headers = await store.headers({
    'Content-Type': 'application/json'
  })
  const request = {
    method: 'POST',
    headers: headers,
    signal: signal,
    body: JSON.stringify(body)
  }
  const response = await fetch(`${URL_BASE}/api/Enumerator_Run`, request)
  console.log('Retry-After', response.headers.get('Retry-After'))

  if(response.ok) {
    const data = await response.json();
    return data as EnumeratorModel
  } else {  
    throw response
  }
}

// export type Status = 'Pending' | 'Running' | 'Completed' | 'Failed' | 'Terminated'

// export interface EnumeratorStatus {
//   instance_id: string;
//   progress: number;
//   index: number;
//   count: number;
//   status: Status;
// }

// export async function startEnumerator(body: EnumeratorInput): Promise<string> {
//   const store = useUserStore()

//   const headers = await store.headers({
//     'Content-Type': 'application/json'
//   })
//   const request = {
//     method: 'POST',
//     headers: headers,
//     body: JSON.stringify(body)
//   }
//   const response = await fetch(`${URL_BASE}/api/Enumerator_Start`, request)

//   if(response.ok) {
//     const { id } = await response.json();
//     return id as string
//   } else {
//     console.log('Retry-After', response.headers.get('Retry-After'))
//     throw response
//   }
// }


// export async function getEnumeratorStatus(id: string): Promise<EnumeratorStatus> {
//   const store = useUserStore()
  
//   const headers = await store.headers()
//   const request = {
//     method: 'GET',
//     headers: headers,
//   }
//   const response = await fetch(`${URL_BASE}/api/Enumerator_Status/${id}`, request);

//   if(response.ok) {
//     const data = await response.json();
//     return data as EnumeratorStatus;
//   } else {
//     throw response
//   }
// }


// export async function terminateEnumerator(id: string) {
//   const store = useUserStore()

//   const headers = await store.headers()
//   const request = {
//     method: 'POST',
//     headers: headers,
//     body: JSON.stringify({
//       instance_id: id
//     })
//   }
//   await fetch(`${URL_BASE}/api/Enumerator_Terminate`, request)
// }