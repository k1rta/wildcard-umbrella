import type { Season, SeasonConfig } from '../types/season'

export const SEASONS = ['spring', 'summer', 'autumn', 'winter'] as const

export const SEASON_CONFIGS: Record<Season, SeasonConfig> = {
  spring: {
    theme: {
      gradient: 'from-green-400 to-green-600',
      textAccent: 'text-green-400',
      iconHover: 'hover:text-green-300',
    },
    particles: {
      colors: ['#4ade80', '#22c55e', '#16a34a'],
      count: 50,
      size: 3,
      speed: 3,
      shape: 'circle',
      move: {
        direction: 'none',
        straight: false,
        outMode: 'out',
        random: true,
      },
    },
  },
  summer: {
    theme: {
      gradient: 'from-yellow-400 to-orange-500',
      textAccent: 'text-yellow-400',
      iconHover: 'hover:text-yellow-300',
    },
    particles: {
      colors: ['#facc15', '#f97316', '#fb923c'],
      count: 40,
      size: 4,
      speed: 2,
      shape: 'circle',
      move: {
        direction: 'top',
        straight: true,
        outMode: 'out',
        random: false,
      },
    },
  },
  autumn: {
    theme: {
      gradient: 'from-orange-500 to-red-600',
      textAccent: 'text-orange-500',
      iconHover: 'hover:text-orange-400',
    },
    particles: {
      colors: ['#f97316', '#dc2626', '#b91c1c'],
      count: 30,
      size: 5,
      speed: 1,
      shape: 'circle',
      move: {
        direction: 'bottom',
        straight: false,
        outMode: 'out',
        random: true,
      },
    },
  },
  winter: {
    theme: {
      gradient: 'from-blue-400 to-blue-600',
      textAccent: 'text-blue-400',
      iconHover: 'hover:text-blue-300',
    },
    particles: {
      colors: ['#60a5fa', '#3b82f6', '#2563eb'],
      count: 60,
      size: 2,
      speed: 4,
      shape: 'circle',
      move: {
        direction: 'bottom',
        straight: true,
        outMode: 'out',
        random: false,
      },
    },
  },
}
