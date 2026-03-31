import { PageWrapper } from '@/components/layout/PageWrapper'
import { ProgresoView } from '@/components/progreso/ProgresoView'

export default function ProgresoPage() {
  return (
    <PageWrapper title="Progreso" subtitle="Lo que se mide, mejora.">
      <ProgresoView />
    </PageWrapper>
  )
}
