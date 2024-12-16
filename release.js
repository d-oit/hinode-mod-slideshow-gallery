const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to read the current version from package.json
function getCurrentVersion() {
  const packageJsonPath = path.join(__dirname, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  return packageJson.version;
}

// Function to run npm tests
function runTests() {
  try {
    execSync('npm run test', { stdio: 'inherit' });
    console.log('Tests passed successfully.');
  } catch (error) {
    console.error('Tests failed:', error.message);
    process.exit(1);
  }
}

// Function to update README.md with the new version number
function updateReadme(version) {
  const readmePath = path.join(__dirname, 'README.md');
  let readmeContent = fs.readFileSync(readmePath, 'utf8');
  readmeContent = readmeContent.replace(/Current version: [\d\.]+/g, `Current version: ${version}`);
  fs.writeFileSync(readmePath, readmeContent, 'utf8');
  console.log('README.md updated with the new version number.');
}

// Function to update CHANGELOG.md with a new entry for the current version
function updateChangelog(version) {
  const changelogPath = path.join(__dirname, 'CHANGELOG.md');
  const changelogContent = fs.readFileSync(changelogPath, 'utf8');
  const newEntry = `## [${version}] - ${new Date().toISOString().split('T')[0]}\n\n### Added\n- Summary of changes\n\n`;
  const updatedChangelog = newEntry + changelogContent;
  fs.writeFileSync(changelogPath, updatedChangelog, 'utf8');
  console.log('CHANGELOG.md updated with a new entry for the current version.');
}

// Function to commit the updated README and CHANGELOG files
function commitChanges(version) {
  try {
    execSync('git add README.md CHANGELOG.md', { stdio: 'inherit' });
    execSync(`git commit -m "Release version ${version}"`, { stdio: 'inherit' });
    console.log('Changes committed successfully.');
  } catch (error) {
    console.error('Failed to commit changes:', error.message);
    process.exit(1);
  }
}

// Function to create a new Git tag for the release
function createGitTag(version) {
  try {
    execSync(`git tag -a v${version} -m "Release version ${version}"`, { stdio: 'inherit' });
    console.log('Git tag created successfully.');
  } catch (error) {
    console.error('Failed to create Git tag:', error.message);
    process.exit(1);
  }
}

// Function to push the changes and the new tag to the remote repository
function pushChanges() {
  try {
    execSync('git push origin main', { stdio: 'inherit' });
    execSync('git push origin --tags', { stdio: 'inherit' });
    console.log('Changes and tag pushed to the remote repository successfully.');
  } catch (error) {
    console.error('Failed to push changes:', error.message);
    process.exit(1);
  }
}

// Function to create a GitHub release using the GitHub CLI (gh)
function createGitHubRelease(version) {
  try {
    execSync(`gh release create v${version} --title "Release version ${version}" --notes "Summary of changes"`, { stdio: 'inherit' });
    console.log('GitHub release created successfully.');
  } catch (error) {
    console.error('Failed to create GitHub release:', error.message);
    process.exit(1);
  }
}

// Main function to orchestrate the release process
function release() {
  const version = getCurrentVersion();
  console.log('Current version:', version);

  runTests();
  updateReadme(version);
  updateChangelog(version);
  commitChanges(version);
  createGitTag(version);
  pushChanges();
  createGitHubRelease(version);

  console.log('Release process completed successfully.');
}

// Run the release process
release();
