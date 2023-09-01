<!-- eslint-disable vue/multi-word-component-names -->
<!--
* @Author: yangxiaosen
* @Date: 2023-04-06 15:01:50
* @LastEditors: Do not edit
* @LastEditTime: 2023-04-13 18:59:12
* @FilePath: \text\src\views\Films.vue
-->
<template>
  <div>
    <!-- 3.使用轮播组件和swiperItem组件 -->
    <film-swiper> </film-swiper>
    <film-header class="sticky"></film-header>
    <!-- 路由组件，电影列表 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
// 1.引入swiper组件
import filmSwiper from "@/components/films/FilmSwiper";
import filmHeader from "@/components/films/FilmHeader";
export default {
  // 2.注册swiper组件
  components: {
    filmSwiper,
    filmHeader,
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.sticky {
  position: sticky;
  top: 0px;
  z-index: 3;
}
</style>
