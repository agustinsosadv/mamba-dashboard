export type GoalPeriod = 'semanal' | 'mensual' | 'trimestral' | 'anual'
export type GoalCategory = 'rugby' | 'academico' | 'palanca' | 'fisico' | 'coaching'

export interface Goal {
  id: string
  period: GoalPeriod
  category: GoalCategory
  title: string
  description?: string
  completed: boolean
  progress?: number   // 0–100
  createdAt: string
  updatedAt: string
}

export const PERIOD_LABELS: Record<GoalPeriod, string> = {
  semanal: 'Esta Semana',
  mensual: 'Este Mes',
  trimestral: 'Q2 2026',
  anual: 'Año 2026',
}

export const CATEGORY_LABELS: Record<GoalCategory, string> = {
  rugby: 'Rugby',
  academico: 'Académico',
  palanca: 'Palanca',
  fisico: 'Físico',
  coaching: 'Coaching',
}

export const CATEGORY_ICONS: Record<GoalCategory, string> = {
  rugby: '🏉',
  academico: '📚',
  palanca: '⚡',
  fisico: '💪',
  coaching: '🎯',
}
