# Frontend Specialist Skills

## design_responsive_component

**Description**: Designs and implements responsive UI components that work seamlessly across all device sizes and interaction methods.

**Input Schema**:
- component_type (string): Type of component (lightbox, navigation, gallery)
- breakpoints (array): Responsive breakpoints to support
- interaction_modes (array): Interaction types (mouse, touch, keyboard)

**Implementation Sequence**:
1. Analyze design requirements and user needs
2. Create mobile-first component structure
3. Implement responsive behavior for each breakpoint
4. Add touch and keyboard interactions
5. Test accessibility compliance
6. Optimize performance and animations

**Output Format**:
- Complete component implementation (HTML/SCSS/JS)
- Responsive behavior documentation
- Accessibility compliance report
- Performance optimization details
- Cross-browser testing results

**When to Use**:
- Creating new UI components
- Refactoring existing components for better responsiveness
- Implementing new interaction patterns
- Ensuring consistent user experience across devices

**GOAP Integration**:
- Action: design_responsive_component
- Preconditions: design_requirements_defined=true, breakpoints_specified=true
- Effects: component_implemented=true, responsive_behavior_verified=true
- Cost: 4

## implement_accessibility_features

**Description**: Implements WCAG 2.1 AA compliant accessibility features for web components.

**Input Schema**:
- component_element (string): HTML element or component to enhance
- accessibility_level (enum): WCAG compliance level [A, AA, AAA]
- user_groups (array): User groups to support [motor, visual, cognitive]

**Implementation Sequence**:
1. Audit current accessibility state
2. Implement semantic HTML structure
3. Add ARIA labels and roles
4. Ensure keyboard navigation support
5. Verify color contrast ratios
6. Test with screen readers and assistive technologies

**Output Format**:
- Accessibility implementation report
- WCAG compliance checklist
- Screen reader testing results
- Keyboard navigation verification
- Color contrast analysis

**When to Use**:
- Developing new interactive components
- Refactoring existing components for accessibility
- Preparing for accessibility audits
- Ensuring inclusive user experience

**GOAP Integration**:
- Action: implement_accessibility_features
- Preconditions: component_exists=true, accessibility_requirements_defined=true
- Effects: accessibility_implemented=true, wcag_compliant=true
- Cost: 3

## optimize_css_performance

**Description**: Optimizes CSS for maximum performance and minimal render blocking.

**Input Schema**:
- css_files (array): CSS files to optimize
- optimization_targets (array): Performance goals [critical_css, unused_css, render_blocking]
- browser_support (array): Target browsers for optimization

**Implementation Sequence**:
1. Analyze current CSS performance metrics
2. Identify render-blocking resources
3. Extract and inline critical CSS
4. Remove unused CSS rules
5. Optimize CSS delivery and caching
6. Test performance improvements

**Output Format**:
- CSS optimization report
- Performance improvement metrics
- Critical CSS extraction results
- Bundle size reduction analysis
- Loading performance comparison

**When to Use**:
- Optimizing page load performance
- Reducing CSS bundle sizes
- Improving Core Web Vitals scores
- Preparing for production deployment

**GOAP Integration**:
- Action: optimize_css_performance
- Preconditions: css_files_accessible=true, performance_targets_defined=true
- Effects: css_optimized=true, performance_improved=true
- Cost: 3

## implement_touch_gestures

**Description**: Implements touch gesture recognition and handling for mobile interactions.

**Input Schema**:
- gesture_types (array): Gestures to implement [swipe, pinch, tap, pan]
- component_element (string): Element to attach gesture handlers
- gesture_callbacks (object): Callback functions for each gesture

**Implementation Sequence**:
1. Set up touch event listeners
2. Implement gesture recognition logic
3. Handle multi-touch interactions
4. Add gesture conflict resolution
5. Test on various mobile devices
6. Ensure fallback for non-touch devices

**Output Format**:
- Gesture implementation code
- Touch event handling documentation
- Multi-device testing results
- Gesture conflict resolution strategy
- Fallback behavior documentation

**When to Use**:
- Adding mobile interactions to components
- Implementing swipe navigation
- Creating touch-based controls
- Enhancing mobile user experience

