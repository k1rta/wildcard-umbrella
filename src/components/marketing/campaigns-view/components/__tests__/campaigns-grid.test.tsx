import { render, screen } from '@/lib/test/test-utils'
import { CampaignsGrid } from '../campaigns-grid'
import type { Campaign } from '../../types/campaign'

// Mock the CampaignCard component
jest.mock('../campaign-card', () => ({
  CampaignCard: ({ campaign }: { campaign: Campaign }) => (
    <div data-testid={`campaign-card-${campaign.id}`}>{campaign.name}</div>
  ),
}))

describe('CampaignsGrid', () => {
  const mockCampaigns: Campaign[] = [
    {
      id: '1',
      name: 'Campaign 1',
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
    },
    {
      id: '2',
      name: 'Campaign 2',
      status: 'paused',
      startDate: '2023-02-01',
      budget: 15000,
      platform: 'google',
      stats: {
        impressions: 75000,
        clicks: 3750,
        conversions: 150,
        ctr: 0.05,
        conversionRate: 0.04,
        spend: 12000,
        roi: 2.0,
      },
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render all campaign cards', () => {
      render(<CampaignsGrid campaigns={mockCampaigns} />)
      mockCampaigns.forEach((campaign) => {
        expect(screen.getByTestId(`campaign-card-${campaign.id}`)).toBeInTheDocument()
        expect(screen.getByText(campaign.name)).toBeInTheDocument()
      })
    })

    it('should render empty grid when no campaigns provided', () => {
      render(<CampaignsGrid campaigns={[]} />)
      const grid = screen.getByTestId('campaigns-grid')
      expect(grid.children).toHaveLength(0)
    })
  })

  describe('Styling', () => {
    it('should apply correct grid layout classes', () => {
      render(<CampaignsGrid campaigns={mockCampaigns} />)
      const grid = screen.getByTestId('campaigns-grid')
      expect(grid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-4')
    })
  })

  it('should match snapshot', () => {
    const { container } = render(<CampaignsGrid campaigns={mockCampaigns} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
