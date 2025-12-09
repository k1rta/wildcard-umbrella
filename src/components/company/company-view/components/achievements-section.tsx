import type { Achievement } from '../types/company'
import { Trophy } from 'lucide-react'

interface AchievementsSectionProps {
  achievements: Achievement[]
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <section data-testid="achievements-section">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Trophy className="w-6 h-6" />
        Achievements
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            data-testid={`achievement-${achievement.id}`}
            className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{achievement.title}</h3>
                <p className="text-white/70">
                  {new Date(achievement.date).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              {achievement.metric && (
                <div className="text-right" data-testid={`metric-${achievement.id}`}>
                  <p className="text-2xl font-bold">{achievement.metric.value}</p>
                  <p className="text-sm text-white/70">{achievement.metric.label}</p>
                </div>
              )}
            </div>
            <p className="text-white/90">{achievement.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
