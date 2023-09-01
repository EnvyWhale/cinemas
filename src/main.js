/*
 * @Author: yangxiaosen
 * @Date: 2023-04-02 21:01:37
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-14 15:30:25
 * @FilePath: \text\src\main.js
 * 修复eslint方法：1.npm run lint
 *2.安装eslint插件，配置信息："editor.codeActionsOnSave": {"source.fixAll": true}
 *3.停掉lint服务，等最后在启用并修复
 */
import Vue from 'vue' // es6导入方式
import App from './App.vue' // 导入根组件app
// import navbar from './components/Navbar.vue' // 1.引入组件
import router from './router'
import store from './store'
import moment from 'moment'
import 'amfe-flexible'
Vue.prototype.$moment = moment
Vue.config.productionTip = false
// Vue.component('navbar', Navbar) // 1.1全局注册组件
new Vue({
  router, // this.$router == router
  store, // this.$store == store
  render: h => h(App) // VUE支持的新写法
}).$mount('#app')
