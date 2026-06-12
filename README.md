# SimpleChatApp

A chat app built to try out Vue 3 with the Composition API. It has a login screen, a contact list, and a 1-on-1 chat view with message bubbles. Nothing fancy – just a clean way to demonstrate what I can do with Vue 3, Pinia, Vue Router, Vitest, and Tailwind CSS.

## What it does

- **Login** — Type any email and password to sign in. The app generates a display name from the email (e.g. `chris_evans@example.com` becomes "Chris Evans"). Session persists in localStorage.
- **Chat list** — Sidebar with 20 dummy contacts. Each shows a profile photo, name, last message, and timestamp.
- **Search** — Filter contacts by name or search through message content. Results are split into a contacts section and a messages section, with matching text highlighted.
- **Chat view** — Click a contact to open the conversation. Messages show sender name, time, and content. Press Enter to send, Shift+Enter for a new line.
- **User menu** — Click your avatar in the top-right corner to see your profile info and sign out.
- **Responsive** — On mobile, the chat list and detail view take turns filling the screen. A back button appears in the detail view.

## Tech stack

| Layer | Tool |
| --- | --- |
| Framework | Vue 3 (Composition API, `<script setup>`) |
| State management | Pinia |
| Routing | Vue Router |
| Styling | Tailwind CSS v4 |
| Build | Vite |
| Type checking | TypeScript + vue-tsc |
| Testing | Vitest + @vue/test-utils |
| Utilities | @vueuse/core |

## Getting started

```sh
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run type-check` | Run TypeScript type checking |
