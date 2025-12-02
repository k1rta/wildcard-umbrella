export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export type MoveDirection = 'none' | 'top' | 'bottom' | 'left' | 'right'

export interface ParticleConfig {
  colors: string[]
  count: number
  size: number
  speed: number
  shape: string
  move: {
    direction: MoveDirection
    straight: boolean
    outMode: 'out' | 'bounce'
    random: boolean
  }
}

export interface SeasonTheme {
  gradient: string
  textAccent: string
  iconHover: string
}

export interface SeasonConfig {
  particles: ParticleConfig
  theme: SeasonTheme
}
