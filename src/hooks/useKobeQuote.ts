'use client'

import { useMemo } from 'react'
import { getDailyQuote } from '@/lib/quotes'

export function useKobeQuote(date?: Date): string {
  return useMemo(() => getDailyQuote(date ?? new Date()), [date])
}
