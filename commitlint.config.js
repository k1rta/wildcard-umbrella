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
        'style', // Code style
        'refactor', // Code refactoring
        'chore', // Build, deps, etc
      ],
    ],
    'scope-case': [2, 'always', 'kebab-case'],
    'subject-case': [2, 'always', 'sentence-case'],
    'type-case': [2, 'always', 'lower-case'],
    'body-max-line-length': [2, 'always', 72],
  },
}
