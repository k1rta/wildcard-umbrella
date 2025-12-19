import { ComingSoonPage } from '@/components/shared/coming-soon'
import { TEST_IDS } from '@/lib/constants/test-ids'

export default function CompanyInfoPage() {
  return <ComingSoonPage title="Company Info" taglineTestId={TEST_IDS.pages.companyInfo.tagline} />
}
