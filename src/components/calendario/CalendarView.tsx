'use client'

import { useState, useEffect } from 'react'
import {
  startOfMonth, endOfMonth, eachDayOfInterval, getDay,
  addMonths, subMonths, addDays, subDays, format, isSameDay, isSameMonth,
} from 'date-fns'
import { getStorage, setStorage, STORAGE_KEYS } from '@/lib/storage'
import { WEEKLY_SCHEDULE } from '@/lib/schedule'
import { RUGBY_FIXTURES_2026 } from '@/lib/rugbyFixtures'
import { toISODate, getMonthName, getDayName } from '@/lib/dates'
import type { CalendarEvent, EventCategory } from '@/types/calendar'
import { CATEGORY_COLORS, CATEGORY_LABELS, CATEGORY_EMOJIS, CATEGORY_TEXT_COLORS } from '@/types/calendar'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const SEED_VERSION = 'v3'

// ─── Seeding ──────────────────────────────────────────────────────────────────

function seedAllEvents(): CalendarEvent[] {
  const events: CalendarEvent[] = []
  const today = new Date()
  const end = addMonths(today, 14)
  const days = eachDayOfInterval({ start: new Date('2026-01-01'), end })

  // Recurring weekly schedule
  for (const day of days) {
    const dow = getDay(day)
    const dateStr = toISODate(day)
    for (const entry of WEEKLY_SCHEDULE) {
      if (entry.dayOfWeek === dow) {
        events.push({
          id: `rec-${dateStr}-${entry.startTime}`,
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

  // Rugby fixtures
  for (const fixture of RUGBY_FIXTURES_2026) {
    if (fixture.isLibre) {
      events.push({
        id: `rugby-libre-${fixture.date}`,
        date: fixture.date,
        title: '🔓 Fecha Libre (sin partido)',
        category: 'personal',
        isRecurring: true,
      })
      // Libre week = extra Saturday training
      events.push({
        id: `rugby-sat-train-${fixture.date}`,
        date: fixture.date,
        title: 'Entrenamiento Extra Rugby (fecha libre)',
        category: 'rugby',
        startTime: '10:00',
        endTime: '12:00',
        isRecurring: true,
      })
      // The NEXT Monday = extra rugby training (the week after libre)
      const libSat = new Date(fixture.date)
      const nextMon = addDays(libSat, 2)  // Sat → Mon
      const nextMonStr = toISODate(nextMon)
      events.push({
        id: `rugby-mon-extra-${nextMonStr}`,
        date: nextMonStr,
        title: 'Entrenamiento Extra Rugby 🏉 (post fecha libre)',
        category: 'rugby',
        startTime: '20:30',
        endTime: '22:15',
        isRecurring: true,
        notes: 'Entrenamiento extra por fecha libre la semana anterior',
      })
    } else if (fixture.isSemiOrFinal) {
      events.push({
        id: `rugby-semifinal-${fixture.date}`,
        date: fixture.date,
        title: `🏆 ${fixture.home}`,
        category: 'rugby',
        startTime: '11:30',
        endTime: '14:00',
        isRecurring: true,
      })
    } else if (fixture.home && fixture.away) {
      const time = fixture.specialTime ?? '11:30'
      const isHome = fixture.home === 'San Andrés'
      events.push({
        id: `rugby-fixture-${fixture.date}`,
        date: fixture.date,
        title: `${isHome ? '🏠' : '✈️'} ${fixture.home} vs ${fixture.away}${fixture.round ? ` (F${fixture.round})` : ''}`,
        category: 'rugby',
        startTime: time,
        endTime: fixture.specialTime ? `${parseInt(fixture.specialTime) + 2}:00` : '13:30',
        isRecurring: true,
        notes: fixture.note,
      })
    }
  }

  return events
}

// ─── Time helpers ─────────────────────────────────────────────────────────────

function timeToMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + (m || 0)
}

// ─── Modal state ──────────────────────────────────────────────────────────────

type ModalState =
  | { mode: 'closed' }
  | { mode: 'add'; date: string; prefillTime?: string }
  | { mode: 'edit'; event: CalendarEvent }

// ─── Main component ───────────────────────────────────────────────────────────

export function CalendarView() {
  const [view, setView] = useState<'mes' | 'dia'>('mes')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [modal, setModal] = useState<ModalState>({ mode: 'closed' })
  const [form, setForm] = useState({
    title: '',
    category: 'personal' as EventCategory,
    startTime: '',
    endTime: '',
    notes: '',
  })

  // Load and seed
  useEffect(() => {
    const seededVersion = getStorage<string>(STORAGE_KEYS.CALENDAR_SEEDED, '')
    const stored = getStorage<CalendarEvent[]>(STORAGE_KEYS.CALENDAR_EVENTS, [])
    if (seededVersion !== SEED_VERSION) {
      const seed = seedAllEvents()
      const userEvents = stored.filter((e) => !e.isRecurring)
      const merged = [...seed, ...userEvents]
      setStorage(STORAGE_KEYS.CALENDAR_SEEDED, SEED_VERSION)
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

  const getEventsForDay = (date: Date) =>
    events
      .filter((e) => e.date === toISODate(date))
      .sort((a, b) => (a.startTime ?? '00:00').localeCompare(b.startTime ?? '00:00'))

  const openAdd = (date: Date, prefillTime?: string) => {
    setForm({ title: '', category: 'personal', startTime: prefillTime ?? '', endTime: '', notes: '' })
    setModal({ mode: 'add', date: toISODate(date), prefillTime })
  }

  const openEdit = (event: CalendarEvent, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setForm({
      title: event.title,
      category: event.category,
      startTime: event.startTime ?? '',
      endTime: event.endTime ?? '',
      notes: event.notes ?? '',
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
        notes: form.notes || undefined,
      }
      saveEvents([...events, newEvent])
    } else if (modal.mode === 'edit') {
      saveEvents(
        events.map((e) =>
          e.id === modal.event.id
            ? {
                ...e,
                title: form.title.trim(),
                category: form.category,
                startTime: form.startTime || undefined,
                endTime: form.endTime || undefined,
                notes: form.notes || undefined,
              }
            : e
        )
      )
    }
    setModal({ mode: 'closed' })
  }

  const handleDelete = () => {
    if (modal.mode !== 'edit') return
    saveEvents(events.filter((e) => e.id !== modal.event.id))
    setModal({ mode: 'closed' })
  }

  const today = new Date()
  const WEEK_DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

  return (
    <div>
      {/* ── View toggle ── */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1 rounded-lg border border-border p-1">
          <button
            onClick={() => setView('mes')}
            className={cn(
              'rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
              view === 'mes' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Mes
          </button>
          <button
            onClick={() => setView('dia')}
            className={cn(
              'rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
              view === 'dia' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Día
          </button>
        </div>

        {view === 'mes' && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
              className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              ←
            </button>
            <span className="w-36 text-center text-sm font-semibold">
              {getMonthName(currentMonth.getMonth())} {currentMonth.getFullYear()}
            </span>
            <button
              onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
              className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              →
            </button>
          </div>
        )}

        {view === 'dia' && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedDay((d) => subDays(d, 1))}
              className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              ←
            </button>
            <button
              onClick={() => setSelectedDay(new Date())}
              className="rounded-md px-3 py-1.5 text-sm font-semibold text-primary hover:bg-secondary"
            >
              Hoy
            </button>
            <button
              onClick={() => setSelectedDay((d) => addDays(d, 1))}
              className="rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* ── Monthly view ── */}
      {view === 'mes' && (
        <MonthView
          currentMonth={currentMonth}
          today={today}
          weekDays={WEEK_DAYS}
          getEventsForDay={getEventsForDay}
          onDayClick={(day) => { setSelectedDay(day); setView('dia') }}
          onEventClick={openEdit}
        />
      )}

      {/* ── Daily view ── */}
      {view === 'dia' && (
        <DayView
          selectedDay={selectedDay}
          today={today}
          getEventsForDay={getEventsForDay}
          onAddEvent={openAdd}
          onEventClick={openEdit}
        />
      )}

      {/* ── Legend ── */}
      <div className="mt-4 flex flex-wrap gap-3">
        {(Object.entries(CATEGORY_LABELS) as [EventCategory, string][]).map(([cat, label]) => (
          <div key={cat} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={cn('h-2 w-2 rounded-full', CATEGORY_COLORS[cat])} />
            {CATEGORY_EMOJIS[cat]} {label}
          </div>
        ))}
      </div>

      {/* ── Event modal ── */}
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
                autoFocus
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
                  <option key={cat} value={cat}>
                    {CATEGORY_EMOJIS[cat]} {label}
                  </option>
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
            <div>
              <label className="text-xs text-muted-foreground">Notas (opcional)</label>
              <input
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                placeholder="Notas adicionales..."
              />
            </div>
          </div>

          <DialogFooter>
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

// ─── Month view ───────────────────────────────────────────────────────────────

function MonthView({
  currentMonth,
  today,
  weekDays,
  getEventsForDay,
  onDayClick,
  onEventClick,
}: {
  currentMonth: Date
  today: Date
  weekDays: string[]
  getEventsForDay: (d: Date) => CalendarEvent[]
  onDayClick: (d: Date) => void
  onEventClick: (e: CalendarEvent, ev?: React.MouseEvent) => void
}) {
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const startPad = (getDay(monthStart) + 6) % 7  // Mon=0

  return (
    <>
      <div className="mb-1 grid grid-cols-7 gap-1 text-center">
        {weekDays.map((d) => (
          <div key={d} className="py-1 text-xs font-medium text-muted-foreground">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startPad }).map((_, i) => <div key={`p${i}`} />)}

        {days.map((day) => {
          const dayEvents = getEventsForDay(day)
          const isToday = isSameDay(day, today)
          const isCurrentMonth = isSameMonth(day, currentMonth)

          return (
            <button
              key={day.toISOString()}
              onClick={() => onDayClick(day)}
              className={cn(
                'relative min-h-[80px] rounded-lg border p-1.5 text-left transition-colors hover:bg-secondary',
                isToday ? 'border-primary' : 'border-border',
                !isCurrentMonth && 'opacity-40'
              )}
            >
              <span
                className={cn(
                  'mb-1 block text-xs font-semibold',
                  isToday
                    ? 'flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {format(day, 'd')}
              </span>
              <div className="space-y-0.5">
                {dayEvents.slice(0, 4).map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => { e.stopPropagation(); onEventClick(event, e) }}
                    className={cn(
                      'truncate rounded px-1 py-0.5 text-[10px] font-medium text-white',
                      CATEGORY_COLORS[event.category]
                    )}
                  >
                    {event.startTime && <span className="opacity-70">{event.startTime} </span>}
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 4 && (
                  <div className="pl-1 text-[10px] text-muted-foreground">+{dayEvents.length - 4} más</div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </>
  )
}

// ─── Day view ─────────────────────────────────────────────────────────────────

const HOURS = Array.from({ length: 16 }, (_, i) => i + 8)  // 08:00 – 23:00

function DayView({
  selectedDay,
  today,
  getEventsForDay,
  onAddEvent,
  onEventClick,
}: {
  selectedDay: Date
  today: Date
  getEventsForDay: (d: Date) => CalendarEvent[]
  onAddEvent: (date: Date, prefillTime?: string) => void
  onEventClick: (e: CalendarEvent, ev?: React.MouseEvent) => void
}) {
  const dayEvents = getEventsForDay(selectedDay)
  const isToday = isSameDay(selectedDay, today)

  // Events without a time — show at top
  const allDayEvents = dayEvents.filter((e) => !e.startTime)
  // Events with a time — show in timeline
  const timedEvents = dayEvents.filter((e) => !!e.startTime)

  const CELL_HEIGHT = 60 // px per hour

  return (
    <div>
      {/* Day header */}
      <div className={cn(
        'mb-4 rounded-xl border p-4',
        isToday ? 'border-primary bg-primary/5' : 'border-border bg-card'
      )}>
        <p className={cn('text-lg font-bold', isToday ? 'text-primary' : 'text-foreground')}>
          {getDayName(selectedDay)}, {format(selectedDay, 'd')} de {getMonthName(selectedDay.getMonth())}
          {isToday && <span className="ml-2 text-sm font-normal text-primary">— Hoy</span>}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {dayEvents.length} actividades — hacé clic en el timeline para agregar
        </p>
      </div>

      {/* All-day events */}
      {allDayEvents.length > 0 && (
        <div className="mb-3 space-y-1">
          {allDayEvents.map((event) => (
            <button
              key={event.id}
              onClick={(e) => onEventClick(event, e)}
              className={cn(
                'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm',
                CATEGORY_COLORS[event.category],
                'text-white'
              )}
            >
              <span>{CATEGORY_EMOJIS[event.category]}</span>
              <span className="font-medium">{event.title}</span>
              {event.notes && <span className="ml-auto text-xs opacity-70">{event.notes}</span>}
            </button>
          ))}
        </div>
      )}

      {/* Timeline */}
      <div className="relative rounded-xl border border-border bg-card overflow-hidden">
        {HOURS.map((hour) => {
          const hourStr = `${String(hour).padStart(2, '0')}:00`
          const eventsStartingThisHour = timedEvents.filter((e) => {
            if (!e.startTime) return false
            const h = parseInt(e.startTime.split(':')[0])
            return h === hour
          })

          return (
            <div
              key={hour}
              className="relative flex border-b border-border/30 hover:bg-secondary/20 cursor-pointer group"
              style={{ minHeight: `${CELL_HEIGHT}px` }}
              onClick={() => onAddEvent(selectedDay, hourStr)}
            >
              {/* Hour label */}
              <div className="w-14 shrink-0 px-2 pt-1.5 text-xs text-muted-foreground tabular-nums select-none">
                {hourStr}
              </div>

              {/* Events */}
              <div className="flex-1 px-1 py-1 space-y-1">
                {eventsStartingThisHour.map((event) => {
                  const startMin = timeToMinutes(event.startTime!)
                  const endMin = event.endTime ? timeToMinutes(event.endTime) : startMin + 60
                  const durationMins = Math.max(30, endMin - startMin)
                  const heightPx = Math.max(28, (durationMins / 60) * CELL_HEIGHT - 4)

                  return (
                    <button
                      key={event.id}
                      onClick={(e) => { e.stopPropagation(); onEventClick(event, e) }}
                      className={cn(
                        'flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left text-xs text-white',
                        'hover:opacity-90 transition-opacity',
                        CATEGORY_COLORS[event.category]
                      )}
                      style={{ minHeight: `${heightPx}px` }}
                    >
                      <span className="text-sm shrink-0">{CATEGORY_EMOJIS[event.category]}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{event.title}</p>
                        <p className="opacity-80">
                          {event.startTime}{event.endTime ? ` – ${event.endTime}` : ''}
                        </p>
                        {event.notes && (
                          <p className="opacity-70 truncate">{event.notes}</p>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Add hint */}
              <div className="absolute right-2 top-1 hidden text-[10px] text-muted-foreground group-hover:block">
                + agregar
              </div>
            </div>
          )
        })}
      </div>

      {/* Add event button */}
      <button
        onClick={() => onAddEvent(selectedDay)}
        className="mt-3 w-full rounded-lg border border-dashed border-border py-3 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
      >
        + Agregar evento a este día
      </button>
    </div>
  )
}
