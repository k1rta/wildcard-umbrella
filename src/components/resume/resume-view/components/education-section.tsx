import type { Education } from '../types/resume'

interface EducationSectionProps {
  education: Education[]
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section data-testid="education-section">
      <h2 className="text-2xl font-bold mb-6">Education</h2>
      <div className="space-y-6">
        {education.map((edu) => (
          <div
            key={edu.id}
            data-testid={`education-${edu.id}`}
            className="border-l-2 border-white/10 pl-4"
          >
            <h3 className="text-lg font-semibold">{edu.degree}</h3>
            <p className="text-white/70">{edu.institution}</p>
            <p className="text-sm text-white/50 mb-2">
              {new Date(edu.startDate).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}{' '}
              -{' '}
              {new Date(edu.endDate).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <p className="text-white/90">{edu.field}</p>
            {edu.achievements.length > 0 && (
              <ul className="mt-2 list-disc list-inside space-y-1">
                {edu.achievements.map((achievement, index) => (
                  <li
                    key={index}
                    data-testid={`achievement-${edu.id}-${index}`}
                    className="text-white/90"
                  >
                    {achievement}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
