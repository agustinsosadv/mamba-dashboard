'use client'

import { getTodaySchedule } from '@/lib/schedule'
import { getDayName } from '@/lib/dates'
import { CATEGORY_COLORS, CATEGORY_LABELS, CATEGORY_EMOJIS } from '@/types/calendar'
import { cn } from '@/lib/utils'

export function TodaySchedule() {
  const today = new Date()
  const entries = getTodaySchedule(today)
  const dayName = getDayName(today)

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        Hoy — {dayName}
      </p>

      {entries.length === 0 ? (
        <p className="text-sm text-muted-foreground">Sin actividades programadas. Recuperate.</p>
      ) : (
        <div className="space-y-2">
          {entries.map((entry, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-12 shrink-0 text-xs text-muted-foreground tabular-nums">
                {entry.startTime}
              </span>
              <span className="text-sm shrink-0">{CATEGORY_EMOJIS[entry.category]}</span>
              <span
                className={cn(
                  'h-2 w-2 shrink-0 rounded-full',
                  CATEGORY_COLORS[entry.category]
                )}
              />
              <span className="text-sm font-medium">{entry.title}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {entry.endTime}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
