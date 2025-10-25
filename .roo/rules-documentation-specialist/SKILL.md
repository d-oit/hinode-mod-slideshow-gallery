# Documentation Specialist Skills

## create_comprehensive_readme

**Description**: Creates comprehensive README documentation that effectively communicates project purpose, setup, and usage to both technical and non-technical audiences.

**Input Schema**:
- project_type (enum): Type of project [library, application, module, tool]
- audience_level (enum): Target audience expertise [beginner, intermediate, expert]
- key_features (array): Main features to highlight
- setup_complexity (enum): How complex setup is [simple, moderate, complex]

**Implementation Sequence**:
1. Analyze project structure and identify key information
2. Research target audience needs and expectations
3. Structure documentation with clear navigation
4. Write engaging introduction and feature overview
5. Create step-by-step setup and usage instructions
6. Add troubleshooting, examples, and advanced topics
7. Include contribution guidelines and support information

**Output Format**:
- Complete README.md with proper structure and formatting
- Table of contents with anchor links
- Code examples and configuration samples
- Visual elements (badges, screenshots)
- Cross-references to additional documentation
- Accessibility considerations in documentation

**When to Use**:
- Starting new projects that need documentation
- Refactoring existing README files
- Preparing projects for open source release
- Improving project discoverability and adoption

**GOAP Integration**:
- Action: create_comprehensive_readme
- Preconditions: project_analysis_complete=true, target_audience_defined=true
- Effects: project_documentation_created=true, user_onboarding_improved=true
- Cost: 3

## document_api_endpoints

**Description**: Creates clear, comprehensive API documentation with examples, parameters, and error handling for REST, GraphQL, or custom APIs.

**Input Schema**:
- api_type (enum): API type [rest, graphql, websocket, custom]
- endpoints (array): API endpoints to document
- authentication_methods (array): Supported authentication methods
- response_formats (array): Supported response formats [json, xml, yaml]

**Implementation Sequence**:
1. Analyze API structure and gather endpoint information
2. Document authentication and authorization requirements
3. Create detailed endpoint documentation with parameters
4. Provide request/response examples for each endpoint
5. Document error codes and handling
6. Include SDK/client library usage examples
7. Add rate limiting and pagination information

**Output Format**:
- Complete API reference documentation
- Interactive API explorer (if applicable)
- Code samples in multiple languages
- Error handling examples
- Authentication guides
- Changelog for API versions

**When to Use**:
- Developing new APIs that need documentation
- Updating existing API documentation
- Preparing APIs for public consumption
- Improving developer experience with APIs

**GOAP Integration**:
- Action: document_api_endpoints
- Preconditions: api_specification_available=true, authentication_defined=true
- Effects: api_documentation_created=true, developer_experience_improved=true
- Cost: 4

## write_user_guides

**Description**: Creates user-friendly guides that help users accomplish specific tasks and understand complex workflows.

**Input Schema**:
- user_personas (array): Target user types and their needs
- key_workflows (array): Main user workflows to document
- complexity_level (enum): Guide complexity [tutorial, how-to, reference]
- supporting_materials (array): Additional materials [videos, screenshots, diagrams]

**Implementation Sequence**:
1. Identify user personas and their goals
2. Map out key user workflows and pain points
3. Create step-by-step guides for common tasks
4. Develop troubleshooting sections for common issues
5. Include best practices and advanced tips
6. Add visual aids and examples throughout
7. Create cross-references between related guides

**Output Format**:
- Step-by-step user guides with screenshots
- Video tutorials and interactive demos
- Troubleshooting guides and FAQs
- Best practices and tips documents
- User feedback collection mechanisms
- Guide effectiveness metrics

**When to Use**:
- Onboarding new users to complex systems
- Documenting business processes and workflows
- Creating training materials for teams
- Improving user adoption and satisfaction

**GOAP Integration**:
- Action: write_user_guides
- Preconditions: user_research_completed=true, workflows_mapped=true
- Effects: user_guides_created=true, user_adoption_improved=true
- Cost: 3

## maintain_knowledge_base

**Description**: Builds and maintains a comprehensive knowledge base with articles, FAQs, and searchable content.

**Input Schema**:
- content_categories (array): Categories of knowledge base content
- search_functionality (object): Search and discovery features
- content_update_frequency (enum): How often content is updated
- user_engagement_features (array): Features for user interaction

**Implementation Sequence**:
1. Analyze knowledge gaps and user questions
2. Organize content into logical categories
3. Create searchable articles and guides
4. Implement tagging and categorization system
5. Add user feedback and rating systems
6. Set up content review and update processes
7. Integrate with help desk and support systems

