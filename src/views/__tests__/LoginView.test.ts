import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import LoginView from '@/views/LoginView.vue'

const mockPush = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush }),
}))

beforeEach(() => {
  localStorage.clear()
  setActivePinia(createPinia())
  mockPush.mockClear()
})

describe('LoginView', () => {
  function mountLogin() {
    return mount(LoginView)
  }

  it('renders email and password inputs', () => {
    const wrapper = mountLogin()
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
  })

  it('renders sign in button', () => {
    const wrapper = mountLogin()
    expect(wrapper.find('button[type="submit"]').text()).toBe('Sign In')
  })

  it('shows error when submitting with empty fields', async () => {
    const wrapper = mountLogin()
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Email and password are required')
  })

  it('shows error when submitting with only email', async () => {
    const wrapper = mountLogin()
    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Email and password are required')
  })

  it('does not show error when both fields are filled', async () => {
    const wrapper = mountLogin()
    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('password123')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).not.toContain('Email and password are required')
    expect(mockPush).toHaveBeenCalledWith('/')
  })
})
