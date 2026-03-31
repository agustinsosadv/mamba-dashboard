'use client'

import { useState } from 'react'
import { getAllPlans, getDayPlan } from '@/lib/nutrition'
import { getDayType } from '@/lib/dates'
import type { DayType, Meal } from '@/types/nutrition'

const DAY_TYPE_ORDER: DayType[] = [
  'lunes_miercoles',
  'martes_jueves',
  'sabado_partido',
  'domingo_descanso',
]

function MealCard({ meal }: { meal: Meal }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{meal.emoji}</span>
          <div>
            <p className="text-sm font-semibold">{meal.name}</p>
            <p className="text-xs text-muted-foreground">{meal.time}</p>
          </div>
        </div>
        <span className="text-sm font-bold text-primary">{meal.macros.kcal} kcal</span>
      </div>

      <ul className="mb-3 space-y-0.5">
        {meal.foods.map((food, i) => (
          <li key={i} className="text-xs text-muted-foreground">• {food}</li>
        ))}
      </ul>

      <div className="flex gap-4 border-t border-border pt-2">
        <div className="text-center">
          <p className="text-xs font-semibold text-foreground">{meal.macros.protein}g</p>
          <p className="text-[10px] text-muted-foreground">Prot</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-semibold text-foreground">{meal.macros.carbs}g</p>
          <p className="text-[10px] text-muted-foreground">Carbs</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-semibold text-foreground">{meal.macros.fats}g</p>
          <p className="text-[10px] text-muted-foreground">Grasas</p>
        </div>
      </div>
    </div>
  )
}

export function NutricionView() {
  const todayType = getDayType()
  const [selected, setSelected] = useState<DayType>(todayType)
  const plan = getDayPlan(selected)
  const allPlans = getAllPlans()

  return (
    <div>
      {/* Tab selector */}
      <div className="mb-6 flex flex-wrap gap-2">
        {DAY_TYPE_ORDER.map((dayType) => {
          const p = allPlans.find((pl) => pl.dayType === dayType)!
          return (
            <button
              key={dayType}
              onClick={() => setSelected(dayType)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                selected === dayType
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {p.label}
            </button>
          )
        })}
      </div>

      {/* Subtitle and totals */}
      <div className="mb-6 rounded-xl border border-border bg-card p-5">
        <p className="text-xs text-muted-foreground mb-3">{plan.subtitle}</p>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">{plan.targets.kcal}</p>
            <p className="text-xs text-muted-foreground">kcal totales</p>
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">
              {plan.targets.proteinMin}–{plan.targets.proteinMax}g
            </p>
            <p className="text-xs text-muted-foreground">Proteína</p>
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">
              {plan.targets.carbsMin}–{plan.targets.carbsMax}g
            </p>
            <p className="text-xs text-muted-foreground">Carbos</p>
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">
              {plan.targets.fatsMin}–{plan.targets.fatsMax}g
            </p>
            <p className="text-xs text-muted-foreground">Grasas</p>
          </div>
        </div>
      </div>

      {/* Meals */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plan.meals.map((meal, i) => (
          <MealCard key={i} meal={meal} />
        ))}
      </div>
    </div>
  )
}
