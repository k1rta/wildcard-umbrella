'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useSeasonContext } from '../season/provider'
import { SEASON_CONFIGS } from '@/lib/constants/seasons'
import { TEST_IDS } from '@/lib/constants/test-ids'

/**
 * Valid HTML elements that can be used for text rendering
 */
type TextElement = 'p' | 'span' | 'div'

/**
 * Props for the Text component
 * @typedef TextProps
 */
export type TextProps = {
  /** Content to be rendered */
  readonly children: React.ReactNode
  /** Optional CSS classes */
  readonly className?: string
  /** Animation delay in seconds */
  readonly delay?: number
  /** HTML element to render as. Affects semantics and accessibility */
  readonly as?: TextElement
}

/**
 * A text component with seasonal theming and fade-in animation.
 * Supports rendering as different HTML elements for semantic markup.
 *
 * @param props - {@link TextProps}
 * @returns React element with motion animation
 */
export function Text({ children, className = '', delay = 0, as = 'p' }: TextProps): JSX.Element {
  const { season } = useSeasonContext()
  const { theme } = SEASON_CONFIGS[season as keyof typeof SEASON_CONFIGS]

  /**
   * Memoized motion component based on the 'as' prop
   * Prevents recreation of the component reference on re-renders
   */
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
      data-testid={TEST_IDS.ui.text}
    >
      {children}
    </Component>
  )
}
