'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

export type IconLinkProps = {
  readonly href: string
  readonly icon: React.ReactNode
  readonly label: string
  readonly className?: string
  readonly testId?: string
  readonly 'data-testid'?: string
}

export function IconLink({
  href,
  icon,
  label,
  className,
  testId,
  'data-testid': dataTestId,
}: IconLinkProps) {
  if (!href || !label) {
    console.warn('IconLink: href and label are required')
    return null
  }

  const isExternal = href.startsWith('http')
  const finalTestId = testId || dataTestId

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(
        'flex flex-col items-center gap-1.5',
        'text-white/70 transition-all',
        className
      )}
      aria-label={label}
      data-testid={finalTestId}
    >
      <motion.span
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {icon}
      </motion.span>
      <span className="text-[13px] font-normal tracking-wide text-white/70 mt-1.5">{label}</span>
    </Link>
  )
}
