import { NextResponse } from 'next/server'
import type { AnalyticsData } from '@/components/marketing/analytics-view/types/metrics'

// This is a mock implementation. Replace with real data fetching.
export async function GET() {
  const mockData: AnalyticsData = {
    metrics: [
      {
        id: 'page_views',
        name: 'Page Views',
        value: {
          current: 12500,
          previous: 10000,
          trend: 0.25,
        },
        format: 'number',
        period: 'daily',
      },
      {
        id: 'conversion_rate',
        name: 'Conversion Rate',
        value: {
          current: 0.032,
          previous: 0.028,
          trend: 0.14,
        },
        format: 'percentage',
        period: 'daily',
      },
      {
        id: 'revenue',
        name: 'Revenue',
        value: {
          current: 25000,
          previous: 20000,
          trend: 0.25,
        },
        format: 'currency',
        period: 'daily',
      },
    ],
    charts: {
      pageViews: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: [1200, 1400, 1100, 1600, 1800, 1300, 1500],
      },
    },
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
  }

  return NextResponse.json(mockData)
}
