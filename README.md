# Personal Portfolio

A modern, responsive portfolio website with seasonal themes and smooth animations.

## Features

### Core Features

- 🎨 Seasonal theming (changes automatically based on current season)
- ✨ Smooth animations and transitions
- 📱 Fully responsive design
- 🎯 Modern, clean UI with icon-based navigation
- 🔄 Dynamic content with rotating taglines

### Technical Features

- 🏗️ Modern Next.js 14 with App Router
- 🎭 Framer Motion animations
- 🌈 Dynamic seasonal particle effects
- 📐 Type-safe seasonal configurations
- 🔍 ESLint + Prettier code quality
- 🚀 GitHub Actions CI/CD pipeline

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Lucide Icons

## Architecture

### Project Structure

```text
.github/            # GitHub configuration
├── workflows/      # CI/CD workflows
├── CODEOWNERS      # Code ownership rules
└── pull_request_template.md

.husky/            # Git hooks
├── commit-msg     # Commit message validation
└── pre-commit     # Pre-commit checks

src/              # Source code
├── app/          # Next.js app
├── components/   # React components
│   ├── season/   # Season feature
│   └── ui/       # UI components
└── lib/         # Core utilities
    ├── constants/ # App constants
    ├── test/     # Test utilities
    ├── types/    # TypeScript types
    └── utils/    # Utility functions

Config Files
├── .gitattributes  # Git file handling
├── .gitignore      # Git ignore rules
├── .gitmessage     # Commit template
├── jest.config.mjs # Jest configuration
├── next.config.js  # Next.js configuration
└── tsconfig.json  # TypeScript configuration
```

### Constants and Types

The application is organized around the seasonal theme feature:

**Constants:**

- `seasons.ts`: Season-specific configurations (particles, colors, themes)
- `content.ts`: Static content (title, taglines) and routes

**Types:**

- `season.ts`: Type definitions for seasonal features
  - `Season`: Union type of available seasons
  - `ParticleConfig`: Particle animation settings
  - `SeasonTheme`: Theme colors and styles

```typescript
// Content (titles, taglines, etc.)
CONTENT.TITLE
CONTENT.TAGLINES
CONTENT.FOOTER.COPYRIGHT

// Routes (internal and external links)
ROUTES.INTERNAL.RESUME
ROUTES.EXTERNAL.LINKEDIN
```

### Component Structure

```text
src/
└── components/
    ├── ui/              # UI components
    │   ├── footer.tsx     # Footer with seasonal colors
    │   ├── text.tsx       # Animated text with seasonal colors
    │   ├── title.tsx      # Page titles with animations
    │   └── nav/           # Navigation
    │       ├── icons.tsx      # Icon exports
    │       ├── icon-link.tsx  # Single icon
    │       └── icon-grid.tsx  # Icon grid
    └── season/          # Season feature
        ├── provider.tsx   # Season context
        └── particles.tsx  # Particle background
└── lib/
    ├── config/          # Configuration
    │   └── seasons.ts    # Season themes
    ├── types/           # TypeScript types
    │   └── season.ts     # Season-related types
    └── utils/           # Utilities
        ├── date.ts       # Date functions
        └── index.ts      # Utils exports
```

## Components

### Overview

The project follows a component-based architecture with three main categories:

1. **UI Components**: Reusable visual elements
2. **Layout Components**: Page structure components
3. **Feature Components**: Business logic components

### Component Details

#### UI Components

- `footer.tsx`: Footer with seasonal colors
- `text.tsx`: Animated text with seasonal colors
- `title.tsx`: Page titles with animations
- `nav/`: Navigation components
  - `icons.tsx`: Icon exports from Lucide
  - `icon-link.tsx`: Single icon with hover effects
  - `icon-grid.tsx`: Responsive icon grid

#### Season Feature

- `provider.tsx`: Manages seasonal context
- `particles.tsx`: Seasonal particle background

## Development

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later
- Git

### Local Development

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start development server

   ```bash
   npm run dev
   ```

4. Open browser

   ```bash
   open http://localhost:3000
   ```

## Usage

