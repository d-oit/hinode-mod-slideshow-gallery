# Infrastructure Management

## Environment Configuration

### Development Environment Setup
```bash
# Development environment
npm run start
# → Serves at http://localhost:1313
# → Auto-reloads on changes
# → Network accessible (0.0.0.0)
# → I18n warnings enabled
```

### Production Environment Configuration
```toml
# config/_default/hugo.toml (production)
baseURL = "https://example.com"
buildDrafts = false
buildFuture = false

[params]
  environment = "production"

[minify]
  minifyOutput = true
  [minify.tdewolff]
    [minify.tdewolff.html]
      keepComments = false
      keepConditionalComments = false
      keepEndTags = true
      keepQuotes = false
      keepWhitespace = false
```

### Environment Variables
```bash
# .env file
NODE_ENV=production
HUGO_ENV=production
GITHUB_TOKEN=your_token_here
NPM_TOKEN=your_token_here
```

## Hugo Module Management

### Module Structure
```
hinode-mod-slideshow-gallery/
├── go.mod              # Go module definition
├── go.sum              # Dependency checksums
├── _vendor/            # Vendored dependencies (auto-generated)
├── layouts/            # Template files
├── assets/             # SCSS/JS resources
├── i18n/              # Internationalization
├── config/            # Module configuration
└── data/              # Module data
```

### Module Dependencies
```go
// go.mod
module github.com/d-oit/hinode-mod-slideshow-gallery

go 1.19

require (
    github.com/gethinode/mod-utils/v4 v4.18.0
)
```

### Module Versioning
```bash
# Check current version
git tag --list | grep '^v' | sort -V | tail -1

# Create new version tag
git tag v2.2.0
git push origin v2.2.0

# Or use semantic-release (recommended)
npm run semantic-release
```

## Deployment Strategies

### Static Site Deployment
```yaml
# Deploy to Netlify
name: Deploy to Netlify
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './exampleSite/public'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### CDN Deployment
```yaml
# Deploy to AWS CloudFront + S3
name: Deploy to AWS
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Build site
        run: npm run build

      - name: Deploy to S3
        run: |
          aws s3 sync exampleSite/public/ s3://${{ secrets.S3_BUCKET }} --delete

      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_ID }} --paths "/*"
```

### Module Registry Publishing
```yaml
# Publish to npm registry
name: Publish Module
on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build module
        run: npm run build

      - name: Publish to npm
        run: |
          npm config set //registry.npmjs.org/:_authToken ${{ secrets.NPM_TOKEN }}
          npm publish
```

## Performance Optimization

### Hugo Build Optimization
```bash
# Production build with optimizations
hugo --gc --minify --enableGitInfo --buildDrafts=false --buildFuture=false

# Performance flags
hugo \
  --gc \
  --minify \
  --templateMetrics \
  --templateMetricsHints \
  --printPathWarnings \
  --printUnusedTemplates
```

### Asset Optimization
```javascript
// Hugo Pipes optimization
{{ $css := resources.Get "scss/main.scss" | toCSS | postCSS | minify | fingerprint }}
<link rel="stylesheet" href="{{ $css.Permalink }}" integrity="{{ $css.Data.Integrity }}" crossorigin="anonymous">

{{ $js := resources.Get "js/main.js" | js.Build | minify | fingerprint }}
<script src="{{ $js.Permalink }}" integrity="{{ $js.Data.Integrity }}" crossorigin="anonymous">
```

### Image Optimization
```javascript
// Responsive images with Hugo
{{ with .Resources.GetMatch "hero.jpg" }}
  {{ $image := .Resize "1200x webp" }}
  <picture>
    <source srcset="{{ $image.Permalink }}" type="image/webp">
    <img src="{{ .Permalink }}" alt="Hero image" loading="lazy">
  </picture>
{{ end }}
```

## Monitoring and Alerting

### Application Performance Monitoring
```yaml
# Lighthouse CI for performance monitoring
name: Performance Monitoring
on:
  schedule:
    - cron: '0 2 * * 1'  # Weekly on Monday
  workflow_dispatch:

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: http://localhost:1313
          configPath: .lighthouserc.json
          uploadArtifacts: true
          temporaryPublicStorage: true
```

### Error Tracking
```javascript
// Sentry integration for error tracking
import * as Sentry from "@sentry/browser"

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})
```

### Uptime Monitoring
```yaml
# UptimeRobot or similar service configuration
# Monitor key endpoints:
# - Homepage: https://example.com
# - Gallery pages: https://example.com/gallery/
# - API endpoints (if any)
```

## Backup and Recovery

### Code Repository Backup
```yaml
# GitHub repository backup
name: Repository Backup
on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM
  workflow_dispatch:

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Backup repository
        run: |
          git clone --mirror https://github.com/d-oit/hinode-mod-slideshow-gallery.git backup
          # Upload to backup storage
```

### Database Backup (if applicable)
```bash
# Database backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > backup_$DATE.sql
gzip backup_$DATE.sql
aws s3 cp backup_$DATE.sql.gz s3://backups/
```

### Disaster Recovery Plan
1. **Detection**: Monitor for service outages
2. **Assessment**: Evaluate impact and cause
3. **Recovery**: Restore from backups or redeploy
4. **Communication**: Notify stakeholders
5. **Prevention**: Implement fixes and improvements

## Security Hardening

### HTTPS Configuration
```nginx
# Nginx HTTPS configuration
server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
}
```

### Web Application Firewall
```yaml
# AWS WAF configuration
Resources:
  WebACL:
    Type: AWS::WAFv2::WebACL
    Properties:
      Name: SlideshowGalleryWAF
      Scope: CLOUDFRONT
      DefaultAction:
        Allow: {}
      Rules:
        - Name: AWSManagedRulesCommonRuleSet
          Priority: 1
          OverrideAction:
            None: {}
          VisibilityConfig:
            SampledRequestsEnabled: true
            CloudWatchMetricsEnabled: true
            MetricName: AWSManagedRulesCommonRuleSet
