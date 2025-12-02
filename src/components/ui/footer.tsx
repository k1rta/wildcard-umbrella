'use client'

import { motion } from 'framer-motion'
import { useSeasonContext } from '../season/provider'
import { SEASON_CONFIGS } from '@/lib/constants/seasons'
import type { Season } from '@/lib/types/season'

export function Footer() {
  const { season } = useSeasonContext()
  const { theme } = SEASON_CONFIGS[season as Season]

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="flex flex-col items-center gap-3 text-center opacity-75 py-6 mt-auto border-t border-current/5"
      data-test="footer"
      role="contentinfo"
    >
      <div className={`${theme.textAccent} text-[11px] tracking-[0.2em] font-thin uppercase`}>
        © {new Date().getFullYear()} Your Name • Data-Driven Marketing Solutions
      </div>
    </motion.footer>
  )
}
