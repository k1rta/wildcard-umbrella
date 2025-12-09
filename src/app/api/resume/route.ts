import { NextResponse } from 'next/server'
import type { ResumeData } from '@/components/resume/resume-view/types/resume'

export async function GET() {
  const mockData: ResumeData = {
    basics: {
      name: 'John Doe',
      title: 'Marketing & Data Professional',
      summary:
        'Data-driven marketing professional with over 8 years of experience in digital marketing, analytics, and campaign optimization.',
      location: 'San Francisco, CA',
      email: 'john.doe@example.com',
      linkedin: 'https://linkedin.com/in/johndoe',
    },
    experience: [
      {
        id: '1',
        company: 'Tech Marketing Co',
        position: 'Senior Marketing Manager',
        startDate: '2022-01-01',
        description: 'Leading digital marketing initiatives and analytics for enterprise clients',
        achievements: [
          'Increased client conversion rates by 45% through data-driven optimization',
          'Managed $2M annual marketing budget with 280% ROI',
        ],
        skills: ['Digital Marketing', 'Analytics', 'Team Leadership', 'Budget Management'],
      },
      {
        id: '2',
        company: 'Growth Agency',
        position: 'Marketing Analyst',
        startDate: '2019-03-01',
        endDate: '2021-12-31',
        description: 'Analyzed marketing campaigns and provided optimization recommendations',
        achievements: [
          'Developed automated reporting system saving 20 hours per week',
          'Identified opportunities leading to 32% cost reduction',
        ],
        skills: ['Data Analysis', 'Marketing Automation', 'Python', 'SQL'],
      },
    ],
    education: [
      {
        id: '1',
        institution: 'University of Marketing',
        degree: 'Master of Science',
        field: 'Marketing Analytics',
        startDate: '2017-09-01',
        endDate: '2019-05-31',
        achievements: ['Graduated with Honors', 'Published research on AI in Marketing'],
      },
    ],
    skills: [
      {
        id: '1',
        name: 'Digital Marketing',
        category: 'technical',
        level: 'expert',
      },
      {
        id: '2',
        name: 'Data Analysis',
        category: 'technical',
        level: 'expert',
      },
      {
        id: '3',
        name: 'Python',
        category: 'tool',
        level: 'advanced',
      },
      {
        id: '4',
        name: 'Leadership',
        category: 'soft',
        level: 'advanced',
      },
    ],
    certifications: [
      {
        id: '1',
        name: 'Google Analytics Certification',
        issuer: 'Google',
        date: '2023-01-15',
        url: 'https://example.com/cert',
      },
    ],
    languages: [
      {
        id: '1',
        name: 'English',
        level: 'Native',
      },
      {
        id: '2',
        name: 'Spanish',
        level: 'Professional',
      },
    ],
  }

  return NextResponse.json(mockData)
}
