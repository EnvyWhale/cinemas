<!-- eslint-disable vue/multi-word-component-names -->
<!--
 * @Author: yangxiaosen
 * @Date: 2023-04-04 15:53:42
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-14 16:11:30
 * @FilePath: \text\src\views\Detail.vue
-->
<template>
    <div v-if="filmdata" :key="filmdata.filmId">
      <detail-header v-scroll>{{ filmdata.name }}</detail-header>
      <div :style="{
        backgroundImage: 'url('+filmdata.poster+')'
      }" class="poster"></div>
      <div class="content">
        <div style="font-size: 18px;">{{ filmdata.name }}</div>
        <div class="detailtext">
          <div class="detail-text">{{ filmdata.category }}</div>
          <div class="detail-text">{{ filmdata.premiereAt | dateFilter }}上映</div>
          <div class="detail-text">{{filmdata.nation}} | {{ filmdata.runtime }}分钟</div>
          <div class="detail-text" style="line-height: 15px;" :class="isHidden?'hidden':''">{{ filmdata.synopsis }}</div>
          <div style="text-align: center;"><i class="iconfont" :class="isHidden?'icon-moreunfold':'icon-less'" @click="isHidden=!isHidden"></i></div>
        </div>
        <!-- 演职人员 -->
        <div class="actorsbox">
          <div style=" font-size: 16px; margin-bottom: 10px;">演职人员</div>
          <detail-swiper :boxInclude="3.5" name="actorsswiper">
            <detail-swiper-item v-for="(data,index) of filmdata.actors" :key="index">
            <div :style="{
            backgroundImage: 'url('+data.avatarAddress+')'
            }" class="avatarAddress"></div>
            <div style="text-align: center; font-size: 16px;">
              {{ data.name }}
            </div>
            <div style="text-align: center; font-size: 12px; color: gray;">{{ data.role}}</div>
            </detail-swiper-item>
          </detail-swiper>
        </div>
        <!-- 剧照 -->
        <div>
          <div style=" font-size: 16px; margin-bottom: 10px;">剧照</div>
          <detailSwiper :boxInclude="2" name="photosswiper">
            <detail-swiper-item v-for="(data,index) in filmdata.photos" :key="index">
            <div :style="{
            backgroundImage: 'url('+data+')'
            }" class="avatarAddress"
            @click="handlepreview(index)"
            ></div>
            </detail-swiper-item>
          </detailSwiper>
        </div>

      </div>
    </div>
</template>
<script>
// import axios from 'axios'
// 引入http模块
import http from '@/util/http'
import TabMixin from '@/util/key_tab'
// moment 日期转换模块
import moment from 'moment'
import Vue from 'vue'
import detailHeader from '@/components/detail/DetailHeader'
import detailSwiper from '@/components/detail/DetailSwiper'
import detailSwiperItem from '@/components/detail/DetailSwiperItem'
import { ImagePreview } from 'vant'

// 过滤器
Vue.filter('dateFilter', (data) => {
  return moment(data * 1000).format('YYYY-MM-DD')
})
// 指令
Vue.directive('scroll', {
  inserted (el) {
    el.style.display = 'none'
    // console.log(el)
    window.onscroll = () => {
      // console.log('scroll')
      if (document.documentElement.scrollTop >= 50) {
        console.log('隐藏')
        el.style.display = 'none'
      } else {
        // console.log('隐藏')
        el.style.display = 'block'
      }
    }
  },
  unbind () {
    console.log('scroll销毁')
    window.onscroll = null
  }
})
export default {
  // 混入
  mixins: [TabMixin],
  data () {
    return {
      filmdata: null,
      isHidden: true
    }
  },
  components: {
    detailSwiper,
    detailSwiperItem,
    detailHeader
  },
  methods: {
    handlepreview (index) {
      ImagePreview(

        {
          images: this.filmdata.photos,
          startPosition: index,
          closeable: true,
          closeIconPosition: 'top-left'
        })
    }
  },
  created () {
    console.log('created', this.$route.params.id)
    // axios 利用id发送请求到后端接口，获取详细信息，渲染页面
    // 1.使用http模块中的httpfordetail
    // http.httpForDetail(this.$route.params.id).then(res => {
    //   // console.log(res.data.data.film)
    //   this.filmdata = res.data.data.film
    //   console.log(this.filmdata)
    // })
    // 2.写axios实例后的http使用
    http({
      url: `/gateway?filmId=${this.$route.params.id}&k=7128784`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      console.log(res.data.data.film)
      this.filmdata = res.data.data.film
    })
  },
  mounted () {

  },
  deactivated () {
    console.log('销毁详情列表')
    this.filmdata = null
  }
}

</script>
<style lang="scss" scoped>
.poster{
  width: 100%;
  height: 500px;
  background-position: center;
  background-size: cover;
}
.content{
padding: 15px;
  .detail-text{
    margin-top: 4px;
    color: #797d82;
    font-size: 13px;

  }

}
.hidden{
  height: 30px;
      overflow: hidden;
    }
    .avatarAddress{
      height: 90px;
      background-position: center;
      background-size: cover;
    }
</style>
