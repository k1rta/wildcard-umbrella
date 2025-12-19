module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation
        'style', // Code style (formatting)
        'refactor', // Code refactoring
        'perf', // Performance improvement
        'test', // Tests
        'chore', // Build/tooling
        'ci', // CI/CD changes
        'revert', // Revert commit
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'always', 'sentence-case'], // ✅ "Test format" (capital first letter)
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'], // No period at end
    'header-max-length': [2, 'always', 100], // ✅ Increased from 72
    'body-max-line-length': [2, 'always', 100],
  },
}
