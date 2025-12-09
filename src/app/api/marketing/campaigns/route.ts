import { NextResponse } from 'next/server'
import type { CampaignsResponse } from '@/components/marketing/campaigns-view/types/campaign'

export async function GET() {
  const mockData: CampaignsResponse = {
    campaigns: [
      {
        id: '1',
        name: 'Summer Sale Campaign',
        status: 'active',
        startDate: '2025-06-01',
        endDate: '2025-08-31',
        budget: 10000,
        platform: 'facebook',
        stats: {
          impressions: 50000,
          clicks: 2500,
          conversions: 125,
          ctr: 0.05,
          conversionRate: 0.05,
          spend: 5000,
          roi: 2.5,
        },
      },
      {
        id: '2',
        name: 'Brand Awareness',
        status: 'paused',
        startDate: '2025-05-01',
        budget: 5000,
        platform: 'linkedin',
        stats: {
          impressions: 25000,
          clicks: 1000,
          conversions: 50,
          ctr: 0.04,
          conversionRate: 0.05,
          spend: 2500,
          roi: 1.8,
        },
      },
      {
        id: '3',
        name: 'Product Launch',
        status: 'completed',
        startDate: '2025-04-01',
        endDate: '2025-04-30',
        budget: 15000,
        platform: 'google',
        stats: {
          impressions: 75000,
          clicks: 3750,
          conversions: 188,
          ctr: 0.05,
          conversionRate: 0.05,
          spend: 15000,
          roi: 3.2,
        },
      },
    ],
    totalBudget: 30000,
    totalSpend: 22500,
    averageRoi: 2.5,
  }

  return NextResponse.json(mockData)
}
