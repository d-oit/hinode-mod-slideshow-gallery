# Hugo Module Developer Skills

## analyze_hugo_module_architecture

**Description**: Analyzes the Hugo module codebase architecture, identifying components, their relationships, and adherence to Hinode and Hugo best practices.

**Input Schema**:
- scope (string): Area to analyze (e.g., 'layouts', 'assets', 'config', 'all')
- depth (enum): Level of analysis detail [surface, detailed, comprehensive]

**Implementation Sequence**:
1. Read module configuration files (config/_default/params.toml, go.mod)
2. Analyze layout structure and shortcode implementations
3. Examine asset organization (SCSS, JS, i18n)
4. Validate Hinode integration patterns
5. Check Hugo module dependencies and imports

**Output Format**:
- Module structure overview with component responsibilities
- Dependency analysis and coupling assessment
- Hinode integration compliance report
- Architecture improvement recommendations
- Security and performance considerations

**When to Use**:
- Starting work on a new module feature
- Validating architectural decisions
- Onboarding new developers to the module
- Planning refactoring or optimization work

**GOAP Integration**:
- Action: analyze_hugo_module_architecture
- Preconditions: module_files_accessible=true, hinode_docs_available=true
- Effects: module_architecture_mapped=true, integration_patterns_validated=true
- Cost: 4

## validate_hugo_template_patterns

**Description**: Checks Hugo template implementations for adherence to best practices, security standards, and performance optimizations.

**Input Schema**:
- template_path (string): Path to template file or directory to validate
- standards (array): Standards to check [security, performance, accessibility, i18n]

**Implementation Sequence**:
1. Parse Hugo template syntax and structure
2. Validate template function usage (safeHTML, htmlEscape)
3. Check for XSS vulnerabilities and input sanitization
4. Verify accessibility compliance (ARIA labels, semantic HTML)
5. Assess performance implications (partial usage, caching)

**Output Format**:
- Template validation report with issues and recommendations
- Security vulnerability assessment
- Performance optimization suggestions
- Accessibility compliance status
- Code quality metrics

**When to Use**:
- After implementing new templates or shortcodes
- During code review processes
- Before committing template changes
- When troubleshooting template rendering issues

**GOAP Integration**:
- Action: validate_hugo_template_patterns
- Preconditions: template_files_readable=true, standards_defined=true
- Effects: template_patterns_validated=true, security_issues_identified=true
- Cost: 3

## trace_hugo_module_flow

**Description**: Follows execution paths through Hugo module components, mapping data flow and template rendering sequences.

**Input Schema**:
- entry_point (string): Starting point (shortcode name, layout file)
- flow_type (enum): Type of flow to trace [rendering, data, assets]

**Implementation Sequence**:
1. Identify entry point and initial parameters
2. Map template inclusion hierarchy
3. Trace data transformation through partials
4. Follow asset loading and processing
5. Document conditional logic and error paths

**Output Format**:
- Execution flow diagram with component interactions
- Data transformation mapping
- Asset dependency graph
- Performance bottleneck identification
- Debugging checkpoints and logging points

**When to Use**:
- Debugging complex rendering issues
- Optimizing module performance
- Understanding component interactions
- Planning feature modifications

**GOAP Integration**:
- Action: trace_hugo_module_flow
- Preconditions: entry_point_defined=true, flow_type_specified=true
- Effects: execution_flow_mapped=true, bottlenecks_identified=true
- Cost: 3

## implement_bootstrap_component

**Description**: Creates or modifies Bootstrap 5 components with proper integration into the Hugo module structure.

**Input Schema**:
- component_type (string): Bootstrap component to implement (modal, carousel, etc.)
- customization_requirements (object): Specific styling and behavior needs
- accessibility_requirements (array): WCAG compliance requirements

**Implementation Sequence**:
1. Analyze Bootstrap 5 component documentation
2. Create Hugo template integration
3. Implement custom SCSS variables and mixins
4. Add JavaScript enhancements if needed
5. Ensure accessibility compliance
6. Test responsive behavior

**Output Format**:
- Complete component implementation (HTML/SCSS/JS)
- Integration documentation
- Accessibility compliance report
- Responsive testing results
- Usage examples

**When to Use**:
- Adding new UI components to the module
- Customizing existing Bootstrap components
- Implementing responsive design patterns
- Ensuring accessibility standards

**GOAP Integration**:
- Action: implement_bootstrap_component
- Preconditions: bootstrap_docs_accessible=true, component_requirements_defined=true
- Effects: component_implemented=true, accessibility_verified=true
- Cost: 4

## optimize_module_assets

**Description**: Optimizes SCSS, JavaScript, and other assets for production use with proper Hugo Pipes integration.

**Input Schema**:
- asset_types (array): Types of assets to optimize [scss, js, images]
- optimization_level (enum): Level of optimization [development, production]
- target_browsers (array): Browser support requirements

**Implementation Sequence**:
1. Analyze current asset structure and dependencies
2. Implement Hugo Pipes compilation (SCSS, JS minification)
3. Optimize images and media assets
4. Configure cache busting and versioning
5. Test asset loading performance

**Output Format**:
- Optimized asset pipeline configuration
- Performance improvement metrics
- Bundle size analysis
- Loading optimization recommendations
- Browser compatibility report

**When to Use**:
- Preparing for production deployment
- Optimizing page load performance
- Reducing bundle sizes
- Implementing asset caching strategies

**GOAP Integration**:
- Action: optimize_module_assets
- Preconditions: assets_accessible=true, hugo_pipes_available=true
- Effects: assets_optimized=true, performance_improved=true
- Cost: 3

## validate_module_integration

**Description**: Validates that the Hugo module integrates properly with Hinode and consuming sites.

**Input Schema**:
- integration_type (enum): Type of integration to validate [hinode, standalone, custom]
- test_environment (string): Environment to test in (exampleSite, external)

**Implementation Sequence**:
1. Test module mounting and configuration
2. Validate parameter passing and defaults
3. Check asset loading and compilation
4. Verify shortcode rendering in different contexts
5. Test i18n functionality

**Output Format**:
- Integration validation report
- Configuration compatibility assessment
- Error handling verification
- Performance impact analysis
- Usage recommendations

**When to Use**:
- After making module configuration changes
- Before publishing new module versions
- When integrating with new Hinode versions
- Troubleshooting integration issues

**GOAP Integration**:
- Action: validate_module_integration
- Preconditions: test_environment_available=true, hinode_version_known=true
- Effects: integration_validated=true, compatibility_confirmed=true
- Cost: 3