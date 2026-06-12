import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const email = ref(localStorage.getItem('user_email') || '')
  const password = ref('')

  const isLoggedIn = computed(() => !!email.value)

  const userName = computed(() => {
    if (!email.value) return ''
    const localPart = email.value.split('@')[0]!
    return localPart
      .split(/[._-]/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
  })

  function login(userEmail: string) {
    email.value = userEmail
    localStorage.setItem('user_email', userEmail)
  }

  function logout() {
    email.value = ''
    password.value = ''
    localStorage.removeItem('user_email')
  }

  return { email, password, isLoggedIn, userName, login, logout }
})
