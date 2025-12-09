import { render, screen, TEST_IDS } from '@/lib/test/test-utils'
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
  })

  it('should render particles container', async () => {
    render(<ParticlesBackground season="spring" />, { withSeasonProvider: true })

    const particles = screen.getByTestId(TEST_IDS.particles.container)
    expect(particles).toBeInTheDocument()
  })

  it.each(['spring', 'summer', 'autumn', 'winter'] as Season[])(
    'should support %s season',
    async (season) => {
      render(<ParticlesBackground season={season} />, { withSeasonProvider: true })

      const particles = screen.getByTestId(TEST_IDS.particles.container)
      expect(particles).toBeInTheDocument()
    }
  )

  it('should initialize tsParticles engine', async () => {
    render(<ParticlesBackground season="spring" />, { withSeasonProvider: true })

    await screen.findByTestId(TEST_IDS.particles.container)
    expect(loadFull).toHaveBeenCalled()
  })
})
