<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

function handleLogin() {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Email and password are required.'
    return
  }

  auth.login(email.value)
  router.push('/')
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-card">
      <div class="login-header">
        <h1 class="login-title">Welcome Back</h1>
        <p class="login-subtitle">Sign in to your account</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="field-group">
          <label class="field-label" for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="field-input"
            placeholder="chris_evans@example.com"
            autocomplete="email"
          />
        </div>

        <div class="field-group">
          <label class="field-label" for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="field-input"
            placeholder="••••••••"
            autocomplete="current-password"
          />
        </div>

        <p v-if="error" class="error-message">{{ error }}</p>

        <button type="submit" class="login-button">Sign In</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";
.login-wrapper {
  @apply flex min-h-screen items-center justify-center bg-gray-100 px-4;
}

.login-card {
  @apply w-full max-w-md rounded-2xl bg-white p-8 shadow-lg sm:p-10;
}

.login-header {
  @apply mb-8 text-center;
}

.login-title {
  @apply text-3xl font-bold text-gray-900;
}

.login-subtitle {
  @apply mt-2 text-sm text-gray-500;
}

.login-form {
  @apply flex flex-col gap-5;
}

.field-group {
  @apply flex flex-col gap-1.5;
}

.field-label {
  @apply text-sm font-medium text-gray-700;
}

.field-input {
  @apply w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20;
}

.error-message {
  @apply text-center text-sm text-red-500;
}

.login-button {
  @apply mt-2 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800;
}
</style>
