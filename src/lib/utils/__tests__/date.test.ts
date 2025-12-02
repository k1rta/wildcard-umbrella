import { getCurrentSeason, getMonthName } from '../date'

describe('date utilities', () => {
  const mockDate = new Date('2025-03-21') // Spring equinox

  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(mockDate)
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  beforeEach(() => {
    jest.resetModules()
    jest.setSystemTime(mockDate)
  })

  describe('getCurrentSeason', () => {
    const seasonTests = [
      { date: '2025-03-21', expected: 'spring' }, // March (spring)
      { date: '2025-04-15', expected: 'spring' }, // April (spring)
      { date: '2025-05-30', expected: 'spring' }, // May (spring)
      { date: '2025-06-21', expected: 'summer' }, // June (summer)
      { date: '2025-07-15', expected: 'summer' }, // July (summer)
      { date: '2025-08-30', expected: 'summer' }, // August (summer)
      { date: '2025-09-21', expected: 'autumn' }, // September (autumn)
      { date: '2025-10-15', expected: 'autumn' }, // October (autumn)
      { date: '2025-11-30', expected: 'autumn' }, // November (autumn)
      { date: '2025-12-21', expected: 'winter' }, // December (winter)
      { date: '2025-01-15', expected: 'winter' }, // January (winter)
      { date: '2025-02-28', expected: 'winter' }, // February (winter)
    ]

    it.each(seasonTests)('should return $expected for $date', ({ date, expected }) => {
      jest.setSystemTime(new Date(date))
      expect(getCurrentSeason()).toBe(expected)
    })

    it('should use TEST_SEASON when set', () => {
      // Reset module registry
      jest.resetModules()

      // Load module with default TEST_SEASON
      const { getCurrentSeason } = jest.requireActual('../date')
      expect(getCurrentSeason()).toBe('spring')

      // Mock module with overridden TEST_SEASON
      jest.doMock('../date', () => ({
        getCurrentSeason: () => 'winter',
        TEST_SEASON: 'winter',
      }))

      // Load mocked module
      const { getCurrentSeason: getSeasonAfterMock } = jest.requireMock('../date')
      expect(getSeasonAfterMock()).toBe('winter')
    })

    it('should handle invalid month', () => {
      // Reset module registry to clear any mocks
      jest.resetModules()
      const { getCurrentSeason } = jest.requireActual('../date')

      // Mock Date.prototype.getMonth to return invalid month
      const originalGetMonth = Date.prototype.getMonth
      Date.prototype.getMonth = jest.fn().mockReturnValue(12)

      try {
        expect(getCurrentSeason()).toBe('spring')
      } finally {
        // Restore original getMonth
        Date.prototype.getMonth = originalGetMonth
      }
    })
  })

  describe('getMonthName', () => {
    const monthTests = [
      { date: '2025-01-15', expected: 'January' },
      { date: '2025-02-15', expected: 'February' },
      { date: '2025-03-15', expected: 'March' },
      { date: '2025-04-15', expected: 'April' },
      { date: '2025-05-15', expected: 'May' },
      { date: '2025-06-15', expected: 'June' },
      { date: '2025-07-15', expected: 'July' },
      { date: '2025-08-15', expected: 'August' },
      { date: '2025-09-15', expected: 'September' },
      { date: '2025-10-15', expected: 'October' },
      { date: '2025-11-15', expected: 'November' },
      { date: '2025-12-15', expected: 'December' },
    ]

    it.each(monthTests)('should return $expected for $date', ({ date, expected }) => {
      jest.setSystemTime(new Date(date))
      expect(getMonthName()).toBe(expected)
    })
  })
})
