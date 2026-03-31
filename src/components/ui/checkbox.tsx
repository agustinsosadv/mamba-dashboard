'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CheckboxProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
  disabled?: boolean
}

export function Checkbox({ checked, onCheckedChange, className, disabled }: CheckboxProps) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        'h-4 w-4 shrink-0 rounded border border-border transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:cursor-not-allowed disabled:opacity-50',
        checked ? 'bg-primary border-primary' : 'bg-transparent',
        className
      )}
    >
      {checked && (
        <svg
          viewBox="0 0 10 10"
          className="h-full w-full fill-primary-foreground"
        >
          <polyline points="1.5,5 4,8 8.5,2" strokeWidth="1.5" stroke="currentColor" fill="none" />
        </svg>
      )}
    </button>
  )
}
