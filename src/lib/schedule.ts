import type { ScheduleEntry } from '@/types/schedule'

// dayOfWeek: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
// NOTE: Cold plunge NEVER after gym. Only before gym or Sat/Sun post-rugby.

export const WEEKLY_SCHEDULE: ScheduleEntry[] = [
  // ─── LUNES ────────────────────────────────────────────────────
  { dayOfWeek: 1, title: 'Cold Plunge 🥶', startTime: '08:30', endTime: '09:00', category: 'coldplunge' },
  { dayOfWeek: 1, title: 'Palanca', startTime: '09:00', endTime: '11:00', category: 'palanca' },
  { dayOfWeek: 1, title: 'Gimnasio', startTime: '11:00', endTime: '12:30', category: 'gym' },
  { dayOfWeek: 1, title: 'Facultad', startTime: '13:00', endTime: '17:50', category: 'universidad' },
  { dayOfWeek: 1, title: 'Estudio', startTime: '18:00', endTime: '19:00', category: 'estudio' },
  { dayOfWeek: 1, title: 'Palanca', startTime: '19:00', endTime: '21:00', category: 'palanca' },

  // ─── MARTES ───────────────────────────────────────────────────
  { dayOfWeek: 2, title: 'Estudio', startTime: '08:30', endTime: '09:30', category: 'estudio' },
  { dayOfWeek: 2, title: 'Palanca', startTime: '09:30', endTime: '11:20', category: 'palanca' },
  { dayOfWeek: 2, title: 'Facultad', startTime: '11:20', endTime: '16:10', category: 'universidad' },
  { dayOfWeek: 2, title: 'Palanca', startTime: '16:10', endTime: '18:00', category: 'palanca' },
  { dayOfWeek: 2, title: 'Gimnasio', startTime: '18:30', endTime: '19:30', category: 'gym' },
  { dayOfWeek: 2, title: 'Rugby — Entrenamiento', startTime: '20:30', endTime: '22:15', category: 'rugby' },

  // ─── MIÉRCOLES ────────────────────────────────────────────────
  { dayOfWeek: 3, title: 'Cold Plunge 🥶', startTime: '08:30', endTime: '09:00', category: 'coldplunge' },
  { dayOfWeek: 3, title: 'Palanca', startTime: '09:00', endTime: '11:00', category: 'palanca' },
  { dayOfWeek: 3, title: 'Gimnasio', startTime: '11:00', endTime: '12:30', category: 'gym' },
  { dayOfWeek: 3, title: 'Facultad', startTime: '13:00', endTime: '17:50', category: 'universidad' },
  { dayOfWeek: 3, title: 'Estudio', startTime: '18:00', endTime: '19:00', category: 'estudio' },
  { dayOfWeek: 3, title: 'Palanca', startTime: '19:00', endTime: '21:00', category: 'palanca' },

  // ─── JUEVES ───────────────────────────────────────────────────
  { dayOfWeek: 4, title: 'Estudio', startTime: '08:30', endTime: '09:30', category: 'estudio' },
  { dayOfWeek: 4, title: 'Palanca', startTime: '09:30', endTime: '14:00', category: 'palanca' },
  { dayOfWeek: 4, title: 'Facultad', startTime: '14:40', endTime: '16:10', category: 'universidad' },
  { dayOfWeek: 4, title: 'Gimnasio', startTime: '17:40', endTime: '18:40', category: 'gym' },
  { dayOfWeek: 4, title: 'Coaching 2010', startTime: '18:45', endTime: '19:45', category: 'coaching' },
  { dayOfWeek: 4, title: 'Rugby — Entrenamiento', startTime: '20:30', endTime: '22:15', category: 'rugby' },

  // ─── VIERNES ──────────────────────────────────────────────────
  { dayOfWeek: 5, title: 'Estudio', startTime: '08:30', endTime: '09:30', category: 'estudio' },
  { dayOfWeek: 5, title: 'Palanca', startTime: '09:30', endTime: '14:00', category: 'palanca' },
  { dayOfWeek: 5, title: 'Facultad', startTime: '14:40', endTime: '19:30', category: 'universidad' },
  { dayOfWeek: 5, title: 'Palanca', startTime: '19:30', endTime: '21:00', category: 'palanca' },

  // ─── SÁBADO ───────────────────────────────────────────────────
  { dayOfWeek: 6, title: 'Partido — San Andrés', startTime: '11:30', endTime: '13:30', category: 'rugby' },
  { dayOfWeek: 6, title: 'Cold Plunge 🥶', startTime: '13:30', endTime: '14:00', category: 'coldplunge' },
  { dayOfWeek: 6, title: 'Sauna 🔥', startTime: '14:00', endTime: '14:30', category: 'sauna' },

  // ─── DOMINGO ──────────────────────────────────────────────────
  { dayOfWeek: 0, title: 'Cold Plunge 🥶', startTime: '09:00', endTime: '09:30', category: 'coldplunge' },
  { dayOfWeek: 0, title: 'Sauna 🔥', startTime: '09:30', endTime: '10:00', category: 'sauna' },
  { dayOfWeek: 0, title: 'Estudio', startTime: '10:00', endTime: '12:00', category: 'estudio' },
  { dayOfWeek: 0, title: 'Palanca', startTime: '14:00', endTime: '16:00', category: 'palanca' },
]

export function getTodaySchedule(date: Date = new Date()): ScheduleEntry[] {
  const dayOfWeek = date.getDay()
  return WEEKLY_SCHEDULE.filter((e) => e.dayOfWeek === dayOfWeek).sort(
    (a, b) => a.startTime.localeCompare(b.startTime)
  )
}

export function getDaySchedule(dayOfWeek: number): ScheduleEntry[] {
  return WEEKLY_SCHEDULE.filter((e) => e.dayOfWeek === dayOfWeek).sort(
    (a, b) => a.startTime.localeCompare(b.startTime)
  )
}
