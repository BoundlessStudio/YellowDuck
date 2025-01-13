<script setup lang="ts">
import { watch } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useIterateStore } from '@/stores/iterate'

const iterate = useIterateStore()
const { isLoading, isAuthenticated, idTokenClaims, getAccessTokenSilently } = useAuth0()

watch(isLoading, async (_) => {
	const authenticated = isAuthenticated.value
	const limit = idTokenClaims.value?.limit || 100
	const token = authenticated ? await getAccessTokenSilently() : ''
	iterate.authenticateLoaded(authenticated, token, limit)
})
</script>
 
<template>
	<RouterView />
</template>

<style>
</style>
