'use client'

import { Title } from '@/components/ui/title'
import { PageLayout } from '@/components/ui/layout'
import { Tagline } from '@/components/shared/tagline'
import { CONTENT } from '@/lib/constants/content'

interface ComingSoonPageProps {
  title: string
  taglineTestId: string
}

export function ComingSoonPage({ title, taglineTestId }: ComingSoonPageProps) {
  return (
    <PageLayout>
      <Title>{title}</Title>
      <Tagline testId={taglineTestId}>{CONTENT.TAGLINES.COMING_SOON}</Tagline>
    </PageLayout>
  )
}
