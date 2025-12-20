'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TEST_IDS } from '@/lib/constants/test-ids'
import { cn } from '@/lib/utils/cn'

export interface TaglineProps {
  /** Static text content */
  children?: string
  /** Array of text lines to animate through */
  lines?: readonly string[]
  /** Enable typing animation */
  animated?: boolean
  /** Delay between typing each character (ms) */
  delay?: number
  /** Additional CSS classes */
  className?: string
  /** Gradient start color */
  gradientFrom?: string
  /** Gradient end color */
  gradientTo?: string
  /** Test ID for component */
  testId?: string
}

const DEFAULT_TYPING_DELAY = 90
const ANIMATION_DURATION = 0.3
const PAUSE_DURATION = 1500

// Responsive: wraps on mobile, single line on tablet+
const baseStyles = cn(
  'text-base sm:text-lg lg:text-xl',
  'font-space font-normal',
  'tracking-wide leading-relaxed',
  'bg-gradient-to-r bg-clip-text text-transparent',
  'whitespace-normal md:whitespace-nowrap'
)

/** Get the index of the next line in the rotation */
export const getNextLineIndex = (currentIndex: number, totalLines: number): number => {
  return (currentIndex + 1) % totalLines
}

/** Check if animation should be active */
export const shouldAnimate = (
  animated: boolean,
  lines: readonly string[],
  isMounted: boolean
): boolean => animated && lines.length > 0 && isMounted

export function Tagline({
  children,
  lines = [],
  animated = false,
  delay = DEFAULT_TYPING_DELAY,
  className = '',
  gradientFrom = 'from-zinc-300',
  gradientTo = 'to-zinc-100',
  testId = TEST_IDS.text.tagline,
}: TaglineProps): React.ReactElement | null {
  const [isMounted, setIsMounted] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Handle component mount
  useEffect(() => setIsMounted(true), [])

  // Handle text animation
  useEffect(() => {
    if (!shouldAnimate(animated, lines, isMounted) || lines.length <= 1) return

    const text = lines[currentLine]
    if (!text) return

    let currentChar = 0
    setIsTyping(true)
    setDisplayText('')

    // Type out the current line
    const typeInterval = setInterval(() => {
      if (currentChar >= text.length) {
        clearInterval(typeInterval)
        setIsTyping(false)
        return
      }
      setDisplayText(text.slice(0, ++currentChar))
    }, delay)

    // Set up the next line
    const rotationTimeout = setTimeout(
      () => {
        setCurrentLine((prev) => getNextLineIndex(prev, lines.length))
      },
      text.length * delay + PAUSE_DURATION
    )

    return () => {
      clearInterval(typeInterval)
      clearTimeout(rotationTimeout)
    }
  }, [animated, currentLine, delay, isMounted, lines])

  // Handle empty state
  if (!children && lines.length === 0) return null

  // Reserve exact space based on line height to prevent icon shift
  // Mobile (< 640px): 3 lines × 1.75rem + spacing = 6rem
  // Tablet (640px+): 2 lines × 1.75rem + spacing = 4rem
  // Desktop (768px+): 1 line = 2.5rem
  const wrapperClasses = cn(
    'w-full max-w-4xl mx-auto px-4 text-center',
    // Fixed heights prevent layout shift across all screen sizes
    'h-24 sm:h-16 md:h-10',
    'flex items-center justify-center',
    className
  )
  const textClasses = cn(baseStyles, gradientFrom, gradientTo, 'relative')

  // Static mode
  if (!animated || lines.length <= 1) {
    return (
      <div className={wrapperClasses}>
        <motion.p
          className={textClasses}
          data-testid={testId}
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: ANIMATION_DURATION }}
        >
          {children || lines[0]}
        </motion.p>
      </div>
    )
  }

  // Animated mode
  return (
    <div className={wrapperClasses}>
      <AnimatePresence mode="wait">
        <motion.p
          key={currentLine}
          className={textClasses}
          data-testid={testId}
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
          transition={{ duration: ANIMATION_DURATION }}
        >
          {displayText}
          {isTyping && (
            <motion.span
              className="inline-block ml-0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              aria-hidden="true"
            >
              |
            </motion.span>
          )}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
