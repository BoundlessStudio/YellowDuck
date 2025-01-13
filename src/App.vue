<script setup lang="ts">
import { watch } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useIterateStore } from '@/stores/iterate'
import Loading from '@/components/Loading.vue'

const iterate = useIterateStore()
const { isLoading, isAuthenticated, idTokenClaims, getAccessTokenSilently } = useAuth0()

watch(isLoading, async (_) => {
	const authenticated = isAuthenticated.value
	const plan = idTokenClaims.value?.plan || 'free'
	const token = authenticated ? await getAccessTokenSilently() : ''
	iterate.authenticateLoaded(authenticated, token, plan)
})
</script>
 
<template>
	<div v-if="isLoading">
		<Loading />
	</div>
	<div v-else>
		<RouterView />
	</div>
</template>

<style>
</style>
