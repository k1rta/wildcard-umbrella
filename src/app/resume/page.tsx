import { ComingSoonPage } from '@/components/shared/coming-soon'
import { TEST_IDS } from '@/lib/constants/test-ids'

export default function ResumePage() {
  return <ComingSoonPage title="Resume" taglineTestId={TEST_IDS.pages.resume.tagline} />
}
