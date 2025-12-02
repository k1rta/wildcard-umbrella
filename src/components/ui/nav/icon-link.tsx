'use client'

import { motion } from 'framer-motion'

const iconVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, filter: 'brightness(1.2)' },
}

interface IconLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  className?: string
  'data-test'?: string
}

export function IconLink({ href, icon, label, className, 'data-test': dataTest }: IconLinkProps) {
  const isExternal = href.startsWith('http')

  return (
    <motion.a
      href={href}
      className={`flex flex-col items-center gap-1.5 text-white/90 hover:text-white transition-all ${className || ''}`}
      variants={iconVariants}
      initial="initial"
      whileHover="hover"
      data-test={dataTest}
      {...(isExternal && {
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
    >
      {icon}
      <span className="text-[13px] font-normal tracking-wide text-white/90 mt-1.5">{label}</span>
    </motion.a>
  )
}
