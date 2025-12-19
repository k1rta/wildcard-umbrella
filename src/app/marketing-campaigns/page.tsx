import { ComingSoonPage } from '@/components/shared/coming-soon'
import { TEST_IDS } from '@/lib/constants/test-ids'

export default function MarketingCampaignsPage() {
  return (
    <ComingSoonPage
      title="Marketing Campaigns"
      taglineTestId={TEST_IDS.pages.marketingCampaigns.tagline}
    />
  )
}
