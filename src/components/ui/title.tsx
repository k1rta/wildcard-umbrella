'use client'

import { motion } from 'framer-motion'
import { useSeasonContext } from '@/components/season/provider'
import { SEASON_CONFIGS } from '@/lib/constants/seasons'

type TitleProps = {
  children: React.ReactNode
  className?: string
}

export function Title({ children, className = '' }: TitleProps) {
  const { season } = useSeasonContext()
  const { theme } = SEASON_CONFIGS[season]

  return (
    <motion.h1
      className={`text-5xl font-extralight tracking-tight ${theme.textAccent} sm:text-6xl lg:text-7xl max-w-4xl text-center ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      aria-level={1}
      role="heading"
    >
      {children}
    </motion.h1>
  )
}
