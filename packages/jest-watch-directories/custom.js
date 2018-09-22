const prompts = require('prompts');
const ansiEscapes = require('ansi-escapes');
const path = require('path');
const glob = require('glob');
const isPathInside = require('is-path-inside');

module.exports = (findDirectories) => class {
  constructor({ config: jestConfig }) {
    const rootDir = jestConfig.rootDir || process.cwd();
    const config = findDirectories(rootDir, jestConfig) || {};

    this._rootDir = rootDir;
    this._key = jestConfig.key || config.key || 'd';
    this._prompt = jestConfig.prompt || config.prompt || 'filter by directory';
    this._message = jestConfig.message || config.message || 'Select directories';
    this._directories = (jestConfig.directories || config.directories || ['*']).reduce(
      (state, directoryGlob) => [
        ...state,
        ...glob.sync(
          directoryGlob.endsWith('/') ? directoryGlob : directoryGlob + '/', // Only match directories
          { cwd: rootDir }
        )
      ],
      []
    );

    this._activeWorkspaces = [];
  }

  apply(jestHooks) {
    jestHooks.shouldRunTestSuite(({ testPath: absoluteTestPath }) => {
      return this._activeWorkspaces.some((workspace) => {
        const testPath = path.relative(this._rootDir, absoluteTestPath);
        return isPathInside(testPath, workspace);
      });
    });
  }

  getUsageInfo(globalConfig) {
    return {
      key: this._key,
      prompt: this._prompt
    };
  }

  run(globalConfig, updateConfigAndRun) {
    console.log(ansiEscapes.clearScreen);
    return prompts([{
      type: 'multiselect',
      name: 'activeWorkspaces',
      message: this._message,
      choices: this._directories.map((name) => ({
        value: name,
        selected: this._activeWorkspaces[name]
      }))
    }]).then(({ activeWorkspaces }) => {
      process.stdin.setRawMode(true);
      process.stdin.resume();

      if (activeWorkspaces !== undefined) {
        this._setActiveWorkspaces(activeWorkspaces);
        return true;
      }

      return Promise.reject();
    });
  }

  _setActiveWorkspaces(activeWorkspaces) {
    this._activeWorkspaces = activeWorkspaces;
  }
}
