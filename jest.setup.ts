import '@testing-library/jest-dom'
import React from 'react'

// Mock framer-motion to zero out animation durations
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: new Proxy(
    {},
    {
      get: (_, prop) => {
        // Return a component that renders the same HTML element as the prop name
        return ({ children, ...props }: any) =>
          React.createElement(
            prop as string,
            {
              ...props,
              'data-testid': props['data-testid'] || `motion-${String(prop)}`,
            },
            children
          )
      },
    }
  ),
  AnimatePresence: ({ children }: any) => children,
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
  }),
  useInView: () => [jest.fn(), { ref: jest.fn() }],
  useScroll: () => ({
    scrollY: { get: () => 0, onChange: jest.fn() },
    scrollYProgress: { get: () => 0, onChange: jest.fn() },
  }),
  useSpring: () => 0,
  useTransform: () => 0,
}))

// Mock Next.js dynamic imports
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (...args: any[]) => {
    const dynamicModule = jest.requireActual('next/dynamic')
    const dynamicActualComp = dynamicModule.default
    const RequiredComponent = dynamicActualComp(args[0])
    RequiredComponent.preload ? RequiredComponent.preload() : RequiredComponent.render.preload()
    return RequiredComponent
  },
}))

// Mock ParticlesBackground component
jest.mock('@/components/season/particles', () => ({
  ParticlesBackground: ({ children }: any) =>
    React.createElement('div', { 'data-testid': 'particles-bg' }, children),
}))

// Mock tsparticles
jest.mock('@tsparticles/react', () => ({
  __esModule: true,
  default: ({ children }: any) =>
    React.createElement('div', { 'data-testid': 'particles' }, children),
}))

jest.mock('tsparticles', () => ({
  loadFull: jest.fn().mockResolvedValue(undefined),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
