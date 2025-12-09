export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  description: string
  achievements: string[]
  skills: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  achievements: string[]
}

export interface Skill {
  id: string
  name: string
  category: 'technical' | 'soft' | 'language' | 'tool'
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface ResumeData {
  basics: {
    name: string
    title: string
    summary: string
    location: string
    email: string
    linkedin: string
  }
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  certifications: {
    id: string
    name: string
    issuer: string
    date: string
    url?: string
  }[]
  languages: {
    id: string
    name: string
    level: string
  }[]
}
