'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { useSeasonContext } from '../season/provider'
import { SEASON_CONFIGS } from '@/lib/constants/seasons'

type ElementType = 'p' | 'span' | 'div'

type TextProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: ElementType
}

export function Text({ children, className = '', delay = 0, as = 'p' }: TextProps): JSX.Element {
  const { season } = useSeasonContext()
  const { theme } = SEASON_CONFIGS[season as keyof typeof SEASON_CONFIGS]

  const MotionComponent = as === 'p' ? motion.p : as === 'span' ? motion.span : motion.div

  return (
    <MotionComponent
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
    </MotionComponent>
  )
}