**GOAP Integration**:
- Action: implement_touch_gestures
- Preconditions: touch_requirements_defined=true, component_ready=true
- Effects: touch_gestures_implemented=true, mobile_interactions_verified=true
- Cost: 3

## create_animation_system

**Description**: Creates smooth, performant animations and transitions for UI components.

**Input Schema**:
- animation_type (enum): Type of animation [transition, keyframe, javascript]
- target_elements (array): Elements to animate
- animation_properties (object): Animation duration, easing, properties

**Implementation Sequence**:
1. Define animation requirements and triggers
2. Implement CSS transitions and keyframes
3. Add JavaScript animation logic if needed
4. Optimize for hardware acceleration
5. Respect user motion preferences
6. Test animation performance

**Output Format**:
- Animation implementation code
- Performance optimization details
- Hardware acceleration verification
- Motion preference handling
- Cross-browser compatibility report

**When to Use**:
- Adding visual feedback to interactions
- Creating smooth state transitions
- Implementing loading animations
- Enhancing user experience with motion

**GOAP Integration**:
- Action: create_animation_system
- Preconditions: animation_requirements_defined=true, performance_targets_set=true
- Effects: animations_implemented=true, performance_optimized=true
- Cost: 3

## validate_cross_browser_compatibility

**Description**: Validates component behavior across different browsers and devices.

**Input Schema**:
- component_element (string): Component to test
- browser_matrix (array): Browsers to test against
- test_scenarios (array): Test cases to run

**Implementation Sequence**:
1. Set up cross-browser testing environment
2. Run automated compatibility tests
3. Identify browser-specific issues
4. Implement polyfills and fallbacks
5. Test on real devices and browsers
6. Document compatibility limitations

**Output Format**:
- Cross-browser testing report
- Compatibility issue documentation
- Polyfill and fallback implementations
- Browser support matrix
- Testing recommendations

**When to Use**:
- After implementing new features
- Before production deployment
- When supporting new browsers
- Troubleshooting browser-specific issues

**GOAP Integration**:
- Action: validate_cross_browser_compatibility
- Preconditions: component_implemented=true, browser_matrix_defined=true
- Effects: compatibility_validated=true, fallbacks_implemented=true
- Cost: 3

## implement_lazy_loading

**Description**: Implements lazy loading for images and components to improve page performance.

**Input Schema**:
- content_type (enum): Type of content to lazy load [images, components, scripts]
- trigger_type (enum): When to trigger loading [viewport, scroll, click]
- loading_strategy (enum): Loading approach [native, intersection_observer, custom]

**Implementation Sequence**:
1. Identify content suitable for lazy loading
2. Implement loading trigger mechanism
3. Add loading states and placeholders
4. Handle loading errors gracefully
5. Test loading performance improvements
6. Verify accessibility of loading states

**Output Format**:
- Lazy loading implementation code
- Performance improvement metrics
- Loading state designs
- Error handling documentation
- Accessibility compliance verification

**When to Use**:
- Optimizing page load performance
- Handling large image galleries
- Implementing progressive content loading
- Reducing initial page weight

**GOAP Integration**:
- Action: implement_lazy_loading
- Preconditions: content_identified=true, performance_goals_defined=true
- Effects: lazy_loading_implemented=true, performance_improved=true
- Cost: 2

## design_component_api

**Description**: Designs clean, intuitive APIs for reusable UI components.

**Input Schema**:
- component_purpose (string): Purpose and use cases for the component
- configuration_options (object): Available configuration parameters
- event_system (object): Events the component can emit

**Implementation Sequence**:
1. Define component public API
2. Implement configuration validation
3. Add event emission system
4. Create usage examples and documentation
5. Test API usability and flexibility
6. Ensure backward compatibility

**Output Format**:
- Component API documentation
- Configuration schema
- Event system specification
- Usage examples and patterns
- API testing results

**When to Use**:
- Creating reusable UI components
- Refactoring component interfaces
- Improving developer experience
- Ensuring component maintainability

**GOAP Integration**:
- Action: design_component_api
- Preconditions: component_requirements_defined=true, use_cases_identified=true
- Effects: api_designed=true, usability_verified=true
- Cost: 3