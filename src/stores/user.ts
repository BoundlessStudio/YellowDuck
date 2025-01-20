import { client } from '../plugins/auth0';
import { defineStore } from 'pinia'
import { unref } from 'vue';

export type Plan = 'gold' | 'sliver' | 'bronze' | 'free'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      client: unref(client),
    }
  },
  getters: {
    isLoading(state): boolean {
      return state.client.isLoading
    },
    isAuthenticated(state): boolean {
      return state.client.isAuthenticated
    },
    plan(state): Plan {
      return state.client.idTokenClaims?.plan || 'free'
    }
    // claims(state): IdToken | undefined {
    //   return state.client.idTokenClaims
    // },
    // user(state): User | undefined {
    //   return state.client.user
    // },
  },
  actions: {
    async headers(headers: any = undefined): Promise<HeadersInit> {
      if(this.isAuthenticated) {
        const token = await this.client.getAccessTokenSilently();
        return { 
          ...headers,
          'Authorization': 'Bearer ' + token,
        }
      } else {
        return { ...headers };
      }
    },
    async login(): Promise<void> {
      await this.client.loginWithRedirect()
    },
    async logout(): Promise<void> {
      await this.client.logout({ logoutParams: { returnTo: window.location.origin } });
    }
  },
})