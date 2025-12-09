import useSWR from 'swr'
import type { KpiResponse } from '../types/metrics'
import { fetcher } from '@/lib/api/fetcher'

export function useKpis() {
  const { data, error, isLoading } = useSWR<KpiResponse>('/api/performance/kpis', fetcher)

  return {
    data,
    error,
    isLoading,
  }
}
