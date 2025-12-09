import { render, screen } from '@/lib/test/test-utils'
import { ExperienceSection } from '../experience-section'
import type { Experience } from '../../types/resume'

describe('ExperienceSection', () => {
  const mockExperiences: Experience[] = [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Developer',
      startDate: '2020-01-01',
      endDate: '2023-12-31',
      description: 'Led development team',
      achievements: ['Increased performance by 50%', 'Implemented CI/CD pipeline'],
      skills: ['React', 'TypeScript', 'Node.js'],
    },
    {
      id: '2',
      company: 'Current Corp',
      position: 'Lead Engineer',
      startDate: '2024-01-01',
      description: 'Leading architecture decisions',
      achievements: ['Designed microservices architecture'],
      skills: ['AWS', 'Kubernetes', 'Go'],
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render section with correct test ID', () => {
      render(<ExperienceSection experiences={mockExperiences} />)
      expect(screen.getByTestId('experience-section')).toBeInTheDocument()
    })

    it('should render section title', () => {
      render(<ExperienceSection experiences={mockExperiences} />)
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Experience')
    })

    it('should render all experience entries', () => {
      render(<ExperienceSection experiences={mockExperiences} />)
      mockExperiences.forEach((exp) => {
        const entry = screen.getByTestId(`experience-${exp.id}`)
        expect(entry).toBeInTheDocument()
        expect(screen.getByText(exp.position)).toBeInTheDocument()
        expect(screen.getByText(exp.company)).toBeInTheDocument()
        expect(screen.getByText(exp.description)).toBeInTheDocument()
      })
    })

    it('should format dates correctly with end date', () => {
      render(<ExperienceSection experiences={mockExperiences} />)
      const expWithEndDate = mockExperiences.find((exp) => exp.endDate)

      if (!expWithEndDate) {
        throw new Error('Test data missing experience with end date')
      }

      expect(screen.getByText('January 2020 - December 2023')).toBeInTheDocument()
    })

    it('should format dates correctly with present', () => {
      render(<ExperienceSection experiences={mockExperiences} />)
      const expWithoutEndDate = mockExperiences.find((exp) => !exp.endDate)

      if (!expWithoutEndDate) {
        throw new Error('Test data missing experience without end date')
      }

      expect(screen.getByText('January 2024 - Present')).toBeInTheDocument()
    })

    it('should render achievements', () => {
      render(<ExperienceSection experiences={mockExperiences} />)
      mockExperiences.forEach((exp) => {
        exp.achievements.forEach((achievement, index) => {
          expect(screen.getByTestId(`achievement-${exp.id}-${index}`)).toHaveTextContent(
            achievement
          )
        })
      })
    })

    it('should render skills', () => {
      render(<ExperienceSection experiences={mockExperiences} />)
      mockExperiences.forEach((exp) => {
        exp.skills.forEach((skill, index) => {
          expect(screen.getByTestId(`skill-${exp.id}-${index}`)).toHaveTextContent(skill)
        })
      })
    })
  })

  describe('Styling', () => {
    it('should apply border styling to experience entries', () => {
      render(<ExperienceSection experiences={mockExperiences} />)
      mockExperiences.forEach((exp) => {
        const entry = screen.getByTestId(`experience-${exp.id}`)
        expect(entry).toHaveClass('border-l-2', 'border-white/10', 'pl-4')
      })
    })

    it('should apply proper text styling to different elements', () => {
      render(<ExperienceSection experiences={mockExperiences} />)
      const firstExp = mockExperiences.at(0)

      if (!firstExp) {
        throw new Error('Test data is empty')
      }

      // Position
      expect(screen.getByText(firstExp.position)).toHaveClass('text-lg', 'font-semibold')

      // Company
      expect(screen.getByText(firstExp.company)).toHaveClass('text-white/70')

      // Achievements
      const achievement = screen.getByTestId(`achievement-${firstExp.id}-0`)
      expect(achievement).toHaveClass('text-white/90')

      // Skills
      const skill = screen.getByTestId(`skill-${firstExp.id}-0`)
      expect(skill).toHaveClass('bg-white/5', 'rounded', 'text-sm')
    })

    it('should apply proper layout to skills container', () => {
      render(<ExperienceSection experiences={mockExperiences} />)
      const firstExp = mockExperiences.at(0)

      if (!firstExp) {
        throw new Error('Test data is empty')
      }

      const skillsContainer = screen.getByTestId(`skill-${firstExp.id}-0`).parentElement
      expect(skillsContainer).toHaveClass('flex', 'flex-wrap', 'gap-2')
    })
  })

  it('should match snapshot', () => {
    const { container } = render(<ExperienceSection experiences={mockExperiences} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
