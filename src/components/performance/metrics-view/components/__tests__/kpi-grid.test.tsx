import { render, screen } from '@/lib/test/test-utils'
import { KpiGrid } from '../kpi-grid'
import type { Kpi } from '../../types/metrics'

// Mock the KpiCard component
jest.mock('../kpi-card', () => ({
  KpiCard: ({ kpi }: { kpi: Kpi }) => <div data-testid={`kpi-card-${kpi.id}`}>{kpi.name}</div>,
}))

describe('KpiGrid', () => {
  const mockKpis: Kpi[] = [
    {
      id: '1',
      name: 'Revenue',
      description: 'Monthly revenue',
      category: 'financial',
      format: 'currency',
      value: {
        current: 100000,
        target: 120000,
        previous: 90000,
        trend: 0.11,
      },
    },
    {
      id: '2',
      name: 'Conversion Rate',
      description: 'Sales conversion rate',
      category: 'marketing',
      format: 'percentage',
      value: {
        current: 0.15,
        target: 0.2,
        previous: 0.13,
        trend: 0.15,
      },
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render all KPI cards', () => {
      render(<KpiGrid kpis={mockKpis} />)
      mockKpis.forEach((kpi) => {
        expect(screen.getByTestId(`kpi-card-${kpi.id}`)).toBeInTheDocument()
        expect(screen.getByText(kpi.name)).toBeInTheDocument()
      })
    })

    it('should render empty grid when no KPIs provided', () => {
      render(<KpiGrid kpis={[]} />)
      const grid = screen.getByTestId('kpi-grid')
      expect(grid.children).toHaveLength(0)
    })
  })

  describe('Styling', () => {
    it('should apply correct grid layout classes', () => {
      render(<KpiGrid kpis={mockKpis} />)
      const grid = screen.getByTestId('kpi-grid')
      expect(grid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-4')
    })
  })

  it('should match snapshot', () => {
    const { container } = render(<KpiGrid kpis={mockKpis} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
