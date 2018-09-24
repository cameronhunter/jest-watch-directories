const path = require('path');
const jestWatchDirectories = require('jest-watch-directories/custom');

function findWorkspaces(rootDir) {
  let packageConfig;

  try {
    packageConfig = require(path.resolve(rootDir, 'package.json'));
  } catch (ignore) {
    packageConfig = {};
  }

  const yarnWorkspaces = packageConfig.workspaces;

  const directories = !yarnWorkspaces || Array.isArray(yarnWorkspaces) ? yarnWorkspaces : [yarnWorkspaces];
  return {
    key: 'y',
    prompt: 'filter by Yarn workspaces{selectionCount, plural, =0 {} other { (# selected)}}',
    message: 'Select yarn workspaces',
    directories
  };
}

module.exports = jestWatchDirectories(findWorkspaces);
