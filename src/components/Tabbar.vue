<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer>
    <ul class="nav_list">
      <router-link tag="li" to="/films">
        <i class="iconfont icon-viewlist"></i>
        <span>电影</span>
      </router-link>
      <router-link tag="li" to="/cinemas">
        <i class="iconfont icon-viewgallery"></i>
        <span>影院</span>
      </router-link>
      <router-link tag="li" to="/center">
        <i class="iconfont icon-account"></i>
        <span>我的</span>
      </router-link>
    </ul>
  </footer>
</template>
<script>
import '../assets/iconfont/iconfont.css'
export default {}
</script>
<style lang="scss" scoped>
footer {
  z-index: 3;
  width: 100%;
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: white;
  height: 50px;

  ul {
    height: 100%;
    width: 100%;
    display: flex;
    list-style: none;

    li {
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;

      i {
        font-size: 16px;
      }

      span {
        margin-top: 5px;
        line-height: 16px;
        font-size: 16px;
      }
    }
  }
}

// 设置active-class，会覆盖官方默认的router-link-active(当前选中标签的class样式)

.router-link-active {
  color: #ff5f16;
}
.groupOne {
  color: #ff5f16;
}
</style>
