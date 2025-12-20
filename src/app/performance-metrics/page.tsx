import { ComingSoonPage } from '@/components/shared/coming-soon'
import { TEST_IDS } from '@/lib/constants/test-ids'

export default function PerformanceMetricsPage() {
  return (
    <ComingSoonPage
      title="Performance Metrics"
      taglineTestId={TEST_IDS.pages.performanceMetrics.tagline}
    />
  )
}
