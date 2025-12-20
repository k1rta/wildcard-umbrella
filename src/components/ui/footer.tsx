'use client'

import { motion } from 'framer-motion'
import { TEST_IDS } from '@/lib/constants/test-ids'
import { cn } from '@/lib/utils/cn'

export type FooterProps = {
  readonly className?: string
}

export function Footer({ className = '' }: FooterProps): React.ReactElement {
  const animation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, delay: 0.6 },
  } as const

  return (
    <motion.footer
      {...animation}
      className={cn(
        'flex items-center justify-center',
        'w-full',
        'py-4 sm:py-5 md:py-6',
        'px-4 sm:px-6',
        'border-t border-white/20',
        'mt-auto',
        className
      )}
      data-testid={TEST_IDS.ui.footer}
      role="contentinfo"
    >
      <p
        className={cn(
          'font-space font-light',
          'text-[10px] sm:text-xs md:text-sm',
          'tracking-[0.15em]',
          'uppercase',
          'text-white/40 hover:text-white/60',
          'transition-colors duration-300',
          'text-center'
        )}
      >
        &copy; {new Date().getFullYear()} Nekmit O&Uuml; &bull; All rights reserved
      </p>
    </motion.footer>
  )
}
