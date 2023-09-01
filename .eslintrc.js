/*
 * @Author: yangxiaosen
 * @Date: 2023-04-06 14:59:03
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-06 15:11:33
 * @FilePath: \text\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-new': 'off',
    'no-used-vars': 'off'
  }
}
