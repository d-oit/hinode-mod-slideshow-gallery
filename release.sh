#!/bin/bash

# Step 1: Ensure the repository is up-to-date
git pull origin main  # Pull the latest changes from the main branch

# Step 2: Extract the version from package.json
VERSION=$(grep -oP '"version":.*?[^\\]",' package.json | awk -F '"' '{print $4}')  # Get version from package.json

# Step 3: Run tests before proceeding with the release
echo "Running tests..."
npm run test  # Run the tests

# Check if the tests passed
if [ $? -ne 0 ]; then
  echo "Tests failed! Release aborted."
  exit 1  # Exit the script if tests fail
fi

# Step 4: Update documentation (optional: commit changes before tagging)
# Example: update changelog or README with new version info
# Make sure the documentation is updated to reflect the new version

git add .  # Stage changes (if any)
git commit -m "Update documentation for release v$VERSION"  # Commit documentation changes (optional)
git push origin main  # Push changes to remote repository

# Step 5: Create a new Git tag using the version from package.json
git tag -a "v$VERSION" -m "Release version $VERSION"

# Step 6: Push the tag to GitHub
git push origin "v$VERSION"  # Push the specific tag to GitHub

# Step 7: Create a release on GitHub using Git commands
# Create a release branch
git checkout -b release/v$VERSION

# Push the release branch to GitHub
git push origin release/v$VERSION

# Step 8: Verify that the release and tag are created correctly on GitHub
# Check your GitHub repository under the "Releases" section for confirmation
