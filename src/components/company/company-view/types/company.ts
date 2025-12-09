export interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  avatar?: string
  social?: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export interface Value {
  id: string
  title: string
  description: string
  icon: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  date: string
  metric?: {
    value: number
    label: string
  }
}

export interface CompanyData {
  name: string
  description: string
  mission: string
  vision: string
  founded: string
  location: string
  team: TeamMember[]
  values: Value[]
  achievements: Achievement[]
  contact: {
    email: string
    phone: string
    address: string
    social: {
      linkedin: string
      twitter?: string
      facebook?: string
    }
  }
}
