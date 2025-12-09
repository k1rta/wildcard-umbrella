import type { Value } from '../types/company'
import { Heart } from 'lucide-react'

interface ValuesSectionProps {
  values: Value[]
}

export function ValuesSection({ values }: ValuesSectionProps) {
  return (
    <section data-testid="values-section">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Heart className="w-6 h-6" />
        Our Values
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {values.map((value) => (
          <div
            key={value.id}
            data-testid={`value-${value.id}`}
            className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors"
          >
            <div className="text-3xl mb-4">{value.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
            <p className="text-white/90">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
