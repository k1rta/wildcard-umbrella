import { render, screen } from '@/lib/test/test-utils'
import { CampaignCard } from '../campaign-card'
import type { Campaign } from '../../types/campaign'

describe('CampaignCard', () => {
  const mockCampaign: Campaign = {
    id: '1',
    name: 'Test Campaign',
    status: 'active',
    startDate: '2023-01-01',
    budget: 10000,
    platform: 'facebook',
    stats: {
      impressions: 50000,
      clicks: 2500,
      conversions: 100,
      ctr: 0.05,
      conversionRate: 0.04,
      spend: 8500,
      roi: 2.5,
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render campaign name and platform', () => {
      render(<CampaignCard campaign={mockCampaign} />)
      expect(screen.getByText(mockCampaign.name)).toBeInTheDocument()
      expect(screen.getByText(mockCampaign.platform)).toBeInTheDocument()
    })

    it('should render campaign status with correct styling', () => {
      render(<CampaignCard campaign={mockCampaign} />)
      const statusElement = screen.getByText(mockCampaign.status)
      expect(statusElement).toBeInTheDocument()
      expect(statusElement).toHaveClass('bg-green-500/20', 'text-green-300')
    })

    it('should render formatted budget and spend', () => {
      render(<CampaignCard campaign={mockCampaign} />)
      expect(screen.getByText('$10,000.00')).toBeInTheDocument() // Budget
      expect(screen.getByText('$8,500.00')).toBeInTheDocument() // Spend
    })

    it('should render formatted CTR and ROI percentages', () => {
      render(<CampaignCard campaign={mockCampaign} />)
      expect(screen.getByText('5.00%')).toBeInTheDocument() // CTR
      expect(screen.getByText('250.00%')).toBeInTheDocument() // ROI
    })
  })

  describe('Styling', () => {
    it('should apply hover and transition classes', () => {
      render(<CampaignCard campaign={mockCampaign} />)
      const card = screen.getByTestId(`campaign-card-${mockCampaign.id}`)
      expect(card).toHaveClass('hover:bg-white/10', 'transition-colors')
    })

    it('should apply correct grid layout for stats', () => {
      render(<CampaignCard campaign={mockCampaign} />)
      const statsGrid = screen.getByText('Budget').closest('.grid')
      expect(statsGrid).toHaveClass('grid-cols-2', 'gap-4')
    })
  })

  describe('Status Variants', () => {
    it.each([
      ['active', 'bg-green-500/20', 'text-green-300'],
      ['paused', 'bg-yellow-500/20', 'text-yellow-300'],
      ['completed', 'bg-gray-500/20', 'text-gray-300'],
    ])('should apply correct status styling for %s status', (status, bgClass, textClass) => {
      const campaign = { ...mockCampaign, status: status as Campaign['status'] }
      render(<CampaignCard campaign={campaign} />)
      const statusElement = screen.getByText(status)
      expect(statusElement).toHaveClass(bgClass, textClass)
    })
  })

  describe('Formatting', () => {
    it('should format currency values correctly', () => {
      const campaign = {
        ...mockCampaign,
        budget: 1234567.89,
        stats: { ...mockCampaign.stats, spend: 9876.54 },
      }
      render(<CampaignCard campaign={campaign} />)
      expect(screen.getByText('$1,234,567.89')).toBeInTheDocument()
      expect(screen.getByText('$9,876.54')).toBeInTheDocument()
    })

    it('should format percentage values correctly', () => {
      const campaign = {
        ...mockCampaign,
        stats: {
          ...mockCampaign.stats,
          ctr: 0.1234,
          roi: 1.5678,
        },
      }
      render(<CampaignCard campaign={campaign} />)
      expect(screen.getByText('12.34%')).toBeInTheDocument()
      expect(screen.getByText('156.78%')).toBeInTheDocument()
    })
  })

  it('should match snapshot', () => {
    const { container } = render(<CampaignCard campaign={mockCampaign} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
