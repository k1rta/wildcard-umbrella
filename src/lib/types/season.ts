export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export type MoveDirection = 'none' | 'top' | 'bottom' | 'left' | 'right'

interface ParticleOpacity {
  value: number
  animation?: {
    enable: boolean
    speed: number
    minimumValue: number
  }
}

interface ParticleMove {
  direction: MoveDirection
  straight: boolean
  outMode: 'out' | 'bounce'
  random: boolean
  warp?: boolean
  path?: {
    enable: boolean
    delay: {
      value: number
    }
    generator: 'sine' | 'random'
  }
}

export interface ParticleConfig {
  colors: string[]
  count: number
  size: number
  speed: number
  shape: 'circle' | 'square' | 'star'
  move: ParticleMove
  opacity?: ParticleOpacity
  life?: {
    duration: {
      value: number
    }
    count: number
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
