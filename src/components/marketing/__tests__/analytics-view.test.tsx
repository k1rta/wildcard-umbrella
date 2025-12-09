import { render, screen, act, TEST_IDS } from '@/lib/test/test-utils'
import { AnalyticsView } from '../analytics-view'
import { TAGLINE_ROTATION_INTERVAL } from '@/lib/constants/animations'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    h1: ({ children, ...props }: { children: React.ReactNode }) => <h1 {...props}>{children}</h1>,
    div: ({ children, ...props }: { children: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
    p: ({ children, ...props }: { children: React.ReactNode }) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: { children: React.ReactNode }) => (
      <span {...props}>{children}</span>
    ),
  },
}))

describe('AnalyticsView', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should render title and initial tagline', () => {
    render(<AnalyticsView />)

    expect(screen.getByText('Marketing Analytics')).toBeInTheDocument()
    expect(screen.getByTestId(TEST_IDS.pages.marketingAnalytics.tagline)).toHaveTextContent(
      'Coming soon...'
    )
  })

  it('should rotate taglines', () => {
    render(<AnalyticsView />)

    // Initial state
    expect(screen.getByTestId(TEST_IDS.pages.marketingAnalytics.tagline)).toHaveTextContent(
      'Coming soon...'
    )

    // After one interval
    act(() => {
      jest.advanceTimersByTime(TAGLINE_ROTATION_INTERVAL)
    })

    // Should still show the same tagline since there's only one
    expect(screen.getByTestId(TEST_IDS.pages.marketingAnalytics.tagline)).toHaveTextContent(
      'Coming soon...'
    )
  })

  it('should clean up interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval')
    const { unmount } = render(<AnalyticsView />)

    unmount()

    expect(clearIntervalSpy).toHaveBeenCalled()
    clearIntervalSpy.mockRestore()
  })
})
