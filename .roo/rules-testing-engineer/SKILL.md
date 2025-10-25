# Testing Engineer Skills

## design_e2e_test_suite

**Description**: Designs comprehensive end-to-end test suites using Playwright for complete user journey validation.

**Input Schema**:
- application_flows (array): Key user journeys to test
- test_scenarios (array): Specific test cases and edge cases
- browser_matrix (array): Browsers and devices to test against

**Implementation Sequence**:
1. Analyze application user flows and critical paths
2. Design test scenarios covering happy paths and edge cases
3. Create test data management strategy
4. Implement page object models for reusability
5. Set up cross-browser testing configuration
6. Establish test reporting and CI/CD integration

**Output Format**:
- Complete test suite structure and organization
- Test case documentation with acceptance criteria
- Page object models and test utilities
- CI/CD pipeline configuration
- Test execution reports and metrics

**When to Use**:
- Setting up testing for new features
- Expanding test coverage for existing functionality
- Implementing automated regression testing
- Preparing for production releases

**GOAP Integration**:
- Action: design_e2e_test_suite
- Preconditions: application_flows_identified=true, test_requirements_defined=true
- Effects: test_suite_implemented=true, coverage_established=true
- Cost: 4

## implement_accessibility_testing

**Description**: Implements comprehensive accessibility testing using WCAG guidelines and automated tools.

**Input Schema**:
- wcag_level (enum): Compliance level [A, AA, AAA]
- test_scope (array): Components and pages to test
- assistive_technologies (array): Screen readers and tools to validate

**Implementation Sequence**:
1. Set up accessibility testing tools (axe-core, Lighthouse)
2. Create accessibility test cases for each component
3. Implement automated accessibility checks
4. Test keyboard navigation and focus management
5. Validate screen reader compatibility
6. Generate accessibility compliance reports

**Output Format**:
- Accessibility test suite with automated checks
- WCAG compliance validation results
- Keyboard navigation verification
- Screen reader compatibility reports
- Remediation recommendations for issues found

**When to Use**:
- Developing new accessible components
- Auditing existing components for accessibility
- Preparing for accessibility compliance audits
- Ensuring inclusive user experience

**GOAP Integration**:
- Action: implement_accessibility_testing
- Preconditions: accessibility_requirements_defined=true, testing_tools_available=true
- Effects: accessibility_tested=true, compliance_verified=true
- Cost: 3

## create_performance_test_baseline

**Description**: Establishes performance testing baselines and monitors for regressions using Lighthouse and custom metrics.

**Input Schema**:
- performance_metrics (array): Key performance indicators to track
- performance_budgets (object): Acceptable thresholds for each metric
- test_scenarios (array): Performance test scenarios

**Implementation Sequence**:
1. Define performance metrics and acceptable thresholds
2. Set up automated performance testing tools
3. Create performance test scenarios
4. Establish baseline performance measurements
5. Implement regression detection and alerting
6. Generate performance reports and recommendations

**Output Format**:
- Performance test suite with automated monitoring
- Baseline performance measurements
- Performance budget definitions
- Regression detection alerts
- Performance optimization recommendations

**When to Use**:
- Establishing performance standards for new features
- Monitoring existing functionality for performance regressions
- Optimizing for Core Web Vitals
- Preparing for performance audits

**GOAP Integration**:
- Action: create_performance_test_baseline
- Preconditions: performance_requirements_defined=true, monitoring_tools_available=true
- Effects: performance_baseline_established=true, regression_monitoring_active=true
- Cost: 3

## implement_visual_regression_testing

**Description**: Implements visual regression testing to detect unintended visual changes in UI components.

**Input Schema**:
- component_library (array): Components to visually test
- viewport_sizes (array): Screen sizes to test
- visual_thresholds (object): Acceptable visual difference thresholds

**Implementation Sequence**:
1. Set up visual regression testing tools (Playwright screenshots)
2. Define visual test scenarios for each component
3. Capture baseline screenshots
4. Implement visual comparison algorithms
5. Set up visual difference thresholds
6. Create visual regression reports and alerts

**Output Format**:
- Visual regression test suite
- Baseline screenshot library
- Visual difference reports
- False positive filtering rules
- Visual change approval workflows

**When to Use**:
- Testing UI component changes
- Preventing visual regressions in design systems
- Validating responsive design implementations
- Ensuring consistent visual appearance across browsers

**GOAP Integration**:
- Action: implement_visual_regression_testing
- preconditions: component_library_defined=true, visual_testing_tools_available=true
- effects: visual_regression_testing_implemented=true, visual_changes_detected=true
- cost: 3

## develop_test_data_management

**Description**: Develops robust test data management strategies for consistent and reliable test execution.

**Input Schema**:
- data_types (array): Types of test data needed
- data_generation_strategies (array): How to generate test data
- data_cleanup_requirements (object): Data cleanup and isolation needs

**Implementation Sequence**:
1. Analyze test data requirements for different scenarios
2. Design test data generation and management strategies
3. Implement test data builders and factories
4. Create data isolation and cleanup mechanisms
5. Set up test data versioning and maintenance
6. Establish data quality validation rules

