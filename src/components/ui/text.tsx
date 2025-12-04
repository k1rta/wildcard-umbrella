'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useSeasonContext } from '../season/provider'
import { SEASON_CONFIGS } from '@/lib/constants/seasons'

type TextProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'p' | 'span' | 'div'
}

export function Text({ children, className = '', delay = 0, as = 'p' }: TextProps): JSX.Element {
  const { season } = useSeasonContext()
  const { theme } = SEASON_CONFIGS[season as keyof typeof SEASON_CONFIGS]

  const Component = React.useMemo(() => {
    switch (as) {
      case 'span':
        return motion.span
      case 'div':
        return motion.div
      default:
        return motion.p
    }
  }, [as])

  return (
    <Component
      className={`text-base sm:text-lg font-normal leading-relaxed tracking-wide ${theme.textAccent} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1.2,
          delay,
          ease: 'easeOut',
        },
      }}
      role={as === 'p' ? 'paragraph' : undefined}
    >
      {children}
    </Component>
  )
}
