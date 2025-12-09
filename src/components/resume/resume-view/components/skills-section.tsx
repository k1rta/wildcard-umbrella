import type { Skill } from '../types/resume'

interface SkillsSectionProps {
  skills: Skill[]
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<Skill['category'], Skill[]>
  )

  return (
    <section data-testid="skills-section">
      <h2 className="text-2xl font-bold mb-6">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(Object.entries(skillsByCategory) as [Skill['category'], Skill[]][]).map(
          ([category, skills]) => (
            <div key={category} data-testid={`skills-category-${category}`}>
              <h3 className="text-lg font-semibold capitalize mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    data-testid={`skill-${skill.id}`}
                    className={`px-3 py-1 rounded-full text-sm ${
                      skill.level === 'expert'
                        ? 'bg-white/20'
                        : skill.level === 'advanced'
                          ? 'bg-white/15'
                          : skill.level === 'intermediate'
                            ? 'bg-white/10'
                            : 'bg-white/5'
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}
