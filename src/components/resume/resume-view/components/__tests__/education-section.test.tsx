import { render, screen } from '@/lib/test/test-utils'
import { EducationSection } from '../education-section'
import type { Education } from '../../types/resume'

describe('EducationSection', () => {
  const mockEducation: Education[] = [
    {
      id: '1',
      institution: 'Test University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2018-09-01',
      endDate: '2022-05-31',
      achievements: ["Dean's List all semesters", 'Led student coding club'],
    },
    {
      id: '2',
      institution: 'Another University',
      degree: 'Master of Science',
      field: 'Software Engineering',
      startDate: '2022-09-01',
      endDate: '2024-05-31',
      achievements: [],
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render section with correct test ID', () => {
      render(<EducationSection education={mockEducation} />)
      expect(screen.getByTestId('education-section')).toBeInTheDocument()
    })

    it('should render section title', () => {
      render(<EducationSection education={mockEducation} />)
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Education')
    })

    it('should render all education entries', () => {
      render(<EducationSection education={mockEducation} />)
      mockEducation.forEach((edu) => {
        expect(screen.getByTestId(`education-${edu.id}`)).toBeInTheDocument()
        expect(screen.getByText(edu.degree)).toBeInTheDocument()
        expect(screen.getByText(edu.institution)).toBeInTheDocument()
        expect(screen.getByText(edu.field)).toBeInTheDocument()
      })
    })

    it('should format dates correctly', () => {
      render(<EducationSection education={mockEducation} />)
      expect(screen.getByText('September 2018 - May 2022')).toBeInTheDocument()
      expect(screen.getByText('September 2022 - May 2024')).toBeInTheDocument()
    })

    it('should render achievements when present', () => {
      render(<EducationSection education={mockEducation} />)
      const eduWithAchievements = mockEducation.find((edu) => edu.achievements.length > 0)

      if (!eduWithAchievements) {
        throw new Error('Test data missing education with achievements')
      }

      eduWithAchievements.achievements.forEach((achievement, index) => {
        expect(
          screen.getByTestId(`achievement-${eduWithAchievements.id}-${index}`)
        ).toHaveTextContent(achievement)
      })
    })

    it('should not render achievements section when empty', () => {
      render(<EducationSection education={mockEducation} />)
      const eduWithoutAchievements = mockEducation.find((edu) => edu.achievements.length === 0)

      if (!eduWithoutAchievements) {
        throw new Error('Test data missing education without achievements')
      }

      // Since there are no achievements, we just verify that no achievement elements exist
      expect(
        screen.queryByTestId(new RegExp(`achievement-${eduWithoutAchievements.id}-\d+`))
      ).not.toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should apply border styling to education entries', () => {
      render(<EducationSection education={mockEducation} />)
      mockEducation.forEach((edu) => {
        const entry = screen.getByTestId(`education-${edu.id}`)
        expect(entry).toHaveClass('border-l-2', 'border-white/10', 'pl-4')
      })
    })

    it('should apply proper text styling to different elements', () => {
      render(<EducationSection education={mockEducation} />)
      const firstEdu = mockEducation.at(0)

      if (!firstEdu) {
        throw new Error('Test data is empty')
      }

      // Degree
      expect(screen.getByText(firstEdu.degree)).toHaveClass('text-lg', 'font-semibold')

      // Institution
      expect(screen.getByText(firstEdu.institution)).toHaveClass('text-white/70')

      // Field
      expect(screen.getByText(firstEdu.field)).toHaveClass('text-white/90')

      // Achievements
      const achievement = screen.getByTestId(`achievement-${firstEdu.id}-0`)
      expect(achievement).toHaveClass('text-white/90')
    })
  })

  it('should match snapshot', () => {
    const { container } = render(<EducationSection education={mockEducation} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
