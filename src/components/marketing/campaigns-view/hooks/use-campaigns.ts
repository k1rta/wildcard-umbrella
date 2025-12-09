import useSWR from 'swr'
import type { CampaignsResponse } from '../types/campaign'
import { fetcher } from '@/lib/api/fetcher'

export function useCampaigns() {
  const { data, error, isLoading } = useSWR<CampaignsResponse>('/api/marketing/campaigns', fetcher)

  return {
    data,
    error,
    isLoading,
  }
}
