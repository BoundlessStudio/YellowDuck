<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import { useUserStore } from '@/stores/user'
const store = useUserStore()

</script>
 
<template>
	<div v-if="store.isLoading">
		<Loading />
	</div>
	<div v-else>
		<RouterView />
	</div>
</template>

<style>
</style>
