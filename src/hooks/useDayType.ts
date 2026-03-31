'use client'

import { useMemo } from 'react'
import { getDayType } from '@/lib/dates'
import type { DayType } from '@/types/nutrition'

export function useDayType(date?: Date): DayType {
  return useMemo(() => getDayType(date ?? new Date()), [date])
}
