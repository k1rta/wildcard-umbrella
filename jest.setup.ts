import '@testing-library/jest-dom'
import React from 'react'

// Suppress act() warnings in tests (they don't affect functionality)
const originalError = console.error
beforeAll(() => {
  console.error = (...args: any[]) => {
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
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    div: ({ children, ...props }: any) => React.createElement('div', props, children),
    section: ({ children, ...props }: any) => React.createElement('section', props, children),
    footer: ({ children, ...props }: any) => React.createElement('footer', props, children),
    h1: ({ children, ...props }: any) => React.createElement('h1', props, children),
    p: ({ children, ...props }: any) => React.createElement('p', props, children),
    a: ({ children, ...props }: any) => React.createElement('a', props, children),
  },
  AnimatePresence: ({ children }: any) => children,
}))

// Mock @tsparticles/react with initialization delay
jest.mock('@tsparticles/react', () => {
  const MockParticles = ({ id, options }: any) =>
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
  default: (importFunc: any) => {
    // Return the actual mocked component
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
