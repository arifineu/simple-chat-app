<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Logo from '@/assets/images/logo.vue'

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
        <div class="login-logo-wrapper">
          <Logo class="login-logo" />
        </div>
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
  @apply flex min-h-screen items-center justify-center bg-blue-50 px-4;
}

.login-card {
  @apply w-full max-w-md rounded-2xl border border-white/60 bg-white/80 p-8 shadow-xl shadow-blue-900/5 backdrop-blur-sm sm:p-10;
}

.login-logo-wrapper {
  @apply mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/30;
}

.login-logo {
  @apply h-7 w-7 text-white;
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
  @apply w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20;
}

.error-message {
  @apply text-center text-sm font-medium text-red-500;
}

.login-button {
  @apply mt-2 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 hover:shadow-blue-500/40 active:scale-[0.98];
}
</style>
