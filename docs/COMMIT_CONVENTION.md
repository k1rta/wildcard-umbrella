# Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.

## Format

```bash
<type>: <description>

[optional body]

[optional footer(s)]
```

## Examples

### ✅ Good Examples

```bash
feat: Add user authentication
fix: Resolve memory leak in particles component
docs: Update README with setup instructions
style: Format code with Prettier
refactor: Extract reusable test utilities
test: Add unit tests for error boundary
chore: Update dependencies
ci: Add coverage reporting to GitHub Actions
```

### ❌ Bad Examples

```bash
feat Add user auth        # Missing colon
Feat: Add user auth      # Type should be lowercase
feat: add user auth.     # No period at end
FEAT: Add user auth      # Type should be lowercase
random: Add stuff        # Invalid type
```

## Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Code style (formatting, missing semi colons, etc)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding missing tests or correcting existing tests
- `chore`: Build process, dependencies, tooling
- `ci`: CI configuration files and scripts
- `revert`: Revert previous commit

## Rules

1. Type must be lowercase
2. Type must be one of the allowed types above
3. Description must not be empty
4. No period at the end of the description
5. Maximum header length (type + description) is 72 characters
6. Maximum body line length is 100 characters

## Tools

This convention is enforced by:

- Commitlint in pre-commit hook
- PR title validation in GitHub Actions
- Semantic PR title check in GitHub Actions
