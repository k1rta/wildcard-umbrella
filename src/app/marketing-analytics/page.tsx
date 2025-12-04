'use client'

import { Title } from '@/components/ui/title'
import { Text } from '@/components/ui/text'
import { PageLayout } from '@/components/ui/layout'
import { TEST_IDS } from '@/lib/constants/test-ids'

export default function MarketingAnalytics() {
  return (
    <PageLayout>
      <div
        className="flex flex-col items-center gap-6 text-center"
        data-testid={TEST_IDS.page.analytics}
      >
        <Title>Marketing Analytics</Title>
        <Text>Transforming raw data into actionable marketing insights.</Text>
        <div className="w-full max-w-2xl bg-white/5 rounded-lg p-6 backdrop-blur-sm">
          <Text className="text-left">
            Coming soon... Explore case studies and methodologies in marketing analytics and data
            visualization.
          </Text>
        </div>
      </div>
    </PageLayout>
  )
}
