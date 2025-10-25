# DevOps Engineer Skills

## automate_build_pipeline

**Description**: Creates and maintains automated CI/CD pipelines for Hugo module development, testing, and deployment.

**Input Schema**:
- pipeline_type (enum): Type of pipeline [github_actions, gitlab_ci, jenkins]
- stages (array): Pipeline stages [build, test, deploy, release]
- environments (array): Target environments [development, staging, production]

**Implementation Sequence**:
1. Analyze project requirements and technology stack
2. Design pipeline architecture with appropriate stages
3. Implement build automation and dependency management
4. Configure automated testing and quality gates
5. Set up deployment strategies for different environments
6. Implement monitoring and alerting for pipeline health

**Output Format**:
- Complete CI/CD pipeline configuration
- Build scripts and automation tools
- Deployment configurations for each environment
- Monitoring and alerting setup
- Pipeline documentation and maintenance guides

**When to Use**:
- Setting up new projects with automated workflows
- Improving existing manual deployment processes
- Implementing continuous integration practices
- Preparing for automated releases and deployments

**GOAP Integration**:
- Action: automate_build_pipeline
- Preconditions: project_requirements_defined=true, target_platforms_identified=true
- Effects: automated_pipeline_implemented=true, deployment_automated=true
- Cost: 4

## manage_infrastructure_as_code

**Description**: Implements infrastructure as code practices for managing deployment environments and cloud resources.

**Input Schema**:
- infrastructure_tools (array): IaC tools [terraform, cloudformation, ansible]
- cloud_providers (array): Target cloud platforms [aws, azure, gcp]
- infrastructure_components (array): Components to manage [compute, storage, networking]

**Implementation Sequence**:
1. Assess infrastructure requirements and constraints
2. Select appropriate IaC tools and cloud providers
3. Design infrastructure architecture and components
4. Implement infrastructure code with proper organization
5. Set up state management and version control
6. Implement testing and validation for infrastructure changes

**Output Format**:
- Infrastructure as code repository structure
- Terraform/CloudFormation configurations
- Deployment scripts and automation
- Infrastructure testing and validation
- Documentation for infrastructure management

**When to Use**:
- Setting up new infrastructure for applications
- Migrating from manual infrastructure management
- Implementing multi-environment deployments
- Ensuring infrastructure consistency and repeatability

**GOAP Integration**:
- Action: manage_infrastructure_as_code
- Preconditions: infrastructure_requirements_defined=true, cloud_provider_selected=true
- Effects: infrastructure_as_code_implemented=true, infrastructure_automated=true
- Cost: 5

## implement_monitoring_alerting

**Description**: Sets up comprehensive monitoring and alerting systems for applications and infrastructure.

**Input Schema**:
- monitoring_targets (array): What to monitor [application, infrastructure, performance]
- alerting_channels (array): Alert notification methods [email, slack, pager_duty]
- metrics_types (array): Types of metrics [system, application, business]

**Implementation Sequence**:
1. Identify critical monitoring requirements and KPIs
2. Select appropriate monitoring tools and platforms
3. Implement application and infrastructure monitoring
4. Configure alerting rules and thresholds
5. Set up dashboards and visualization
6. Test alerting and incident response procedures

**Output Format**:
- Monitoring configuration and dashboards
- Alerting rules and escalation procedures
- Incident response playbooks
- Monitoring documentation and runbooks
- Performance and availability reports

**When to Use**:
- Setting up production environments
- Improving system reliability and uptime
- Implementing DevOps best practices
- Preparing for incident response

**GOAP Integration**:
- Action: implement_monitoring_alerting
- Preconditions: system_requirements_defined=true, monitoring_goals_established=true
- Effects: monitoring_implemented=true, alerting_configured=true
- Cost: 3

## optimize_performance_scaling

**Description**: Optimizes application performance and implements auto-scaling for handling varying loads.

**Input Schema**:
- performance_metrics (array): Key performance indicators [response_time, throughput, error_rate]
- scaling_triggers (array): Auto-scaling triggers [cpu, memory, requests]
- optimization_targets (array): Performance optimization areas [frontend, backend, database]

**Implementation Sequence**:
1. Analyze current performance baselines and bottlenecks
2. Implement performance monitoring and profiling
3. Optimize application code and infrastructure
4. Configure auto-scaling policies and rules
5. Test scaling behavior under load
6. Implement performance budgets and alerting

