# Build Automation and CI/CD

## Hugo Module Build Process

### Automated Build Pipeline
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint code
        run: npm run lint

      - name: Build module
        run: npm run build

      - name: Run tests
        run: npm run test:playwright

      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: test-results/
```

### Pre-build and Post-build Hooks
```json
// package.json
{
  "scripts": {
    "prestart": "npm run clean && npm run mod:vendor",
    "start": "hugo server -s exampleSite --bind=0.0.0.0 --disableFastRender --printI18nWarnings",
    "prebuild": "npm run clean && npm run mod:vendor",
    "build": "hugo --gc --minify -s exampleSite",
    "clean": "rimraf exampleSite/public exampleSite/resources",
    "mod:clean": "hugo mod clean",
    "mod:update": "rimraf _vendor && hugo mod get -u ./... && hugo mod get -u && npm run -s mod:vendor && npm run -s mod:tidy",
    "mod:tidy": "hugo mod tidy",
    "mod:vendor": "rimraf _vendor && hugo mod vendor"
  }
}
```

### Hugo Module Vendoring Strategy
```bash
# Automatic vendoring (recommended)
npm run start   # Auto-runs: clean → mod:vendor → server
npm run build   # Auto-runs: clean → mod:vendor → build

# Manual vendoring (only when needed)
hugo mod vendor
```

## Dependency Management

### Hugo Module Dependencies
```go
// go.mod
module github.com/d-oit/hinode-mod-slideshow-gallery

go 1.19

require (
    github.com/gethinode/mod-utils/v4 v4.18.0 // indirect
)
```

### Node.js Dependencies
```json
// package.json
{
  "dependencies": {
    "@playwright/test": "^1.56.1",
    "dotenv": "^17.2.3"
  },
  "devDependencies": {
    "@commitlint/cli": "^20.1.0",
    "@commitlint/config-conventional": "^20.0.0",
    "@semantic-release/changelog": "^6.0.3",
    "@semantic-release/exec": "^6.0.3",
    "@semantic-release/git": "^10.0.1",
    "@semantic-release/github": "^11.0.1",
    "@semantic-release/npm": "^12.0.1",
    "commitizen": "^4.3.1",
    "cpy-cli": "^6.0.0",
    "cz-conventional-changelog": "^3.3.0",
    "hugo-bin": "^0.149.1",
    "husky": "^9.1.7",
    "playwright": "^1.56.1",
    "rimraf": "^6.0.1",
    "semantic-release": "^24.2.3"
  }
}
```

### Dependency Update Automation
```bash
# Update all dependencies
npm run upgrade

# Update Hugo modules
npm run mod:update

# Check for outdated packages
npm outdated
hugo mod outdated
```

## Version Management

### Semantic Release Configuration
```json
// package.json
{
  "release": {
    "branches": "main",
    "plugins": [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      "@semantic-release/changelog",
      "@semantic-release/npm",
      [
        "@semantic-release/exec",
        {
          "prepare": "npm install"
        }
      ],
      [
        "@semantic-release/git",
        {
          "assets": [
            "CHANGELOG.md",
            "dist",
            "package.json",
            "package-lock.json"
          ],
          "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
        }
      ]
    ]
  }
}
```

### Conventional Commits
```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'
    ]],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 72]
  }
}
```

### Version Bumping Strategy
- **MAJOR**: Breaking changes (2.0.0)
- **MINOR**: New features (1.1.0)
- **PATCH**: Bug fixes (1.0.1)
- **Automated**: semantic-release handles versioning
- **Manual**: Only for hotfixes (not recommended)

## Quality Gates

### Pre-commit Quality Checks
```javascript
// .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

```json
// package.json
{
  "lint-staged": {
    "*.{js,ts}": ["eslint --fix", "prettier --write"],
    "*.{scss,css}": ["stylelint --fix", "prettier --write"],
    "*.{md,html}": ["markdownlint --fix", "prettier --write"],
    "*.go": ["gofmt -w", "go vet"]
  }
}
```

### Build Quality Validation
```yaml
# CI quality gates
- name: Lint code
  run: npm run lint

- name: Type check
  run: npm run type-check

- name: Build module
  run: npm run build

- name: Run tests
  run: npm run test:playwright

- name: Security audit
  run: npm audit --audit-level=high
```

## Deployment Strategy

### Module Publishing
```yaml
# GitHub Actions release workflow
name: Release
on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:playwright

      - name: Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: npx semantic-release
```

