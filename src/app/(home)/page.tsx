'use client'

import { Title } from '@/components/ui/title'
import { PageLayout } from '@/components/ui/layout'
import { IconGrid } from '@/components/ui/nav/icon-grid'
import { Tagline } from '@/components/shared/tagline'
import { TEST_IDS } from '@/lib/constants/test-ids'
import { CONTENT } from '@/lib/constants/content'

export default function HomePage() {
  return (
    <PageLayout>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="flex flex-col items-center gap-2 text-center w-full max-w-4xl mx-auto">
          <Title>Marketing & Data Professional</Title>
          <Tagline animated lines={CONTENT.TAGLINES.HOME} testId={TEST_IDS.pages.home.tagline} />
          <div className="mt-4 sm:mt-5 md:mt-6">
            <IconGrid />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
