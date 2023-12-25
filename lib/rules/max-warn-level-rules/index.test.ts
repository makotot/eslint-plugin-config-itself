import { RuleTester } from '@typescript-eslint/utils/ts-eslint'
import { rule, name } from './'

const ruleTester = new RuleTester()

ruleTester.run(name, rule, {
  valid: [
    {
      filename: 'not-eslintrc.js',
      code: 'module.exports = { rules: { "no-undef": "warn" } }',
    },
    {
      filename: '.eslintrc.js',
      code: 'module.exports = { rules: { "no-undef": "off" } }',
    },
    {
      filename: '.eslintrc.js',
      code: 'module.exports = { rules: { "no-undef": "error" } }',
    },
    {
      filename: '.eslintrc.js',
      code: 'module.exports = { rules: { "no-undef": ["error"] } }',
    },
    {
      filename: '.eslintrc.js',
      code: 'module.exports = { rules: { "no-undef": ["error"] } }',
      options: [{ max: 0 }],
    },
    {
      filename: '.eslintrc.js',
      code: 'module.exports = { rules: { "no-undef": ["warn"] } }',
      options: [{ max: 1 }],
    },
    {
      filename: '.eslintrc.js',
      code: 'module.exports = { rules: { "no-undef": ["warn"], "curly": ["warn"], "eqeqeq": ["warn"] } }',
      options: [{ max: 5 }],
    },
  ],

  invalid: [
    {
      filename: '.eslintrc.js',
      code: 'module.exports = { rules: { "no-undef": "warn" } }',
      errors: [{ messageId: 'maxWarnLevelRules' }],
    },
    {
      filename: '.eslintrc.cjs',
      code: 'module.exports = { rules: { "no-undef": "warn" } }',
      errors: [{ messageId: 'maxWarnLevelRules' }],
    },
    {
      filename: '.eslintrc.js',
      code: 'module.exports = { rules: { "no-undef": ["warn"] } }',
      errors: [{ messageId: 'maxWarnLevelRules' }],
    },
    {
      filename: '.eslintrc.js',
      code: 'module.exports = { rules: { "no-undef": ["warn"] } }',
      options: [{ max: 0 }],
      errors: [{ messageId: 'maxWarnLevelRules' }],
    },
    {
      filename: '.eslintrc.js',
      code: 'module.exports = { rules: { "no-undef": ["warn"], "curly": ["warn"] } }',
      options: [{ max: 1 }],
      errors: [{ messageId: 'maxWarnLevelRules' }],
    },
    {
      filename: '.eslintrc.js',
      code: 'module.exports = { rules: { "no-undef": ["warn"], "curly": ["warn"], "eqeqeq": ["warn"] } }',
      options: [{ max: 2 }],
      errors: [{ messageId: 'maxWarnLevelRules' }],
    },

    {
      filename: '.eslintrc.js',
      code: `
module.exports = {
  "rules": {
    "quotes": "off"
  },
  "overrides": [
    {
      "files": ["lib/*.js"],
      "rules": {
        "quotes": "warn"
      }
    }
  ]
}
      `,
      options: [{ max: 0 }],
      errors: [{ messageId: 'maxWarnLevelRules' }],
    },

    {
      filename: '.eslintrc.js',
      code: `
module.exports = {
  "rules": {
    "no-undef": "warn",
    "quotes": "off",
  },
  "overrides": [
    {
      "files": ["lib/*.js"],
      "rules": {
        "quotes": "warn"
      }
    }
  ]
}
      `,
      options: [{ max: 1 }],
      errors: [{ messageId: 'maxWarnLevelRules' }],
    },
  ],
})
