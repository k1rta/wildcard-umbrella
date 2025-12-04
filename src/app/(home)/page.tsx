'use client'

import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Title } from '@/components/ui/title'
import { Text } from '@/components/ui/text'
import { IconGrid } from '@/components/ui/nav/icon-grid'
import { PageLayout } from '@/components/ui/layout'
import { TEST_IDS } from '@/lib/constants/test-ids'

const taglines = [
  'Transforming data insights into marketing strategies with measurable ROI.',
  'Specializing in analytics and marketing automation to scale your business.',
  'Creating data-driven campaigns that connect and deliver results.',
]

const ROTATION_INTERVAL = 6000 // 6 seconds

export default function HomePage() {
  const [currentTagline, setCurrentTagline] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((current) => (current + 1) % taglines.length)
    }, ROTATION_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  return (
    <PageLayout>
      <div
        className="flex flex-col items-center gap-4 text-center"
        data-testid={TEST_IDS.page.hero}
      >
        <Title>Marketing & Data Professional</Title>
        <div className="h-16 sm:h-14">
          <AnimatePresence mode="wait">
            <Text key={taglines[currentTagline]} delay={0.5}>
              {taglines[currentTagline]}
            </Text>
          </AnimatePresence>
        </div>
      </div>
      <IconGrid />
    </PageLayout>
  )
}
