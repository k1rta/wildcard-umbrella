'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TEST_IDS } from '@/lib/constants/test-ids'
import { TAGLINE_ANIMATION_DURATION, TAGLINE_EASING } from '@/lib/constants/animations'

type AnimationState = {
  currentLine: number
  displayText: string
  isTyping: boolean
}

export interface TaglineProps extends React.PropsWithChildren {
  /** Static mode – one simple line, e.g. "Coming soon" */
  children?: string

  /** Animated mode – multiple lines, shown with typing effect */
  lines?: readonly string[]

  /** If true, use typing/animated mode with `lines` */
  animated?: boolean

  /** Typing delay in ms per character (default 90ms) */
  delay?: number

  /** Optional extra classes for the outer wrapper */
  className?: string

  /** Optional Tailwind classes for gradient start color (animated mode) */
  gradientFrom?: string

  /** Optional Tailwind classes for gradient end color (animated mode) */
  gradientTo?: string

  /** Optional test ID for the component */
  testId?: string
}

const initialState: AnimationState = {
  currentLine: 0,
  displayText: '',
  isTyping: false,
}

export const DEFAULT_TYPING_DELAY = 90

export const getNextLineIndex = (currentIndex: number, totalLines: number): number => {
  return (currentIndex + 1) % totalLines
}

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
  const [{ currentLine, displayText, isTyping }, setState] = useState<AnimationState>(initialState)

  // Handle mount and initial setup
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle line rotation
  useEffect(() => {
    if (!shouldAnimate(animated, lines, isMounted) || lines.length <= 1) return

    // Calculate total time for typing + pause
    const currentText = lines[currentLine] || ''
    const typingDuration = currentText.length * delay
    const pauseDuration = 1500 // 1.5 second pause after typing
    const totalDuration = typingDuration + pauseDuration

    const rotationTimeout = setTimeout(() => {
      setState((prev) => ({
        currentLine: getNextLineIndex(prev.currentLine, lines.length),
        displayText: '',
        isTyping: true,
      }))
    }, totalDuration)

    return () => clearTimeout(rotationTimeout)
  }, [animated, lines, currentLine, delay, isMounted])

  // Handle typing effect
  useEffect(() => {
    if (!shouldAnimate(animated, lines, isMounted)) return

    const text = lines[currentLine]
    if (!text) return

    // Reset state for new line
    setState((prev) => ({ ...prev, isTyping: true, displayText: '' }))

    let currentChar = 0
    const typeInterval = setInterval(() => {
      setState((prev) => {
        if (currentChar >= text.length) {
          clearInterval(typeInterval)
          return { ...prev, isTyping: false, displayText: text }
        }

        currentChar++
        return {
          ...prev,
          displayText: text.slice(0, currentChar),
        }
      })
    }, delay)

    return () => clearInterval(typeInterval)
  }, [animated, currentLine, delay, isMounted, lines])

  // Render nothing if no content is provided
  if (!children && (!lines || lines.length === 0)) {
    return null
  }

  // Static mode - simple fade in
  if (!animated || lines.length <= 1) {
    return (
      <div className="max-w-3xl mx-auto px-4 text-center my-6">
        <motion.p
          className={`text-base sm:text-lg lg:text-xl font-space font-normal tracking-wide leading-relaxed bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent relative ${className}`}
          data-testid={testId}
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: TAGLINE_ANIMATION_DURATION,
            ease: TAGLINE_EASING,
          }}
        >
          {children}
        </motion.p>
      </div>
    )
  }

  // Server + first client paint: render static first line (no motion props)
  if (!isMounted) {
    return (
      <div className={`max-w-3xl mx-auto px-4 text-center ${className}`}>
        <p
          className={`text-lg md:text-xl bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}
          data-testid={testId}
        >
          {lines[0] || ''}
        </p>
      </div>
    )
  }

  // After mount: render animated version with typewriter
  return (
    <div className={`max-w-3xl mx-auto px-4 text-center ${className}`}>
      <AnimatePresence mode="wait">
        <motion.p
          key={lines[0]}
          className={`text-base sm:text-lg lg:text-xl font-space font-normal tracking-wide leading-relaxed bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent relative ${className}`}
          data-testid={testId}
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
          transition={{
            duration: TAGLINE_ANIMATION_DURATION,
            ease: TAGLINE_EASING,
          }}
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
