import type { Campaign } from '../types/campaign'

interface CampaignCardProps {
  campaign: Campaign
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)

  const formatPercent = (value: number) => `${(value * 100).toFixed(2)}%`

  return (
    <div
      data-testid={`campaign-card-${campaign.id}`}
      className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium">{campaign.name}</h3>
          <p className="text-sm text-white/70">{campaign.platform}</p>
        </div>
        <span
          className={`px-2 py-1 rounded text-xs ${
            campaign.status === 'active'
              ? 'bg-green-500/20 text-green-300'
              : campaign.status === 'paused'
                ? 'bg-yellow-500/20 text-yellow-300'
                : 'bg-gray-500/20 text-gray-300'
          }`}
        >
          {campaign.status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-white/70">Budget</p>
          <p className="text-lg font-medium">{formatCurrency(campaign.budget)}</p>
        </div>
        <div>
          <p className="text-sm text-white/70">Spend</p>
          <p className="text-lg font-medium">{formatCurrency(campaign.stats.spend)}</p>
        </div>
        <div>
          <p className="text-sm text-white/70">CTR</p>
          <p className="text-lg font-medium">{formatPercent(campaign.stats.ctr)}</p>
        </div>
        <div>
          <p className="text-sm text-white/70">ROI</p>
          <p className="text-lg font-medium">{formatPercent(campaign.stats.roi)}</p>
        </div>
      </div>
    </div>
  )
}
