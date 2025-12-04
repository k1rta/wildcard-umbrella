'use client'

import { Title } from '@/components/ui/title'
import { Text } from '@/components/ui/text'
import { PageLayout } from '@/components/ui/layout'
import { TEST_IDS } from '@/lib/constants/test-ids'

export default function CompanyInfo() {
  return (
    <PageLayout>
      <div
        className="flex flex-col items-center gap-6 text-center"
        data-testid={TEST_IDS.page.company}
      >
        <Title>Company Info</Title>
        <Text>Building data-driven marketing solutions.</Text>
        <div className="w-full max-w-2xl bg-white/5 rounded-lg p-6 backdrop-blur-sm">
          <Text className="text-left">
            Coming soon... Learn about our mission, values, and approach to marketing excellence.
          </Text>
        </div>
      </div>
    </PageLayout>
  )
}
