import { render, screen } from '@/lib/test/test-utils'
import { AchievementsSection } from '../achievements-section'
import type { Achievement } from '../../types/company'

describe('AchievementsSection', () => {
  const mockAchievements: Achievement[] = [
    {
      id: '1',
      title: 'Achievement 1',
      date: '2023-01-01',
      description: 'Test description 1',
      metric: {
        value: 100,
        label: 'Success Rate',
      },
    },
    {
      id: '2',
      title: 'Achievement 2',
      date: '2023-02-01',
      description: 'Test description 2',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render section with correct test ID', () => {
      render(<AchievementsSection achievements={mockAchievements} />)
      expect(screen.getByTestId('achievements-section')).toBeInTheDocument()
    })

    it('should render section title with Trophy icon', () => {
      render(<AchievementsSection achievements={mockAchievements} />)
      const title = screen.getByText('Achievements')
      expect(title).toBeInTheDocument()
      const heading = title.closest('h2')
      expect(heading).toBeInTheDocument()
      const icon = heading?.querySelector('.lucide-trophy')
      expect(icon).toBeInTheDocument()
    })

    it('should render all achievements', () => {
      render(<AchievementsSection achievements={mockAchievements} />)
      mockAchievements.forEach((achievement) => {
        expect(screen.getByTestId(`achievement-${achievement.id}`)).toBeInTheDocument()
        expect(screen.getByText(achievement.title)).toBeInTheDocument()
        expect(screen.getByText(achievement.description)).toBeInTheDocument()
      })
    })

    it('should render metrics when provided', () => {
      render(<AchievementsSection achievements={mockAchievements} />)
      const achievementWithMetric = mockAchievements.find((a) => a.metric)

      if (!achievementWithMetric || !achievementWithMetric.metric) {
        throw new Error('Test data missing achievement with metric')
      }

      const metricElement = screen.getByTestId(`metric-${achievementWithMetric.id}`)
      expect(metricElement).toBeInTheDocument()
      expect(screen.getByText(achievementWithMetric.metric.value.toString())).toBeInTheDocument()
      expect(screen.getByText(achievementWithMetric.metric.label)).toBeInTheDocument()
    })

    it('should not render metrics when not provided', () => {
      render(<AchievementsSection achievements={mockAchievements} />)
      const achievementWithoutMetric = mockAchievements.find((a) => !a.metric)

      if (!achievementWithoutMetric) {
        throw new Error('Test data missing achievement without metric')
      }

      expect(screen.queryByTestId(`metric-${achievementWithoutMetric.id}`)).not.toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should apply correct grid layout classes', () => {
      render(<AchievementsSection achievements={mockAchievements} />)
      const grid = screen.getByTestId('achievements-section').querySelector('.grid')
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'gap-6')
    })

    it('should apply hover and transition classes to achievement cards', () => {
      render(<AchievementsSection achievements={mockAchievements} />)
      mockAchievements.forEach((achievement) => {
        const card = screen.getByTestId(`achievement-${achievement.id}`)
        expect(card).toHaveClass('hover:bg-white/10', 'transition-colors')
      })
    })
  })

  describe('Accessibility', () => {
    it('should use semantic HTML structure', () => {
      render(<AchievementsSection achievements={mockAchievements} />)
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Achievements')
      mockAchievements.forEach((achievement) => {
        expect(screen.getByRole('heading', { name: achievement.title })).toBeInTheDocument()
      })
    })
  })

  it('should match snapshot', () => {
    const { container } = render(<AchievementsSection achievements={mockAchievements} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
