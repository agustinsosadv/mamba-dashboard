import { PageWrapper } from '@/components/layout/PageWrapper'
import { ObjetivosView } from '@/components/objetivos/ObjetivosView'

export default function ObjetivosPage() {
  return (
    <PageWrapper title="Objetivos" subtitle="Sin metas claras no hay dirección. Q2 2026.">
      <ObjetivosView />
    </PageWrapper>
  )
}
