# Security Principles for Hugo Modules

## Core Security Principles

### Defense in Depth
- **Multiple layers of protection**: Never rely on a single security control
- **Fail-safe defaults**: Secure by default, explicit opt-in for risky features
- **Principle of least privilege**: Grant minimum necessary permissions
- **Zero trust architecture**: Verify all requests and actions

### Secure Development Lifecycle
- **Security requirements**: Define security requirements early in development
- **Threat modeling**: Identify and mitigate potential threats
- **Security testing**: Integrate security testing throughout development
- **Security reviews**: Regular code reviews with security focus

## Template Security

### Hugo Template Vulnerabilities
Common template security issues and prevention:

#### Cross-Site Scripting (XSS)
```html
<!-- VULNERABLE: Direct user input -->
<h1>{{ .Params.title }}</h1>

<!-- SECURE: Escaped output -->
<h1>{{ .Params.title | htmlEscape }}</h1>

<!-- SECURE: Safe HTML when necessary -->
<div>{{ .Content | safeHTML }}</div>
```

#### Template Injection
```html
<!-- VULNERABLE: Dynamic template execution -->
{{ .Params.template | safeHTML }}

<!-- SECURE: Whitelist allowed templates -->
{{ if eq .Params.template "allowed-template" }}
  {{ partial .Params.template . }}
{{ end }}
```

### Input Validation
- **Validate all inputs**: Never trust user-provided data
- **Type checking**: Ensure inputs match expected types
- **Length limits**: Prevent buffer overflow attacks
- **Format validation**: Use regular expressions for structured data

```javascript
// Input validation example
function validateImagePath(path) {
  // Prevent path traversal
  if (path.includes('..') || path.includes('\\')) {
    throw new Error('Invalid path')
  }

  // Validate file extension
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
  const ext = path.toLowerCase().substring(path.lastIndexOf('.'))
  if (!allowedExtensions.includes(ext)) {
    throw new Error('Invalid file type')
  }

  return path
}
```

## Content Security Policy (CSP)

### CSP Implementation
```toml
# config/_default/params.toml
[security]
  [security.csp]
    default-src = ["'self'"]
    script-src = ["'self'", "'unsafe-inline'"]
    style-src = ["'self'", "'unsafe-inline'"]
    img-src = ["'self'", "data:", "https:"]
    font-src = ["'self'"]
    connect-src = ["'self'"]
    media-src = ["'self'"]
    object-src = ["'none'"]
    frame-src = ["'none'"]
```

### CSP Headers in Hugo
```html
<!-- Add CSP meta tag -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'">
```

## Dependency Security

### Vulnerability Scanning
```bash
# Check for vulnerabilities
npm audit
npm audit fix

# Update dependencies
npm update
npm audit

# Check Go module vulnerabilities
go list -m -u all
```

### Dependency Management
- **Pin versions**: Use exact versions to prevent unexpected updates
- **Regular updates**: Keep dependencies current with security patches
- **Minimal dependencies**: Only include necessary packages
- **Vendor verification**: Verify third-party code integrity

## Image and Media Security

### Image Upload Security
- **File type validation**: Only allow safe image formats
- **Size limits**: Prevent denial of service through large files
- **Content verification**: Validate image content, not just extension
- **Storage security**: Secure file storage and access controls

### Image Processing Security
```javascript
// Secure image processing
const sharp = require('sharp')

async function processImage(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .resize(1920, 1080, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ quality: 85 })
      .toFile(outputPath)
  } catch (error) {
    throw new Error('Image processing failed')
  }
}
```

## JavaScript Security

### Content Security Policy for Scripts
- **Nonce-based CSP**: Use nonces for inline scripts
- **Subresource Integrity**: Verify external script integrity
- **Script sandboxing**: Isolate untrusted scripts

### Secure JavaScript Patterns
```javascript
// Avoid eval and Function constructor
// DON'T DO THIS:
const userCode = "console.log('Hello')"
eval(userCode)

// DO THIS INSTEAD:
const allowedFunctions = {
  log: console.log
}
allowedFunctions[userFunction]?.()
```

