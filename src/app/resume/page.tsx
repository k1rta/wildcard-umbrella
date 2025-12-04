'use client'

import { Title } from '@/components/ui/title'
import { Text } from '@/components/ui/text'
import { PageLayout } from '@/components/ui/layout'
import { TEST_IDS } from '@/lib/constants/test-ids'

export default function Resume() {
  return (
    <PageLayout>
      <div
        className="flex flex-col items-center gap-6 text-center"
        data-testid={TEST_IDS.page.resume}
      >
        <Title>Professional Resume</Title>
        <Text>
          Experienced marketing professional with a focus on data-driven decision making and
          measurable results.
        </Text>
        <div className="w-full max-w-2xl bg-white/5 rounded-lg p-6 backdrop-blur-sm">
          <Text className="text-left">
            Coming soon... A detailed overview of professional experience, skills, and achievements.
          </Text>
        </div>
      </div>
    </PageLayout>
  )
}
