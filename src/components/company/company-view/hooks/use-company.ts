import useSWR from 'swr'
import type { CompanyData } from '../types/company'
import { fetcher } from '@/lib/api/fetcher'

export function useCompany() {
  const { data, error, isLoading } = useSWR<CompanyData>('/api/company', fetcher)

  return {
    data,
    error,
    isLoading,
  }
}
