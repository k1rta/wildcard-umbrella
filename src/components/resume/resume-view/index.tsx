'use client'

import { Title } from '@/components/ui/title'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { useResume } from './hooks/use-resume'
import { ExperienceSection } from './components/experience-section'
import { EducationSection } from './components/education-section'
import { SkillsSection } from './components/skills-section'

export function ResumeView(): React.ReactElement {
  const { data, error, isLoading } = useResume()

  if (error) {
    throw error
  }

  if (isLoading || !data) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-8 w-48 bg-white/10 rounded" />
        <div className="space-y-4">
          <div className="h-4 w-3/4 bg-white/10 rounded" />
          <div className="h-4 w-1/2 bg-white/10 rounded" />
        </div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-6 w-1/3 bg-white/10 rounded" />
            <div className="h-24 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="space-y-8" data-testid="resume-view">
        <header className="text-center" data-testid="resume-header">
          <Title>{data.basics.name}</Title>
          <p className="text-xl text-white/70 mt-2">{data.basics.title}</p>
          <p className="text-white/50 mt-1">{data.basics.location}</p>
          <div className="flex justify-center gap-4 mt-4">
            <a
              href={`mailto:${data.basics.email}`}
              className="text-white/70 hover:text-white transition-colors"
              data-testid="resume-email"
            >
              {data.basics.email}
            </a>
            <a
              href={data.basics.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              data-testid="resume-linkedin"
            >
              LinkedIn
            </a>
          </div>
        </header>

        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-center mb-12" data-testid="resume-summary">
            {data.basics.summary}
          </p>

          <div className="space-y-12">
            <ExperienceSection experiences={data.experience} />
            <EducationSection education={data.education} />
            <SkillsSection skills={data.skills} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
