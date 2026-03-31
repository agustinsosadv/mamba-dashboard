'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => onOpenChange?.(false)}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export function DialogContent({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl',
        className
      )}
    >
      {children}
    </div>
  )
}

export function DialogHeader({ children }: { children?: React.ReactNode }) {
  return <div className="mb-4">{children}</div>
}

export function DialogTitle({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <h2 className={cn('text-lg font-semibold', className)}>{children}</h2>
  )
}

export function DialogFooter({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn('mt-4 flex justify-end gap-2', className)}>{children}</div>
  )
}
