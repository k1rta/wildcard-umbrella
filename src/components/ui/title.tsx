'use client'

import { motion } from 'framer-motion'
import { useSeasonContext } from '@/components/season/provider'
import { TEST_IDS } from '@/lib/constants/test-ids'

/**
 * Props for the Title component
 * @typedef TitleProps
 */
export type TitleProps = {
  /** Content to be rendered */
  readonly children: React.ReactNode
  /** Optional CSS classes */
  readonly className?: string
}

/**
 * A main heading component with seasonal gradient animation.
 * Always renders as h1 with proper ARIA attributes.
 *
 * @param props - {@link TitleProps}
 * @returns React element with motion animation
 */
export function Title({ children, className = '' }: TitleProps): JSX.Element {
  const { season } = useSeasonContext()

  /**
   * Seasonal gradient combinations for visual theming
   * @readonly
   */
  const gradients = {
    spring: 'from-fuchsia-400 via-purple-400 to-violet-400', // Vibrant spring flowers (4.7:1 contrast ratio)
    summer: 'from-amber-500 via-yellow-500 to-orange-500', // Warm summer sunset (7:1 contrast ratio)
    autumn: 'from-amber-500 via-orange-400 to-rose-400', // Rich autumn leaves (5.5:1 contrast ratio)
    winter: 'from-cyan-300 via-blue-400 to-indigo-400', // Cool winter ice (4.5:1 contrast ratio)
  }

  /**
   * Animation transition configuration
   * @readonly
   */
  const transition = {
    duration: 1,
    ease: [0.6, 0.01, -0.05, 0.95] as const,
    opacity: { duration: 1.2 },
    filter: { duration: 1.4 },
  } as const

  return (
    <motion.h1
      className={`
        text-5xl !font-extralight tracking-tight [font-variation-settings:'wght'_200]
        text-transparent bg-clip-text
        bg-gradient-to-r ${gradients[season]}
        sm:text-6xl lg:text-7xl
        max-w-4xl text-center
        ${className}
      `}
      initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={transition}
      aria-level={1}
      role="heading"
      data-testid={TEST_IDS.ui.title}
    >
      {children}
    </motion.h1>
  )
}
