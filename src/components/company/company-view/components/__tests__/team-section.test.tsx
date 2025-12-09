import { render, screen } from '@/lib/test/test-utils'
import { TeamSection } from '../team-section'
import type { TeamMember } from '../../types/company'

describe('TeamSection', () => {
  const mockTeamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'John Doe',
      position: 'CEO',
      bio: 'Test bio 1',
      avatar: 'https://example.com/avatar1.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/johndoe',
        twitter: 'https://twitter.com/johndoe',
        github: 'https://github.com/johndoe',
      },
    },
    {
      id: '2',
      name: 'Jane Smith',
      position: 'CTO',
      bio: 'Test bio 2',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render section with correct test ID', () => {
      render(<TeamSection team={mockTeamMembers} />)
      expect(screen.getByTestId('team-section')).toBeInTheDocument()
    })

    it('should render section title with Building2 icon', () => {
      render(<TeamSection team={mockTeamMembers} />)
      const title = screen.getByText('Our Team')
      expect(title).toBeInTheDocument()
      const heading = title.closest('h2')
      expect(heading).toBeInTheDocument()
      const icon = heading?.querySelector('.lucide-building2')
      expect(icon).toBeInTheDocument()
    })

    it('should render all team members', () => {
      render(<TeamSection team={mockTeamMembers} />)
      mockTeamMembers.forEach((member) => {
        expect(screen.getByTestId(`team-member-${member.id}`)).toBeInTheDocument()
        expect(screen.getByText((content) => content.includes(member.name))).toBeInTheDocument()
        expect(screen.getByText(member.position)).toBeInTheDocument()
        expect(screen.getByText(member.bio)).toBeInTheDocument()
      })
    })

    it('should render avatar when provided', () => {
      render(<TeamSection team={mockTeamMembers} />)
      const memberWithAvatar = mockTeamMembers.find((m) => m.avatar)

      if (!memberWithAvatar) {
        throw new Error('Test data missing member with avatar')
      }

      const avatar = screen.getByTestId(`avatar-${memberWithAvatar.id}`)
      expect(avatar).toBeInTheDocument()
      const src = avatar.getAttribute('src')
      expect(src).toContain(encodeURIComponent(memberWithAvatar.avatar || ''))
      expect(avatar).toHaveAttribute('alt', memberWithAvatar.name)
    })

    it('should render avatar placeholder when no avatar provided', () => {
      render(<TeamSection team={mockTeamMembers} />)
      const memberWithoutAvatar = mockTeamMembers.find((m) => !m.avatar)

      if (!memberWithoutAvatar) {
        throw new Error('Test data missing member without avatar')
      }

      const placeholder = screen.getByTestId(`avatar-placeholder-${memberWithoutAvatar.id}`)
      expect(placeholder).toBeInTheDocument()
      const firstLetter = memberWithoutAvatar.name.charAt(0)
      expect(placeholder).toHaveTextContent(firstLetter)
    })

    it('should not render social links when not provided', () => {
      render(<TeamSection team={mockTeamMembers} />)
      const memberWithoutSocial = mockTeamMembers.find((m) => !m.social)

      if (!memberWithoutSocial) {
        throw new Error('Test data missing member without social links')
      }

      ;['linkedin', 'twitter', 'github'].forEach((platform) => {
        const socialLink = screen.queryByTestId(`${platform}-${memberWithoutSocial.id}`)
        expect(socialLink).not.toBeInTheDocument()
      })
    })

    it('should render social links when provided', () => {
      render(<TeamSection team={mockTeamMembers} />)
      const memberWithSocial = mockTeamMembers.find((m) => m.social)

      if (!memberWithSocial || !memberWithSocial.social) {
        throw new Error('Test data missing member with social links')
      }

      if (memberWithSocial.social.linkedin) {
        const linkedin = screen.getByTestId(`linkedin-${memberWithSocial.id}`)
        expect(linkedin).toBeInTheDocument()
        expect(linkedin).toHaveAttribute('href', memberWithSocial.social.linkedin)
      }

      if (memberWithSocial.social.twitter) {
        const twitter = screen.getByTestId(`twitter-${memberWithSocial.id}`)
        expect(twitter).toBeInTheDocument()
        expect(twitter).toHaveAttribute('href', memberWithSocial.social.twitter)
      }

      if (memberWithSocial.social.github) {
        const github = screen.getByTestId(`github-${memberWithSocial.id}`)
        expect(github).toBeInTheDocument()
        expect(github).toHaveAttribute('href', memberWithSocial.social.github)
      }
    })
  })

  describe('Styling', () => {
    it('should apply correct grid layout classes', () => {
      render(<TeamSection team={mockTeamMembers} />)
      const grid = screen.getByTestId('team-section').querySelector('.grid')
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-6')
    })

    it('should apply hover and transition classes to member cards', () => {
      render(<TeamSection team={mockTeamMembers} />)
      mockTeamMembers.forEach((member) => {
        const card = screen.getByTestId(`team-member-${member.id}`)
        expect(card).toHaveClass('hover:bg-white/10', 'transition-colors')
      })
    })
  })

  describe('Accessibility', () => {
    it('should use semantic HTML structure', () => {
      render(<TeamSection team={mockTeamMembers} />)
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Our Team')
      mockTeamMembers.forEach((member) => {
        expect(screen.getByRole('heading', { name: member.name })).toBeInTheDocument()
      })
    })

    it('should have proper attributes for external links', () => {
      render(<TeamSection team={mockTeamMembers} />)
      const links = screen.getAllByRole('link')
      links.forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })
  })

  it('should match snapshot', () => {
    const { container } = render(<TeamSection team={mockTeamMembers} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
