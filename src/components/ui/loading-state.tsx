'use client'

import { motion } from 'framer-motion'
import { TEST_IDS } from '@/lib/constants/test-ids'

export function LoadingState(): React.ReactElement {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      data-testid={TEST_IDS.ui.loading}
    >
      <motion.div
        className="h-8 w-8 rounded-full border-4 border-white/10 border-t-white"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}
