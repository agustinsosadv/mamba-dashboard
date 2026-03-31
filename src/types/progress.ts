export type RugbySkill = 'pase' | 'patada' | 'vision' | 'defensa' | 'fisico'

export interface RugbyProgress {
  pase: number       // 1–10
  patada: number
  vision: number
  defensa: number
  fisico: number
}

export interface AcademicProgress {
  analisis: number | null
  bioquimica: number | null
  biologia: number | null
}

export interface PalancaProgress {
  clientes: number
  mrr: number        // USD
}

export interface PhysicalProgress {
  peso: number | null
  notas: string
}

export interface ProgressEntry {
  id: string
  date: string       // 'YYYY-MM-DD'
  rugby?: RugbyProgress
  academic?: AcademicProgress
  palanca?: PalancaProgress
  physical?: PhysicalProgress
}

export const RUGBY_SKILL_LABELS: Record<RugbySkill, string> = {
  pase: 'Pase',
  patada: 'Patada',
  vision: 'Visión de cancha',
  defensa: 'Defensa',
  fisico: 'Físico',
}
