'use client'

import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Title } from './title'
import { Text } from './text'
import { TAGLINE_ROTATION_INTERVAL } from '@/lib/constants/animations'
import { TAGLINE_CLASSES } from '@/lib/constants/styles'

interface ComingSoonProps {
  title: string
  testId: string
}

const taglines = ['Coming soon...']

export function ComingSoon({ title, testId }: ComingSoonProps) {
  const [currentTagline, setCurrentTagline] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((current) => (current + 1) % taglines.length)
    }, TAGLINE_ROTATION_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
      <div className="flex flex-col items-center gap-2 text-center w-full max-w-4xl mx-auto">
        <Title>{title}</Title>
        <AnimatePresence mode="wait">
          <Text
            key={taglines[currentTagline]}
            delay={0.5}
            className={TAGLINE_CLASSES}
            testId={testId}
          >
            {taglines[currentTagline]}
          </Text>
        </AnimatePresence>
      </div>
    </div>
  )
}
