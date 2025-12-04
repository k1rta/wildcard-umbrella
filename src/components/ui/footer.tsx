'use client'

import { motion } from 'framer-motion'
import { useSeasonContext } from '../season/provider'
import { SEASON_CONFIGS } from '@/lib/constants/seasons'
import type { Season } from '@/lib/types/season'
import { TEST_IDS } from '@/lib/constants/test-ids'

/**
 * Props for the Footer component
 * @typedef FooterProps
 */
export type FooterProps = {
  /** Optional CSS classes */
  readonly className?: string
}

/**
 * A seasonally themed footer component with copyright information.
 * Uses semantic footer element and proper ARIA roles.
 *
 * @param props - {@link FooterProps}
 * @returns React element with motion animation
 */
export function Footer({ className = '' }: FooterProps): JSX.Element {
  const { season } = useSeasonContext()
  const { theme } = SEASON_CONFIGS[season as Season]

  /**
   * Animation configuration
   * @readonly
   */
  const animation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, delay: 0.6 },
  } as const

  return (
    <motion.footer
      {...animation}
      className={`flex flex-col items-center gap-3 text-center opacity-75 py-6 mt-auto border-t border-current/5 ${className}`}
      data-testid={TEST_IDS.ui.footer}
      role="contentinfo"
    >
      <div className={`${theme.textAccent} text-[11px] tracking-[0.2em] font-thin uppercase`}>
        © {new Date().getFullYear()} Nekmit OÜ • All rights reserved
      </div>
    </motion.footer>
  )
}
