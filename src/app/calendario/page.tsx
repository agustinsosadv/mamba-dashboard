import { PageWrapper } from '@/components/layout/PageWrapper'
import { CalendarView } from '@/components/calendario/CalendarView'

export default function CalendarioPage() {
  return (
    <PageWrapper title="Calendario" subtitle="Tu semana, organizada.">
      <CalendarView />
    </PageWrapper>
  )
}
