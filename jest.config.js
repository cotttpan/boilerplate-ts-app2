module.exports = {
  notify: true,
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
}
