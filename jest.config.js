import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config = {
  clearMocks: true,
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  collectCoverage: true,
  collectCoverageFrom: ['src/components/**/*.tsx', 'src/lib/utils/date.ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
    '/__tests__/',
    '/test-utils/',
    '\.test\.',
    '\.spec\.',
    '\.d\.ts$',
    '/types/',
    '/constants/',
    '/api/',
    '/app/',
    'page\.tsx$',
    'layout\.tsx$',
    'index\.tsx$',
    'index\.ts$',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}

export default createJestConfig(config)
