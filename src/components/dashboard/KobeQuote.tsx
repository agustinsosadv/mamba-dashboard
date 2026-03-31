'use client'

import { useKobeQuote } from '@/hooks/useKobeQuote'

export function KobeQuote() {
  const quote = useKobeQuote()

  return (
    <div className="rounded-xl border border-primary/20 bg-card p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
        Mamba Mentality
      </p>
      <blockquote className="text-lg font-medium italic leading-relaxed text-foreground">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <p className="mt-3 text-sm text-muted-foreground">— Kobe Bryant</p>
    </div>
  )
}
