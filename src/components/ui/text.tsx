'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { TEST_IDS } from '@/lib/constants/test-ids'
import { TAGLINE_ANIMATION_DURATION, TAGLINE_EASING } from '@/lib/constants/animations'

/**
 * Valid HTML elements that can be used for text rendering
 */
type TextElement = 'p' | 'span' | 'div'

/**
 * Props for the Text component
 * @typedef TextProps
 */
export type TextProps = {
  readonly children: React.ReactNode
  readonly className?: string
  readonly delay?: number
  readonly as?: TextElement
  readonly testId?: string
}

/**
 * A text component with seasonal theming and fade-in animation.
 * Supports rendering as different HTML elements for semantic markup.
 *
 * @param props - {@link TextProps}
 * @returns React element with motion animation
 */
export function Text({
  children,
  className = '',
  delay = 0,
  as = 'p',
  testId,
}: TextProps): React.ReactElement {
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
      className={`text-base font-normal leading-relaxed tracking-wide !text-white/70 ${className}`}
      data-testid={testId || TEST_IDS.ui.text}
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
      transition={{
        duration: TAGLINE_ANIMATION_DURATION,
        delay,
        ease: TAGLINE_EASING,
      }}
      role={as === 'p' ? 'paragraph' : undefined}
    >
      {children}
    </Component>
  )
}
