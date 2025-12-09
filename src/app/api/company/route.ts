import { NextResponse } from 'next/server'
import type { CompanyData } from '@/components/company/company-view/types/company'

export async function GET() {
  const mockData: CompanyData = {
    name: 'Tech Marketing Solutions',
    description:
      'We are a data-driven marketing agency helping businesses grow through innovative digital strategies.',
    mission:
      'To empower businesses with data-driven marketing solutions that drive measurable growth and ROI.',
    vision:
      'To be the leading innovator in data-driven marketing, setting new standards for performance and client success.',
    founded: '2018',
    location: 'San Francisco, CA',
    team: [
      {
        id: '1',
        name: 'Sarah Johnson',
        position: 'CEO & Founder',
        bio: 'Digital marketing veteran with 15+ years of experience in growth strategy.',
        social: {
          linkedin: 'https://linkedin.com/in/sarah',
          twitter: 'https://twitter.com/sarah',
        },
      },
      {
        id: '2',
        name: 'Mike Chen',
        position: 'Head of Analytics',
        bio: 'Data scientist turned marketing expert, specializing in predictive analytics.',
        social: {
          linkedin: 'https://linkedin.com/in/mike',
          github: 'https://github.com/mike',
        },
      },
    ],
    values: [
      {
        id: '1',
        title: 'Data-Driven',
        description: 'We make decisions based on data, not assumptions.',
        icon: '📊',
      },
      {
        id: '2',
        title: 'Innovation',
        description: 'We constantly explore new technologies and methodologies.',
        icon: '💡',
      },
      {
        id: '3',
        title: 'Transparency',
        description: 'We believe in open communication and clear metrics.',
        icon: '🔍',
      },
    ],
    achievements: [
      {
        id: '1',
        title: 'Industry Recognition',
        description: 'Named Top Digital Marketing Agency by TechReview',
        date: '2024-11-15',
      },
      {
        id: '2',
        title: 'Client Success',
        description: 'Helped clients achieve over $100M in revenue growth',
        date: '2024-10-01',
        metric: {
          value: 100,
          label: 'Million in Revenue Growth',
        },
      },
    ],
    contact: {
      email: 'hello@techmarketing.com',
      phone: '+1 (555) 123-4567',
      address: '123 Market Street, San Francisco, CA 94105',
      social: {
        linkedin: 'https://linkedin.com/company/techmarketing',
        twitter: 'https://twitter.com/techmarketing',
      },
    },
  }

  return NextResponse.json(mockData)
}
