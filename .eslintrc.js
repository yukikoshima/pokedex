module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-unused-vars': 'off', // 未使用の変数
    'prefer-const': 'off', // 強制const変数
    'no-ternary': 'off', // 三項演算子
    'no-nested-ternary': 'off', // 三項演算子
    'no-unneeded-ternary': 'off', // 三項演算子
  },
}
