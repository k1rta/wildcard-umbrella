import type { Campaign } from '../types/campaign'
import { CampaignCard } from './campaign-card'

interface CampaignsGridProps {
  campaigns: Campaign[]
}

export function CampaignsGrid({ campaigns }: CampaignsGridProps) {
  return (
    <div
      data-testid="campaigns-grid"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  )
}
