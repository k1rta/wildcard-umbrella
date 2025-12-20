import { Title } from '@/components/ui/title'
import { PageLayout } from '@/components/ui/layout'
import { IconGrid } from '@/components/ui/nav/icon-grid'
import { Tagline } from '@/components/shared/tagline'
import { TEST_IDS } from '@/lib/constants/test-ids'
import { CONTENT } from '@/lib/constants/content'

export default function HomePage() {
  return (
    <PageLayout>
      <Title>{CONTENT.TITLE}</Title>
      <Tagline animated lines={CONTENT.TAGLINES.HOME} testId={TEST_IDS.pages.home.tagline} />
      <IconGrid />
    </PageLayout>
  )
}
