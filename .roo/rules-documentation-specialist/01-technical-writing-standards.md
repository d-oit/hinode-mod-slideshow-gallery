# Technical Writing Standards

## Documentation Structure

### README Organization
```markdown
# Project Name

Brief description of what the project does.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Features

List key features with brief descriptions.

## Installation

### Prerequisites
- Requirement 1
- Requirement 2

### Quick Start
```bash
installation commands
```

### Advanced Installation
Detailed installation steps for complex setups.

## Usage

### Basic Usage
Simple examples to get started.

### Advanced Usage
Complex use cases and configurations.

## Configuration

### Configuration Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| option1 | string | default | Description |

### Configuration File
```yaml
# Example configuration
option1: value1
option2: value2
```

## API Reference

### Endpoints
- `GET /api/endpoint` - Description
- `POST /api/endpoint` - Description

### Parameters
- `param1` (required) - Description
- `param2` (optional) - Description

## Contributing

### Development Setup
Steps to set up development environment.

### Code Style
Coding standards and conventions.

### Testing
How to run tests and add new tests.

## Troubleshooting

### Common Issues
- Issue 1: Solution
- Issue 2: Solution

### Getting Help
Where to ask questions and report issues.

## License

License information and copyright.
```

### API Documentation Standards

#### REST API Documentation
```markdown
# API Documentation

## Authentication
How to authenticate API requests.

## Rate Limiting
Rate limit information and headers.

## Error Responses
Standard error response format.

## Endpoints

### GET /api/resource
Get a list of resources.

**Parameters:**
- `limit` (integer, optional) - Maximum number of results
- `offset` (integer, optional) - Number of results to skip

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "limit": 10,
    "offset": 0
  }
}
```

**Error Responses:**
- `400 Bad Request` - Invalid parameters
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions

### POST /api/resource
Create a new resource.

**Request Body:**
```json
{
  "name": "Resource Name",
  "description": "Resource description"
}
```

**Response:**
```json
{
  "id": 123,
  "name": "Resource Name",
  "description": "Resource description",
  "created_at": "2023-01-01T00:00:00Z"
}
```
```

#### GraphQL API Documentation
```markdown
# GraphQL API

## Schema

```graphql
type Query {
  users(limit: Int, offset: Int): [User!]!
  user(id: ID!): User
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
}

type User {
  id: ID!
  name: String!
  email: String!
  createdAt: DateTime!
}

input CreateUserInput {
  name: String!
  email: String!
}
```

## Queries

### Get Users
```graphql
query GetUsers($limit: Int, $offset: Int) {
  users(limit: $limit, offset: $offset) {
    id
    name
    email
    createdAt
  }
}
```

**Variables:**
```json
{
  "limit": 10,
  "offset": 0
}
```

### Get User by ID
```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
    createdAt
  }
}
```

## Mutations

### Create User
```graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
    createdAt
  }
}
```

**Variables:**
```json
{
  "input": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```
```

## Code Documentation Standards

### Inline Comments
```javascript
// Bad: Obvious comment
const x = 5; // Set x to 5

// Good: Explain why and what
const maxRetries = 5; // Maximum retry attempts to handle transient network failures

// Bad: Commented out code
// const oldImplementation = true;

// Good: Remove commented code or explain why it exists
// TODO: Remove after feature flag cleanup
const featureFlag = process.env.FEATURE_FLAG;
```

### Function Documentation
```javascript
/**
 * Validates user input and returns sanitized data
 * @param {Object} input - Raw user input
 * @param {Object} schema - Validation schema
 * @returns {Object} Sanitized and validated data
 * @throws {ValidationError} When input fails validation
 * @example
 * const result = validateInput({ name: 'John' }, userSchema);
 * console.log(result); // { name: 'John' }
 */
function validateInput(input, schema) {
  // Implementation
}
```

### Class Documentation
```javascript
/**
 * User authentication service
 * Handles login, logout, and session management
 * @class
 */
class AuthService {
  /**
   * Create authentication service instance
   * @param {Object} config - Service configuration
   * @param {string} config.jwtSecret - JWT signing secret
   * @param {number} config.sessionTimeout - Session timeout in minutes
   */
  constructor(config) {
    // Implementation
  }

