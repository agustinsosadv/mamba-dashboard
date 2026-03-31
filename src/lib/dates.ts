import { format } from 'date-fns'
import type { DayType } from '@/types/nutrition'

export function getDayType(date: Date = new Date()): DayType {
  const day = date.getDay() // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  switch (day) {
    case 1: // Monday
    case 3: // Wednesday
    case 5: // Friday — gym only, same plan as Mon/Wed
      return 'lunes_miercoles'
    case 2: // Tuesday
    case 4: // Thursday
      return 'martes_jueves'
    case 6: // Saturday
      return 'sabado_partido'
    case 0: // Sunday
    default:
      return 'domingo_descanso'
  }
}

export function toISODate(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export function todayISO(): string {
  return toISODate(new Date())
}

export function getDayName(date: Date): string {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  return days[date.getDay()]
}

export function getMonthName(month: number): string {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ]
  return months[month]
}
