# Enforce a maximum number of warn level rules in .eslintrc.js `max-warn-level-rules`

## Rule Details

Example of incorrect code for this rule with `max: 0`:

```js
module.exports = {
  plugins: ["config-itself"],
  rules: {
    "no-undef": "warn",
    "config-itself/max-warn-level-rules": "error",
  },
};
```

Examples of correct code for this rule:

```js
module.exports = {
  plugins: ["config-itself"],
  rules: {
    "no-undef": "error",
    "config-itself/max-warn-level-rules": "error",
  },
};
```

## Options

### `max`

Maximum number of warning level rules. Default to 0.
