import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

beforeEach(() => {
  localStorage.clear()
  setActivePinia(createPinia())
})

describe('useAuthStore', () => {
  it('starts as not logged in', () => {
    const auth = useAuthStore()
    expect(auth.isLoggedIn).toBe(false)
    expect(auth.userName).toBe('')
    expect(auth.email).toBe('')
  })

  it('login sets email and persists to localStorage', () => {
    const auth = useAuthStore()
    auth.login('chris_evans@example.com')

    expect(auth.isLoggedIn).toBe(true)
    expect(auth.email).toBe('chris_evans@example.com')
    expect(localStorage.getItem('user_email')).toBe('chris_evans@example.com')
  })

  it('derives userName from email with underscores', () => {
    const auth = useAuthStore()
    auth.login('chris_evans@example.com')
    expect(auth.userName).toBe('Chris Evans')
  })

  it('derives userName from email with dots', () => {
    const auth = useAuthStore()
    auth.login('john.doe@example.com')
    expect(auth.userName).toBe('John Doe')
  })

  it('derives userName from email with hyphens', () => {
    const auth = useAuthStore()
    auth.login('mary-jane@example.com')
    expect(auth.userName).toBe('Mary Jane')
  })

  it('logout clears state and localStorage', () => {
    const auth = useAuthStore()
    auth.login('test@example.com')
    auth.password = 'secret'

    auth.logout()

    expect(auth.isLoggedIn).toBe(false)
    expect(auth.email).toBe('')
    expect(auth.password).toBe('')
    expect(localStorage.getItem('user_email')).toBeNull()
  })

  it('restores email from localStorage on init', () => {
    localStorage.setItem('user_email', 'restored@example.com')
    setActivePinia(createPinia())

    const auth = useAuthStore()
    expect(auth.isLoggedIn).toBe(true)
    expect(auth.email).toBe('restored@example.com')
    expect(auth.userName).toBe('Restored')
  })
})
