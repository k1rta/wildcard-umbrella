import { render, screen } from '@/lib/test/test-utils'
import { ComingSoon } from '../coming-soon'

describe('ComingSoon', () => {
  const mockProps = {
    title: 'Test Page',
    testId: 'test-tagline',
  }

  it('should render title and tagline', () => {
    render(<ComingSoon {...mockProps} />)

    expect(screen.getByText(mockProps.title)).toBeInTheDocument()
    expect(screen.getByTestId(mockProps.testId)).toBeInTheDocument()
    expect(screen.getByText('Coming soon...')).toBeInTheDocument()
  })

  it('should match snapshot', () => {
    const { container } = render(<ComingSoon {...mockProps} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should be centered and have proper layout', () => {
    render(<ComingSoon {...mockProps} />)
    const container = screen.getByTestId(mockProps.testId).closest('div')

    expect(container).toHaveClass('flex')
    expect(container).toHaveClass('flex-col')
    expect(container).toHaveClass('items-center')
    expect(container).toHaveClass('text-center')
  })
})
