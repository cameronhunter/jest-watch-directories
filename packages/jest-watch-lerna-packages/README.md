# jest-watch-lerna-packages [![npm version](https://badge.fury.io/js/jest-watch-lerna-packages.svg)](https://npmjs.com/package/jest-watch-lerna-packages)

A Jest watch plugin to select [Lerna packages](https://lernajs.io/) to test

## Usage

### Install

Install `jest` (it needs Jest 23+) and `jest-watch-lerna-packages`

```sh
yarn add --dev jest jest-watch-lerna-packages

# or with NPM

npm install --save-dev jest jest-watch-lerna-packages
```

### Add it to your Jest config

In your `package.json`

```json
{
  "jest": {
    "watchPlugins": ["jest-watch-lerna-packages"]
  }
}
```

Or in `jest.config.js`

```js
module.exports = {
  watchPlugins: ['jest-watch-lerna-packages']
};
```

Run Jest in watch mode

```sh
yarn jest --watch
```

## FAQ

Why is this not filtering my packages?

Make certain that you're using the SPACE key to toggle the selected state of packages and the ENTER key to confirm your settings.
