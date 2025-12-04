# Marketing & Data Professional Portfolio

[![CI](https://github.com/k1rta/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/k1rta/portfolio/actions/workflows/ci.yml)
[![Coverage Status](https://img.shields.io/badge/coverage-52%25-yellow.svg)](https://github.com/k1rta/portfolio/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black.svg)](https://nextjs.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A modern, responsive portfolio website showcasing data-driven marketing solutions and analytics expertise.

## Features

### Core Features

- 📊 Data-Driven Marketing Solutions
- 📈 Analytics & Campaign Management
- 🎯 Performance Marketing Expertise
- 📱 Fully responsive design
- 🔄 Dynamic content with rotating taglines

### Technical Features

- 🏗️ Modern Next.js 14 with App Router
- 🎭 Framer Motion animations
- 🌈 Dynamic seasonal particle effects
- 📐 Type-safe seasonal configurations
- 🔍 ESLint + Prettier code quality
- 🚀 GitHub Actions CI/CD pipeline

## Tech Stack

- Next.js 14.1.0
- TypeScript 5
- Tailwind CSS
- Lucide Icons
- tsParticles
- Framer Motion
- Geist Font

## Architecture

### Project Structure

```text
.github/            # GitHub configuration
├── workflows/      # CI/CD workflows
└── pull_request_template.md

.husky/            # Git hooks
├── commit-msg     # Commit message validation
└── pre-commit     # Pre-commit checks

src/              # Source code
├── app/          # Next.js app (routes)
│   ├── (home)/        # Home page (/)
│   ├── resume/        # Resume page (/resume)
│   ├── marketing-analytics/
│   ├── marketing-campaigns/
│   ├── performance-metrics/
│   └── company-info/
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
  - `icon-link.tsx`: Accessible icon link component with:
    - External link detection and security
    - ARIA labels for accessibility
    - TypeScript type safety
    - Configurable target behavior
    - Framer Motion hover effects
  - `icon-grid.tsx`: Responsive icon grid

#### Season Feature

- `provider.tsx`: Manages seasonal context
- `particles.tsx`: Seasonal particle background

## Development

## Development Environment

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later
- Git
- VS Code (recommended)

### VS Code Setup

1. Install recommended extensions:
   - ESLint
   - Prettier
   - TypeScript + JavaScript
   - Tailwind CSS IntelliSense

2. Enable settings:

   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     }
   }
   ```

### Environment Variables

1. Copy the example env file:

   ```bash
   cp .env.example .env.local
   ```

2. Update variables as needed:

   ```bash
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

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
// Example usage of IconLink component
import { IconLink } from '@/components/ui/nav/icon-link'
import { GithubIcon } from 'lucide-react'

export default function Navigation() {
  return (
    <IconLink
      href="https://github.com/username"
      icon={<GithubIcon />}
      label="View GitHub Profile"
      className="custom-styles"
      target="_blank"
    />
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

## Testing & Code Quality

### Test Coverage

The project maintains comprehensive test coverage for critical features:

```text
Test Coverage Summary
-------------------
Components/Season: 99.09% (92.3% branches)
- particles.tsx:  100% coverage
- provider.tsx:   97.43% coverage

Components/UI
- title.tsx:      100% coverage

Lib/Utils
- date.ts:        100% coverage (80% branches)
```

Key test suites:

- **Season Feature Tests**:
  - `particles.test.tsx`: Particle effects and animations
  - `provider.test.tsx`: Season context and theme management
- **UI Component Tests**:
  - `title.test.tsx`: Title component with seasonal themes
- **Utility Tests**:
  - `date.test.ts`: Season detection logic

### Test Configuration

#### Test IDs for E2E Testing

All test IDs are centralized in `src/lib/constants/test-ids.ts` for consistent testing:

```typescript
TEST_IDS = {
  page: {
    layout: 'page-layout', // Main page layout wrapper
    home: 'page-home', // Home page content
    resume: 'page-resume', // Resume page content
    analytics: 'page-analytics', // Analytics page content
    campaigns: 'page-campaigns', // Campaigns page content
    metrics: 'page-metrics', // Metrics page content
    company: 'page-company', // Company page content
    hero: 'page-hero-section', // Hero section on home page
  },
  ui: {
    title: 'ui-title-heading', // Page titles
    text: 'ui-text-paragraph', // Text components
    footer: 'ui-footer-container', // Footer component
    iconGrid: 'ui-icon-grid', // Navigation grid
  },
}
```

E2E Testing Examples:

```typescript
// Navigation
cy.getByTestId('ui-icon-grid').within(() => {
  cy.contains('Resume').click()
})
cy.getByTestId('page-resume').should('be.visible')

// Content
cy.getByTestId('page-hero-section').within(() => {
  cy.getByTestId('ui-title-heading').should('contain', 'Marketing')
})
```

#### Jest Configuration

- **Jest + React Testing Library**
  - JSDOM test environment
  - Coverage reporting enabled
  - Excludes stories, types, and layouts
  - Module path aliases support
  - Standardized data-testid attributes
  - Custom test utilities with SeasonProvider wrapper

## Troubleshooting

### Common Issues

#### Build Errors

1. **Module not found errors**

   ```bash
   Error: Cannot find module '@/components/...'
   ```

   - Check tsconfig.json paths
   - Run `npm install` to rebuild module links

2. **Type errors**

   ```typescript
   Type ... is not assignable to type ...
   ```

   - Run `npm run type-check` for details
   - Check recent type changes

#### Test Issues

1. **Act warnings**

   ```bash
   Warning: An update to Component inside a test was not wrapped in act(...)
   ```

   - Add `await` to async actions
   - Wrap state updates in `act`

2. **Snapshot failures**

   ```bash
   Snapshot ... does not match
   ```

   - Review changes in `git diff`
   - Update if intended: `npm run test:update`

### Development Tips

1. **Fast Refresh not working**
   - Check for syntax errors
   - Ensure component name is capitalized
   - Verify export is not anonymous

2. **Seasonal theme issues**
   - Clear localStorage
   - Check date utils mock in tests
   - Verify SeasonProvider wrapper

### Code Quality Tools

- **ESLint**: Static code analysis
  - Next.js configuration
  - TypeScript support

- **Prettier**: Code formatting
  - Auto-formatting on commit
  - IDE integration

- **Husky + lint-staged**:
  - Pre-commit checks
  - Type checking
  - Run tests on changed files

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
4. Jest tests with coverage reporting:
   - Coverage collection enabled
   - Coverage thresholds configured but temporarily disabled
   - Excludes stories, types, and app layouts
5. Next.js production build

**Pull Request Checks:**

- ✓ All tests must pass
- ✓ Coverage must meet thresholds
- ✓ No ESLint/Prettier issues
- ✓ Build must succeed
- ✓ Valid commit messages required

## License

MIT
