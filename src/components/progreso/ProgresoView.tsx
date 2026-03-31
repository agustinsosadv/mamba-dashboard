'use client'

import { useState } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_KEYS } from '@/lib/storage'
import { todayISO } from '@/lib/dates'
import type { ProgressEntry, RugbySkill } from '@/types/progress'
import { RUGBY_SKILL_LABELS } from '@/types/progress'
import { Slider } from '@/components/ui/slider'

const RUGBY_SKILLS: RugbySkill[] = ['pase', 'patada', 'vision', 'defensa', 'fisico']

const SUBJECTS = [
  { key: 'analisis' as const, label: 'Análisis Matemático' },
  { key: 'bioquimica' as const, label: 'Bioquímica' },
  { key: 'biologia' as const, label: 'Biología Molecular y Celular' },
]

const DEFAULT_ENTRY: ProgressEntry = {
  id: todayISO(),
  date: todayISO(),
  rugby: { pase: 5, patada: 5, vision: 5, defensa: 5, fisico: 6 },
  academic: { analisis: null, bioquimica: null, biologia: null },
  palanca: { clientes: 0, mrr: 0 },
  physical: { peso: null, notas: '' },
}

export function ProgresoView() {
  const [entries, setEntries] = useLocalStorage<ProgressEntry[]>(STORAGE_KEYS.PROGRESS, [DEFAULT_ENTRY])
  const [activeTab, setActiveTab] = useState<'rugby' | 'academico' | 'palanca' | 'fisico'>('rugby')

  const today = todayISO()
  const todayEntry = entries.find((e) => e.date === today) ?? { ...DEFAULT_ENTRY }

  const updateToday = (updated: ProgressEntry) => {
    setEntries((prev) => {
      const filtered = prev.filter((e) => e.date !== today)
      return [...filtered, updated]
    })
  }

  const TABS = [
    { key: 'rugby' as const, label: '🏉 Rugby' },
    { key: 'academico' as const, label: '📚 Académico' },
    { key: 'palanca' as const, label: '⚡ Palanca' },
    { key: 'fisico' as const, label: '💪 Físico' },
  ]

  return (
    <div>
      {/* Tab selector */}
      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        {activeTab === 'rugby' && todayEntry.rugby && (
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Auto-evaluación de hoy — Rugby
            </p>
            {RUGBY_SKILLS.map((skill) => (
              <div key={skill}>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">{RUGBY_SKILL_LABELS[skill]}</label>
                  <span className="text-sm font-bold text-primary">
                    {todayEntry.rugby![skill]}/10
                  </span>
                </div>
                <Slider
                  min={1} max={10} step={1}
                  value={[todayEntry.rugby![skill]]}
                  onValueChange={([val]) =>
                    updateToday({
                      ...todayEntry,
                      rugby: { ...todayEntry.rugby!, [skill]: val },
                    })
                  }
                  className="accent-primary"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'academico' && todayEntry.academic !== undefined && (
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Notas del semestre
            </p>
            {SUBJECTS.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-3">
                <label className="flex-1 text-sm font-medium">{label}</label>
                <input
                  type="number"
                  min={0} max={10} step={0.5}
                  placeholder="—"
                  className="w-20 rounded-md border border-border bg-background px-3 py-2 text-center text-sm text-foreground"
                  value={todayEntry.academic?.[key] ?? ''}
                  onChange={(e) => {
                    const val = e.target.value === '' ? null : parseFloat(e.target.value)
                    updateToday({
                      ...todayEntry,
                      academic: { ...todayEntry.academic!, [key]: val },
                    })
                  }}
                />
                {todayEntry.academic?.[key] !== null && todayEntry.academic?.[key] !== undefined && (
                  <span
                    className={`text-xs font-bold ${
                      (todayEntry.academic[key] ?? 0) >= 7 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {(todayEntry.academic[key] ?? 0) >= 7 ? '✓ Meta' : '↑ Mejorar'}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'palanca' && todayEntry.palanca !== undefined && (
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Métricas de Palanca
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Clientes activos</label>
                <input
                  type="number" min={0}
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                  value={todayEntry.palanca?.clientes ?? 0}
                  onChange={(e) =>
                    updateToday({
                      ...todayEntry,
                      palanca: { ...todayEntry.palanca!, clientes: parseInt(e.target.value) || 0 },
                    })
                  }
                />
                <p className="mt-1 text-xs text-muted-foreground">Meta: 10-15</p>
              </div>
              <div>
                <label className="text-sm font-medium">MRR (USD)</label>
                <input
                  type="number" min={0}
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                  value={todayEntry.palanca?.mrr ?? 0}
                  onChange={(e) =>
                    updateToday({
                      ...todayEntry,
                      palanca: { ...todayEntry.palanca!, mrr: parseInt(e.target.value) || 0 },
                    })
                  }
                />
                <p className="mt-1 text-xs text-muted-foreground">Meta: $1.500/mes</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progreso MRR</span>
                <span className="text-primary font-semibold">
                  {Math.round(((todayEntry.palanca?.mrr ?? 0) / 1500) * 100)}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${Math.min(100, ((todayEntry.palanca?.mrr ?? 0) / 1500) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fisico' && todayEntry.physical !== undefined && (
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Registro físico de hoy
            </p>
            <div>
              <label className="text-sm font-medium">Peso (kg)</label>
              <input
                type="number" step={0.1}
                placeholder="—"
                className="mt-2 w-40 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                value={todayEntry.physical?.peso ?? ''}
                onChange={(e) => {
                  const val = e.target.value === '' ? null : parseFloat(e.target.value)
                  updateToday({ ...todayEntry, physical: { ...todayEntry.physical!, peso: val } })
                }}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Notas</label>
              <textarea
                rows={3}
                placeholder="Cómo te sentiste hoy, velocidad, energía..."
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground resize-none"
                value={todayEntry.physical?.notas ?? ''}
                onChange={(e) =>
                  updateToday({
                    ...todayEntry,
                    physical: { ...todayEntry.physical!, notas: e.target.value },
                  })
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
