'use client'

import { Title } from '@/components/ui/title'
import { Text } from '@/components/ui/text'
import { PageLayout } from '@/components/ui/layout'
import { TEST_IDS } from '@/lib/constants/test-ids'

export default function PerformanceMetrics() {
  return (
    <PageLayout>
      <div
        className="flex flex-col items-center gap-6 text-center"
        data-testid={TEST_IDS.page.metrics}
      >
        <Title>Performance KPIs</Title>
        <Text>Measuring success through data-driven metrics.</Text>
        <div className="w-full max-w-2xl bg-white/5 rounded-lg p-6 backdrop-blur-sm">
          <Text className="text-left">
            Coming soon... Explore key performance indicators and metrics that drive marketing
            success.
          </Text>
        </div>
      </div>
    </PageLayout>
  )
}