**Output Format**:
- Organized knowledge base structure
- Searchable article database
- FAQ sections and quick reference guides
- User feedback and analytics dashboard
- Content management workflow
- Integration with support systems

**When to Use**:
- Building support infrastructure for products
- Reducing support ticket volume through self-service
- Improving information discoverability
- Scaling customer support operations

**GOAP Integration**:
- Action: maintain_knowledge_base
- Preconditions: content_inventory_completed=true, user_needs_assessed=true
- Effects: knowledge_base_created=true, support_efficiency_improved=true
- Cost: 4

## create_video_tutorials

**Description**: Produces video tutorials and screencasts that demonstrate features and processes effectively.

**Input Schema**:
- tutorial_topics (array): Topics to cover in tutorials
- audience_skill_levels (array): Target skill levels for tutorials
- video_formats (array): Video formats [screencast, whiteboard, live_demo]
- production_resources (object): Available recording and editing tools

**Implementation Sequence**:
1. Identify high-value tutorial topics based on user needs
2. Plan tutorial structure and learning objectives
3. Script tutorials with clear learning outcomes
4. Record high-quality video and audio
5. Edit and add visual enhancements
6. Add captions and transcripts for accessibility
7. Publish and promote tutorials

**Output Format**:
- Professional video tutorials with transcripts
- Thumbnail images and promotional materials
- Caption files and accessibility features
- Video playlists and learning paths
- Analytics and engagement metrics
- Tutorial update and maintenance schedule

**When to Use**:
- Explaining complex processes visually
- Improving user onboarding and training
- Creating marketing and promotional content
- Supporting different learning styles

**GOAP Integration**:
- Action: create_video_tutorials
- Preconditions: tutorial_topics_identified=true, production_resources_available=true
- Effects: video_tutorials_created=true, user_engagement_improved=true
- Cost: 4

## implement_documentation_portal

**Description**: Builds a comprehensive documentation portal with search, navigation, and user experience features.

**Input Schema**:
- documentation_scope (array): Types of documentation to include
- portal_features (array): Portal functionality [search, versioning, feedback]
- user_experience_requirements (object): UX requirements for the portal
- integration_requirements (array): Systems to integrate with

**Implementation Sequence**:
1. Analyze documentation needs and user requirements
2. Design portal information architecture
3. Implement search and navigation features
4. Create responsive and accessible design
5. Add user feedback and analytics
6. Set up content management and publishing workflow
7. Integrate with development and deployment processes

**Output Format**:
- Complete documentation portal
- Search functionality and filters
- Version control and release management
- User feedback and rating systems
- Analytics and usage tracking
- Content management system integration

**When to Use**:
- Consolidating multiple documentation sources
- Creating professional documentation experience
- Improving documentation discoverability
- Scaling documentation for large projects

**GOAP Integration**:
- Action: implement_documentation_portal
- Preconditions: documentation_inventory_completed=true, portal_requirements_defined=true
- Effects: documentation_portal_created=true, information_accessibility_improved=true
- Cost: 5

## develop_content_strategy

**Description**: Creates a comprehensive content strategy that guides documentation creation and maintenance.

**Input Schema**:
- content_goals (array): Goals for documentation content
- audience_segments (array): Target audience groups
- content_types (array): Types of content to produce
- measurement_metrics (array): Success metrics for content

**Implementation Sequence**:
1. Define content goals and target audiences
2. Analyze existing content and identify gaps
3. Create content creation and maintenance processes
4. Develop style guides and quality standards
5. Set up content measurement and analytics
6. Establish content governance and review processes
7. Plan content distribution and promotion strategies

**Output Format**:
- Content strategy document with goals and roadmap
- Content creation guidelines and templates
- Quality assurance processes
- Analytics and measurement framework
- Content calendar and publishing schedule
- Stakeholder communication plan

**When to Use**:
- Starting documentation initiatives
- Improving existing documentation programs
- Scaling documentation for growing organizations
- Aligning documentation with business goals

**GOAP Integration**:
- Action: develop_content_strategy
- Preconditions: business_goals_defined=true, audience_analysis_completed=true
- Effects: content_strategy_created=true, documentation_effectiveness_improved=true
- Cost: 4

## create_release_notes

**Description**: Writes clear, comprehensive release notes that communicate changes and impact to users and stakeholders.

**Input Schema**:
- release_type (enum): Type of release [major, minor, patch, hotfix]
- changes_included (array): Changes to document [features, fixes, breaking_changes]
- audience_types (array): Who will read the release notes
- communication_channels (array): Where release notes will be published

