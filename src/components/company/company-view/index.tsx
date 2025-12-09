'use client'

import { Title } from '@/components/ui/title'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { useCompany } from './hooks/use-company'
import { TeamSection } from './components/team-section'
import { ValuesSection } from './components/values-section'
import { AchievementsSection } from './components/achievements-section'
import { Building, Mail, MapPin, Phone } from 'lucide-react'

export function CompanyView(): React.ReactElement {
  const { data, error, isLoading } = useCompany()

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
      <div className="space-y-12" data-testid="company-view">
        <header className="text-center" data-testid="company-header">
          <Title>{data.name}</Title>
          <div className="flex items-center justify-center gap-2 mt-4 text-white/70">
            <Building className="w-5 h-5" />
            <span>Founded {data.founded}</span>
            <span className="mx-2">•</span>
            <MapPin className="w-5 h-5" />
            <span>{data.location}</span>
          </div>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="mb-12 space-y-6" data-testid="company-intro">
            <p className="text-lg text-center">{data.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div data-testid="company-mission">
                <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
                <p className="text-white/90">{data.mission}</p>
              </div>
              <div data-testid="company-vision">
                <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
                <p className="text-white/90">{data.vision}</p>
              </div>
            </div>
          </div>

          <div className="space-y-16">
            <TeamSection team={data.team} />
            <ValuesSection values={data.values} />
            <AchievementsSection achievements={data.achievements} />

            <section className="text-center" data-testid="contact-section">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <a
                  href={`mailto:${data.contact.email}`}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                  data-testid="contact-email"
                >
                  <Mail className="w-5 h-5" />
                  {data.contact.email}
                </a>
                <a
                  href={`tel:${data.contact.phone}`}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                  data-testid="contact-phone"
                >
                  <Phone className="w-5 h-5" />
                  {data.contact.phone}
                </a>
              </div>
              <p className="mt-4 text-white/50" data-testid="contact-address">
                {data.contact.address}
              </p>
            </section>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
