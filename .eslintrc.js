module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-unused-vars': 'off', // 未使用の変数
    '@typescript-eslint/no-unused-vars': 'warn', // 未使用の変数
    'no-ternary': 'off', // 三項演算子
    'no-nested-ternary': 'off', // 三項演算子
    'no-unneeded-ternary': 'off', // 三項演算子
    'no-useless-constructor': 'off', // 不要なコンストラクタを許可しない
    'vue/no-unused-components': 'off', // 使用していないコンポーネント
    'prefer-const': 'off', // 強制const変数
    'comma-dangle': 'off', // 最後のカンマあり
    'vue/multi-word-component-names': 'off',
    // '@typescript-eslint/naming-convention': 'warn',
  },
}