**Implementation Sequence**:
1. Analyze changes since last release
2. Categorize changes by type and impact
3. Write clear descriptions of new features and changes
4. Document breaking changes and migration steps
5. Highlight important fixes and improvements
6. Include upgrade instructions and known issues
7. Format for different communication channels

**Output Format**:
- Professional release notes document
- Executive summary for stakeholders
- Technical details for developers
- User-facing change descriptions
- Migration guides and upgrade instructions
- Release timeline and follow-up plan

**When to Use**:
- Preparing software releases
- Communicating changes to users
- Maintaining change history
- Supporting upgrade decisions

**GOAP Integration**:
- Action: create_release_notes
- Preconditions: release_changes_analyzed=true, audience_defined=true
- Effects: release_notes_created=true, change_communication_improved=true
- Cost: 2

## manage_documentation_reviews

**Description**: Implements processes for reviewing, approving, and maintaining documentation quality and accuracy.

**Input Schema**:
- review_stages (array): Stages in review process
- reviewer_roles (array): Types of reviewers needed
- quality_criteria (array): Standards for documentation quality
- approval_workflow (object): Process for approving changes

**Implementation Sequence**:
1. Define documentation quality standards and criteria
2. Establish review processes and workflows
3. Identify reviewers and assign responsibilities
4. Create review checklists and templates
5. Implement version control and change tracking
6. Set up feedback collection and improvement processes
7. Monitor review effectiveness and adjust processes

**Output Format**:
- Documentation review process documentation
- Review checklists and quality criteria
- Reviewer assignment and training materials
- Feedback collection and analysis system
- Process improvement recommendations
- Quality metrics and reporting

**When to Use**:
- Ensuring documentation accuracy and quality
- Implementing governance for documentation
- Scaling documentation teams
- Maintaining consistency across documentation

**GOAP Integration**:
- Action: manage_documentation_reviews
- Preconditions: quality_standards_defined=true, review_process_mapped=true
- Effects: documentation_reviews_implemented=true, content_quality_improved=true
- Cost: 3

## localize_documentation

**Description**: Translates and adapts documentation for international audiences and different locales.

**Input Schema**:
- target_languages (array): Languages to translate into
- localization_scope (array): Content to localize [ui_strings, articles, videos]
- cultural_adaptations (array): Cultural considerations for different markets
- translation_resources (object): Available translation resources and tools

**Implementation Sequence**:
1. Identify content requiring localization
2. Set up translation management system
3. Create translation glossaries and style guides
4. Coordinate with translators and reviewers
5. Adapt content for cultural and regional differences
6. Test localized content for accuracy and usability
7. Maintain localization workflow for ongoing updates

**Output Format**:
- Localized documentation in target languages
- Translation memory and glossaries
- Cultural adaptation guidelines
- Localization testing results
- Translation workflow and quality assurance
- Ongoing maintenance procedures

**When to Use**:
- Expanding to international markets
- Supporting multilingual user bases
- Complying with localization requirements
- Improving global user experience

**GOAP Integration**:
- Action: localize_documentation
- Preconditions: target_languages_defined=true, translation_resources_available=true
- Effects: documentation_localized=true, international_accessibility_improved=true
- Cost: 4

## analyze_documentation_effectiveness

**Description**: Measures and analyzes documentation effectiveness through user feedback, analytics, and usage metrics.

**Input Schema**:
- measurement_goals (array): What to measure about documentation
- analytics_tools (array): Tools for collecting analytics
- feedback_methods (array): Ways to collect user feedback
- success_metrics (array): KPIs for documentation success

**Implementation Sequence**:
1. Define success metrics and measurement goals
2. Implement analytics tracking and data collection
3. Set up user feedback collection mechanisms
4. Analyze usage patterns and user behavior
5. Identify areas for improvement based on data
6. Create reports and recommendations for stakeholders
7. Implement continuous improvement processes

**Output Format**:
- Documentation analytics dashboard
- User feedback analysis and insights
- Effectiveness reports and recommendations
- Improvement roadmap based on data
- Stakeholder communication materials
- Continuous improvement framework

**When to Use**:
- Understanding how documentation is used
- Identifying areas for improvement
- Demonstrating documentation value
- Optimizing documentation for better user experience

**GOAP Integration**:
- Action: analyze_documentation_effectiveness
- Preconditions: analytics_goals_defined=true, measurement_tools_available=true
- Effects: documentation_analyzed=true, improvement_opportunities_identified=true
- Cost: 3