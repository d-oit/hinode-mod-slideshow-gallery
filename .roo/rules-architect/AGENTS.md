# Project Architecture Rules (Non-Obvious Only)

- Hugo module uses Go 1.19+ with extended version requirement (not standard Hugo setup)
- Module vendoring mandatory before builds (Go mod indirect dependencies)
- Example site serves as both demo and build target (dual-purpose architecture)
- Resources directory cleaned with public (non-standard Hugo resource management)
- Module structure uses Hugo mounts for all assets (not traditional Hugo directories)
- Hinode framework modules integrated through Go mod (framework-specific architecture)