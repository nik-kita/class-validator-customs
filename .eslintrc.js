module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    quotes: ['error', 'single'],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};

// {
//   "env": {
//     "es2021": true,
//     "node": true,
//     "jest": true
//   },
//   "settings": {
//     "import/resolver": {
//       "node": {
//         "extensions": [
//           ".js",
//           ".jsx",
//           ".ts",
//           ".tsx"
//         ]
//       }
//     }
//   },
//   "extends": [
//     "airbnb-base"
//   ],
//   "parser": "@typescript-eslint/parser",
//   "root": true,
//   "parserOptions": {
//     "project": "tsconfig.json",
//     "tsconfigRootDir": ".",
//     "ecmaVersion": "latest",
//     "sourceType": "module"
//   },
//   "plugins": [
//     "@typescript-eslint"
//   ],
//   "rules": {
//     "camelcase": "off",
//     "indent": [
//       "error",
//       2,
//       {
//         "MemberExpression": 1,
//         "ignoredNodes": [
//           "FunctionExpression > .params[decorators.length > 0]",
//           "FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
//           "ClassBody.body > PropertyDefinition[decorators.length > 0] > .key"
//         ]
//       }
//     ],
//     "semi": [
//       "error",
//       "always"
//     ],
//     "quote-props": [
//       "error",
//       "as-needed"
//     ],
//     "import/prefer-default-export": "off",
//     "no-useless-constructor": "off",
//     "import/no-extraneous-dependencies": [
//       "error",
//       {
//         "devDependencies": true
//       }
//     ],
//     "quotes": [
//       2,
//       "single",
//       {
//         "avoidEscape": true,
//         "allowTemplateLiterals": true
//       }
//     ],
//     "@typescript-eslint/no-unused-vars": [
//       "error"
//     ],
//     "no-empty-function": "off",
//     "class-methods-use-this": "off",
//     "no-underscore-dangle": "off",
//     "import/extensions": [
//       "error",
//       "ignorePackages",
//       {
//         "js": "never",
//         "jsx": "never",
//         "ts": "never",
//         "tsx": "never"
//       }
//     ],
//     "no-plusplus": "off",
//     "max-len": "off",
//     "no-console": [
//       "warn",
//       {
//         "allow": [
//           "info",
//           "warn",
//           "error"
//         ]
//       }
//     ]
//   }
// }