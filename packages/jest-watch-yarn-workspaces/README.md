# jest-watch-yarn-workspaces

A Jest watch plugin to select Yarn workspaces to test.

## Usage

### Install

Install `jest` (it needs Jest 23+) and `jest-watch-yarn-workspaces`

```sh
yarn add --dev jest jest-watch-yarn-workspaces

# or with NPM

npm install --save-dev jest jest-watch-yarn-workspaces
```

### Add it to your Jest config

In your `package.json`

```json
{
  "jest": {
    "watchPlugins": ["jest-watch-yarn-workspaces"]
  }
}
```

Or in `jest.config.js`

```js
module.exports = {
  watchPlugins: ['jest-watch-yarn-workspaces']
};
```

Run Jest in watch mode

```sh
yarn jest --watch
```

## FAQ

Why is this not filtering my workspaces?

Make certain that you're using the SPACE key to toggle the selected state of workspaces and the ENTER key to confirm your settings.
