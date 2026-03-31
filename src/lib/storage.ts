'use client'

function isClient(): boolean {
  return typeof window !== 'undefined'
}

export function getStorage<T>(key: string, defaultValue: T): T {
  if (!isClient()) return defaultValue
  try {
    const item = localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : defaultValue
  } catch {
    return defaultValue
  }
}

export function setStorage<T>(key: string, value: T): void {
  if (!isClient()) return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage full or unavailable
  }
}

export function removeStorage(key: string): void {
  if (!isClient()) return
  try {
    localStorage.removeItem(key)
  } catch {
    // ignore
  }
}

// Namespaced storage keys
export const STORAGE_KEYS = {
  CALENDAR_EVENTS: 'mamba:calendar:events',
  CALENDAR_SEEDED: 'mamba:calendar:seeded',
  GOALS: 'mamba:goals',
  PROGRESS: 'mamba:progress',
  quickWins: (date: string) => `mamba:quickwins:${date}`,
} as const
