'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useSeasonContext } from '../season/provider'
import { SEASON_CONFIGS } from '@/lib/constants/seasons'
import type { Season } from '@/lib/types/season'

type FooterProps = {
  children?: React.ReactNode
  name?: string
  tagline?: string
  className?: string
}

export function Footer({
  children,
  name = 'Your Name',
  tagline = 'Data-Driven Marketing Solutions',
  className = '',
}: FooterProps): JSX.Element {
  const { season } = useSeasonContext()
  const { theme } = SEASON_CONFIGS[season as Season]

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className={`flex flex-col items-center gap-3 text-center py-6 mt-auto border-t border-current/5 ${className}`}
      data-test="footer"
      role="contentinfo"
    >
      {children ? (
        children
      ) : (
        <div className={`${theme.textAccent} text-[11px] tracking-[0.2em] font-thin uppercase`}>
          © {new Date().getFullYear()} {name} • {tagline}
        </div>
      )}
    </motion.footer>
  )
}
