<!--
 * @Author: yangxiaosen
 * @Date: 2023-04-08 23:33:44
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-13 23:18:10
 * @FilePath: \text\src\components\films\FilmHeader.vue
-->
<template lang="">
  <div>
    <ul>
      <!-- vue-router @3以及以前用tag语法 -->
      <!-- <router-link tag="li"  to="/films" active-class="groupOne">
                <span>电影</span>
            </router-link> -->
      <!-- vue-router @4版本用插槽语法 -->
      <router-link to="nowplaying" exact custom v-slot="{ navigate, isActive }">
        <li @click="navigate">
          <span :class="isActive ? 'activeheader' : ''">正在热映</span>
        </li>
      </router-link>
      <router-link to="comingsoon" exact custom v-slot="{ navigate, isActive }">
        <li @click="navigate">
          <span :class="isActive ? 'activeheader' : ''">即将上映</span>
        </li>
      </router-link>
    </ul>
  </div>
</template>
<script></script>
<style lang="scss" scoped>
.activeheader {
  color: red;
  border-bottom: 2px solid red;
}
.router-link-exact-active {
  color: #ff5f16;
}
.router-link-active {
  color: #ff5f16;
}
ul {
  background-color: white;

  display: flex;
  height: 1rem;
  line-height: 1rem;
  list-style: none;

  li {
    flex: 1;
    text-align: center;
    font-size: 16px;
  }
}
</style>
