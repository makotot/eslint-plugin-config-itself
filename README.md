# eslint-plugin-config-itself

> A ESLint plugin for ESLint config itself

flat config is not supported now.

## Install

```sh
$ npm i -D eslint-plugin-config-itself
```

## Usage

Add `config-itself` to the plugins section of your `.eslintrc.js` configuration file. You can omit the `eslint-plugin-` prefix:

```js
module.exports = {
  plugins: ['config-itself'],
}
```

## Supported rules

| Name                                                           | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- |
| [`max-warn-level-rules`](./docs/rules/max-warn-level-rules.md) | Enforce a maximum number of warn level rules in `.eslintrc.js` |

## License

MIT
