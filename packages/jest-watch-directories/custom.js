const glob = require('glob');
const isPathInside = require('is-path-inside');
const MessageFormat = require('messageformat');
const path = require('path');
const prompts = require('prompts');
const { clearScreen } = require('ansi-escapes');

module.exports = (getPluginConfig) =>
  class {
    constructor({ config: pluginConfig, stdin, stdout }) {
      this._stdin = stdin;
      this._stdout = stdout;
      this._pluginConfigOverrides = pluginConfig || {};
      this._selectedDirectories = [];
    }

    getPluginConfig(rootDir) {
      const config = Object.assign(
        // Default configuration
        {
          key: 'd',
          prompt: 'filter by directory{selectionCount, plural, =0 {} other { (# selected)}}',
          message: 'Select directories',
          lang: 'en',
          directories: ['*']
        },
        // Configuration injected by a wrapping plugin (e.g. jest-watch-yarn-workspaces)
        getPluginConfig(rootDir),
        // Configuration specified as part of jest configuration
        this._pluginConfigOverrides
      );

      return Object.assign(config, {
        prompt: new MessageFormat(config.lang).compile(config.prompt)
      });
    }

    apply(jestHooks) {
      jestHooks.shouldRunTestSuite(({ testPath: absoluteTestPath, config: globalConfig }) => {
        if (this._selectedDirectories.length === 0) {
          return true;
        } else {
          return this._selectedDirectories.some((directory) => {
            const testPath = path.relative(globalConfig.rootDir, absoluteTestPath);
            return isPathInside(testPath, directory);
          });
        }
      });
    }

    getUsageInfo(globalConfig) {
      const { key, prompt } = this.getPluginConfig(globalConfig.rootDir);
      const selectionCount = this._selectedDirectories.length;

      return {
        key,
        prompt: prompt({ selectionCount })
      };
    }

    run(globalConfig, _updateConfigAndRun) {
      const { rootDir } = globalConfig;
      const config = this.getPluginConfig(rootDir);

      const directories = config.directories.reduce(
        (state, directoryGlob) => [
          ...state,
          ...glob.sync(
            directoryGlob.endsWith('/') ? directoryGlob : directoryGlob + '/', // Only match directories
            { cwd: rootDir }
          )
        ],
        []
      );

      this._stdout.write(clearScreen);

      return prompts([
        {
          type: 'multiselect',
          name: 'activeWorkspaces',
          message: config.message,
          choices: directories.map((name) => ({
            value: name,
            selected: this._selectedDirectories.includes(name)
          }))
        }
      ]).then(({ activeWorkspaces }) => {
        this._stdin.setRawMode(true);
        this._stdin.resume();

        if (activeWorkspaces !== undefined) {
          this._selectedDirectories = activeWorkspaces;
          return true;
        }

        return Promise.reject();
      });
    }
  };
