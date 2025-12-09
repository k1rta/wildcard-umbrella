import { render, screen } from '@/lib/test/test-utils'
import { SkillsSection } from '../skills-section'
import type { Skill } from '../../types/resume'

describe('SkillsSection', () => {
  const mockSkills: Skill[] = [
    {
      id: '1',
      name: 'React',
      category: 'technical',
      level: 'expert',
    },
    {
      id: '2',
      name: 'TypeScript',
      category: 'technical',
      level: 'advanced',
    },
    {
      id: '3',
      name: 'Team Leadership',
      category: 'soft',
      level: 'expert',
    },
    {
      id: '4',
      name: 'English',
      category: 'language',
      level: 'expert',
    },
    {
      id: '5',
      name: 'Figma',
      category: 'tool',
      level: 'intermediate',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render section with correct test ID', () => {
      render(<SkillsSection skills={mockSkills} />)
      expect(screen.getByTestId('skills-section')).toBeInTheDocument()
    })

    it('should render section title', () => {
      render(<SkillsSection skills={mockSkills} />)
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Skills')
    })

    it('should render all skill categories', () => {
      render(<SkillsSection skills={mockSkills} />)
      const categories = ['technical', 'soft', 'language', 'tool']
      categories.forEach((category) => {
        expect(screen.getByTestId(`skills-category-${category}`)).toBeInTheDocument()
        expect(screen.getByText(category, { exact: false })).toBeInTheDocument()
      })
    })

    it('should render all skills', () => {
      render(<SkillsSection skills={mockSkills} />)
      mockSkills.forEach((skill) => {
        const skillElement = screen.getByTestId(`skill-${skill.id}`)
        expect(skillElement).toBeInTheDocument()
        expect(skillElement).toHaveTextContent(skill.name)
      })
    })

    it('should group skills by category', () => {
      render(<SkillsSection skills={mockSkills} />)
      const technicalSkills = mockSkills.filter((s) => s.category === 'technical')
      const technicalCategory = screen.getByTestId('skills-category-technical')

      technicalSkills.forEach((skill) => {
        expect(technicalCategory).toContainElement(screen.getByTestId(`skill-${skill.id}`))
      })
    })
  })

  describe('Styling', () => {
    it('should apply grid layout to categories container', () => {
      render(<SkillsSection skills={mockSkills} />)
      const grid = screen.getByTestId('skills-section').querySelector('.grid')
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'gap-6')
    })

    it('should apply flex layout to skills container', () => {
      render(<SkillsSection skills={mockSkills} />)
      const skillsContainer = screen.getByTestId('skill-1').parentElement
      expect(skillsContainer).toHaveClass('flex', 'flex-wrap', 'gap-2')
    })

    it('should capitalize category headings', () => {
      render(<SkillsSection skills={mockSkills} />)
      const categories = ['technical', 'soft', 'language', 'tool']
      categories.forEach((category) => {
        const heading = screen.getByText(category, { exact: false })
        expect(heading).toHaveClass('capitalize')
      })
    })

    it.each([
      ['expert', 'bg-white/20'],
      ['advanced', 'bg-white/15'],
      ['intermediate', 'bg-white/10'],
      ['beginner', 'bg-white/5'],
    ])('should apply correct background for %s level', (level, bgClass) => {
      const testSkill: Skill = {
        id: 'test',
        name: 'Test Skill',
        category: 'technical',
        level: level as Skill['level'],
      }
      render(<SkillsSection skills={[testSkill]} />)
      const skillElement = screen.getByTestId(`skill-${testSkill.id}`)
      expect(skillElement).toHaveClass(bgClass)
    })

    it('should apply consistent pill styling to all skills', () => {
      render(<SkillsSection skills={mockSkills} />)
      mockSkills.forEach((skill) => {
        const skillElement = screen.getByTestId(`skill-${skill.id}`)
        expect(skillElement).toHaveClass('px-3', 'py-1', 'rounded-full', 'text-sm')
      })
    })
  })

  it('should match snapshot', () => {
    const { container } = render(<SkillsSection skills={mockSkills} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
