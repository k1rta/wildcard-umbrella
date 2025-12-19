import { render, screen } from '@/lib/test/test-utils'
import { useSeasonContext } from '../provider'

describe('SeasonProvider', () => {
  // Simple helper to display season
  function SeasonDisplay() {
    const { season } = useSeasonContext()
    return <div data-testid="season-value">{season}</div>
  }

  describe('Context Provision', () => {
    it('should provide season context', () => {
      render(<SeasonDisplay />)

      const seasonElement = screen.getByTestId('season-value')
      expect(seasonElement).toBeInTheDocument()
      expect(['spring', 'summer', 'autumn', 'winter']).toContain(seasonElement.textContent)
    })

    it('should provide season value to children', () => {
      render(<SeasonDisplay />)
      expect(screen.getByTestId('season-value').textContent).toBeTruthy()
    })
  })

  describe('Integration', () => {
    it('should render children components', () => {
      render(
        <div data-testid="test-child">
          <SeasonDisplay />
        </div>
      )

      expect(screen.getByTestId('test-child')).toBeInTheDocument()
      expect(screen.getByTestId('season-value')).toBeInTheDocument()
    })
  })
})
