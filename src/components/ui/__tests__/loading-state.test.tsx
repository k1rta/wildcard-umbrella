import { render, screen, TEST_IDS } from '@/lib/test/test-utils'
import { LoadingState } from '../loading-state'

jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      className,
      animate,
      transition,
      children,
    }: {
      className: string
      animate: { rotate: number }
      transition: { duration: number; repeat: number | 'Infinity'; ease: string }
      children?: React.ReactNode
    }) => (
      <div
        className={className}
        data-testid="mock-motion"
        data-animate={JSON.stringify(animate)}
        data-transition={JSON.stringify(transition)}
      >
        {children}
      </div>
    ),
  },
}))

describe('LoadingState', () => {
  it('should render loading spinner', () => {
    render(<LoadingState />)

    const container = screen.getByTestId(TEST_IDS.ui.loading)
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('flex', 'min-h-[60vh]', 'items-center', 'justify-center')

    const spinner = screen.getByTestId('mock-motion')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass(
      'h-8',
      'w-8',
      'rounded-full',
      'border-4',
      'border-white/10',
      'border-t-white'
    )
  })

  it('should have infinite rotation animation', () => {
    render(<LoadingState />)

    const spinner = screen.getByTestId('mock-motion')
    const animate = JSON.parse(spinner.getAttribute('data-animate') || '{}')
    const transition = JSON.parse(spinner.getAttribute('data-transition') || '{}')

    expect(animate).toEqual({ rotate: 360 })
    expect(transition).toMatchObject({ duration: 1, ease: 'linear' })
    expect(transition.repeat).toBeDefined()
  })
})
