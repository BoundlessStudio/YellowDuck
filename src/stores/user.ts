import { useAuth0 } from '@auth0/auth0-vue'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export type Plan = 'gold' | 'silver' | 'bronze' | 'free'

export const useUserStore = defineStore('user', () => {
  const {
    isAuthenticated,
    isLoading,
    //user,
    idTokenClaims,
    getAccessTokenSilently,
    loginWithRedirect,
    logout
  } = useAuth0()

  const plan = computed<Plan>(() => {
    return idTokenClaims.value?.plan ?? 'free'
  })

  async function headers(headers: Record<string, string> = {}): Promise<Record<string, string>> {
    if (isAuthenticated.value) {
      const token = await getAccessTokenSilently()
      return {
        ...headers,
        Authorization: 'Bearer ' + token
      }
    }
    return headers
  }

  async function loginHandler() {
    await loginWithRedirect()
  }

  async function logoutHandler() {
    await logout({ logoutParams: { returnTo: window.location.origin } })
  }

  return {
    // Refs from Auth0
    isAuthenticated,
    isLoading,

    // Computed
    plan,

    // Methods
    headers,
    login: loginHandler,
    logout: logoutHandler
  }
})
