import { PageWrapper } from '@/components/layout/PageWrapper'
import { KobeQuote } from '@/components/dashboard/KobeQuote'
import { TodaySchedule } from '@/components/dashboard/TodaySchedule'
import { NutritionToday } from '@/components/dashboard/NutritionToday'
import { QuickWins } from '@/components/dashboard/QuickWins'

export default function DashboardPage() {
  return (
    <PageWrapper>
      <div className="space-y-4">
        <KobeQuote />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <TodaySchedule />
          <NutritionToday />
          <QuickWins />
        </div>
      </div>
    </PageWrapper>
  )
}
