'use client'

import { Title } from '@/components/ui/title'
import { Text } from '@/components/ui/text'
import { PageLayout } from '@/components/ui/layout'
import { TEST_IDS } from '@/lib/constants/test-ids'

export default function MarketingCampaigns() {
  return (
    <PageLayout>
      <div
        className="flex flex-col items-center gap-6 text-center"
        data-testid={TEST_IDS.page.campaigns}
      >
        <Title>Marketing Campaigns</Title>
        <Text>Strategic campaign planning and execution for maximum impact.</Text>
        <div className="w-full max-w-2xl bg-white/5 rounded-lg p-6 backdrop-blur-sm">
          <Text className="text-left">
            Coming soon... Discover successful campaign strategies, results, and lessons learned.
          </Text>
        </div>
      </div>
    </PageLayout>
  )
}
