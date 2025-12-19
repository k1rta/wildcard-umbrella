module.exports = {
  // Format all files
  '*': 'prettier --write --ignore-unknown',

  // Lint and type-check TypeScript files
  '*.{ts,tsx}': [
    'eslint --fix',
    'tsc --noEmit', // Run type check on all files
  ],
}
