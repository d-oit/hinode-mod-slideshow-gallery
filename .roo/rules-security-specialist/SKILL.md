# Security Specialist Skills

## conduct_security_audit

**Description**: Performs comprehensive security audits of Hugo module code, configurations, and dependencies to identify vulnerabilities and compliance issues.

**Input Schema**:
- audit_scope (array): Areas to audit [code, config, dependencies, infrastructure]
- compliance_frameworks (array): Standards to check [OWASP, GDPR, WCAG]
- risk_threshold (enum): Minimum risk level to report [low, medium, high, critical]

**Implementation Sequence**:
1. Review codebase for security vulnerabilities
2. Analyze configuration files for secure defaults
3. Scan dependencies for known vulnerabilities
4. Test for common attack vectors
5. Assess compliance with security standards
6. Generate detailed security report with recommendations

**Output Format**:
- Security audit report with findings and severity levels
- Vulnerability assessment with CVSS scores
- Compliance status against selected frameworks
- Remediation recommendations with priorities
- Security improvement roadmap

**When to Use**:
- Before major releases or deployments
- After implementing new features
- During security compliance audits
- When addressing security incidents

**GOAP Integration**:
- Action: conduct_security_audit
- Preconditions: codebase_accessible=true, security_tools_available=true
- Effects: security_audit_completed=true, vulnerabilities_identified=true
- Cost: 4

## implement_input_validation

**Description**: Implements robust input validation and sanitization to prevent injection attacks and data corruption.

**Input Schema**:
- input_sources (array): Sources of input to validate [user_forms, api_params, file_uploads]
- validation_rules (object): Validation rules for each input type
- sanitization_methods (array): Sanitization techniques to apply

**Implementation Sequence**:
1. Identify all input sources and data flows
2. Define validation rules for each input type
3. Implement input sanitization functions
4. Add validation middleware and error handling
5. Test validation with malicious and edge-case inputs
6. Document validation rules and error messages

**Output Format**:
- Input validation implementation with test cases
- Sanitization utility functions
- Validation error handling and user feedback
- Security testing results
- Input validation documentation

**When to Use**:
- Developing forms and user input handling
- Implementing API endpoints
- Processing file uploads
- Refactoring existing input handling code

**GOAP Integration**:
- Action: implement_input_validation
- Preconditions: input_sources_identified=true, validation_requirements_defined=true
- Effects: input_validation_implemented=true, injection_attacks_prevented=true
- Cost: 3

## configure_content_security_policy

**Description**: Configures Content Security Policy (CSP) headers to prevent XSS and other injection attacks.

**Input Schema**:
- allowed_origins (array): Trusted domains for content loading
- required_features (array): Features requiring CSP permissions [inline_scripts, external_fonts]
- strictness_level (enum): CSP strictness [permissive, moderate, strict]

**Implementation Sequence**:
1. Analyze application content and resource requirements
2. Design CSP policy based on allowed origins and features
3. Implement CSP headers in Hugo configuration
4. Test CSP with different content types
5. Monitor CSP violations and adjust policy
6. Document CSP configuration and maintenance

**Output Format**:
- CSP policy configuration for Hugo
- CSP violation monitoring setup
- Fallback handling for blocked content
- CSP testing results and adjustments
- CSP maintenance documentation

**When to Use**:
- Setting up new Hugo sites or modules
- After implementing new features requiring external resources
- When hardening security configurations
- During security audits and compliance checks

**GOAP Integration**:
- Action: configure_content_security_policy
- Preconditions: content_requirements_analyzed=true, security_requirements_defined=true
- Effects: csp_configured=true, xss_attacks_mitigated=true
- Cost: 2

## perform_dependency_vulnerability_scan

**Description**: Scans project dependencies for known security vulnerabilities and provides remediation recommendations.

**Input Schema**:
- package_managers (array): Package managers to scan [npm, go_mod, composer]
- severity_threshold (enum): Minimum severity to report [low, medium, high, critical]
- update_strategy (enum): Dependency update approach [patch_only, minor_updates, major_updates]

**Implementation Sequence**:
1. Scan all dependency files for vulnerabilities
2. Analyze vulnerability severity and exploitability
3. Identify available patches and updates
4. Assess impact of updates on functionality
5. Implement safe updates and test thoroughly
6. Document remaining vulnerabilities and mitigation plans

**Output Format**:
- Vulnerability scan report with affected packages
- Severity assessment and risk analysis
- Update recommendations with testing requirements
- Dependency security scorecard
- Vulnerability tracking and monitoring setup

**When to Use**:
- During development and before releases
- After adding new dependencies
- When security alerts are received
- During regular security maintenance

**GOAP Integration**:
- Action: perform_dependency_vulnerability_scan
- Preconditions: dependency_files_accessible=true, scanning_tools_available=true
- Effects: vulnerabilities_scanned=true, remediation_plan_created=true
- Cost: 2

## implement_secure_headers

**Description**: Implements security headers to protect against common web vulnerabilities and attacks.

**Input Schema**:
- header_types (array): Security headers to implement [HSTS, CSP, XFO, CTO]
- application_type (enum): Application context [web_app, api, static_site]
- security_level (enum): Security strictness [basic, standard, strict]

**Implementation Sequence**:
1. Analyze application requirements and attack surface
2. Select appropriate security headers for the context
3. Configure headers in Hugo or web server configuration
4. Test header implementation and browser compatibility
5. Monitor header effectiveness and adjust as needed
6. Document header configuration and maintenance

**Output Format**:
- Security headers configuration
- Header compatibility testing results
- Implementation verification
- Header maintenance procedures
- Security improvement metrics

