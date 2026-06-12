<script setup lang="ts">
import { computed } from 'vue'
import type { Chat, Message } from '@/data/dummyChats'
import { formatChatTime } from '@/utils/formatTime'

const props = defineProps<{
  chats: Chat[]
  searchQuery: string
  selectedId: number | null
}>()

const emit = defineEmits<{
  select: [id: number]
  'update:search-query': [value: string]
}>()

const isSearching = computed(() => props.searchQuery.trim().length > 0)

const nameResults = computed(() => {
  if (!isSearching.value) return []
  const q = props.searchQuery.toLowerCase()
  return props.chats.filter((c) => c.name.toLowerCase().includes(q))
})

interface MessageResult {
  chatId: number
  chatName: string
  chatAvatar: string
  message: Message
}

const messageResults = computed<MessageResult[]>(() => {
  if (!isSearching.value) return []
  const q = props.searchQuery.toLowerCase()
  const results: MessageResult[] = []
  for (const chat of props.chats) {
    for (const msg of chat.messages) {
      if (msg.content.toLowerCase().includes(q)) {
        results.push({
          chatId: chat.id,
          chatName: chat.name,
          chatAvatar: chat.avatar,
          message: msg,
        })
      }
    }
  }
  return results
})

function lastMessage(chat: Chat) {
  return chat.messages[chat.messages.length - 1]!
}

function messagePreview(msg: Message): string {
  return msg.isMine ? `You: ${msg.content}` : msg.content
}

function highlight(text: string): string {
  const q = props.searchQuery.trim()
  if (!q) return escapeHtml(text)
  const escaped = escapeHtml(text)
  const escapedQ = escapeRegex(q)
  return escaped.replace(new RegExp(`(${escapedQ})`, 'gi'), '<mark class="highlight">$1</mark>')
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function selectAndClear(id: number) {
  emit('select', id)
  emit('update:search-query', '')
}
</script>

<template>
  <div class="chat-list">
    <div class="chat-list-header">
      <div class="search-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
        </svg>
        <input
          :value="searchQuery"
          type="text"
          class="search-input"
          placeholder="Search name or message..."
          @input="$emit('update:search-query', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>

    <!-- Normal chat list (no search) -->
    <ul v-if="!isSearching" class="chat-list-items">
      <li
        v-for="chat in chats"
        :key="chat.id"
        class="chat-item"
        :class="{ 'chat-item--active': selectedId === chat.id }"
        @click="$emit('select', chat.id)"
      >
        <img :src="chat.avatar" :alt="chat.name" class="chat-avatar" />
        <div class="chat-info">
          <span class="chat-name">{{ chat.name }}</span>
          <span class="chat-preview">{{ lastMessage(chat).content }}</span>
        </div>
        <span class="chat-time">{{ formatChatTime(lastMessage(chat).time) }}</span>
      </li>
    </ul>

    <!-- Search results -->
    <div v-else class="chat-list-items">
      <!-- Name matches -->
      <template v-if="nameResults.length">
        <h3 class="section-title">Contacts</h3>
        <ul>
          <li
            v-for="chat in nameResults"
            :key="'name-' + chat.id"
            class="chat-item"
            @click="selectAndClear(chat.id)"
          >
            <img :src="chat.avatar" :alt="chat.name" class="chat-avatar" />
            <div class="chat-info">
              <span class="chat-name" v-html="highlight(chat.name)" />
              <span class="chat-preview">{{ lastMessage(chat).content }}</span>
            </div>
            <span class="chat-time">{{ formatChatTime(lastMessage(chat).time) }}</span>
          </li>
        </ul>
      </template>

      <!-- Message matches -->
      <template v-if="messageResults.length">
        <h3 class="section-title">Messages</h3>
        <ul>
          <li
            v-for="result in messageResults"
            :key="'msg-' + result.message.id"
            class="msg-item"
            @click="selectAndClear(result.chatId)"
          >
            <img :src="result.chatAvatar" :alt="result.chatName" class="chat-avatar" />
            <div class="chat-info">
              <div class="msg-header">
                <span class="chat-name">{{ result.chatName }}</span>
                <span class="chat-time">{{ formatChatTime(result.message.time) }}</span>
              </div>
              <span class="msg-preview" v-html="highlight(messagePreview(result.message))" />
            </div>
          </li>
        </ul>
      </template>

      <!-- No results -->
      <div v-if="!nameResults.length && !messageResults.length" class="no-results">
        No results found
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.chat-list {
  @apply flex h-full flex-col bg-white;
}

.chat-list-header {
  @apply border-b border-gray-100 bg-gray-50/80 px-4 py-3;
}

.search-wrapper {
  @apply relative;
}

.search-icon {
  @apply absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400;
}

.search-input {
  @apply w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20;
}

.chat-list-items {
  @apply flex-1 overflow-y-auto;
}

.section-title {
  @apply px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-blue-500;
}

.chat-item {
  @apply flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-blue-50/60;
}

.chat-item--active {
  @apply bg-blue-50 border-r-2 border-blue-500;
}

.chat-avatar {
  @apply h-12 w-12 flex-shrink-0 rounded-full object-cover ring-2 ring-gray-100;
}

.chat-info {
  @apply min-w-0 flex-1;
}

.chat-name {
  @apply block truncate text-sm font-semibold text-gray-900;
}

.chat-preview {
  @apply block truncate text-sm text-gray-500;
}

.msg-item {
  @apply flex cursor-pointer gap-3 px-4 py-3 transition-colors hover:bg-blue-50/60;
}

.msg-header {
  @apply flex items-baseline gap-2;
}

.msg-preview {
  @apply mt-0.5 block text-sm leading-relaxed text-gray-500;
}

.chat-time {
  @apply ml-auto flex-shrink-0 text-xs text-gray-400;
}

.no-results {
  @apply px-4 py-8 text-center text-sm text-gray-400;
}

.highlight {
  @apply rounded bg-amber-200 px-0.5 font-semibold text-gray-900;
}
</style>
