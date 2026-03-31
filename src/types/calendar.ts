export type EventCategory = 'universidad' | 'gym' | 'rugby' | 'personal'

export interface CalendarEvent {
  id: string
  date: string        // 'YYYY-MM-DD'
  title: string
  category: EventCategory
  startTime?: string  // 'HH:mm'
  endTime?: string
  isRecurring?: boolean
}

export const CATEGORY_COLORS: Record<EventCategory, string> = {
  universidad: 'bg-blue-500',
  gym: 'bg-green-500',
  rugby: 'bg-red-500',
  personal: 'bg-yellow-500',
}

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  universidad: 'Universidad',
  gym: 'Gym',
  rugby: 'Rugby',
  personal: 'Personal',
}
