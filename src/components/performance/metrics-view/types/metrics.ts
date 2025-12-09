export interface KpiValue {
  current: number
  target: number
  previous: number
  trend: number
}

export interface Kpi {
  id: string
  name: string
  description: string
  value: KpiValue
  format: 'number' | 'percentage' | 'currency'
  category: 'financial' | 'marketing' | 'operational'
}

export interface KpiTrend {
  kpiId: string
  data: {
    date: string
    value: number
  }[]
}

export interface KpiResponse {
  kpis: Kpi[]
  trends: KpiTrend[]
  lastUpdated: string
}
