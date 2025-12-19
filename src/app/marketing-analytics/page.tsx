import { ComingSoonPage } from '@/components/shared/coming-soon'
import { TEST_IDS } from '@/lib/constants/test-ids'

export default function MarketingAnalyticsPage() {
  return (
    <ComingSoonPage
      title="Marketing Analytics"
      taglineTestId={TEST_IDS.pages.marketingAnalytics.tagline}
    />
  )
}
