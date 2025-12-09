import { render, screen, TEST_IDS, waitFor } from '@/lib/test/test-utils'
import { ParticlesBackground } from '../particles'
import type { Season } from '@/lib/types/season'

// Mock tsparticles engine
jest.mock('tsparticles', () => ({
  loadFull: jest.fn().mockResolvedValue(undefined),
}))

describe('ParticlesBackground', () => {
  const { loadFull } = jest.requireMock('tsparticles') as {
    loadFull: jest.MockedFunction<() => Promise<void>>
  }

  beforeEach(() => {
    jest.clearAllMocks()
    loadFull.mockResolvedValue(undefined)
  })

  it('should render particles container', async () => {
    render(<ParticlesBackground season="spring" />, { withSeasonProvider: true })

    await waitFor(() => {
      const particles = screen.getAllByTestId(TEST_IDS.particles.container)
      expect(particles.length).toBeGreaterThan(0)
    })
  })

  it.each(['spring', 'summer', 'autumn', 'winter'] as Season[])(
    'should support %s season',
    async (season) => {
      render(<ParticlesBackground season={season} />, { withSeasonProvider: true })

      await waitFor(() => {
        const particles = screen.getAllByTestId(TEST_IDS.particles.container)
        expect(particles.length).toBeGreaterThan(0)
        const tsParticles = particles.find((el) => el.getAttribute('data-id') === 'tsparticles')
        expect(tsParticles).toBeTruthy()
      })
    }
  )

  it('should initialize tsParticles engine', async () => {
    render(<ParticlesBackground season="spring" />, { withSeasonProvider: true })

    await waitFor(() => {
      expect(loadFull).toHaveBeenCalled()
    })
  })
})
