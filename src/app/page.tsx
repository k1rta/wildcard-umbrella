'use client'

import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Title } from '@/components/ui/title'
import { Text } from '@/components/ui/text'
import { IconGrid } from '@/components/ui/nav/icon-grid'
import { Footer } from '@/components/ui/footer'

const taglines = [
  'Transforming data insights into marketing strategies with measurable ROI.',
  'Specializing in analytics and marketing automation to scale your business.',
  'Creating data-driven campaigns that connect and deliver results.',
]

const ROTATION_INTERVAL = 6000 // 6 seconds

export default function Home() {
  const [currentTagline, setCurrentTagline] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((current) => (current + 1) % taglines.length)
    }, ROTATION_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col relative z-10" data-test="page-layout">
      <main
        className="flex-1 flex flex-col items-center justify-center px-6 py-16 sm:px-8"
        data-test="main-content"
      >
        <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-0">
          <div className="flex flex-col items-center gap-4 text-center" data-test="hero-section">
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
        </div>
      </main>
      <Footer />
    </div>
  )
}
