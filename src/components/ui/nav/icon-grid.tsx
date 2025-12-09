'use client'

import * as Icons from './icons'
import { IconLink } from './icon-link'
import { useSeasonContext } from '../../season/provider'
import { useMemo } from 'react'
import { SEASON_CONFIGS } from '@/lib/constants/seasons'
import type { Season } from '@/lib/types/season'
import { TEST_IDS } from '@/lib/constants/test-ids'

/**
 * Configuration for a single icon item in the grid
 * @typedef IconItem
 */
export type IconItem = {
  /** URL for the icon link */
  readonly href: string
  /** Icon element to display */
  readonly icon: React.ReactNode
  /** Accessible label and visible text */
  readonly label: string
  /** Test ID for testing */
  readonly testId: string
}

/**
 * Props for the IconGrid component
 * @typedef IconGridProps
 */
export type IconGridProps = {
  /** Array of icon items to display. Defaults to DEFAULT_ICONS */
  readonly icons?: readonly IconItem[]
  /** Optional CSS classes */
  readonly className?: string
  /** Number of columns in the grid. Responsive behavior varies by column count */
  readonly columns?: 2 | 3 | 4 | 6
}

/**
 * Default icons for the grid
 * @type {readonly IconItem[]}
 */
const DEFAULT_ICONS = [
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

/**
 * A responsive grid of animated icon links with seasonal theming.
 * Supports different column layouts and custom icons.
 *
 * @param props - {@link IconGridProps}
 * @returns React element
 */
export function IconGrid({
  icons = DEFAULT_ICONS,
  className = '',
  columns = 3,
}: IconGridProps): React.ReactElement {
  const { season } = useSeasonContext()
  const { theme } = SEASON_CONFIGS[season as Season]

  /**
   * Icon style classes including hover effects and theme-specific styles
   * Memoized to prevent string concatenation on re-renders
   */
  const iconStyle = useMemo(
    () =>
      `hover:scale-105 transition-all duration-300 ease-out opacity-90 hover:opacity-100 ${theme.iconHover}`,
    [theme.iconHover]
  )

  /**
   * Grid column classes based on the columns prop
   * Memoized to prevent recalculation on re-renders
   */
  const gridColsClass = useMemo(() => {
    const gridCols = {
      2: 'grid-cols-2 lg:grid-cols-2',
      3: 'grid-cols-2 md:grid-cols-3 lg:flex lg:justify-center lg:gap-12',
      4: 'grid-cols-2 md:grid-cols-2 lg:flex lg:justify-center lg:gap-12',
      6: 'grid-cols-3 md:grid-cols-3 lg:flex lg:justify-center lg:gap-12',
    } as const
    return gridCols[columns]
  }, [columns])

  return (
    <nav
      className={`grid ${gridColsClass} gap-6 max-w-md mx-auto ${className}`}
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

// IconItem type is already exported above
