'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'

/**
 * Animation variants for the icon link hover effect.
 * @readonly
 */
const iconVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, filter: 'brightness(1.2)' },
} as const

/**
 * Props for the IconLink component.
 * @typedef IconLinkProps
 */
export type IconLinkProps = {
  /** URL for the link */
  readonly href: string
  /** Icon element to display */
  readonly icon: React.ReactNode
  /** Accessible label and visible text */
  readonly label: string
  /** Optional CSS classes */
  readonly className?: string
  /** Test ID for testing */
  readonly 'data-testid'?: string
  /** Link target, defaults to _self for internal and _blank for external */
  readonly target?: '_blank' | '_self'
}

/**
 * A clickable icon with label that animates on hover.
 * Automatically handles internal/external link behavior.
 *
 * @param props - {@link IconLinkProps}
 * @returns React element or null if required props are missing
 */
function IconLinkComponent({
  href,
  icon,
  label,
  className = '',
  'data-testid': dataTest,
  target,
}: IconLinkProps): React.ReactElement | null {
  if (!href || !label) {
    console.warn('IconLink: href and label are required')
    return null
  }
  const isExternal = href.startsWith('http')
  const linkTarget = target || (isExternal ? '_blank' : '_self')

  return (
    <motion.a
      href={href}
      target={linkTarget}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      data-testid={dataTest}
      aria-label={label}
      className={`flex flex-col items-center gap-1.5 text-white/70 transition-all ${className}`}
      variants={iconVariants}
      initial="initial"
      whileHover="hover"
    >
      {icon}
      <span className="text-[13px] font-normal tracking-wide text-white/70 mt-1.5">{label}</span>
    </motion.a>
  )
}

export const IconLink = memo(IconLinkComponent)
