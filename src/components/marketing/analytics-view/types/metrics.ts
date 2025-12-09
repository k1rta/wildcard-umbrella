export interface MetricValue {
  current: number
  previous: number
  trend: number
}

export interface Metric {
  id: string
  name: string
  value: MetricValue
  format: 'number' | 'percentage' | 'currency'
  period: 'daily' | 'weekly' | 'monthly'
}

export interface ChartData {
  labels: string[]
  values: number[]
}

export interface AnalyticsData {
  metrics: Metric[]
  charts: {
    pageViews: ChartData
  }
  startDate: string
  endDate: string
}
