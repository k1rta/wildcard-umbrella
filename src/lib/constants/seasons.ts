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
      colors: ['#e879f9', '#c084fc', '#f0abfc'],
      count: 35,
      size: 5,
      speed: 1.5,
      shape: 'circle',
      move: {
        direction: 'top',
        straight: false,
        outMode: 'bounce',
        random: true,
        path: {
          enable: true,
          delay: {
            value: 150,
          },
          generator: 'sine',
        },
      },
      opacity: {
        value: 0.9,
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.6,
        },
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
      colors: ['#fef08a', '#fde047', '#facc15'],
      count: 25,
      size: 4,
      speed: 2,
      shape: 'star',
      move: {
        direction: 'none',
        straight: false,
        outMode: 'bounce',
        random: true,
        warp: true,
        path: {
          enable: true,
          delay: {
            value: 300,
          },
          generator: 'random',
        },
      },
      opacity: {
        value: 0.7,
        animation: {
          enable: true,
          speed: 0.8,
          minimumValue: 0.3,
        },
      },
      life: {
        duration: {
          value: 8000,
        },
        count: 1,
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
      colors: ['#FFBF00', '#CC5500', '#B7410E'],
      count: 60,
      size: 2,
      speed: 8,
      shape: 'circle',
      move: {
        direction: 'bottom',
        straight: true,
        outMode: 'out',
        random: false,
      },
      opacity: {
        value: 0.6,
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
      colors: ['#60a5fa', '#93c5fd', '#bfdbfe'],
      count: 70,
      size: 2,
      speed: 6,
      shape: 'circle',
      move: {
        direction: 'bottom',
        straight: true,
        outMode: 'out',
        random: true,
        path: {
          enable: true,
          delay: {
            value: 200,
          },
          generator: 'random',
        },
      },
      opacity: {
        value: 0.8,
      },
    },
  },
}
