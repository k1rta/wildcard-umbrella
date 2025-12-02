import type { Season } from '../types/season'

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const SEASON_MONTHS: Record<Season, number[]> = {
  spring: [2, 3, 4], // March, April, May
  summer: [5, 6, 7], // June, July, August
  autumn: [8, 9, 10], // September, October, November
  winter: [11, 0, 1], // December, January, February
}

// Change this value to test different seasons
const TEST_SEASON: Season | null = null // Try 'spring' | 'summer' | 'autumn' | 'winter' | null

export function getCurrentSeason(): Season {
  // Return test season if set
  if (TEST_SEASON) return TEST_SEASON

  const now = new Date()
  const month = now.getMonth()

  for (const [season, months] of Object.entries(SEASON_MONTHS)) {
    if (months.includes(month)) {
      return season as Season
    }
  }

  return 'spring'
}

export function getMonthName(): string {
  return MONTH_NAMES[new Date().getMonth()]
}
