import type { Kpi } from '../types/metrics'
import { KpiCard } from './kpi-card'

interface KpiGridProps {
  kpis: Kpi[]
}

export function KpiGrid({ kpis }: KpiGridProps) {
  return (
    <div data-testid="kpi-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  )
}
