'use client'

import * as Icons from './icons'
import { IconLink } from './icon-link'
import { useSeasonContext } from '../../season/provider'
import { SEASON_CONFIGS } from '@/lib/constants/seasons'
import type { Season } from '@/lib/types/season'

export function IconGrid() {
  const { season } = useSeasonContext()
  const { theme } = SEASON_CONFIGS[season as Season]

  const iconStyle = `hover:scale-105 transition-all duration-300 ease-out opacity-90 hover:opacity-100 ${theme.iconHover}`

  return (
    <nav
      className="grid grid-cols-3 sm:flex sm:flex-wrap place-items-center justify-center gap-6 sm:gap-8 lg:gap-12 mt-4 max-w-[320px] sm:max-w-none mx-auto"
      data-test="icon-grid"
      role="navigation"
      aria-label="Main navigation"
    >
      <IconLink
        href="/resume.pdf"
        icon={<Icons.FileText size={24} strokeWidth={1.5} />}
        label="Resume"
        className={iconStyle}
        data-test="icon-resume"
      />
      <IconLink
        href="/marketing-analytics"
        icon={<Icons.Presentation size={24} strokeWidth={1.5} />}
        label="Analytics"
        className={iconStyle}
        data-test="icon-analytics"
      />
      <IconLink
        href="/marketing-campaigns"
        icon={<Icons.BarChartBig size={24} strokeWidth={1.5} />}
        label="Campaigns"
        className={iconStyle}
        data-test="icon-campaigns"
      />
      <IconLink
        href="/performance-metrics"
        icon={<Icons.Activity size={24} strokeWidth={1.5} />}
        label="KPIs"
        className={iconStyle}
        data-test="icon-kpis"
      />
      <IconLink
        href="https://linkedin.com/in/yourprofile"
        icon={<Icons.Linkedin size={24} strokeWidth={1.5} />}
        label="Connect"
        className={iconStyle}
        data-test="icon-linkedin"
      />
      <IconLink
        href="/company-info"
        icon={<Icons.Building2 size={24} strokeWidth={1.5} />}
        label="Company"
        className={iconStyle}
        data-test="icon-company"
      />
    </nav>
  )
}
