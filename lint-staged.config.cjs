module.exports = {
  '*': 'prettier --write --ignore-unknown',
  '*.{ts,tsx}': [
    'eslint --fix',
    () => 'tsc --noEmit --incremental --pretty false', // Faster type checking
  ],
}
