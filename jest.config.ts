import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['lcov'],
  roots: ['<rootDir>/__tests__/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/examples'],
};

export default jestConfig;