  /**
   * Authenticate user credentials
   * @param {string} username - User's username
   * @param {string} password - User's password
   * @returns {Promise<Object>} Authentication result with token
   * @throws {AuthenticationError} When credentials are invalid
   */
  async login(username, password) {
    // Implementation
  }
}
```

### Hugo Template Documentation
```html
{{/*
  slideshow-gallery shortcode
  Renders a responsive slideshow gallery with lightbox functionality

  @param {string} ratio - Image aspect ratio (default: "auto")
  @param {string} ratioThumbnail - Thumbnail aspect ratio (default: "auto")
  @param {string} loading - Image loading strategy (default: "lazy")

  @example
  {{< slideshow-gallery ratio="16x9" >}}
*/}}
<div class="slideshow-gallery">
  <!-- Implementation -->
</div>
```

## Writing Style Guidelines

### Language and Tone
- Use clear, concise language
- Write in active voice when possible
- Maintain professional but approachable tone
- Avoid jargon or explain technical terms
- Use consistent terminology throughout

### Sentence Structure
- Keep sentences under 25 words when possible
- Start with the subject and verb
- Use parallel structure in lists
- Avoid nested clauses

### Formatting Consistency
- Use consistent heading levels
- Maintain consistent code formatting
- Use consistent list styles (bulleted vs numbered)
- Apply consistent styling for emphasis

## Documentation Maintenance

### Version Control for Documentation
```bash
# Documentation versioning
git add docs/
git commit -m "docs: update API documentation for v2.0"

# Tag documentation releases
git tag -a docs-v2.0 -m "Documentation for version 2.0"
```

### Documentation Reviews
- Include documentation in code review process
- Use checklists for documentation completeness
- Review documentation for accuracy and clarity
- Update documentation with code changes

### Automated Documentation Checks
```yaml
# CI checks for documentation
- name: Check documentation
  run: |
    # Check for broken links
    npx markdown-link-check docs/**/*.md

    # Check formatting
    npx prettier --check docs/**/*.md

    # Check for required sections
    ./scripts/check-docs.js
```

## Tooling and Automation

### Documentation Generators
```javascript
// JSDoc configuration
{
  "source": {
    "include": ["src/"],
    "includePattern": "\\.(js|ts)$",
    "exclude": ["node_modules/"]
  },
  "opts": {
    "destination": "docs/api/",
    "recurse": true,
    "readme": "README.md"
  }
}
```

### Markdown Processing
```javascript
// Custom markdown processing
const remark = require('remark')
const html = require('remark-html')

remark()
  .use(html)
  .process(markdownContent, (err, file) => {
    console.log(String(file))
  })
```

### Documentation Hosting
```yaml
# GitHub Pages deployment
name: Deploy Documentation
on:
  push:
    branches: [main]
    paths: [docs/**]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Build documentation
        run: npm run docs:build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/build
```

## Accessibility in Documentation

### Alt Text for Images
```markdown
<!-- Bad -->
![Screenshot](screenshot.png)

<!-- Good -->
![Screenshot of the login form showing username and password fields](screenshot.png)
```

### Semantic HTML
```html
<!-- Use semantic headings -->
<h1>Main Title</h1>
<h2>Section Title</h2>

<!-- Use descriptive link text -->
<!-- Bad -->
<a href="/docs">Click here</a>

<!-- Good -->
<a href="/docs">Read the documentation</a>
```

### Color and Contrast
- Ensure sufficient color contrast
- Don't rely on color alone for meaning
- Use both color and text indicators

## Internationalization

### Multi-language Documentation
```
docs/
├── en/
│   ├── README.md
│   └── api/
├── de/
│   ├── README.md
│   └── api/
└── es/
    ├── README.md
    └── api/
```

### Translation Management
```javascript
// Translation files
const translations = {
  en: {
    welcome: 'Welcome',
    docs: 'Documentation'
  },
  de: {
    welcome: 'Willkommen',
    docs: 'Dokumentation'
  }
}
```

## Metrics and Analytics

### Documentation Usage Tracking
```javascript
// Track documentation usage
function trackDocUsage(page, action) {
  analytics.track('docs_usage', {
    page: page,
    action: action, // 'view', 'search', 'download'
    timestamp: new Date().toISOString()
  })
}
```

### Content Effectiveness
- Track which sections are most viewed
- Monitor search queries and failures
- Measure time spent on documentation
- Collect user feedback and ratings

### Continuous Improvement
- Regularly review documentation analytics
- Update based on user feedback
- Identify knowledge gaps
- Improve search functionality