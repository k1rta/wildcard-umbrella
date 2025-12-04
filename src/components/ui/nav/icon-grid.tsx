'use client'

import * as Icons from './icons'
import { IconLink } from './icon-link'
import { useSeasonContext } from '../../season/provider'
import { SEASON_CONFIGS } from '@/lib/constants/seasons'
import type { Season } from '@/lib/types/season'
import { TEST_IDS } from '@/lib/constants/test-ids'

type IconItem = {
  href: string
  icon: React.ReactNode
  label: string
  testId: string
}

type IconGridProps = {
  icons?: IconItem[]
  className?: string
  columns?: 2 | 3 | 4 | 6
}

const DEFAULT_ICONS: IconItem[] = [
  {
    href: '/resume.pdf',
    icon: <Icons.FileText size={24} strokeWidth={1.5} />,
    label: 'Resume',
    testId: 'icon-resume',
  },
  {
    href: '/marketing-analytics',
    icon: <Icons.Presentation size={24} strokeWidth={1.5} />,
    label: 'Analytics',
    testId: 'icon-analytics',
  },
  {
    href: '/marketing-campaigns',
    icon: <Icons.BarChartBig size={24} strokeWidth={1.5} />,
    label: 'Campaigns',
    testId: 'icon-campaigns',
  },
  {
    href: '/performance-metrics',
    icon: <Icons.Activity size={24} strokeWidth={1.5} />,
    label: 'KPIs',
    testId: 'icon-kpis',
  },
  {
    href: 'https://linkedin.com/in/yourprofile',
    icon: <Icons.Linkedin size={24} strokeWidth={1.5} />,
    label: 'Connect',
    testId: 'icon-linkedin',
  },
  {
    href: '/company-info',
    icon: <Icons.Building2 size={24} strokeWidth={1.5} />,
    label: 'Company',
    testId: 'icon-company',
  },
]

export function IconGrid({
  icons = DEFAULT_ICONS,
  className = '',
  columns = 3,
}: IconGridProps): JSX.Element {
  const { season } = useSeasonContext()
  const { theme } = SEASON_CONFIGS[season as Season]

  const iconStyle = `hover:scale-105 transition-all duration-300 ease-out opacity-90 hover:opacity-100 ${theme.iconHover}`

  const gridCols = {
    2: 'grid-cols-2 lg:grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3 lg:flex lg:justify-center lg:gap-12',
    4: 'grid-cols-2 md:grid-cols-2 lg:flex lg:justify-center lg:gap-12',
    6: 'grid-cols-3 md:grid-cols-3 lg:flex lg:justify-center lg:gap-12',
  }

  return (
    <nav
      className={`grid ${gridCols[columns]} gap-6 max-w-md mx-auto ${className}`}
      data-testid={TEST_IDS.ui.iconGrid}
      role="navigation"
      aria-label="Main navigation"
    >
      {icons.map((item) => (
        <IconLink
          key={item.testId}
          href={item.href}
          icon={item.icon}
          label={item.label}
          className={iconStyle}
          data-testid={item.testId}
        />
      ))}
    </nav>
  )
}

export type { IconItem }