**When to Use**:
- Setting up new web applications
- Hardening existing applications
- During security assessments
- When implementing HTTPS

**GOAP Integration**:
- Action: implement_secure_headers
- Preconditions: application_requirements_analyzed=true, security_level_defined=true
- Effects: secure_headers_implemented=true, attack_surface_reduced=true
- Cost: 2

## conduct_threat_modeling

**Description**: Performs threat modeling to identify potential security threats and design appropriate mitigations.

**Input Schema**:
- system_components (array): System components to model [frontend, backend, database, apis]
- threat_framework (enum): Threat modeling framework [stride, past, custom]
- risk_assessment (object): Risk assessment criteria and thresholds

**Implementation Sequence**:
1. Create system architecture diagram and data flows
2. Identify system assets and their value
3. Apply threat modeling framework to identify threats
4. Assess threat likelihood and potential impact
5. Design and prioritize security controls
6. Document threat model and mitigation strategies

**Output Format**:
- Threat model documentation with diagrams
- Identified threats with risk assessments
- Mitigation strategies and security controls
- Implementation roadmap with priorities
- Ongoing monitoring and update procedures

**When to Use**:
- Designing new systems or major features
- Before security-critical changes
- During security architecture reviews
- When assessing third-party integrations

**GOAP Integration**:
- Action: conduct_threat_modeling
- Preconditions: system_architecture_defined=true, threat_framework_selected=true
- Effects: threat_model_completed=true, mitigation_strategies_defined=true
- Cost: 4

## implement_secure_authentication

**Description**: Implements secure authentication mechanisms to protect user accounts and sessions.

**Input Schema**:
- auth_methods (array): Authentication methods to implement [password, oauth, mfa]
- session_management (object): Session handling requirements
- password_policy (object): Password complexity and management rules

**Implementation Sequence**:
1. Design authentication flow and user experience
2. Implement secure password handling and storage
3. Configure session management and timeouts
4. Add multi-factor authentication options
5. Implement account protection mechanisms
6. Test authentication security and usability

**Output Format**:
- Authentication system implementation
- Security testing results
- User experience documentation
- Account recovery procedures
- Authentication monitoring and alerting

**When to Use**:
- Building user-facing applications
- Adding authentication to existing systems
- Implementing user account management
- During security hardening initiatives

**GOAP Integration**:
- Action: implement_secure_authentication
- Preconditions: user_requirements_defined=true, security_requirements_specified=true
- Effects: secure_authentication_implemented=true, account_protection_enabled=true
- Cost: 4

## monitor_security_events

**Description**: Sets up security monitoring and alerting for ongoing threat detection and incident response.

**Input Schema**:
- monitoring_targets (array): What to monitor [logs, metrics, user_behavior]
- alert_thresholds (object): Thresholds for triggering alerts
- response_procedures (array): Automated and manual response actions

**Implementation Sequence**:
1. Define security events and monitoring requirements
2. Implement logging and metrics collection
3. Configure alerting thresholds and channels
4. Set up automated response mechanisms
5. Create incident response procedures
6. Test monitoring system effectiveness

**Output Format**:
- Security monitoring configuration
- Alert definitions and escalation procedures
- Incident response playbook
- Monitoring dashboard and reports
- Continuous improvement recommendations

**When to Use**:
- Setting up production systems
- After security incidents
- During security operations center implementation
- When establishing security baselines

**GOAP Integration**:
- Action: monitor_security_events
- Preconditions: monitoring_requirements_defined=true, alerting_systems_available=true
- Effects: security_monitoring_implemented=true, incident_detection_enabled=true
- Cost: 3

## develop_security_incident_response

**Description**: Develops comprehensive incident response plans and procedures for security events.

**Input Schema**:
- incident_types (array): Types of incidents to prepare for [breach, ddos, malware]
- response_team (array): Team roles and responsibilities
- communication_plan (object): Internal and external communication procedures

**Implementation Sequence**:
1. Define incident classification and severity levels
2. Create detailed response procedures for each incident type
3. Assign roles and responsibilities to team members
4. Develop communication templates and procedures
5. Set up incident response tools and resources
6. Conduct incident response training and simulations

**Output Format**:
- Incident response plan document
- Communication templates and procedures
- Contact lists and escalation paths
- Incident response tools and checklists
- Training materials and simulation scenarios

**When to Use**:
- Establishing security operations
- After security incidents occur
- During compliance requirements
- When scaling security teams

**GOAP Integration**:
- Action: develop_security_incident_response
- Preconditions: incident_scenarios_identified=true, team_structure_defined=true
- Effects: incident_response_plan_created=true, response_capability_established=true
- Cost: 3

## implement_data_protection

**Description**: Implements data protection measures to ensure privacy and compliance with data regulations.

**Input Schema**:
- data_types (array): Types of data to protect [personal, sensitive, confidential]
- protection_measures (array): Protection techniques [encryption, masking, access_control]
- compliance_requirements (array): Regulations to comply with [gdpr, ccpa, hipaa]

**Implementation Sequence**:
1. Classify data types and sensitivity levels
2. Implement appropriate protection measures
3. Set up data access controls and monitoring
4. Create data handling procedures and policies
5. Implement data subject rights and procedures
6. Test compliance with selected regulations

**Output Format**:
- Data protection implementation
- Compliance assessment report
- Data handling procedures
- Privacy policy templates
- Data protection monitoring setup

**When to Use**:
- Processing personal or sensitive data
- Implementing privacy features
- During compliance audits
- When handling user data

**GOAP Integration**:
- Action: implement_data_protection
- Preconditions: data_classification_completed=true, compliance_requirements_defined=true
- Effects: data_protection_implemented=true, compliance_achieved=true
- Cost: 3