module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ['plugin:vue/vue3-essential', '@vue/standard'],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    // quotes: [1, 'single'],
    // semi: [1, 'never'],
    // 'comma-dangle': [1, 'always-multiline'],
    // 'space-before-blocks': [2, 'never'],
    // 'space-before-function-paren': [2, 'never'],
  }
}
