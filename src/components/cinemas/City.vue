<!-- eslint-disable vue/multi-word-component-names -->
<!--
 * @Author: yangxiaosen
 * @Date: 2023-04-12 15:44:03
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-14 14:38:51
 * @FilePath: \text\src\components\cinemas\City.vue
-->
<template lang="">
  <div>
    <van-nav-bar
      title="选择城市"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      class="topbar_left"
    />
    <van-index-bar :index-list="computedList" @select="keychange">
      <div v-for="item in citylist" :key="item.type">
        <van-index-anchor :index="item.type" />
        <van-cell
          v-for="city in item.list"
          :key="city.cityId"
          :title="city.name"
          @click="cityClick(city)"
        />
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import http from "@/util/http";
import TabMixin from "@/util/key_tab";
import { Toast } from "vant";
import { mapMutations } from "vuex";
export default {
  // 混入
  mixins: [TabMixin],
  data() {
    return {
      citylist: [],
    };
  },
  computed: {
    computedList() {
      return this.citylist.map((item) => item.type);
    },
  },
  mounted() {
    http({
      url: "gateway?k=5429178",
      headers: {
        "X-Host": "mall.film-ticket.city.list",
      },
    }).then((res) => {
      // console.log(res.data.data)
      // console.log(this)
      this.renderCity(res.data.data.cities);
    });
  },
  destroyed() {},
  methods: {
    ...mapMutations([
      "TabShow",
      "TabHidden",
      "clearCinemaList",
      "changeCityName",
      "changeCityId",
    ]),
    keychange(data) {
      // console.log('change', data)
      Toast.setDefaultOptions({ duration: 500 });
      Toast(data);
    },
    renderCity(list) {
      const falist = [];
      for (let index = 65; index < 91; index++) {
        falist.push(String.fromCharCode(index));
      }
      // console.log(falist)
      falist.forEach((faitem) => {
        const newlist = list.filter(
          (item) => item.pinyin.substring(0, 1).toUpperCase() === faitem
        );
        newlist.length > 0 &&
          this.citylist.push({
            type: faitem,
            list: newlist,
          });
      });
      console.log(this.citylist);
    },
    cityClick(city) {
      //   console.log(item.name, item.cityId)

      // 传统的多页面方案
      //  1. location.href = '#/cinemas?cityname=' + item.name
      //  2. cookie , localStorage

      // 单页面方案,
      //  1. 中间人模式
      //  2. bus事件总线 $on ,$emit

      // vuex- 状态管理模式

      console.log(city);
      this.clearCinemaList();
      // this.$store.state.cityName = city.name //不知道错误来源，无法跟踪
      // 旧写法：this.$store.commit('changeCityName', city.name)
      this.changeCityName(city.name);
      this.changeCityId(city.cityId);
      this.$router.back();
    },
    onClickLeft() {
      this.$router.back();
    },
  },
};

// 1对返回数据进行A，B分组

// 2把分组后的数据渲染到界面中
</script>
<style lang="scss" scoped>
.van-toast--html,
.van-toast--text {
  min-width: 30px;
  min-height: 30px;
}
</style>