### Event Handler Security
```javascript
// Secure event handling
function handleUserInput(event) {
  const input = event.target.value

  // Sanitize input
  const sanitized = input.replace(/[<>]/g, '')

  // Use textContent instead of innerHTML
  displayElement.textContent = sanitized
}
```

## Network Security

### HTTPS Enforcement
```toml
# config/_default/config.toml
[security]
  [security.https]
    enforce = true
    redirect = true
```

### Secure Headers
```html
<!-- Security headers -->
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="X-XSS-Protection" content="1; mode=block">
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
```

## Authentication and Authorization

### Access Control
- **Role-based access**: Implement proper authorization checks
- **Session management**: Secure session handling
- **Token validation**: Verify authentication tokens
- **Rate limiting**: Prevent brute force attacks

### Secure Configuration
```javascript
// Secure configuration handling
const config = {
  apiKey: process.env.API_KEY,
  databaseUrl: process.env.DATABASE_URL,
  // Never hardcode secrets
}

// Validate configuration
if (!config.apiKey) {
  throw new Error('API key not configured')
}
```

## Data Protection

### Sensitive Data Handling
- **Encryption**: Encrypt sensitive data at rest and in transit
- **Data minimization**: Only collect necessary data
- **Retention limits**: Define data retention policies
- **Secure deletion**: Properly delete sensitive data

### Privacy Considerations
- **GDPR compliance**: Implement data subject rights
- **Cookie consent**: Obtain user consent for tracking
- **Data portability**: Allow data export and deletion
- **Privacy by design**: Consider privacy in all features

## Error Handling and Logging

### Secure Error Messages
```javascript
// DON'T leak sensitive information
try {
  processUserData(userInput)
} catch (error) {
  // VULNERABLE: May leak sensitive data
  console.error('Error:', error.message)

  // SECURE: Generic error message
  console.error('An error occurred processing your request')
  res.status(500).send('Internal server error')
}
```

### Log Security
- **Log sanitization**: Remove sensitive data from logs
- **Log levels**: Use appropriate log levels
- **Log monitoring**: Monitor logs for security events
- **Log rotation**: Implement secure log rotation

## Security Testing

### Automated Security Testing
```javascript
// Security test examples
test('CSP headers are properly set', async ({ page }) => {
  const csp = await page.evaluate(() => {
    const meta = document.querySelector('meta[http-equiv="Content-Security-Policy"]')
    return meta?.content
  })

  expect(csp).toContain("default-src 'self'")
})

test('XSS prevention works', async ({ page }) => {
  const maliciousInput = '<script>alert("xss")</script>'
  await page.fill('input[name="title"]', maliciousInput)

  const output = await page.textContent('.title')
  expect(output).not.toContain('<script>')
})
```

### Security Audit Checklist
- [ ] Input validation implemented
- [ ] XSS prevention in place
- [ ] CSRF protection configured
- [ ] Secure headers set
- [ ] Dependencies scanned for vulnerabilities
- [ ] Authentication and authorization implemented
- [ ] Sensitive data encrypted
- [ ] Error messages don't leak information
- [ ] HTTPS enforced
- [ ] Security monitoring active

## Incident Response

### Security Incident Procedure
1. **Detection**: Monitor for security events
2. **Assessment**: Evaluate incident severity and impact
3. **Containment**: Isolate affected systems
4. **Recovery**: Restore systems from clean backups
5. **Lessons learned**: Document and improve processes

### Vulnerability Disclosure
- **Responsible disclosure**: Work with security researchers
- **Patch development**: Develop and test security fixes
- **Communication**: Inform users of security issues
- **Timeline**: Provide reasonable timeframe for fixes

## Compliance and Standards

### Security Standards
- **OWASP Top 10**: Address web application security risks
- **NIST Cybersecurity Framework**: Implement security controls
- **ISO 27001**: Information security management system
- **GDPR**: General Data Protection Regulation compliance

### Regular Security Activities
- **Security audits**: Regular security assessments
- **Penetration testing**: Authorized security testing
- **Security training**: Keep team updated on threats
- **Security monitoring**: Continuous security monitoring