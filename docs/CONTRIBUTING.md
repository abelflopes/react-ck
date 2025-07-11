# Contributing to React CK

Thank you for your interest in contributing to React CK! We're building a professional-grade component library used by thousands of developers worldwide. Your contributions help make React CK better for everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Release Process](#release-process)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Git
- Familiarity with React, TypeScript, and SCSS

### Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/react-ck.git
   cd react-ck
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Environment**
   ```bash
   npm run start
   ```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Your Changes

- Follow our [coding standards](#code-standards)
- Write tests for new functionality
- Update documentation as needed
- Ensure all tests pass

### 3. Commit Your Changes

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat(button): add loading state support"
git commit -m "fix(dialog): resolve accessibility issue with focus trap"
git commit -m "docs(readme): update installation instructions"
```

### 4. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

## Code Standards

### TypeScript
- Use strict TypeScript configuration
- Provide proper type definitions
- Avoid `any` types unless absolutely necessary
- Use interfaces for component props

### React Components
- Use functional components with hooks
- Implement proper prop validation
- Follow accessibility guidelines (ARIA attributes)
- Use React.memo for performance optimization when appropriate

### Styling
- Use SCSS for styling
- Follow BEM methodology
- Maintain consistent spacing and typography
- Ensure responsive design

### Performance
- Minimize bundle size impact
- Use lazy loading where appropriate
- Optimize re-renders
- Follow React best practices

## Testing Guidelines

### Unit Tests
```bash
npm run test:unit
```

### Snapshot Tests
```bash
npm run test:snapshot
npm run test:snapshot:update  # Update snapshots
```

### Coverage Requirements
- Minimum 80% code coverage
- 100% coverage for critical components
- Test edge cases and error scenarios

## Documentation

### Component Documentation
- Update Storybook stories for new components
- Include usage examples
- Document props and their types
- Provide accessibility notes

### API Documentation
- Keep TypeScript definitions up to date
- Document breaking changes
- Provide migration guides

## Release Process

### Pre-release Checklist
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped
- [ ] Bundle size checked

### Release Commands
```bash
npm run build          # Build all packages
npm run test           # Run all tests
npm run lint           # Lint all code
npm run audit          # Security audit
```

## Available Scripts

### Development
- `npm run start` - Start all applications in parallel
- `npm run start:apps` - Start only individual apps
- `npm run dev` - Development mode with hot reload

### Building
- `npm run build` - Build all packages
- `npm run build:infra` - Build infrastructure configuration
- `npm run build:docs` - Build documentation
- `npm run build:apps` - Build individual apps

### Testing
- `npm run test` - Run all tests sequentially
- `npm run test:unit` - Run unit tests in parallel
- `npm run test:snapshot` - Run snapshot tests
- `npm run test:snapshot:update` - Update snapshots

### Code Quality
- `npm run lint` - Run all linting
- `npm run lint:style` - Lint SCSS files
- `npm run lint:code` - Lint all code
- `npm run lint:code:fix` - Fix linting issues
- `npm run lint:typescript` - TypeScript linting
- `npm run format` - Check code formatting

### Maintenance
- `npm run clean` - Remove build artifacts
- `npm run clean:cache` - Remove cache files
- `npm run clean:deps` - Remove node_modules
- `npm run audit` - Security audit
- `npm run todo` - Scan for TODO comments

## Getting Help

- **Issues**: Use GitHub issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Discord**: Join our community Discord for real-time help

## Recognition

Contributors are recognized in our [CONTRIBUTORS.md](CONTRIBUTORS.md) file and on our website. Significant contributions may also be highlighted in release notes.

---

Thank you for contributing to React CK! Your work helps thousands of developers build better applications.

