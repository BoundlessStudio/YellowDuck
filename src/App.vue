<script setup lang="ts">
import Footer from '@/components/Footer.vue'
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