import type { ScheduleEntry } from '@/types/schedule'

// dayOfWeek: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
export const WEEKLY_SCHEDULE: ScheduleEntry[] = [
  // UNIVERSITY
  { dayOfWeek: 1, title: 'Facultad', startTime: '13:00', endTime: '17:50', category: 'universidad' },
  { dayOfWeek: 2, title: 'Facultad', startTime: '11:20', endTime: '16:10', category: 'universidad' },
  { dayOfWeek: 3, title: 'Facultad', startTime: '13:00', endTime: '17:50', category: 'universidad' },
  { dayOfWeek: 4, title: 'Facultad', startTime: '14:40', endTime: '16:10', category: 'universidad' },
  { dayOfWeek: 5, title: 'Facultad', startTime: '14:40', endTime: '19:30', category: 'universidad' },

  // GYM
  { dayOfWeek: 1, title: 'Gimnasio', startTime: '07:45', endTime: '09:00', category: 'gym' },
  { dayOfWeek: 2, title: 'Gimnasio', startTime: '18:00', endTime: '19:00', category: 'gym' },
  { dayOfWeek: 3, title: 'Gimnasio', startTime: '07:45', endTime: '09:00', category: 'gym' },
  { dayOfWeek: 4, title: 'Gimnasio', startTime: '17:40', endTime: '18:40', category: 'gym' },

  // RUGBY TRAINING
  { dayOfWeek: 2, title: 'Entrenamiento Rugby', startTime: '20:30', endTime: '22:15', category: 'rugby' },
  { dayOfWeek: 4, title: 'Entrenamiento Rugby', startTime: '20:30', endTime: '22:15', category: 'rugby' },

  // SATURDAY MATCH
  { dayOfWeek: 6, title: 'Partido', startTime: '11:30', endTime: '13:30', category: 'rugby' },
]

export function getTodaySchedule(date: Date = new Date()): ScheduleEntry[] {
  const dayOfWeek = date.getDay()
  return WEEKLY_SCHEDULE.filter((e) => e.dayOfWeek === dayOfWeek).sort(
    (a, b) => a.startTime.localeCompare(b.startTime)
  )
}
