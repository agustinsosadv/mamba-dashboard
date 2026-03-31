'use client'

import { useState } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_KEYS } from '@/lib/storage'
import { DEFAULT_GOALS } from '@/lib/defaultGoals'
import type { Goal, GoalPeriod, GoalCategory } from '@/types/goals'
import { PERIOD_LABELS, CATEGORY_LABELS, CATEGORY_ICONS } from '@/types/goals'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

const PERIODS: GoalPeriod[] = ['semanal', 'mensual', 'trimestral', 'anual']
const CATEGORIES: GoalCategory[] = ['rugby', 'academico', 'palanca', 'fisico', 'coaching']

export function ObjetivosView() {
  const [goals, setGoals] = useLocalStorage<Goal[]>(STORAGE_KEYS.GOALS, DEFAULT_GOALS)
  const [selectedPeriod, setSelectedPeriod] = useState<GoalPeriod>('trimestral')
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState<GoalCategory>('rugby')

  const filteredGoals = goals.filter((g) => g.period === selectedPeriod)
  const byCategory = CATEGORIES.map((cat) => ({
    cat,
    goals: filteredGoals.filter((g) => g.category === cat),
  })).filter((c) => c.goals.length > 0)

  const toggle = (id: string) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, completed: !g.completed, updatedAt: new Date().toISOString() } : g
      )
    )
  }

  const addGoal = () => {
    if (!newTitle.trim()) return
    const goal: Goal = {
      id: crypto.randomUUID(),
      period: selectedPeriod,
      category: newCategory,
      title: newTitle.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setGoals((prev) => [...prev, goal])
    setNewTitle('')
  }

  const completedCount = filteredGoals.filter((g) => g.completed).length
  const totalCount = filteredGoals.length

  return (
    <div>
      {/* Period tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {PERIODS.map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors',
              selectedPeriod === period
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border text-muted-foreground hover:text-foreground hover:bg-secondary'
            )}
          >
            {PERIOD_LABELS[period]}
          </button>
        ))}
      </div>

      {/* Progress summary */}
      {totalCount > 0 && (
        <div className="mb-6 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progreso general</span>
            <span className="text-sm font-bold text-primary">
              {completedCount}/{totalCount}
            </span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}

      {/* Goals by category */}
      <div className="space-y-4 mb-6">
        {byCategory.map(({ cat, goals: catGoals }) => (
          <div key={cat} className="rounded-xl border border-border bg-card p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <span>{CATEGORY_ICONS[cat]}</span>
              {CATEGORY_LABELS[cat]}
              <span className="ml-auto text-xs text-muted-foreground">
                {catGoals.filter((g) => g.completed).length}/{catGoals.length}
              </span>
            </h3>
            <div className="space-y-2">
              {catGoals.map((goal) => (
                <label
                  key={goal.id}
                  className="flex cursor-pointer items-start gap-3 select-none"
                >
                  <Checkbox
                    checked={goal.completed}
                    onCheckedChange={() => toggle(goal.id)}
                    className="mt-0.5"
                  />
                  <span
                    className={cn(
                      'text-sm',
                      goal.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                    )}
                  >
                    {goal.title}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {byCategory.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            Sin objetivos para este período todavía.
          </p>
        )}
      </div>

      {/* Add goal */}
      <div className="rounded-xl border border-dashed border-border p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Agregar objetivo
        </p>
        <div className="flex gap-2 flex-wrap">
          <input
            className="flex-1 min-w-[200px] rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
            placeholder="Nuevo objetivo..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addGoal()}
          />
          <select
            className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as GoalCategory)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat]}
              </option>
            ))}
          </select>
          <button
            onClick={addGoal}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}
