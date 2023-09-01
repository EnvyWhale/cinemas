<!-- eslint-disable vue/multi-word-component-names -->
<!--
 * @Author: yangxiaosen
 * @Date: 2023-04-06 15:01:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-14 08:36:17
 * @FilePath: \text\src\views\Cinemas.vue
-->
<template>
  <div>
    <van-nav-bar title="影院" ref="navbar" @click-left="chosecity" @click-right="serchcinema">
      <template #left >
        {{ $store.state.cityName }}
        <van-icon name="arrow-down"  color="black"/>
      </template>
      <template #right>
        <van-icon name="search" size="20" />
      </template>
    </van-nav-bar>
    <div class="box" :style="{height:height}">
        <ul>
            <li v-for="data in CinemaList" :key="data.cinemaId">
                <div class="left">
                    <div class="cinemas_name">{{ data.name }}</div>
                    <div class="cinemas_text">{{ data.address }}</div>
                </div>
                <div class="right cinemas_name">
                    <div style="color: red;">￥{{ data.lowPrice/100 }}起</div>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>
<script>
import BetterScroll from 'better-scroll'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      height: '0px'
    }
  },
  computed: {
    ...mapState(['CinemaList', 'cityId'])
  },
  methods: {
    chosecity () {
      this.$router.push('/cinemas/city')
    },
    serchcinema () {
      this.$router.push('/cinemas/search')
    },
    ...mapActions(['getCinemaData'])
  },
  mounted () {
    console.log('请求城市中影院数据')
    // console.log(this.$store.state.cityId)
    this.height = document.documentElement.clientHeight - document.querySelector('footer').offsetHeight - this.$refs.navbar.$el.offsetHeight + 'px'
    // console.log(this.height)
    // 分发请求给vuex中的getcinemasList
    if (this.CinemaList.length === 0) {
      // this.city是vuex中的状态，这里用mapState映射到计算属性中
      // 异步旧写法：this.$store.dispatch('getCinemaData', this.cityId)
      this.getCinemaData(this.cityId).then(res => {
        console.log('新数据请求完成')
        this.$nextTick(() => {
          new BetterScroll('.box', {
            scrollbar: {
              fade: true
            }
          })
        })
      })
    } else {
      console.log('用缓存数据')
      this.$nextTick(() => {
        new BetterScroll('.box', {
          scrollbar: {
            fade: true
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.box{
  // height: 100%;
    overflow: hidden;
    position: relative;

}
li{
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
        width: 250px;
        overflow: hidden;
    }
    .cinemas_name{
        font-size: 15px;
    }
    .cinemas_text{
        margin-top: 4px;
        color: #797d82;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

</style>