**Output Format**:
- Test data management framework
- Data generation utilities and builders
- Data isolation and cleanup procedures
- Test data documentation and usage guidelines
- Data quality validation reports

**When to Use**:
- Setting up test environments with realistic data
- Ensuring test reliability and repeatability
- Managing complex test data relationships
- Scaling test suites with varied data scenarios

**GOAP Integration**:
- Action: develop_test_data_management
- preconditions: data_requirements_analyzed=true, test_scenarios_defined=true
- effects: test_data_management_implemented=true, test_reliability_improved=true
- cost: 3

## implement_cross_browser_testing

**Description**: Implements comprehensive cross-browser testing to ensure compatibility across different browsers and devices.

**Input Schema**:
- browser_matrix (array): Browsers and versions to test
- device_matrix (array): Devices and viewports to test
- compatibility_requirements (object): Minimum browser support requirements

**Implementation Sequence**:
1. Define browser and device support matrix
2. Set up cross-browser testing infrastructure
3. Implement browser-specific test cases
4. Create device-specific test scenarios
5. Set up automated cross-browser test execution
6. Generate compatibility reports and issue tracking

**Output Format**:
- Cross-browser test configuration
- Browser compatibility matrix
- Device-specific test suites
- Compatibility issue reports
- Browser support recommendations

**When to Use**:
- Ensuring consistent behavior across browsers
- Testing responsive design on different devices
- Validating new browser version compatibility
- Troubleshooting browser-specific issues

**GOAP Integration**:
- Action: implement_cross_browser_testing
- preconditions: browser_matrix_defined=true, testing_infrastructure_available=true
- effects: cross_browser_testing_implemented=true, compatibility_verified=true
- cost: 3

## create_test_automation_framework

**Description**: Creates a scalable test automation framework with reusable components and utilities.

**Input Schema**:
- framework_requirements (object): Framework capabilities needed
- technology_stack (array): Testing tools and languages
- integration_requirements (array): CI/CD and reporting integrations

**Implementation Sequence**:
1. Design framework architecture and component structure
2. Implement base classes and utilities
3. Create page object models and test helpers
4. Set up test configuration and environment management
5. Implement reporting and result aggregation
6. Establish framework maintenance and extension procedures

**Output Format**:
- Test automation framework with documentation
- Reusable test components and utilities
- Configuration management system
- Reporting and analytics dashboard
- Framework extension guidelines

**When to Use**:
- Building test infrastructure for large projects
- Standardizing testing practices across teams
- Improving test maintainability and scalability
- Integrating testing into development workflows

**GOAP Integration**:
- Action: create_test_automation_framework
- preconditions: framework_requirements_defined=true, technology_stack_selected=true
- effects: test_framework_implemented=true, test_automation_streamlined=true
- cost: 5

## implement_continuous_testing

**Description**: Implements continuous testing practices integrated into the development pipeline.

**Input Schema**:
- pipeline_stages (array): CI/CD stages for testing
- test_types (array): Types of tests to run at each stage
- feedback_loops (array): How test results feed back into development

**Implementation Sequence**:
1. Design testing strategy for each pipeline stage
2. Implement automated test execution in CI/CD
3. Set up test result reporting and notifications
4. Create test failure analysis and debugging tools
5. Implement test performance monitoring and optimization
6. Establish continuous improvement processes

**Output Format**:
- CI/CD testing pipeline configuration
- Automated test execution workflows
- Test result reporting and alerting system
- Test failure analysis tools
- Continuous testing improvement recommendations

**When to Use**:
- Integrating testing into development workflows
- Ensuring quality gates in deployment pipelines
- Providing fast feedback to developers
- Maintaining high quality in continuous delivery

**GOAP Integration**:
- Action: implement_continuous_testing
- preconditions: pipeline_defined=true, test_types_selected=true
- effects: continuous_testing_implemented=true, quality_gates_established=true
- cost: 4

## analyze_test_coverage_metrics

**Description**: Analyzes test coverage metrics and identifies gaps in test coverage.

**Input Schema**:
- coverage_types (array): Types of coverage to analyze [line, branch, function, statement]
- coverage_targets (object): Minimum coverage thresholds
- exclusion_rules (array): Code areas to exclude from coverage

**Implementation Sequence**:
1. Set up code coverage measurement tools
2. Define coverage targets and thresholds
3. Run coverage analysis on test suites
4. Identify coverage gaps and high-risk areas
5. Create action plans for improving coverage
6. Implement coverage monitoring and reporting

**Output Format**:
- Code coverage analysis reports
- Coverage gap identification
- Risk assessment for uncovered code
- Coverage improvement recommendations
- Coverage trend monitoring dashboard

**When to Use**:
- Assessing test suite effectiveness
- Identifying areas needing more testing
- Meeting coverage requirements for releases
- Optimizing test efforts for maximum impact

**GOAP Integration**:
- Action: analyze_test_coverage_metrics
- preconditions: coverage_tools_configured=true, test_suites_executed=true
- effects: coverage_analyzed=true, improvement_plan_created=true
- cost: 2