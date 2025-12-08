import '@testing-library/jest-dom'
import React from 'react'

// Suppress act() warnings in tests (they don't affect functionality)
const originalError = console.error
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('was not wrapped in act')) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

// Mock framer-motion
jest.mock('framer-motion', () => {
  const mockComponent = (type: string) => {
    return ({
      children,
      _variants,
      _initial,
      _whileHover,
      _animate,
      ...props
    }: {
      children?: React.ReactNode
      _variants?: unknown
      _initial?: unknown
      _whileHover?: unknown
      _animate?: unknown
      [key: string]: unknown
    }) => React.createElement(type, props, children)
  }

  return {
    ...jest.requireActual('framer-motion'),
    motion: {
      div: mockComponent('div'),
      section: mockComponent('section'),
      footer: mockComponent('footer'),
      h1: mockComponent('h1'),
      p: mockComponent('p'),
      span: mockComponent('span'),
      a: mockComponent('a'),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  }
})

// Mock @tsparticles/react with initialization delay
jest.mock('@tsparticles/react', () => {
  const MockParticles = ({ id, options }: { id: string; options?: { season?: string } }) =>
    React.createElement('div', {
      'data-testid': 'particles-background-container',
      'data-id': id,
      'data-season': options?.season,
    })
  return {
    __esModule: true,
    default: MockParticles,
  }
})

// Mock next/dynamic to return components synchronously
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (_importFunc: () => Promise<unknown>) => {
    // Return the actual mocked component
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require('@tsparticles/react')
    return mod.default
  },
}))

// Mock tsparticles
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