```tsx
// pages/any-page.tsx
export default function AnyPage() {
  return (
    <PageLayout>
      <HeroSection title="Page Title" taglines={['Tagline 1', 'Tagline 2']} />
      <IconGrid />
    </PageLayout>
  )
}
```

## Performance Optimizations

### Build Pipeline

#### Optimizations

- Optimized bundle size with tree-shaking
- Component-level code splitting
- Image optimization with next/image
- Font optimization with next/font

#### Runtime Features

- React Server Components where possible
- Minimal client-side JavaScript
- Efficient seasonal transitions
- Optimized particle rendering

#### Developer Experience

- Fast Refresh enabled
- TypeScript incremental builds
- Efficient module resolution
- Minimal dev dependencies

## Code Quality

This project uses:

- **ESLint**: Static code analysis
  - Configured for Next.js
  - TypeScript support
  - Import sorting

- **Prettier**: Code formatting
  - Consistent style
  - Automatic fixing
  - IDE integration

- **Husky**: Git hooks
  - Pre-commit linting
  - Type checking
  - Code formatting

- **lint-staged**: Staged files
  - Only lint changed files
  - Faster commits
  - Automatic fixing

### Git Setup

#### Initial Setup

```bash
# Configure Git
git config --global core.autocrlf input
git config --global commit.template .gitmessage

# Install hooks
npm run prepare
```

#### Commit Conventions

Commits follow the Conventional Commits format:

```text
<type>(<scope>): <subject>

<body>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style
- `refactor`: Code changes
- `test`: Add/update tests
- `chore`: Build, deps

**Examples:**

```bash
feat(nav): add responsive mobile menu
fix(auth): handle expired tokens
test(provider): add season context tests
```

#### Git Workflow

1. **Development Flow**

   ```bash
   # Create feature branch
   git checkout -b feature/name

   # Make changes and commit
   git add .
   git commit -m "feat: Add new feature"

   # Push and create PR
   git push -u origin feature/name
   ```

2. **Quality Gates**

   Every commit is checked for:
   - Code style (Prettier)
   - Linting (ESLint)
   - Types (TypeScript)
   - Tests (Jest)

   Every PR requires:
   - Clean build
   - All tests passing
   - No merge conflicts
   - Conventional commit message

3. **Branch Rules**

   ```yaml
   Protected branches:
     - main (production)

   Branch naming:
     - feature/* (new features)
     - fix/* (bug fixes)
     - docs/* (documentation)
     - chore/* (maintenance)
   ```

4. **Commit Format**

   ```bash
   # Format
   type(scope): Subject

   # Examples
   feat(auth): Add login page
   fix(nav): Fix mobile menu
   test(api): Add user tests
   ```

5. **CI/CD Pipeline**

   ```yaml
   Pull Request:
   1. Type check
   2. Lint & Format
   3. Unit tests
   4. Build check

   Main branch:
   1. All PR checks
   2. Coverage report
   3. Auto deployment
   ```

#### File Handling

- Line endings normalized (LF)
- Text files auto-detected
- Binary files tracked properly
- Sensitive files ignored:
  - `.env*`
  - `node_modules`
  - Build outputs
  - Coverage reports
  - IDE files

## Continuous Integration

This project is set up for CI/CD with:

- GitHub Actions for CI
- Vercel for deployment
- Automated linting on PRs
- Type checking in CI pipeline

### Quality Assurance

**Local Development:**

- Pre-commit hooks prevent direct commits to main
- Lint-staged runs ESLint, Prettier, and Jest on changed files
- Type checking ensures type safety
- Tests run on related files with coverage reporting

**Continuous Integration:**

1. Type checking (`tsc --noEmit`)
2. Next.js ESLint with custom rules
3. Format check (Prettier)
4. Jest tests with coverage thresholds:
   - 80% statements
   - 80% branches
   - 80% functions
   - 80% lines
5. Next.js production build

**Pull Request Checks:**

- ✓ All tests must pass
- ✓ Coverage must meet thresholds
- ✓ No ESLint/Prettier issues
- ✓ Build must succeed
- ✓ Valid commit messages required

## License

MIT
