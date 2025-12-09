export interface CampaignStats {
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  conversionRate: number
  spend: number
  roi: number
}

export interface Campaign {
  id: string
  name: string
  status: 'active' | 'paused' | 'completed'
  startDate: string
  endDate?: string
  budget: number
  platform: 'facebook' | 'google' | 'linkedin' | 'twitter'
  stats: CampaignStats
}

export interface CampaignsResponse {
  campaigns: Campaign[]
  totalBudget: number
  totalSpend: number
  averageRoi: number
}
