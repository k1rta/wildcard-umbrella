'use client'

import { motion } from 'framer-motion'

const iconVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, filter: 'brightness(1.2)' },
}

type IconLinkProps = {
  href: string
  icon: React.ReactNode
  label: string
  className?: string
  'data-testid'?: string
  target?: '_blank' | '_self'
}

export function IconLink({
  href,
  icon,
  label,
  className = '',
  'data-testid': dataTest,
  target,
}: IconLinkProps): JSX.Element {
  const isExternal = href.startsWith('http')
  const linkTarget = target || (isExternal ? '_blank' : '_self')

  return (
    <motion.a
      href={href}
      target={linkTarget}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      data-testid={dataTest}
      aria-label={label}
      className={`flex flex-col items-center gap-1.5 text-white/90 hover:text-white transition-all ${className}`}
      variants={iconVariants}
      initial="initial"
      whileHover="hover"
    >
      {icon}
      <span className="text-[13px] font-normal tracking-wide text-white/90 mt-1.5">{label}</span>
    </motion.a>
  )
}
