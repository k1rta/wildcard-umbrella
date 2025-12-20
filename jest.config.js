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

  collectCoverageFrom: [
    'src/components/ui/**/*.{ts,tsx}',
    'src/components/shared/**/*.{ts,tsx}',
    'src/components/season/**/*.{ts,tsx}',
    'src/lib/utils/**/*.{ts,tsx}',
    'src/lib/api/**/*.{ts,tsx}',
    '!**/ index.{ts,tsx}',
  ],

  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
    '/test-utils/',
    '\\.test\\.',
    '\\.spec\\.',
    '\\.d\\.ts$',
    '/types/',
    '/constants/',
    '/styles/',
    '/app/',
    '/src/app/',
    '/components/company/',
    '/components/marketing/',
    '/components/performance/',
    '/components/resume/',
    '/resume-view/',
    '/metrics-view/',
    '/campaigns-view/',
    '/company-view/',
    'middleware\\.ts$',
    'particles\\.tsx$',
    'coming-soon\\.tsx$',
    'index\\.tsx?$',
  ],

  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  maxWorkers: '50%',
}

export default createJestConfig(config)
