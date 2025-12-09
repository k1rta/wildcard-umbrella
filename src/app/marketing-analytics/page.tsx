'use client'

import dynamic from 'next/dynamic'
import { PageLayout } from '@/components/ui/layout'
import { LoadingState } from '@/components/ui/loading-state'

const AnalyticsView = dynamic(
  () => import('@/components/marketing/analytics-view').then((mod) => mod.AnalyticsView),
  {
    loading: () => <LoadingState />,
    ssr: false,
  }
)

export default function MarketingAnalytics() {
  return (
    <PageLayout>
      <AnalyticsView />
    </PageLayout>
  )
}
