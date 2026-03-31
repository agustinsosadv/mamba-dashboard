'use client'

import { useDayType } from '@/hooks/useDayType'
import { getDayPlan } from '@/lib/nutrition'

const DAY_TYPE_LABELS: Record<string, string> = {
  lunes_miercoles: 'Lun / Mié',
  martes_jueves: 'Mar / Jue',
  sabado_partido: 'Sábado',
  domingo_descanso: 'Domingo',
}

export function NutritionToday() {
  const dayType = useDayType()
  const plan = getDayPlan(dayType)

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
        Nutrición — {DAY_TYPE_LABELS[dayType]}
      </p>
      <p className="text-xs text-muted-foreground mb-4">{plan.subtitle}</p>

      <div className="flex items-center justify-between mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{plan.targets.kcal}</p>
          <p className="text-xs text-muted-foreground">kcal</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">
            {plan.targets.proteinMin}–{plan.targets.proteinMax}g
          </p>
          <p className="text-xs text-muted-foreground">Proteína</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">
            {plan.targets.carbsMin}–{plan.targets.carbsMax}g
          </p>
          <p className="text-xs text-muted-foreground">Carbos</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">
            {plan.targets.fatsMin}–{plan.targets.fatsMax}g
          </p>
          <p className="text-xs text-muted-foreground">Grasas</p>
        </div>
      </div>

      <div className="space-y-1">
        {plan.meals.map((meal, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="text-base">{meal.emoji}</span>
            <span className="text-xs text-muted-foreground w-10 shrink-0">{meal.time}</span>
            <span className="font-medium">{meal.name}</span>
            <span className="ml-auto text-xs text-muted-foreground">
              {meal.macros.kcal} kcal
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
