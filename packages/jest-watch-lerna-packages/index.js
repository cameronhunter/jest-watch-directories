const path = require('path');
const jestWatchDirectories = require('jest-watch-directories/custom');

function findPackages(rootDir) {
  let lernaConfig;

  try {
    lernaConfig = require(path.resolve(rootDir, 'lerna.json'));
  } catch (ignore) {
    lernaConfig = {};
  }

  const lernaPackages = lernaConfig.packages;

  const directories = !lernaPackages || Array.isArray(lernaPackages) ? lernaPackages : [lernaPackages];
  return { key: 'l', prompt: 'filter by lerna packages', message: 'Select lerna packages', directories };
}

module.exports = jestWatchDirectories(findPackages);
