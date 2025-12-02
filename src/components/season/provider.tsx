'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { getCurrentSeason } from '@/lib/utils/date'
import type { Season } from '@/lib/types/season'
import { SEASONS } from '@/lib/constants/seasons'
import { ParticlesBackground } from './particles'

interface SeasonContextType {
  season: Season
}

export const SeasonContext = createContext<SeasonContextType | null>(null)

export function useSeasonContext() {
  const context = useContext(SeasonContext)
  if (context === null) {
    throw new Error('useSeasonContext must be used within a SeasonProvider')
  }
  return context
}

interface SeasonProviderProps {
  children: ReactNode
}

export function SeasonProvider({ children }: SeasonProviderProps) {
  const currentSeason = getCurrentSeason()
  const season: Season = SEASONS.includes(currentSeason as Season)
    ? (currentSeason as Season)
    : 'spring'

  return (
    <SeasonContext.Provider value={{ season }}>
      <ParticlesBackground season={season} />
      {children}
    </SeasonContext.Provider>
  )
}
