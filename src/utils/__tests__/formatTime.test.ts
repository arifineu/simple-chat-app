import { describe, it, expect } from 'vitest'
import { formatChatTime } from '@/utils/formatTime'

describe('formatChatTime', () => {
  it('returns "just now" for less than 1 minute ago', () => {
    const date = new Date()
    expect(formatChatTime(date)).toBe('just now')
  })

  it('returns "just now" for 30 seconds ago', () => {
    const date = new Date(Date.now() - 30_000)
    expect(formatChatTime(date)).toBe('just now')
  })

  it('returns HH:mm for today but more than 1 minute ago', () => {
    const date = new Date(Date.now() - 5 * 60_000)
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    expect(formatChatTime(date)).toBe(`${hours}:${minutes}`)
  })

  it('returns "d Mmm" for a different day', () => {
    const date = new Date(Date.now() - 2 * 86_400_000)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const expected = `${date.getDate()} ${months[date.getMonth()]}`
    expect(formatChatTime(date)).toBe(expected)
  })
})
