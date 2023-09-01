<!--
 * @Author: yangxiaosen
 * @Date: 2023-04-03 16:23:07
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-14 15:31:02
 * @FilePath: \text\src\App.vue
-->
<template>
  <div id="app">
    <!-- 声明式导航 -->
    <TabBar ref="mytabbar" v-show="$store.state.isTabbarShow"></TabBar>
    <!-- 路由容器 -->
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>
<script>
import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";
import TabBar from "@/components/TabBar";
Vue.use(Vant); // vue.components全局注册

export default {
  components: {
    TabBar,
  },
};
</script>
<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}
section {
  width: 100%;
  margin-bottom: 40px;
}
</style>
