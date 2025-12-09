import type { TeamMember } from '../types/company'
import { Building2, Github, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'

interface TeamSectionProps {
  team: TeamMember[]
}

export function TeamSection({ team }: TeamSectionProps) {
  return (
    <section data-testid="team-section">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Building2 className="w-6 h-6" />
        Our Team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div
            key={member.id}
            data-testid={`team-member-${member.id}`}
            className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors"
          >
            {member.avatar ? (
              <Image
                src={member.avatar}
                alt={member.name}
                width={200}
                height={200}
                className="rounded-full w-24 h-24 mx-auto mb-4"
                data-testid={`avatar-${member.id}`}
              />
            ) : (
              <div
                className="w-24 h-24 rounded-full mx-auto mb-4 bg-white/10 flex items-center justify-center"
                data-testid={`avatar-placeholder-${member.id}`}
              >
                <span className="text-2xl">{member.name[0]}</span>
              </div>
            )}
            <h3 className="text-lg font-semibold text-center">{member.name}</h3>
            <p className="text-white/70 text-center mb-4">{member.position}</p>
            <p className="text-white/90 text-center mb-4">{member.bio}</p>
            {member.social && (
              <div className="flex justify-center gap-4">
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white transition-colors"
                    data-testid={`linkedin-${member.id}`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white transition-colors"
                    data-testid={`twitter-${member.id}`}
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white transition-colors"
                    data-testid={`github-${member.id}`}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
