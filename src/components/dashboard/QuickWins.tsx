'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_KEYS } from '@/lib/storage'
import { todayISO } from '@/lib/dates'
import { Checkbox } from '@/components/ui/checkbox'

interface QuickWinsState {
  study: boolean
  gym: boolean
  rugby: boolean
}

const WINS = [
  { key: 'study' as const, label: '1 hora de estudio', emoji: '📚' },
  { key: 'gym' as const, label: 'Gym completado', emoji: '💪' },
  { key: 'rugby' as const, label: 'Entrenamiento de rugby', emoji: '🏉' },
]

const DEFAULT: QuickWinsState = { study: false, gym: false, rugby: false }

export function QuickWins() {
  const [wins, setWins] = useLocalStorage<QuickWinsState>(
    STORAGE_KEYS.quickWins(todayISO()),
    DEFAULT
  )

  const completed = Object.values(wins).filter(Boolean).length

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Hoy completé
        </p>
        <span className="text-xs font-bold text-primary">
          {completed}/3
        </span>
      </div>

      <div className="space-y-3">
        {WINS.map(({ key, label, emoji }) => (
          <label
            key={key}
            className="flex cursor-pointer items-center gap-3 select-none"
          >
            <Checkbox
              checked={wins[key]}
              onCheckedChange={(checked) =>
                setWins((prev) => ({ ...prev, [key]: !!checked }))
              }
            />
            <span className="text-base">{emoji}</span>
            <span className={wins[key] ? 'line-through text-muted-foreground text-sm' : 'text-sm font-medium'}>
              {label}
            </span>
          </label>
        ))}
      </div>

      {completed === 3 && (
        <p className="mt-4 text-center text-xs font-semibold text-primary">
          🔥 Día perfecto. Mamba Mode.
        </p>
      )}
    </div>
  )
}
