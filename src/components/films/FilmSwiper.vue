<!--
 * @Author: yangxiaosen
 * @Date: 2023-04-06 15:01:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-18 17:07:27
 * @FilePath: \text\src\components\films\FilmSwiper.vue
-->
<template>
  <div class="swiper mySwiper">
    <div class="swiper-wrapper">
      <film-swiper-item
        v-for="data in datalist"
        :key="data.id"
        class="filmswiperitemimg"
      >
        <img :src="data.poster" />
      </film-swiper-item>
    </div>
    <!-- 如果需要滚动条 -->
    <!-- <div class="swiper-scrollbar"></div> -->
  </div>
</template>
<script>
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'
import axios from 'axios'
import filmSwiperItem from '@/components/films/FilmSwiperItem'

export default {
  data () {
    return {
      datalist: []
    }
  },
  components: {
    filmSwiperItem
  },
  mounted () {
    new Swiper('.mySwiper', {
      // 如果需要滚动条器
      // scrollbar: {
      //   el: '.swiper-scrollbar',
      //   hide: true
      // },
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      }
    })
    axios({
      url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=5&type=1&k=5545971',
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.2.1","e":"16810184282822338974318593","bc":"110100"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {
      // console.log(res.data.data.films)
      this.datalist = res.data.data.films
    })
  }
}
</script>
<style lang="scss" scoped>
.swiper {
  width: 100vw;
  overflow: hidden;
  position: relative;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.filmswiperitemimg {
  img {
    width: 100%;
    height: 300px;
  }
}
</style>