**Output Format**:
- Performance optimization recommendations
- Auto-scaling configuration and policies
- Load testing results and analysis
- Performance monitoring dashboards
- Scaling documentation and procedures

**When to Use**:
- Preparing for production deployment
- Handling increased traffic and load
- Optimizing resource utilization
- Improving user experience and performance

**GOAP Integration**:
- Action: optimize_performance_scaling
- Preconditions: performance_requirements_defined=true, current_metrics_available=true
- Effects: performance_optimized=true, auto_scaling_implemented=true
- Cost: 4

## manage_configuration_secrets

**Description**: Implements secure configuration and secrets management for different environments.

**Input Schema**:
- secret_types (array): Types of secrets [api_keys, database_credentials, certificates]
- management_tools (array): Secret management tools [aws_secrets, vault, kubernetes_secrets]
- environments (array): Target environments [development, staging, production]

**Implementation Sequence**:
1. Identify all configuration and secret requirements
2. Select appropriate secret management solution
3. Implement secure storage and access controls
4. Configure environment-specific configurations
5. Set up rotation and renewal processes
6. Implement auditing and access logging

**Output Format**:
- Secret management configuration
- Environment configuration templates
- Access control policies and procedures
- Secret rotation and renewal automation
- Security audit and compliance documentation

**When to Use**:
- Setting up secure application deployments
- Managing sensitive configuration data
- Implementing security best practices
- Preparing for compliance audits

**GOAP Integration**:
- Action: manage_configuration_secrets
- Preconditions: security_requirements_defined=true, environments_identified=true
- Effects: secrets_management_implemented=true, configuration_secured=true
- Cost: 3

## implement_backup_recovery

**Description**: Designs and implements backup and disaster recovery strategies for applications and data.

**Input Schema**:
- backup_targets (array): What to backup [code, data, configuration]
- recovery_objectives (object): RTO and RPO requirements
- storage_solutions (array): Backup storage options [local, cloud, hybrid]

**Implementation Sequence**:
1. Assess backup and recovery requirements
2. Design backup strategies and schedules
3. Implement automated backup processes
4. Set up disaster recovery procedures
5. Test backup integrity and recovery processes
6. Document backup and recovery procedures

**Output Format**:
- Backup strategy and implementation
- Disaster recovery plan and procedures
- Backup testing and validation results
- Recovery time objective (RTO) documentation
- Recovery point objective (RPO) documentation

**When to Use**:
- Setting up production systems
- Implementing business continuity planning
- Preparing for compliance requirements
- Protecting against data loss

**GOAP Integration**:
- Action: implement_backup_recovery
- Preconditions: business_requirements_defined=true, risk_assessment_completed=true
- Effects: backup_strategy_implemented=true, disaster_recovery_planned=true
- Cost: 3

## orchestrate_multi_environment_deployments

**Description**: Manages deployments across multiple environments with proper testing and validation gates.

**Input Schema**:
- environments (array): Deployment environments [development, staging, production]
- deployment_strategy (enum): Deployment approach [blue_green, canary, rolling]
- validation_gates (array): Quality gates between environments

**Implementation Sequence**:
1. Design multi-environment deployment pipeline
2. Implement environment-specific configurations
3. Set up automated testing and validation
4. Configure deployment strategies and rollback procedures
5. Implement monitoring and alerting for deployments
6. Test deployment processes and procedures

**Output Format**:
- Multi-environment deployment pipeline
- Environment configuration management
- Deployment validation and testing procedures
- Rollback and recovery procedures
- Deployment monitoring and alerting

**When to Use**:
- Managing complex application deployments
- Implementing DevOps best practices
- Ensuring deployment reliability and safety
- Supporting continuous delivery workflows

**GOAP Integration**:
- Action: orchestrate_multi_environment_deployments
- Preconditions: environments_defined=true, deployment_requirements_specified=true
- Effects: multi_environment_deployment_implemented=true, deployment_automated=true
- Cost: 4

## implement_cost_optimization

**Description**: Analyzes and optimizes cloud infrastructure costs while maintaining performance and reliability.

**Input Schema**:
- cost_categories (array): Cost areas to optimize [compute, storage, networking]
- optimization_goals (object): Cost reduction targets and constraints
- monitoring_period (string): Time period for cost analysis

