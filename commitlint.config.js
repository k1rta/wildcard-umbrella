module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation only changes
        'style', // Code style (formatting, missing semi colons, etc)
        'refactor', // Code change that neither fixes a bug nor adds a feature
        'perf', // Performance improvement
        'test', // Adding missing tests or correcting existing tests
        'chore', // Build process, dependencies, tooling
        'ci', // CI configuration files and scripts
        'revert', // Revert previous commit
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'subject-case': [0], // Allow any case
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100],
  },
}
