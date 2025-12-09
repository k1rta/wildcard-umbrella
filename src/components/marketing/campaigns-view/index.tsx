'use client'

import { Title } from '@/components/ui/title'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { useCampaigns } from './hooks/use-campaigns'
import { CampaignsGrid } from './components/campaigns-grid'

export function CampaignsView(): React.ReactElement {
  const { data, error, isLoading } = useCampaigns()

  if (error) {
    throw error
  }

  if (isLoading || !data) {
    return (
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-white/10 rounded mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-white/10 rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="space-y-8">
        <Title>Marketing Campaigns</Title>
        <CampaignsGrid campaigns={data.campaigns} />
      </div>
    </ErrorBoundary>
  )
}
