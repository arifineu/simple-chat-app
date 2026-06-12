<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import type { Chat } from '@/data/dummyChats'
import { formatChatTime } from '@/utils/formatTime'

const props = defineProps<{
  chat: Chat
  userName: string
}>()

const emit = defineEmits<{
  back: []
  send: [content: string]
}>()

const newMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)
const textarea = ref<HTMLTextAreaElement | null>(null)

watch(
  () => props.chat.id,
  () => {
    newMessage.value = ''
    nextTick(scrollToBottom)
  },
)

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    send()
  }
}

function autoResize(e: Event) {
  const el = e.target as HTMLTextAreaElement
  el.style.height = 'auto'
  el.style.height = `${Math.min(el.scrollHeight, 120)}px`
}

function send() {
  const text = newMessage.value.trim()
  if (!text) return
  emit('send', text)
  newMessage.value = ''
  if (textarea.value) {
    textarea.value.style.height = 'auto'
  }
  nextTick(scrollToBottom)
}

function senderName(isMine: boolean) {
  return isMine ? props.userName : props.chat.name
}
</script>

<template>
  <div class="detail">
    <header class="detail-header">
      <button class="back-button md:hidden" @click="$emit('back')">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
      </button>
      <img :src="chat.avatar" :alt="chat.name" class="detail-avatar" />
      <span class="detail-name">{{ chat.name }}</span>
    </header>

    <div ref="messagesContainer" class="messages">
      <div
        v-for="message in chat.messages"
        :key="message.id"
        class="bubble-row"
        :class="{ 'bubble-row--mine': message.isMine }"
      >
        <div class="bubble" :class="{ 'bubble--mine': message.isMine }">
          <div class="bubble-header">
            <span class="bubble-name">{{ senderName(message.isMine) }}</span>
            <span class="bubble-time">{{ formatChatTime(message.time) }}</span>
          </div>
          <p class="bubble-text">{{ message.content }}</p>
        </div>
      </div>
    </div>

    <div class="input-area">
      <textarea
        ref="textarea"
        v-model="newMessage"
        class="input-field"
        placeholder="Type a message..."
        rows="1"
        @keydown="handleKeydown"
        @input="autoResize"
      />
      <button class="send-button" :disabled="!newMessage.trim()" @click="send">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="send-icon">
          <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.detail {
  @apply flex h-full flex-col bg-slate-50;
}

.detail-header {
  @apply flex items-center gap-3 border-b border-gray-100 bg-white/80 px-4 py-3 backdrop-blur-sm;
}

.back-button {
  @apply text-gray-600 transition-colors hover:text-blue-600;
}

.detail-avatar {
  @apply h-9 w-9 rounded-full object-cover ring-2 ring-blue-100;
}

.detail-name {
  @apply text-sm font-semibold text-gray-900;
}

.messages {
  @apply flex-1 overflow-y-auto px-4 py-4;
}

.bubble-row {
  @apply mb-3 flex;
}

.bubble-row--mine {
  @apply justify-end;
}

.bubble {
  @apply max-w-[75%] rounded-2xl rounded-tl-sm border border-gray-100 bg-white px-4 py-2.5 shadow-sm;
}

.bubble--mine {
  @apply rounded-2xl rounded-tr-sm border-blue-400/30 bg-blue-600 text-white shadow-md shadow-blue-500/20;
}

.bubble-header {
  @apply mb-1 flex items-baseline gap-2;
}

.bubble-name {
  @apply text-xs font-semibold text-blue-600;
}

.bubble--mine .bubble-name {
  @apply text-blue-100;
}

.bubble-time {
  @apply text-xs text-gray-400;
}

.bubble--mine .bubble-time {
  @apply text-blue-200;
}

.bubble-text {
  @apply text-sm leading-relaxed whitespace-pre-wrap;
}

.input-area {
  @apply flex items-end gap-2 border-t border-gray-100 bg-white/80 px-4 py-3 backdrop-blur-sm;
}

.input-field {
  @apply flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-400/20;
}

.send-button {
  @apply flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-blue-500/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none;
}

.send-icon {
  @apply h-5 w-5;
}
</style>
