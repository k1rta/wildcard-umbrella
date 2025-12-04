# 🌟 Next.js Seasonal Portfolio

[![CI Status](https://github.com/k1rta/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/k1rta/portfolio/actions/workflows/ci.yml)
[![Test Coverage](https://img.shields.io/badge/coverage-99.77%25-brightgreen.svg)](https://github.com/k1rta/portfolio/actions)
[![Tests](https://img.shields.io/badge/tests-128%20passed-brightgreen.svg)](https://github.com/k1rta/portfolio/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black.svg)](https://nextjs.org/)
[![WCAG 2.1](https://img.shields.io/badge/WCAG-2.1%20AA-success.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Fork-Friendly](https://img.shields.io/badge/🍴_Fork--Friendly-Welcome!-success.svg)](https://github.com/k1rta/portfolio/fork)

A production-grade Next.js 14 portfolio with dynamic seasonal theming and exceptional test coverage (99.77%).
Built for both professional showcasing and learning modern React best practices.

> 🎯 **Perfect for:** Developers looking to learn Next.js 14, TypeScript, and testing best practices through a
> real-world, production-ready project.

## 📚 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [🏆 Code Quality](#-code-quality)
- [📚 Learning Curve](#-learning-curve)
- [🎨 Customization Guide](#-customization-guide)
- [🏗️ Project Structure](#️-project-structure)
- [✅ Testing Guide](#-testing-guide)
- [📝 Component Architecture](#-component-architecture)
- [💻 Development](#-development)
- [🚀 Deployment](#-deployment)
- [🆘 Troubleshooting & FAQ](#-troubleshooting--faq)
- [📖 Resources & Learning](#-resources--learning)

## 🏆 Code Quality Metrics

```text
Test Coverage Summary (A+ Grade - Top 1%)
----------------------------------------
Overall Coverage:  99.77% (451/452 statements)
Branch Coverage:   95.00% (38/40 branches)
Function Coverage: 100.0% (11/11 functions)

Test Execution:
- 128 tests PASSED
- 12 test suites
- 4.122s execution time
```

| Component Category    | Statements | Branches | Functions | Lines |
| --------------------- | ---------- | -------- | --------- | ----- |
| **components/season** | 100%       | 95%      | 100%      | 100%  |
| **components/ui**     | 100%       | 100%     | 100%      | 100%  |
| **lib/utils**         | 100%       | 95%      | 100%      | 100%  |

## 📚 Learning Curve

> 💡 This section guides you through understanding and customizing the project, from basics to advanced features.

### Prerequisites

**What you need to know:**

- Basic React (components, hooks, props)
- TypeScript fundamentals (types, interfaces)
- Git basics (clone, commit, push)

**What you'll learn:**

- Next.js 14 App Router patterns
- Context API with TypeScript
- Test-Driven Development (TDD)
- Professional project structure
- Accessibility best practices

### Understanding the Architecture

<details>
<summary>Step 1: Seasonal Theming System 🌈</summary>

```typescript
// src/lib/constants/seasons.ts
export const SEASON_CONFIGS = {
  spring: {
    theme: {
      primary: '#10b981', // 👈 Change this to your brand color
      secondary: '#34d399', // 👈 And this one
      background: '#f0fdf4',
      text: '#052e16',
    },
    particles: {
      color: '#22c55e',
      count: 15,
      // ... more config
    },
  },
  // ... other seasons
}
```

The seasonal system uses:

1. TypeScript for type safety
2. Context API for global state
3. CSS-in-JS with Tailwind

**Try it:** Change spring colors to match your brand!

</details>

<details>
<summary>Step 2: Component Architecture 🏗️</summary>

```typescript
// src/components/season/provider.tsx
export function SeasonProvider({ children }: SeasonProviderProps) {
  const currentSeason = getCurrentSeason()
  return (
    <SeasonContext.Provider value={{ season: currentSeason }}>
      <ParticlesBackground season={currentSeason} />
      {children}
    </SeasonContext.Provider>
  )
}

// How components use it:
// src/components/ui/title.tsx

export function Title({ children }: TitleProps) {
  const { season } = useSeasonContext()
  const theme = SEASON_CONFIGS[season].theme

  return (
    <motion.h1
      className={`text-4xl font-bold text-${theme.primary}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </motion.h1>
  )
}
```

</details>

### Common Customization Tasks

<details>
<summary>Task 1: Change Theme Colors ⭐ Easy</summary>

1. Open `src/lib/constants/seasons.ts`
2. Find your season's theme config
3. Update colors:
   ```typescript
   spring: {
     theme: {
       primary: '#3b82f6',   // Changed to blue
       secondary: '#60a5fa', // Lighter blue
       // ...
     }
   }
   ```
4. Run tests: `npm test`
5. View changes: `npm run dev`
</details>

<details>
<summary>Task 2: Add a New Page ⭐⭐ Medium</summary>

1. Create new folder:

   ```bash
   mkdir src/app/about
   touch src/app/about/page.tsx
   ```

2. Add page content:

   ```typescript
   // src/app/about/page.tsx
   import { Title } from '@/components/ui/title'
   import { Text } from '@/components/ui/text'

   export default function AboutPage() {
     return (
       <main className="container mx-auto px-4 py-8">
         <Title>About Me</Title>
         <Text>Your content here...</Text>
       </main>
     )
   }
   ```

3. Add navigation:

   ```typescript
   // src/components/ui/nav/icon-grid.tsx
   import { UserIcon } from 'lucide-react'

   export const NAV_ITEMS = [
     // ... existing items
     {
       href: '/about',
       icon: <UserIcon />,
       label: 'About'
     }
   ]
   ```

   </details>

### Testing Your Changes

> 💡 **Tip:** Run `npm test -- --watch` to automatically re-run tests as you make changes.

Example: "I changed the footer text, now tests fail"

```typescript
// src/components/ui/__tests__/footer.test.tsx
it('should render copyright text', () => {
  render(<Footer />)
  // Update this line:
  expect(screen.getByText(/your new text/i)).toBeInTheDocument()
})
```

## 🎨 Customization Guide

> 💡 Quick reference for common customization tasks

| What to Customize | Files to Edit   | Difficulty  | Test Impact  |
| ----------------- | --------------- | ----------- | ------------ |
| Theme colors      | `seasons.ts`    | ⭐ Easy     | Update tests |
| Footer text       | `footer.tsx`    | ⭐ Easy     | Update tests |
| Navigation        | `icon-grid.tsx` | ⭐ Easy     | Update tests |
| Add new page      | `app/page.tsx`  | ⭐⭐ Medium | Optional     |
| Particle effects  | `seasons.ts`    | ⭐⭐ Medium | No           |
| Add new season    | Multiple files  | ⭐⭐⭐ Hard | Required     |

### 💪 Advanced Customizations

### Adding a New Season

1. Add type in `types/season.ts`:

```typescript
export type Season = 'spring' | 'summer' | 'autumn' | 'winter' | 'monsoon'
```

1. Add config in `constants/seasons.ts`:

```typescript
export const SEASON_CONFIGS = {
  // ... existing seasons
  monsoon: {
    theme: {
      primary: '#1e40af',
      secondary: '#3b82f6',
    },
    particles: {
      color: '#60a5fa',
      count: 30,
      speed: 2,
    },
  },
}
```

1. Update date logic in `utils/date.ts`:

```typescript
export function getCurrentSeason(): Season {
  const month = new Date().getMonth()
  if (month >= 6 && month <= 8) return 'monsoon'
  // ... existing logic
}
```

1. Add tests in `__tests__/date.test.ts`:

```typescript
it('should return monsoon for July', () => {
  jest.setSystemTime(new Date('2025-07-15'))
  expect(getCurrentSeason()).toBe('monsoon')
})
```

</details>

## 🆘 Troubleshooting & FAQ

### Common Issues

#### Tests Failing After Content Changes

Update the test expectations:

```typescript
// Before: expect(screen.getByText('Old Text'))
// After:  expect(screen.getByText('Your New Text'))
```

#### TypeScript Errors with New Season

Ensure you:

1. Updated `Season` type in `types/season.ts`
2. Added all required theme properties
3. Ran `npm run type-check`

#### Changes Not Showing in Dev Server

Try these steps:

1. Clear Next.js cache: `rm -rf .next`
2. Restart dev server: `npm run dev`
3. Hard refresh browser: `Cmd/Ctrl + Shift + R`

### Best Practices

1. 📝 Always update tests with content changes
2. 🔄 Run type-check before committing: `npm run type-check`
3. 🧩 Use provided components (Title, Text, etc.)
4. 🎨 Follow existing patterns for consistency
5. ✅ Keep test coverage high (aim for >95%)

## 📖 Resources & Learning Materials

### Official Documentation

- [Next.js 14 Docs](https://nextjs.org/docs)
- [React Testing Library](https://testing-library.com/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Project-Specific Resources

- [tsParticles Configuration](https://particles.js.org)
- [Framer Motion Examples](https://www.framer.com/motion/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Learning Path

1. Start with basic customizations (colors, text)
2. Move to component modifications
3. Try adding new pages
4. Experiment with seasonal themes
5. Deep dive into testing

> 💡 **Tip:** Use `git checkout -b feature/my-changes` before experimenting!

### Technical Features

- 🏗️ Modern Next.js 14 with App Router and TypeScript 5
- ✅ 99.77% test coverage (451/452 statements)
- 🧪 128 passing tests across 12 test suites
- 🎭 Framer Motion animations with tsParticles
- 🌈 Dynamic seasonal theming with context API
- 📐 Type-safe components with strict TypeScript
- 🔍 ESLint + Prettier + Husky quality gates
- 🚀 GitHub Actions CI/CD with auto-merge

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

## 📝 Component Architecture

### Overview

The project follows a modern React architecture with three component categories:

1. **UI Components**: Reusable, tested visual elements
2. **Feature Components**: Business logic with context providers
3. **Layout Components**: Page structure and responsive design

### Key Component Examples

#### 1. Season Provider Pattern

```typescript
// src/components/season/provider.tsx
export const SeasonContext = createContext<SeasonContextType | null>(null)

export function SeasonProvider({ children }: SeasonProviderProps) {
  const currentSeason = getCurrentSeason()
  const season: Season = SEASONS.includes(currentSeason as Season)
    ? (currentSeason as Season)
    : 'spring'

  return (
    <SeasonContext.Provider value={{ season }}>
      <ParticlesBackground season={season} />
      {children}
    </SeasonContext.Provider>
  )
}
```

#### 2. Accessible Icon Link Component

```typescript
// src/components/ui/nav/icon-link.tsx
export const IconLink = memo(({ href, icon, label, className = '' }: IconLinkProps) => {
  const isExternal = href.startsWith('http')
  return (
    <motion.a
      href={href}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-label={label}
      className={`flex items-center gap-1.5 ${className}`}
      variants={iconVariants}
      whileHover="hover"
    >
      {icon}
      <span className="text-sm">{label}</span>
    </motion.a>
  )
})
```

#### 3. Test-Driven Development Example

```typescript
// src/components/ui/nav/__tests__/icon-link.test.tsx
describe('IconLink', () => {
  it('should handle external links securely', () => {
    render(
      <IconLink
        href="https://example.com"
        icon={<Icon />}
        label="External"
      />
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should be accessible', () => {
    render(<IconLink href="/" icon={<Icon />} label="Home" />)
    expect(screen.getByLabelText('Home')).toBeInTheDocument()
  })
})
```

### Component Best Practices

- ✅ Functional components with TypeScript
- ✅ React.memo for performance optimization
- ✅ Proper prop typing and validation
- ✅ ARIA attributes for accessibility
- ✅ Comprehensive test coverage
- ✅ Reusable motion variants
- ✅ CSS-in-JS with Tailwind
- ✅ Security best practices

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
Overall Coverage: 99.77% (451/452 statements)
Branch Coverage: 95% (38/40 branches)
Function Coverage: 100% (11/11 functions)
Test Suites: 12 passed
Tests: 128 passed
Time: 4.122s
```

Key test suites:

- **Season Feature Tests**:
  - `particles.test.tsx`: Particle effects and animations
  - `provider.test.tsx`: Season context and theme management
- **UI Component Tests**:
  - `title.test.tsx`: Title component with seasonal themes

```typescript
// Custom render with SeasonProvider
import { render, screen, TEST_IDS } from '@/lib/test/test-utils'

// Component test example
it('should render with seasonal theme', () => {
  render(<Title>Test</Title>)
  const title = screen.getByTestId(TEST_IDS.ui.title)
  expect(title).toHaveClass('from-fuchsia-400')
})

// Utility test example
it('should detect current season', () => {
  jest.setSystemTime(new Date('2025-03-21'))
  expect(getCurrentSeason()).toBe('spring')
})
```

#### Configuration

- **Jest Setup**
  - JSDOM environment
  - Coverage reporting
  - Module path aliases
  - Framer Motion mocking
  - Date/time utilities

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

## 📈 Project Stats

```text
Project Metrics
--------------
Test Coverage:    99.77%
Test Count:       128 tests
Test Suites:      12 suites
Execution Time:   4.122s
Build Time:       < 10s

Code Stats
----------
Components:       15+
Util Functions:   10+
Test Files:       12
Type Definitions: 8+
```

## 📗 Future Enhancements

- [ ] Dark mode support with theme persistence
- [ ] Internationalization (i18n) with next-intl
- [ ] Blog section with MDX support
- [ ] Headless CMS integration
- [ ] E2E tests with Playwright
- [ ] Performance monitoring with Web Vitals
- [ ] SEO optimization with next-seo
- [ ] Analytics dashboard integration
- [ ] PWA support with next-pwa
- [ ] Storybook documentation

## License

MIT

---

<p align="center">
  <a href="https://github.com/k1rta/portfolio">
    <img src="https://img.shields.io/badge/⭐️_If_you_found_this_helpful,_please_star!-ffffff.svg?style=for-the-badge&logo=github&logoColor=black" alt="Star this repo!" />
  </a>
</p>
