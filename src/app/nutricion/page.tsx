import { PageWrapper } from '@/components/layout/PageWrapper'
import { NutricionView } from '@/components/nutricion/NutricionView'

export default function NutricionPage() {
  return (
    <PageWrapper title="Nutrición" subtitle="El combustible del campeón.">
      <NutricionView />
    </PageWrapper>
  )
}
