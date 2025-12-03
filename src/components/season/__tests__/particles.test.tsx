import { render, screen } from '@/lib/test/test-utils'
import { ParticlesBackground } from '../particles'
import { TEST_IDS } from '@/lib/test/test-utils'
import type { Season } from '@/lib/types/season'

describe('ParticlesBackground', () => {
  const { loadFull } = jest.requireMock('tsparticles') as {
    loadFull: jest.MockedFunction<() => Promise<void>>
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render particles container', async () => {
    render(<ParticlesBackground season="spring" />)
    const particles = (
      await screen.findAllByTestId(TEST_IDS.particles.container, {}, { timeout: 2000 })
    )[0]
    expect(particles).toBeInTheDocument()
    expect(particles).toHaveAttribute('data-id', 'tsparticles')
  })

  it.each(['spring', 'summer', 'autumn', 'winter'] as Season[])(
    'should support %s season',
    async (season) => {
      render(<ParticlesBackground season={season} />)
      const particles = (
        await screen.findAllByTestId(TEST_IDS.particles.container, {}, { timeout: 2000 })
      )[0]
      expect(particles).toBeInTheDocument()
    }
  )

  it('should initialize tsParticles engine', async () => {
    render(<ParticlesBackground season="spring" />)
    await screen.findAllByTestId(TEST_IDS.particles.container, {}, { timeout: 2000 })
    expect(loadFull).toHaveBeenCalled()
  })
})
