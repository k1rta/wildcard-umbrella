import { NextResponse } from 'next/server'
import type { KpiResponse } from '@/components/performance/metrics-view/types/metrics'

export async function GET() {
  const mockData: KpiResponse = {
    kpis: [
      {
        id: 'revenue',
        name: 'Revenue',
        description: 'Monthly revenue from all sources',
        category: 'financial',
        format: 'currency',
        value: {
          current: 125000,
          target: 150000,
          previous: 100000,
          trend: 0.25,
        },
      },
      {
        id: 'conversion',
        name: 'Conversion Rate',
        description: 'Website visitor to customer ratio',
        category: 'marketing',
        format: 'percentage',
        value: {
          current: 0.032,
          target: 0.04,
          previous: 0.028,
          trend: 0.14,
        },
      },
      {
        id: 'retention',
        name: 'Customer Retention',
        description: 'Monthly customer retention rate',
        category: 'operational',
        format: 'percentage',
        value: {
          current: 0.85,
          target: 0.9,
          previous: 0.82,
          trend: 0.037,
        },
      },
    ],
    trends: [
      {
        kpiId: 'revenue',
        data: Array.from({ length: 12 }, (_, i) => ({
          date: new Date(2025, i, 1).toISOString(),
          value: 80000 + Math.random() * 50000,
        })),
      },
    ],
    lastUpdated: new Date().toISOString(),
  }

  return NextResponse.json(mockData)
}
