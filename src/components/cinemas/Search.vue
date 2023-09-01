<!-- eslint-disable vue/multi-word-component-names -->
<!--
 * @Author: yangxiaosen
 * @Date: 2023-04-13 20:41:32
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-14 15:35:18
 * @FilePath: \text\src\components\cinemas\Search.vue
-->
<template lang="">
    <div>
        <form action="/">
        <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
        />
        </form>
         <ul v-if="value">
            <li v-for="data in computedList" :key="data.cinemaId">
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
</template>
<script>
import TabMixin from '@/util/key_tab'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      value: ''
    }
  },
  mixins: [TabMixin],
  computed: {
    // 映射vuex中的状态
    ...mapState(['CinemaList', 'cityId', 'cityName']),
    computedList () {
      return this.CinemaList.filter(item => item.name.toUpperCase().includes(this.value.toUpperCase()) || item.address.toUpperCase().includes(this.value.toUpperCase()))
    }
  },
  methods: {
    // 映射vuex中的方法
    ...mapActions(['getCinemaData']),
    onSearch () {
      console.log('搜索')
    },
    onCancel () {
      console.log('取消')
      this.$router.back()
    }
  },
  mounted () {
    if (this.CinemaList.length === 0) {
      this.getCinemaData(this.cityId)
    } else {
      console.log('缓存')
    }
  }
}
</script>
<style lang="scss" scoped>
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
