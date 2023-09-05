/*
 * @Author: yangxiaosen
 * @Date: 2023-04-02 21:01:37
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-02 21:49:15
 * @FilePath: \test2008\vue.config.js
 */
// vue 项目的配置文件覆盖

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint检查
  lintOnSave: true

})
