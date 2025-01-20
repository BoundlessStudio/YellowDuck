import { Auth0VueClient } from "@auth0/auth0-vue";
import { ref, Ref, App } from "vue";

// @ts-ignore
export const client: Ref<Auth0VueClient> = ref(null);

export function exposeAuth0() {
  return {
    install(app: App) {
      client.value = app.config.globalProperties['$auth0']
    }
  }
}