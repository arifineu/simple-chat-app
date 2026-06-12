<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="home-wrapper">
    <header class="home-header">
      <h1 class="home-title">Hello, {{ auth.userName }}</h1>
      <button class="logout-button" @click="handleLogout">Sign Out</button>
    </header>
    <main class="home-main">
      <p class="home-subtitle">You're signed in as <strong>{{ auth.email }}</strong></p>
    </main>
  </div>
</template>

<style scoped>
@reference "tailwindcss";
.home-wrapper {
  @apply min-h-screen bg-gray-50;
}

.home-header {
  @apply flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4;
}

.home-title {
  @apply text-xl font-semibold text-gray-900;
}

.logout-button {
  @apply rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200;
}

.home-main {
  @apply px-6 py-10;
}

.home-subtitle {
  @apply text-gray-600;
}
</style>
