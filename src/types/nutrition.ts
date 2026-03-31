export type DayType =
  | 'lunes_miercoles'
  | 'martes_jueves'
  | 'sabado_partido'
  | 'domingo_descanso'

export interface MacroTarget {
  kcal: number
  proteinMin: number
  proteinMax: number
  carbsMin: number
  carbsMax: number
  fatsMin: number
  fatsMax: number
}

export interface MealMacros {
  protein: number
  carbs: number
  fats: number
  kcal: number
}

export interface Meal {
  name: string
  time: string
  emoji: string
  foods: string[]
  macros: MealMacros
}

export interface DayPlan {
  dayType: DayType
  label: string
  subtitle: string
  targets: MacroTarget
  meals: Meal[]
}