```

### Access Control
```yaml
# GitHub repository security
# - Require PR reviews
# - Require status checks
# - Restrict pushes to main branch
# - Enable vulnerability alerts
# - Enable dependency review
```

## Scaling Strategies

### Content Delivery Network
```terraform
# CloudFront distribution
resource "aws_cloudfront_distribution" "slideshow_gallery" {
  origin {
    domain_name = aws_s3_bucket.website.bucket_regional_domain_name
    origin_id   = "S3-slideshow-gallery"
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-slideshow-gallery"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
```

### Load Balancing
```nginx
# Load balancer configuration
upstream backend {
    server backend1.example.com;
    server backend2.example.com;
    server backend3.example.com;
}

server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Database Scaling (if applicable)
```yaml
# PostgreSQL read replicas
replicas:
  - name: replica-1
    source: primary
    mode: async
  - name: replica-2
    source: primary
    mode: async
```

## Cost Optimization

### Resource Usage Monitoring
```yaml
# AWS Cost Allocation Tags
Resources:
  S3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: slideshow-gallery-assets
      Tags:
        - Key: Project
          Value: slideshow-gallery
        - Key: Environment
          Value: production
```

### Auto Scaling
```yaml
# AWS Auto Scaling Group
Resources:
  AutoScalingGroup:
    Type: AWS::AutoScaling::AutoScalingGroup
    Properties:
      AutoScalingGroupName: SlideshowGalleryASG
      MinSize: "1"
      MaxSize: "10"
      DesiredCapacity: "2"
      AvailabilityZones:
        - us-east-1a
        - us-east-1b
```

### Storage Optimization
```bash
# Compress static assets
gzip -9 static-files.tar.gz static-files/

# Optimize image storage
find images/ -type f -name "*.jpg" -exec jpegoptim --strip-all {} \;
find images/ -type f -name "*.png" -exec optipng {} \;
```

## Compliance and Governance

### Data Residency
```yaml
# AWS region selection for data residency
provider "aws" {
  region = "eu-west-1"  # EU region for GDPR compliance
}
```

### Audit Logging
```javascript
// Comprehensive audit logging
function logAuditEvent(event) {
  const auditEntry = {
    timestamp: new Date().toISOString(),
    event: event.type,
    user: event.user,
    resource: event.resource,
    action: event.action,
    ip: event.ip,
    userAgent: event.userAgent,
    result: event.result
  }

  // Log to audit system
  auditLogger.info(JSON.stringify(auditEntry))
}
```

### Change Management
```yaml
# Infrastructure as Code changes
name: Infrastructure Change
on:
  pull_request:
    paths:
      - 'infrastructure/**'
      - '*.tf'
      - '*.yml'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Validate Terraform
        run: terraform validate

      - name: Check CloudFormation
        run: aws cloudformation validate-template --template-body file://template.yml
```

## Troubleshooting

### Common Infrastructure Issues
```bash
# DNS propagation issues
dig example.com
nslookup example.com

# CDN cache issues
curl -H "Cache-Control: no-cache" https://example.com

# SSL certificate issues
openssl s_client -connect example.com:443 -servername example.com

# Hugo module issues
hugo mod graph
hugo mod verify
```

### Performance Troubleshooting
```bash
# Check Hugo build performance
hugo --templateMetrics --templateMetricsHints

# Analyze bundle size
npx webpack-bundle-analyzer dist/static/js/*.js

# Monitor server resources
top
iotop
nethogs
```

### Deployment Rollback
```bash
# Quick rollback to previous version
git reset --hard HEAD~1
npm run build
npm run deploy

# Rollback specific deployment
kubectl rollout undo deployment/slideshow-gallery
```

## Documentation

### Infrastructure Documentation
```markdown
# Infrastructure Overview

## Architecture
- Static site generated by Hugo
- Deployed to AWS S3 + CloudFront CDN
- Hugo modules for component reusability

## Environments
- Development: Local Hugo server
- Staging: AWS S3 bucket
- Production: AWS CloudFront distribution

## Monitoring
- AWS CloudWatch for infrastructure metrics
- Lighthouse CI for performance monitoring
- Sentry for error tracking
```

### Runbooks
```markdown
# Deployment Runbook

## Normal Deployment
1. Merge PR to main branch
2. CI/CD pipeline triggers automatically
3. Build and test in GitHub Actions
4. Deploy to staging for verification
5. Manual promotion to production

## Emergency Deployment
1. Create hotfix branch from main
2. Implement fix with tests
3. Bypass normal review process if critical
4. Deploy directly to production
5. Create retrospective for process improvement
```

### Incident Response
```markdown
# Incident Response Plan

## Severity Levels
- **P1**: Site completely down, affects all users
- **P2**: Major functionality broken, partial impact
- **P3**: Minor issues, limited user impact
- **P4**: Cosmetic issues, no functional impact

## Response Times
- **P1**: 15 minutes to acknowledge, 1 hour to resolve
- **P2**: 30 minutes to acknowledge, 4 hours to resolve
- **P3**: 2 hours to acknowledge, 24 hours to resolve
- **P4**: 24 hours to acknowledge, 1 week to resolve