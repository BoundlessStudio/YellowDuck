<script setup lang="ts">
import { reactive, watch, onMounted } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useIterateStore } from '@/stores/iterate'
import Footer from '@/components/Footer.vue'

const iterate = useIterateStore()
const auth = reactive(useAuth0())

onMounted(() => {
	watch(auth, async (authState) => {
    const token = authState.isAuthenticated ? await authState.getAccessTokenSilently() : '00000000-0000-0000-0000-000000000000'
		iterate.authenticateChange(token, authState.isAuthenticated)
	})
})
</script>
 
<template>
  <div style="background: linear-gradient(270deg, rgba(255,214,2,1) 0%, rgba(255,223,40,1) 50%, rgba(254,218,0,1) 100%);" >
    <div class="min-h-screen bg-no-repeat bg-top bg-size-100" style="background-image: url('/background.0.png');">
      <RouterView />
      <Footer />
    </div>
  </div>
</template>

<style scoped>
</style>