### Integration in Consumer Projects
```toml
# In consumer's config/_default/hugo.toml
[[module.imports]]
  path = "github.com/d-oit/hinode-mod-slideshow-gallery"
  disable = false

# Or with version pinning
[[module.imports]]
  path = "github.com/d-oit/hinode-mod-slideshow-gallery"
  version = "v2.1.0"
```

## Environment Management

### Development Environment
```bash
# Start development server
npm run start

# Features:
# - Auto-reload on file changes
# - Hugo module vendoring
# - Accessible from network (0.0.0.0)
# - I18n warnings enabled
```

### Production Build
```bash
# Production build
npm run build

# Features:
# - Garbage collection enabled
# - Minification applied
# - Optimized assets
# - Clean output directory
```

### Staging Environment
```yaml
# Deploy to staging
- name: Deploy to staging
  run: |
    npm run build
    rsync -avz exampleSite/public/ user@staging-server:/var/www/html/
```

## Monitoring and Observability

### Build Metrics
```yaml
# CI metrics collection
- name: Collect build metrics
  run: |
    echo "Build time: $((SECONDS))s" >> $GITHUB_STEP_SUMMARY
    echo "Test count: $(find test-results -name "*.json" | wc -l)" >> $GITHUB_STEP_SUMMARY
```

### Performance Monitoring
```javascript
// Performance budget
const performanceBudget = {
  budgets: [
    {
      path: "/",
      resourceSizes: [
        {
          resourceType: "total",
          budget: 500000
        }
      ],
      timings: [
        {
          metric: "interactive",
          budget: 5000
        }
      ]
    }
  ]
}
```

## Rollback Strategy

### Automated Rollback
```yaml
# Rollback on failure
- name: Rollback on failure
  if: failure()
  run: |
    git reset --hard HEAD~1
    git push --force-with-lease origin main
```

### Manual Rollback
```bash
# Manual rollback steps
git log --oneline -10  # Find good commit
git reset --hard <commit-hash>
git push --force-with-lease origin main
npm run build
npm run deploy
```

## Caching Strategy

### Build Cache Optimization
```yaml
# GitHub Actions caching
- name: Cache Hugo modules
  uses: actions/cache@v3
  with:
    path: |
      _vendor
    key: ${{ runner.os }}-hugo-modules-${{ hashFiles('go.sum') }}

- name: Cache node modules
  uses: actions/cache@v3
  with:
    path: node_modules
    key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}
```

### Hugo Build Cache
```bash
# Hugo caching
hugo --gc --minify --cacheDir /tmp/hugo-cache

# Clean caches when needed
npm run clean
npm run mod:clean
```

## Multi-environment Deployment

### Environment Configuration
```toml
# config/_default/config.toml
[params]
  environment = "development"

# Override in production
[params]
  environment = "production"
```

### Feature Flags
```javascript
// Feature flag implementation
const features = {
  autoplay: process.env.NODE_ENV === 'production',
  analytics: process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV === 'development'
}
```

## Security in CI/CD

### Secret Management
```yaml
# GitHub secrets
env:
  NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
```

### Dependency Scanning
```yaml
# Security scanning in CI
- name: Security audit
  run: |
    npm audit --audit-level=moderate
    npx snyk test --severity-threshold=medium
```

### Access Control
```yaml
# Branch protection rules
# - Require PR reviews
# - Require status checks
# - Require up-to-date branches
# - Restrict pushes to main branch
```

## Performance Optimization

### Build Time Optimization
```yaml
# Parallel processing
- name: Build module
  run: |
    npm run build -- --parallel

# Selective builds
- name: Build only changed
  run: |
    if git diff --name-only HEAD~1 | grep -q "layouts/\|assets/"; then
      npm run build
    fi
```

### Asset Optimization
```javascript
// Hugo asset optimization
{{ $css := resources.Get "scss/main.scss" | toCSS | minify | fingerprint }}
<link rel="stylesheet" href="{{ $css.Permalink }}">

{{ $js := resources.Get "js/main.js" | js.Build | minify | fingerprint }}
<script src="{{ $js.Permalink }}"></script>
```

## Troubleshooting

### Common Build Issues
```bash
# Hugo module issues
npm run mod:clean
npm run mod:update

# Node.js cache issues
rm -rf node_modules package-lock.json
npm install

# Build cache issues
npm run clean
rm -rf _vendor
```

### Debug Build Process
```bash
# Verbose Hugo output
hugo --verbose --debug

# Debug npm scripts
npm run build --verbose

# Check Hugo version
hugo version
```

### Performance Issues
```bash
# Profile build time
time npm run build

# Check resource usage
npm run build -- --profile

# Analyze bundle size
npx webpack-bundle-analyzer dist/static/js/*.js