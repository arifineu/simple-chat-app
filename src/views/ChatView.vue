<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { dummyChats, type Chat } from '@/data/dummyChats'
import { useAuthStore } from '@/stores/auth'
import ChatList from '@/components/ChatList.vue'
import ChatDetail from '@/components/ChatDetail.vue'
import Logo from '@/assets/images/logo.vue'

const auth = useAuthStore()
const router = useRouter()
const chats = ref<Chat[]>(dummyChats.map((c) => ({ ...c, messages: [...c.messages] })))
const selectedId = ref<number | null>(null)
const searchQuery = ref('')
const showDropdown = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

onClickOutside(dropdownRef, () => {
  showDropdown.value = false
})

const userInitials = () => {
  if (!auth.userName) return ''
  return auth.userName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const selectedChat = () => chats.value.find((c) => c.id === selectedId.value) ?? null

function selectChat(id: number) {
  selectedId.value = id
}

function goBack() {
  selectedId.value = null
}

function sendMessage(content: string) {
  const chat = chats.value.find((c) => c.id === selectedId.value)
  if (!chat) return
  chat.messages.push({
    id: Date.now(),
    content,
    time: new Date(),
    isMine: true,
  })
}

function handleLogout() {
  showDropdown.value = false
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="chat-layout">
    <nav class="navbar">
      <div class="navbar-brand">
        <Logo class="navbar-logo" />
        <span class="navbar-title">SimpleChatApp</span>
      </div>
      <div ref="dropdownRef" class="navbar-user">
        <button class="user-avatar" @click="showDropdown = !showDropdown">
          {{ userInitials() }}
        </button>
        <div v-if="showDropdown" class="dropdown">
          <div class="dropdown-body">
            <div class="dropdown-avatar">{{ userInitials() }}</div>
            <p class="dropdown-name">{{ auth.userName }}</p>
            <p class="dropdown-email">{{ auth.email }}</p>
          </div>
          <div class="dropdown-divider" />
          <button class="dropdown-signout" @click="handleLogout">Sign Out</button>
        </div>
      </div>
    </nav>

    <div class="chat-body">
      <aside
        class="sidebar"
        :class="selectedId !== null ? 'hidden md:flex' : 'flex'"
      >
        <ChatList
          :chats="chats"
          :search-query="searchQuery"
          :selected-id="selectedId"
          @select="selectChat"
          @update:search-query="searchQuery = $event"
        />
      </aside>
      <main
        class="main-panel"
        :class="selectedId === null ? 'hidden md:flex' : 'flex'"
      >
        <template v-if="selectedChat()">
          <ChatDetail
            :chat="selectedChat()!"
            :user-name="auth.userName"
            @back="goBack"
            @send="sendMessage"
          />
        </template>
        <template v-else>
          <div class="empty-state">
            <p class="empty-text">Select a conversation to start chatting</p>
          </div>
        </template>
      </main>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.chat-layout {
  @apply flex h-dvh flex-col;
}

.navbar {
  @apply flex items-center justify-between bg-blue-600 px-4 py-2.5 shadow-md md:px-6;
}

.navbar-logo {
  @apply h-6 w-6 text-white;
}

.navbar-brand {
  @apply flex items-center gap-2.5;
}

.navbar-title {
  @apply text-lg font-bold text-white;
}

.navbar-user {
  @apply relative flex items-center;
}

.user-avatar {
  @apply flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 text-sm font-bold text-white transition-colors hover:bg-blue-300;
}

.dropdown {
  @apply absolute right-0 z-10 top-full mt-2 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg;
}

.dropdown-body {
  @apply flex flex-col items-center px-4 py-4;
}

.dropdown-avatar {
  @apply mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white;
}

.dropdown-name {
  @apply text-sm font-semibold text-gray-900;
}

.dropdown-email {
  @apply mt-0.5 text-xs text-gray-500;
}

.dropdown-divider {
  @apply border-t border-gray-100;
}

.dropdown-signout {
  @apply w-full px-4 py-2.5 text-left text-sm font-medium text-red-500 transition-colors hover:bg-gray-50;
}

.chat-body {
  @apply flex flex-1 overflow-hidden;
}

.sidebar {
  @apply w-full flex-col border-r border-gray-200 bg-white md:w-80 md:min-w-80;
}

.main-panel {
  @apply flex-1 flex-col;
}

.empty-state {
  @apply flex flex-1 flex-col items-center justify-center gap-3 bg-gray-50;
}

.empty-text {
  @apply text-sm text-gray-400;
}
</style>
