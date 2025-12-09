import { render, screen } from '@/lib/test/test-utils'
import { ValuesSection } from '../values-section'
import type { Value } from '../../types/company'

describe('ValuesSection', () => {
  const mockValues: Value[] = [
    {
      id: '1',
      title: 'Innovation',
      description: 'Always pushing boundaries',
      icon: '🚀',
    },
    {
      id: '2',
      title: 'Integrity',
      description: 'Doing the right thing',
      icon: '⭐',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render section with correct test ID', () => {
      render(<ValuesSection values={mockValues} />)
      expect(screen.getByTestId('values-section')).toBeInTheDocument()
    })

    it('should render section title with Heart icon', () => {
      render(<ValuesSection values={mockValues} />)
      const title = screen.getByText('Our Values')
      expect(title).toBeInTheDocument()
      const heading = title.closest('h2')
      expect(heading).toBeInTheDocument()
      const icon = heading?.querySelector('.lucide-heart')
      expect(icon).toBeInTheDocument()
    })

    it('should render all values', () => {
      render(<ValuesSection values={mockValues} />)
      mockValues.forEach((value) => {
        const valueCard = screen.getByTestId(`value-${value.id}`)
        expect(valueCard).toBeInTheDocument()
        expect(screen.getByText(value.title)).toBeInTheDocument()
        expect(screen.getByText(value.description)).toBeInTheDocument()
        expect(screen.getByText(value.icon)).toBeInTheDocument()
      })
    })
  })

  describe('Styling', () => {
    it('should apply correct grid layout classes', () => {
      render(<ValuesSection values={mockValues} />)
      const grid = screen.getByTestId('values-section').querySelector('.grid')
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-6')
    })

    it('should apply hover and transition classes to value cards', () => {
      render(<ValuesSection values={mockValues} />)
      mockValues.forEach((value) => {
        const card = screen.getByTestId(`value-${value.id}`)
        expect(card).toHaveClass('hover:bg-white/10', 'transition-colors')
      })
    })
  })

  describe('Accessibility', () => {
    it('should use semantic HTML structure', () => {
      render(<ValuesSection values={mockValues} />)
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Our Values')
      mockValues.forEach((value) => {
        expect(screen.getByRole('heading', { name: value.title })).toBeInTheDocument()
      })
    })
  })

  it('should match snapshot', () => {
    const { container } = render(<ValuesSection values={mockValues} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
