'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { useSeasonContext } from '@/components/season/provider'
import { TEST_IDS } from '@/lib/constants/test-ids'

type TitleProps = HTMLMotionProps<'h1'> & {
  children: React.ReactNode
  className?: string
}

export function Title({ children, className = '' }: TitleProps) {
  const { season } = useSeasonContext()

  // Modern gradient combinations for each season
  const gradients = {
    spring: 'from-fuchsia-400 via-purple-400 to-violet-400', // Vibrant spring flowers
    summer: 'from-amber-300 via-yellow-300 to-orange-300', // Warm summer sunset
    autumn: 'from-amber-500 via-orange-400 to-rose-400', // Rich autumn leaves
    winter: 'from-cyan-300 via-blue-400 to-indigo-400', // Cool winter ice
  }

  return (
    <motion.h1
      className={`
        text-5xl font-extralight tracking-tight
        text-transparent bg-clip-text
        bg-gradient-to-r ${gradients[season]}
        sm:text-6xl lg:text-7xl
        max-w-4xl text-center
        ${className}
      `}
      initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 1,
        ease: [0.6, 0.01, -0.05, 0.95],
        opacity: { duration: 1.2 },
        filter: { duration: 1.4 },
      }}
      aria-level={1}
      role="heading"
      data-testid={TEST_IDS.ui.title}
    >
      {children}
    </motion.h1>
  )
}
