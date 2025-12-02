'use client'

import { motion } from 'framer-motion'
import { useSeasonContext } from '../season/provider'
import { SEASON_CONFIGS } from '@/lib/constants/seasons'

interface TextProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function Text({ children, className = '', delay = 0 }: TextProps) {
  const { season } = useSeasonContext()
  const { theme } = SEASON_CONFIGS[season as keyof typeof SEASON_CONFIGS]

  return (
    <motion.p
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
      role="paragraph"
    >
      {children}
    </motion.p>
  )
}
