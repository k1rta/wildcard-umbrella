'use client'

import * as Icons from './icons'
import { IconLink } from './icon-link'
import { useSeasonContext } from '../../season/provider'
import { SEASON_CONFIGS } from '@/lib/constants/seasons'
import type { Season } from '@/lib/types/season'
import { TEST_IDS } from '@/lib/constants/test-ids'
import { cn } from '@/lib/utils/cn'

export type IconItem = {
  readonly href: string
  readonly icon: React.ReactNode
  readonly label: string
  readonly testId: string
}

export type IconGridProps = {
  readonly icons?: readonly IconItem[]
  readonly columns?: 2 | 3 | 4 | 6
  readonly className?: string
}

const DEFAULT_ICONS: readonly IconItem[] = [
  {
    href: '/resume',
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

const baseGridClasses = cn(
  'grid gap-6 max-w-md mx-auto',
  'lg:grid-none lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:max-w-none'
)

const columnClassesByProp: Record<NonNullable<IconGridProps['columns']>, string> = {
  2: 'grid-cols-2 lg:grid-cols-2',
  3: 'grid-cols-3 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-2',
  6: 'grid-cols-3',
}

export function IconGrid({
  icons = DEFAULT_ICONS,
  columns = 3,
  className = '',
}: IconGridProps): React.ReactElement {
  const { season } = useSeasonContext()
  const { theme } = SEASON_CONFIGS[season as Season]

  if (icons.length === 0) {
    return (
      <nav
        className={cn(baseGridClasses, columnClassesByProp[columns], className)}
        data-testid={TEST_IDS.ui.iconGrid}
        role="navigation"
        aria-label="Main navigation"
      />
    )
  }

  return (
    <nav
      className={cn(baseGridClasses, columnClassesByProp[columns], className)}
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
          className={cn(
            'hover:scale-105 transition-all duration-300 ease-out',
            'opacity-90 hover:opacity-100',
            theme.iconHover
          )}
          data-testid={item.testId}
        />
      ))}
    </nav>
  )
}
