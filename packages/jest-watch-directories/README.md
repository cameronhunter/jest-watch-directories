# jest-watch-directories [![npm version](https://badge.fury.io/js/jest-watch-directories.svg)](https://npmjs.com/package/jest-watch-directories)

A Jest watch plugin to select which directories to test.

## Usage

### Install

Install `jest` (it needs Jest 23+) and `jest-watch-directories`

```sh
yarn add --dev jest jest-watch-directories

# or with NPM

npm install --save-dev jest jest-watch-directories
```

### Add it to your Jest config

In your `package.json`

```json
{
  "jest": {
    "watchPlugins": [
      ["jest-watch-directories", { "directories": ["packages/*"] }]
    ]
  }
}
```

Or in `jest.config.js`

```js
module.exports = {
  watchPlugins: [
    ['jest-watch-directories', { directories: ['packages/*'] }]
  ]
};
```

Run Jest in watch mode

```sh
yarn jest --watch
```

## FAQ

Why is this not filtering my directories?

Make certain that you're using the SPACE key to toggle the selected state of directories and the ENTER key to confirm your settings.
