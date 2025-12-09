import useSWR from 'swr'
import type { ResumeData } from '../types/resume'
import { fetcher } from '@/lib/api/fetcher'

export function useResume() {
  const { data, error, isLoading } = useSWR<ResumeData>('/api/resume', fetcher)

  return {
    data,
    error,
    isLoading,
  }
}
