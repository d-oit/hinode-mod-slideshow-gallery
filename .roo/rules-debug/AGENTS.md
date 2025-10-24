# Project Debug Rules (Non-Obvious Only)

- Playwright tests require Hugo server running (auto-started by config, not manual)
- Test command (npm run test) builds only, not runs tests (use npm run test:playwright)
- Module vendoring failures prevent builds silently (check go.mod dependencies)
- Example site serves as build target, not separate debug environment
- Resources directory cleaned with public (non-standard Hugo debug workflow)