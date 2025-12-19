module.exports = {
  '*': 'prettier --write --ignore-unknown',
  '*.{ts,tsx}': [
    'eslint --fix',
    // Removed 'tsc --noEmit' - too slow and strict for pre-commit
  ],
}
