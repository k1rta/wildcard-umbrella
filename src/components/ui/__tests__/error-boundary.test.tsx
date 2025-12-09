import { render, screen, fireEvent, waitFor } from '@/lib/test/test-utils'
import { ErrorBoundary } from '../error-boundary'
import { useState } from 'react'

// Mock console.error to avoid test output noise
const originalError = console.error
beforeAll(() => {
  console.error = jest.fn()
})

afterAll(() => {
  console.error = originalError
})

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Error Handling', () => {
    it('should render children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <div data-testid="working">All good!</div>
        </ErrorBoundary>
      )

      expect(screen.getByTestId('working')).toBeInTheDocument()
      expect(screen.getByText('All good!')).toBeInTheDocument()
    })

    it('should catch and display error', () => {
      const ThrowError = () => {
        throw new Error('Test error')
      }

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      )

      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
      expect(screen.getByText('Test error')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
    })

    it('should display custom error message', () => {
      const ThrowError = () => {
        throw new Error('Custom error message')
      }

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      )

      expect(screen.getByText('Custom error message')).toBeInTheDocument()
    })
  })

  describe('Recovery', () => {
    it('should render error UI and recover', async () => {
      // Component that can toggle error state
      const ConditionalError = ({ shouldError }: { shouldError: boolean }) => {
        if (shouldError) {
          throw new Error('Initial error')
        }
        return <div data-testid="recovered">Recovered!</div>
      }

      // Wrapper component to manage state
      const TestWrapper = () => {
        const [shouldError, setShouldError] = useState(true)

        return (
          <ErrorBoundary onReset={() => setShouldError(false)} resetKeys={[shouldError]}>
            <ConditionalError shouldError={shouldError} />
          </ErrorBoundary>
        )
      }

      render(<TestWrapper />)

      // Error UI should be visible
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
      expect(screen.getByText('Initial error')).toBeInTheDocument()

      // Click try again button
      const tryAgainButton = screen.getByRole('button', { name: /try again/i })
      fireEvent.click(tryAgainButton)

      // Wait for recovery
      await waitFor(() => {
        expect(screen.getByTestId('recovered')).toBeInTheDocument()
      })

      // Verify error UI is gone
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
      expect(screen.queryByText('Initial error')).not.toBeInTheDocument()
    })

    it('should handle multiple error-recovery cycles', async () => {
      const ConditionalError = ({ shouldError }: { shouldError: boolean }) => {
        if (shouldError) {
          throw new Error('Cycle error')
        }
        return <div data-testid="success">Success</div>
      }

      const TestWrapper = () => {
        const [errorCount, setErrorCount] = useState(0)

        return (
          <>
            <button data-testid="trigger-error" onClick={() => setErrorCount((prev) => prev + 1)}>
              Trigger Error
            </button>
            <ErrorBoundary onReset={() => setErrorCount(0)} resetKeys={[errorCount]}>
              <ConditionalError shouldError={errorCount > 0} />
            </ErrorBoundary>
          </>
        )
      }

      render(<TestWrapper />)

      // Initially should show success
      expect(screen.getByTestId('success')).toBeInTheDocument()

      // Trigger first error
      fireEvent.click(screen.getByTestId('trigger-error'))
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()

      // Recover
      fireEvent.click(screen.getByRole('button', { name: /try again/i }))
      await waitFor(() => {
        expect(screen.getByTestId('success')).toBeInTheDocument()
      })

      // Trigger second error
      fireEvent.click(screen.getByTestId('trigger-error'))
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()

      // Recover again
      fireEvent.click(screen.getByRole('button', { name: /try again/i }))
      await waitFor(() => {
        expect(screen.getByTestId('success')).toBeInTheDocument()
      })
    })
  })

  describe('Error Information', () => {
    it('should log error to console', () => {
      const ThrowError = () => {
        throw new Error('Logged error')
      }

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      )

      expect(console.error).toHaveBeenCalled()
    })
  })

  describe('Styling', () => {
    it('should have correct CSS classes', () => {
      const ThrowError = () => {
        throw new Error('Style test')
      }

      const { container } = render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      )

      const errorContainer = container.querySelector('.flex.flex-col')
      expect(errorContainer).toBeInTheDocument()
      expect(errorContainer).toHaveClass('items-center')
      expect(errorContainer).toHaveClass('justify-center')
    })

    it('should style try again button correctly', () => {
      const ThrowError = () => {
        throw new Error('Button style test')
      }

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      )

      const button = screen.getByRole('button', { name: /try again/i })
      expect(button).toHaveClass('mt-4')
      expect(button).toHaveClass('px-4')
      expect(button).toHaveClass('py-2')
    })
  })
})
