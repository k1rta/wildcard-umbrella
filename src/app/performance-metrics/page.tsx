'use client'

import { Title } from '@/components/ui/title'
import { PageLayout } from '@/components/ui/layout'
import { Tagline } from '@/components/shared/tagline'
import { TEST_IDS } from '@/lib/constants/test-ids'
import { CONTENT } from '@/lib/constants/content'

export default function PerformanceMetrics() {
  return (
    <PageLayout>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="flex flex-col items-center gap-2 text-center w-full max-w-4xl mx-auto">
          <Title>Performance Metrics</Title>
          <Tagline testId={TEST_IDS.pages.performanceMetrics.tagline}>
            {CONTENT.TAGLINES.COMING_SOON}
          </Tagline>
        </div>
      </div>
    </PageLayout>
  )
}
