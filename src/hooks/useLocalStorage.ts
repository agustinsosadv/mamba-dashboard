'use client'

import { useState, useCallback } from 'react'
import { getStorage, setStorage } from '@/lib/storage'

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => getStorage<T>(key, defaultValue))

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setState((prev) => {
        const next = typeof value === 'function' ? (value as (p: T) => T)(prev) : value
        setStorage(key, next)
        return next
      })
    },
    [key]
  )

  return [state, setValue]
}
