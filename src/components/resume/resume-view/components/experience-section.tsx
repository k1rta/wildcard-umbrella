import type { Experience } from '../types/resume'

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section data-testid="experience-section">
      <h2 className="text-2xl font-bold mb-6">Experience</h2>
      <div className="space-y-8">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="border-l-2 border-white/10 pl-4"
            data-testid={`experience-${exp.id}`}
          >
            <h3 className="text-lg font-semibold">{exp.position}</h3>
            <p className="text-white/70">{exp.company}</p>
            <p className="text-sm text-white/50 mb-2">
              {new Date(exp.startDate).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}{' '}
              -{' '}
              {exp.endDate
                ? new Date(exp.endDate).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })
                : 'Present'}
            </p>
            <p className="mb-2">{exp.description}</p>
            <ul className="list-disc list-inside space-y-1">
              {exp.achievements.map((achievement, index) => (
                <li
                  key={index}
                  data-testid={`achievement-${exp.id}-${index}`}
                  className="text-white/90"
                >
                  {achievement}
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap gap-2">
              {exp.skills.map((skill, index) => (
                <span
                  key={index}
                  data-testid={`skill-${exp.id}-${index}`}
                  className="px-2 py-1 bg-white/5 rounded text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
