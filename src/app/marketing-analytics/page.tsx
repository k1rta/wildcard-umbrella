'use client'

import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Title } from '@/components/ui/title'
import { Text } from '@/components/ui/text'
import { PageLayout } from '@/components/ui/layout'
import { TAGLINE_ROTATION_INTERVAL } from '@/lib/constants/animations'
import { TAGLINE_CLASSES } from '@/lib/constants/styles'
import { TEST_IDS } from '@/lib/constants/test-ids'

const taglines = ['Coming soon...']

export default function MarketingAnalytics() {
  const [currentTagline, setCurrentTagline] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((current) => (current + 1) % taglines.length)
    }, TAGLINE_ROTATION_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  return (
    <PageLayout>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="flex flex-col items-center gap-2 text-center w-full max-w-4xl mx-auto">
          <Title>Marketing Analytics</Title>
          <AnimatePresence mode="wait">
            <Text
              key={taglines[currentTagline]}
              delay={0.5}
              className={TAGLINE_CLASSES}
              testId={TEST_IDS.pages.marketingAnalytics.tagline}
            >
              {taglines[currentTagline]}
            </Text>
          </AnimatePresence>
        </div>
      </div>
    </PageLayout>
  )
}
