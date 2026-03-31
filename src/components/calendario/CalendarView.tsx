'use client'

import { useState, useEffect } from 'react'
import {
  startOfMonth, endOfMonth, eachDayOfInterval, getDay,
  addMonths, subMonths, format, isSameDay, isSameMonth,
} from 'date-fns'
import { getStorage, setStorage, STORAGE_KEYS } from '@/lib/storage'
import { WEEKLY_SCHEDULE } from '@/lib/schedule'
import { toISODate, getMonthName } from '@/lib/dates'
import type { CalendarEvent, EventCategory } from '@/types/calendar'
import { CATEGORY_COLORS, CATEGORY_LABELS } from '@/types/calendar'
import { cn } from '@/lib/utils'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

// Seed recurring events for the next 12 months
function seedRecurringEvents(): CalendarEvent[] {
  const events: CalendarEvent[] = []
  const today = new Date()
  const end = addMonths(today, 12)
  const days = eachDayOfInterval({ start: today, end })

  for (const day of days) {
    const dow = getDay(day)
    const dateStr = toISODate(day)
    for (const entry of WEEKLY_SCHEDULE) {
      if (entry.dayOfWeek === dow) {
        events.push({
          id: `recurring-${dateStr}-${entry.startTime}`,
          date: dateStr,
          title: entry.title,
          category: entry.category,
          startTime: entry.startTime,
          endTime: entry.endTime,
          isRecurring: true,
        })
      }
    }
  }
  return events
}

type ModalState =
  | { mode: 'closed' }
  | { mode: 'add'; date: string }
  | { mode: 'edit'; event: CalendarEvent }

export function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [modal, setModal] = useState<ModalState>({ mode: 'closed' })
  const [form, setForm] = useState({ title: '', category: 'personal' as EventCategory, startTime: '', endTime: '' })

  // Load and seed
  useEffect(() => {
    const seeded = getStorage<boolean>(STORAGE_KEYS.CALENDAR_SEEDED, false)
    const stored = getStorage<CalendarEvent[]>(STORAGE_KEYS.CALENDAR_EVENTS, [])
    if (!seeded) {
      const seed = seedRecurringEvents()
      const merged = [...seed, ...stored.filter((e) => !e.isRecurring)]
      setStorage(STORAGE_KEYS.CALENDAR_SEEDED, true)
      setStorage(STORAGE_KEYS.CALENDAR_EVENTS, merged)
      setEvents(merged)
    } else {
      setEvents(stored)
    }
  }, [])

  const saveEvents = (updated: CalendarEvent[]) => {
    setEvents(updated)
    setStorage(STORAGE_KEYS.CALENDAR_EVENTS, updated)
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Pad to start on Monday (0=Mon)
  const startPad = (getDay(monthStart) + 6) % 7

  const openAdd = (date: Date) => {
    setForm({ title: '', category: 'personal', startTime: '', endTime: '' })
    setModal({ mode: 'add', date: toISODate(date) })
  }

  const openEdit = (event: CalendarEvent) => {
    setForm({
      title: event.title,
      category: event.category,
      startTime: event.startTime ?? '',
      endTime: event.endTime ?? '',
    })
    setModal({ mode: 'edit', event })
  }

  const handleSave = () => {
    if (!form.title.trim()) return
    if (modal.mode === 'add') {
      const newEvent: CalendarEvent = {
        id: crypto.randomUUID(),
        date: modal.date,
        title: form.title.trim(),
        category: form.category,
        startTime: form.startTime || undefined,
        endTime: form.endTime || undefined,
      }
      saveEvents([...events, newEvent])
    } else if (modal.mode === 'edit') {
      saveEvents(events.map((e) =>
        e.id === modal.event.id
          ? { ...e, title: form.title.trim(), category: form.category, startTime: form.startTime || undefined, endTime: form.endTime || undefined }
          : e
      ))
    }
    setModal({ mode: 'closed' })
  }

  const handleDelete = () => {
    if (modal.mode !== 'edit') return
    saveEvents(events.filter((e) => e.id !== modal.event.id))
    setModal({ mode: 'closed' })
  }

  const getEventsForDay = (date: Date) =>
    events.filter((e) => e.date === toISODate(date))

  const today = new Date()
  const WEEK_DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

  return (
    <div>
      {/* Month header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
          className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-secondary"
        >
          ←
        </button>
        <h2 className="text-lg font-semibold">
          {getMonthName(currentMonth.getMonth())} {currentMonth.getFullYear()}
        </h2>
        <button
          onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
          className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-secondary"
        >
          →
        </button>
      </div>

      {/* Weekday headers */}
      <div className="mb-1 grid grid-cols-7 gap-1 text-center">
        {WEEK_DAYS.map((d) => (
          <div key={d} className="text-xs font-medium text-muted-foreground py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startPad }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}
        {days.map((day) => {
          const dayEvents = getEventsForDay(day)
          const isToday = isSameDay(day, today)
          const isCurrentMonth = isSameMonth(day, currentMonth)

          return (
            <button
              key={day.toISOString()}
              onClick={() => openAdd(day)}
              className={cn(
                'relative min-h-[64px] rounded-lg border p-1.5 text-left transition-colors hover:bg-secondary',
                isToday ? 'border-primary' : 'border-border',
                !isCurrentMonth && 'opacity-40'
              )}
            >
              <span
                className={cn(
                  'text-xs font-semibold',
                  isToday
                    ? 'flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {format(day, 'd')}
              </span>
              <div className="mt-1 space-y-0.5">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => { e.stopPropagation(); openEdit(event) }}
                    className={cn(
                      'truncate rounded px-1 py-0.5 text-[10px] font-medium text-white cursor-pointer',
                      CATEGORY_COLORS[event.category]
                    )}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-[10px] text-muted-foreground pl-1">
                    +{dayEvents.length - 3}
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3">
        {(Object.entries(CATEGORY_LABELS) as [EventCategory, string][]).map(([cat, label]) => (
          <div key={cat} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={cn('h-2 w-2 rounded-full', CATEGORY_COLORS[cat])} />
            {label}
          </div>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={modal.mode !== 'closed'} onOpenChange={() => setModal({ mode: 'closed' })}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {modal.mode === 'add' ? 'Agregar evento' : 'Editar evento'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <div>
              <label className="text-xs text-muted-foreground">Título</label>
              <input
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Nombre del evento"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Categoría</label>
              <select
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as EventCategory }))}
              >
                {(Object.entries(CATEGORY_LABELS) as [EventCategory, string][]).map(([cat, label]) => (
                  <option key={cat} value={cat}>{label}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">Inicio</label>
                <input
                  type="time"
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                  value={form.startTime}
                  onChange={(e) => setForm((f) => ({ ...f, startTime: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Fin</label>
                <input
                  type="time"
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                  value={form.endTime}
                  onChange={(e) => setForm((f) => ({ ...f, endTime: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            {modal.mode === 'edit' && (
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                Eliminar
              </Button>
            )}
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              size="sm"
              onClick={handleSave}
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
