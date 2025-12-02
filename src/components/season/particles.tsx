'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { SEASON_CONFIGS } from '@/lib/constants/seasons'
import type { Season } from '@/lib/types/season'

const Particles = dynamic(() => import('@tsparticles/react'), {
  ssr: false,
})

type ParticlesBackgroundProps = {
  season: Season
}

export function ParticlesBackground({ season }: ParticlesBackgroundProps) {
  const config = SEASON_CONFIGS[season].particles
  const [init, setInit] = useState(false)

  useEffect(() => {
    const initParticles = async () => {
      const { loadFull } = await import('tsparticles')
      await loadFull(window.tsParticles)
      setInit(true)
    }
    initParticles()
  }, [])

  if (!init) return null

  return (
    <Particles
      key={season}
      id="tsparticles"
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        particles: {
          number: {
            value: config.count,
          },
          color: {
            value: config.colors,
          },
          size: {
            value: config.size,
          },
          move: {
            ...config.move,
            enable: true,
            speed: config.speed,
          },
          opacity: {
            value: 0.5,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: false,
            },
          },
        },
        background: {
          color: '#000000',
        },
      }}
    />
  )
}
