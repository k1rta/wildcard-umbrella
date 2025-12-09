import { render, screen } from '@/lib/test/test-utils'
import { KpiCard } from '../kpi-card'
import type { Kpi } from '../../types/metrics'

describe('KpiCard', () => {
  const mockKpiBase: Omit<Kpi, 'value' | 'format' | 'category'> = {
    id: '1',
    name: 'Test KPI',
    description: 'Test Description',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render KPI name and description', () => {
      const kpi: Kpi = {
        ...mockKpiBase,
        category: 'financial',
        format: 'number',
        value: {
          current: 100,
          target: 150,
          previous: 90,
          trend: 0.11,
        },
      }
      render(<KpiCard kpi={kpi} />)
      expect(screen.getByText(kpi.name)).toBeInTheDocument()
      expect(screen.getByText(kpi.description)).toBeInTheDocument()
    })

    it('should render category badge with correct styling', () => {
      const kpi: Kpi = {
        ...mockKpiBase,
        category: 'financial',
        format: 'number',
        value: {
          current: 100,
          target: 150,
          previous: 90,
          trend: 0.11,
        },
      }
      render(<KpiCard kpi={kpi} />)
      const badge = screen.getByText('financial')
      expect(badge).toHaveClass('bg-green-500/20', 'text-green-300')
    })
  })

  describe('Value Formatting', () => {
    it('should format number values correctly', () => {
      const kpi: Kpi = {
        ...mockKpiBase,
        category: 'financial',
        format: 'number',
        value: {
          current: 1234567,
          target: 2000000,
          previous: 1000000,
          trend: 0.23,
        },
      }
      render(<KpiCard kpi={kpi} />)
      expect(screen.getByText('1,234,567')).toBeInTheDocument()
      expect(screen.getByText('2,000,000')).toBeInTheDocument()
    })

    it('should format percentage values correctly', () => {
      const kpi: Kpi = {
        ...mockKpiBase,
        category: 'marketing',
        format: 'percentage',
        value: {
          current: 0.456,
          target: 0.5,
          previous: 0.4,
          trend: 0.14,
        },
      }
      render(<KpiCard kpi={kpi} />)
      expect(screen.getByText('45.6%')).toBeInTheDocument()
      expect(screen.getByText('50.0%')).toBeInTheDocument()
    })

    it('should format currency values correctly', () => {
      const kpi: Kpi = {
        ...mockKpiBase,
        category: 'financial',
        format: 'currency',
        value: {
          current: 12345.67,
          target: 15000,
          previous: 10000,
          trend: 0.23,
        },
      }
      render(<KpiCard kpi={kpi} />)
      expect(screen.getByText('$12,345.67')).toBeInTheDocument()
      expect(screen.getByText('$15,000.00')).toBeInTheDocument()
    })
  })

  describe('Progress Bar', () => {
    it('should render progress bar with correct width', () => {
      const kpi: Kpi = {
        ...mockKpiBase,
        category: 'financial',
        format: 'number',
        value: {
          current: 75,
          target: 100,
          previous: 60,
          trend: 0.25,
        },
      }
      render(<KpiCard kpi={kpi} />)
      const progressBar = screen.getByTestId('kpi-progress-bar')
      expect(progressBar).toHaveStyle({ width: '75%' })
    })

    it('should cap progress bar at 100%', () => {
      const kpi: Kpi = {
        ...mockKpiBase,
        category: 'financial',
        format: 'number',
        value: {
          current: 150,
          target: 100,
          previous: 120,
          trend: 0.25,
        },
      }
      render(<KpiCard kpi={kpi} />)
      const progressBar = screen.getByTestId('kpi-progress-bar')
      expect(progressBar).toHaveStyle({ width: '100%' })
    })
  })

  describe('Trend Indicator', () => {
    it('should show positive trend in green', () => {
      const kpi: Kpi = {
        ...mockKpiBase,
        category: 'financial',
        format: 'number',
        value: {
          current: 100,
          target: 150,
          previous: 80,
          trend: 0.25,
        },
      }
      render(<KpiCard kpi={kpi} />)
      const trend = screen.getByText('↑ 25.0%')
      expect(trend).toHaveClass('text-green-400')
    })

    it('should show negative trend in red', () => {
      const kpi: Kpi = {
        ...mockKpiBase,
        category: 'financial',
        format: 'number',
        value: {
          current: 100,
          target: 150,
          previous: 120,
          trend: -0.167,
        },
      }
      render(<KpiCard kpi={kpi} />)
      const trend = screen.getByText('↓ 16.7%')
      expect(trend).toHaveClass('text-red-400')
    })
  })

  describe('Category Styling', () => {
    it.each([
      ['financial', 'bg-green-500/20', 'text-green-300'],
      ['marketing', 'bg-blue-500/20', 'text-blue-300'],
      ['operational', 'bg-purple-500/20', 'text-purple-300'],
    ])('should apply correct styling for %s category', (category, bgClass, textClass) => {
      const kpi: Kpi = {
        ...mockKpiBase,
        category: category as Kpi['category'],
        format: 'number',
        value: {
          current: 100,
          target: 150,
          previous: 90,
          trend: 0.11,
        },
      }
      render(<KpiCard kpi={kpi} />)
      const badge = screen.getByText(category)
      expect(badge).toHaveClass(bgClass, textClass)
    })
  })

  it('should match snapshot', () => {
    const kpi: Kpi = {
      ...mockKpiBase,
      category: 'financial',
      format: 'number',
      value: {
        current: 100,
        target: 150,
        previous: 90,
        trend: 0.11,
      },
    }
    const { container } = render(<KpiCard kpi={kpi} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
