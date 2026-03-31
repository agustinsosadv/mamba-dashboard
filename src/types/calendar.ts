export type EventCategory =
  | 'universidad'
  | 'gym'
  | 'rugby'
  | 'coldplunge'
  | 'sauna'
  | 'estudio'
  | 'palanca'
  | 'coaching'
  | 'personal'

export interface CalendarEvent {
  id: string
  date: string        // 'YYYY-MM-DD'
  title: string
  category: EventCategory
  startTime?: string  // 'HH:mm'
  endTime?: string
  isRecurring?: boolean
  notes?: string
}

export const CATEGORY_COLORS: Record<EventCategory, string> = {
  universidad: 'bg-blue-500',
  gym: 'bg-green-500',
  rugby: 'bg-red-500',
  coldplunge: 'bg-cyan-400',
  sauna: 'bg-orange-400',
  estudio: 'bg-violet-500',
  palanca: 'bg-yellow-500',
  coaching: 'bg-pink-500',
  personal: 'bg-gray-500',
}

export const CATEGORY_TEXT_COLORS: Record<EventCategory, string> = {
  universidad: 'text-blue-400',
  gym: 'text-green-400',
  rugby: 'text-red-400',
  coldplunge: 'text-cyan-300',
  sauna: 'text-orange-300',
  estudio: 'text-violet-400',
  palanca: 'text-yellow-400',
  coaching: 'text-pink-400',
  personal: 'text-gray-400',
}

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  universidad: 'Facultad',
  gym: 'Gym',
  rugby: 'Rugby',
  coldplunge: 'Cold Plunge',
  sauna: 'Sauna',
  estudio: 'Estudio',
  palanca: 'Palanca',
  coaching: 'Coaching',
  personal: 'Personal',
}

export const CATEGORY_EMOJIS: Record<EventCategory, string> = {
  universidad: '📚',
  gym: '💪',
  rugby: '🏉',
  coldplunge: '🥶',
  sauna: '🔥',
  estudio: '📖',
  palanca: '⚡',
  coaching: '🎯',
  personal: '👤',
}
