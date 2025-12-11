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
        <section className="mt-10 flex flex-col items-center text-center">
          <Title>Marketing & Data Professional</Title>

          <Tagline
            animated
            lines={CONTENT.TAGLINES.HOME}
            testId={TEST_IDS.pages.home.tagline}
            className="mt-5 mb-6 text-base sm:text-lg font-medium tracking-wide text-zinc-300 text-center whitespace-normal lg:whitespace-nowrap max-w-4xl"
          />

          <IconGrid />
        </section>
      </div>
    </PageLayout>
  )
}
