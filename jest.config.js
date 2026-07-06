/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: [
    'src/app/lib/**/*.ts',
    'src/app/data/**/*.ts',
    'src/app/components/**/*.{ts,tsx}',
    '!src/app/**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 70,
      statements: 70,
    },
  },
};
