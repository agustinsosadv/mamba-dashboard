import type { EventCategory } from './calendar'

export interface ScheduleEntry {
  dayOfWeek: number   // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  title: string
  startTime: string   // 'HH:mm'
  endTime: string
  category: EventCategory
}