**Implementation Sequence**:
1. Analyze current infrastructure costs and usage
2. Identify cost optimization opportunities
3. Implement cost-saving measures and configurations
4. Set up cost monitoring and alerting
5. Test performance impact of optimizations
6. Document cost optimization strategies

**Output Format**:
- Cost analysis and optimization recommendations
- Infrastructure cost optimization implementation
- Cost monitoring and alerting setup
- Performance vs cost trade-off analysis
- Cost optimization documentation

**When to Use**:
- Managing cloud infrastructure costs
- Optimizing resource utilization
- Preparing cost budgets and forecasts
- Improving cost efficiency

**GOAP Integration**:
- Action: implement_cost_optimization
- Preconditions: cost_data_available=true, optimization_goals_defined=true
- Effects: cost_optimization_implemented=true, infrastructure_cost_reduced=true
- Cost: 3

## manage_service_dependencies

**Description**: Manages external service dependencies and implements circuit breakers and fallback strategies.

**Input Schema**:
- service_dependencies (array): External services [apis, databases, cdns]
- failure_strategies (array): Failure handling approaches [circuit_breaker, fallback, retry]
- monitoring_requirements (object): Dependency monitoring and health checks

**Implementation Sequence**:
1. Identify all external service dependencies
2. Implement dependency health monitoring
3. Configure circuit breakers and retry logic
4. Set up fallback strategies and degraded modes
5. Implement dependency testing and validation
6. Document dependency management procedures

**Output Format**:
- Service dependency management configuration
- Circuit breaker and fallback implementations
- Dependency monitoring and alerting
- Service degradation procedures
- Dependency testing and validation

**When to Use**:
- Building resilient distributed systems
- Managing third-party service integrations
- Implementing fault-tolerant architectures
- Preparing for service outages

**GOAP Integration**:
- Action: manage_service_dependencies
- Preconditions: service_dependencies_identified=true, reliability_requirements_defined=true
- Effects: dependency_management_implemented=true, system_resilience_improved=true
- Cost: 3

## implement_log_aggregation

**Description**: Sets up centralized logging and log analysis for applications and infrastructure.

**Input Schema**:
- log_sources (array): Sources of logs [application, system, infrastructure]
- aggregation_tools (array): Log aggregation platforms [elk, splunk, cloudwatch]
- analysis_requirements (array): Log analysis needs [search, alerting, reporting]

**Implementation Sequence**:
1. Identify logging requirements and sources
2. Select appropriate log aggregation platform
3. Implement structured logging in applications
4. Configure log shipping and aggregation
5. Set up log analysis and alerting rules
6. Implement log retention and archiving

**Output Format**:
- Centralized logging configuration
- Log aggregation and analysis setup
- Alerting rules and procedures
- Log retention and compliance policies
- Log analysis documentation

**When to Use**:
- Debugging production issues
- Implementing observability practices
- Meeting compliance logging requirements
- Improving system monitoring

**GOAP Integration**:
- Action: implement_log_aggregation
- Preconditions: logging_requirements_defined=true, aggregation_platform_selected=true
- Effects: log_aggregation_implemented=true, system_observability_improved=true
- Cost: 3

## automate_compliance_auditing

**Description**: Automates compliance checks and auditing for security standards and regulations.

**Input Schema**:
- compliance_frameworks (array): Standards to comply with [gdpr, hipaa, pci_dss]
- audit_scopes (array): Areas to audit [security, privacy, access_control]
- automation_level (enum): Level of automation [manual, semi_automated, fully_automated]

**Implementation Sequence**:
1. Identify compliance requirements and frameworks
2. Implement automated compliance checks
3. Set up compliance monitoring and reporting
4. Configure audit logging and evidence collection
5. Implement compliance alerting and remediation
6. Document compliance procedures and evidence

**Output Format**:
- Automated compliance checking system
- Compliance monitoring and reporting
- Audit evidence collection and storage
- Compliance alerting and remediation procedures
- Compliance documentation and procedures

**When to Use**:
- Preparing for compliance audits
- Implementing regulatory requirements
- Maintaining security certifications
- Demonstrating compliance to auditors

**GOAP Integration**:
- Action: automate_compliance_auditing
- Preconditions: compliance_requirements_defined=true, audit_scopes_identified=true
- Effects: compliance_automation_implemented=true, audit_readiness_improved=true
- Cost: 4