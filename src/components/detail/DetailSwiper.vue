<!--
 * @Author: yangxiaosen
 * @Date: 2023-04-06 15:01:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-10 11:09:34
 * @FilePath: \text\src\components\detail\DetailSwiper.vue
-->
<template>
    <div class="swiper" :class="name">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
    </div>

</template>
<script>
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'
export default {
  props: {
    boxInclude: {
      type: Number,
      default: 1
    },
    name: {
      type: String,
      default: ''
    }

  },
  data () {
    return {

    }
  },
  mounted () {
    new Swiper(`.${this.name}`, {
      slidesPerView: this.boxInclude,
      spaceBetween: 20,
      freeMode: true
    })
  }
}
</script>
<style lang="scss" scoped>
</style>
