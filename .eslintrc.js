module.exports = {
  extends: ['./node_modules/poetic/config/eslint/eslint-config.js'],
  // Add custom rules here
  plugins: ['import'],
  rules: {
    'no-unused-expressions': 'off', // https://github.com/eslint/eslint/issues/12822
    'react/jsx-props-no-spreading': [
      'warn',
      {
        exceptions: ['App', 'Component'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        directory: '.',
      },
    },
  },
};
