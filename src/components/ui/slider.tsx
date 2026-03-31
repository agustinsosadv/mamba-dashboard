'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SliderProps {
  value?: number[]
  onValueChange?: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

export function Slider({
  value = [0],
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className,
}: SliderProps) {
  const pct = ((value[0] - min) / (max - min)) * 100

  return (
    <div className={cn('relative flex w-full items-center', className)}>
      <div className="relative h-2 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className="absolute h-full rounded-full bg-primary transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={(e) => onValueChange?.([Number(e.target.value)])}
        className="absolute inset-0 w-full cursor-pointer opacity-0"
      />
    </div>
  )
}
