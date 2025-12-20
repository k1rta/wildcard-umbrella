module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Subject must start with capital letter
    'subject-case': [2, 'always', 'sentence-case'],

    // Ensure subject is not empty
    'subject-empty': [2, 'never'],

    // Type must be lowercase
    'type-case': [2, 'always', 'lower-case'],

    // Valid types
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'ci', 'revert'],
    ],
  },
}
