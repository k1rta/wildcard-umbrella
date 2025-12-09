import type { Kpi } from '../types/metrics'

interface KpiCardProps {
  kpi: Kpi
}

export function KpiCard({ kpi }: KpiCardProps) {
  const formatValue = (value: number) => {
    switch (kpi.format) {
      case 'percentage':
        return `${(value * 100).toFixed(1)}%`
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value)
      default:
        return new Intl.NumberFormat('en-US').format(value)
    }
  }

  const progress = (kpi.value.current / kpi.value.target) * 100

  return (
    <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium">{kpi.name}</h3>
          <p className="text-sm text-white/70">{kpi.description}</p>
        </div>
        <span
          className={`px-2 py-1 rounded text-xs ${
            kpi.category === 'financial'
              ? 'bg-green-500/20 text-green-300'
              : kpi.category === 'marketing'
                ? 'bg-blue-500/20 text-blue-300'
                : 'bg-purple-500/20 text-purple-300'
          }`}
        >
          {kpi.category}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-white/70">Current</span>
          <span className="font-medium">{formatValue(kpi.value.current)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-white/70">Target</span>
          <span className="font-medium">{formatValue(kpi.value.target)}</span>
        </div>
        <div
          data-testid="kpi-progress-container"
          className="h-2 bg-white/10 rounded-full overflow-hidden"
        >
          <div
            data-testid="kpi-progress-bar"
            className="h-full bg-white/30 rounded-full transition-all"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className={kpi.value.trend >= 0 ? 'text-green-400' : 'text-red-400'}>
            {kpi.value.trend >= 0 ? '↑' : '↓'} {Math.abs(kpi.value.trend * 100).toFixed(1)}%
          </span>
          <span className="text-white/70">vs previous</span>
        </div>
      </div>
    </div>
  )
}
