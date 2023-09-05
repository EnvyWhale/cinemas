<!-- eslint-disable vue/multi-word-component-names -->
<!-- * @Author: yangxiaosen
 * @Date: 2023-04-04 15:21:41
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-14 15:32:00
 * @FilePath: \text\src\components\films\Nowplaying.vue
-->
<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        :loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="100"
        v-model="loading"
      >
        <van-cell
          v-for="item in datalist"
          :key="item.filmId"
          @click="jumping(item.filmId)"
        >
          <!-- 1.用route-link标签跳转 -->
          <!-- <router-link to="/detail">{{ item }}</router-link> -->
          <!-- 2.用编程式导航跳转 -->
          <div class="CinemaBox">
            <div class="ImgBox">
              <img :src="item.poster" alt="" />
            </div>
            <div class="content">
              <div class="title">
                {{ item.name
                }}<van-tag color="#7232dd">{{ item.item.name }}</van-tag>
              </div>
              <span :class="item.grade ? '' : 'hidden'"
                >观众评分：{{ item.grade }}</span
              >
              <div class="actors">主演：{{ item.actors | actorsFilter }}</div>
              <div>{{ item.nation }} | {{ item.runtime }}分钟</div>
            </div>
            <div class="btn_buy" :data-filmid="item.filmId">购票</div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
// import axios from 'axios'
import vue from "vue";
import http from "@/util/http";
import { mapState } from "vuex";
vue.filter("actorsFilter", (data) => {
  if (data === undefined) {
    return "暂无主演";
  }
  // console.log(data.map(item => item.name))
  return data.map((item) => item.name).join("  ");
});
export default {
  data() {
    return {
      datalist: [],
      loading: false,
      finished: false,
      refreshing: false,
      pag: 1,
      total: 0,
    };
  },
  computed: {
    ...mapState(["cityId"]),
  },
  methods: {
    jumping(id) {
      // 编程式导航
      // 1.   location.href = '#/detail'
      //   当前匹配的路由
      //   this.$router.push(`/detail/${id}`)
      // 通过命名路由跳转
      this.$router.push({
        name: "detail",
        params: {
          id,
        },
      });
    },
    onLoad() {
      // console.log('到底了')
      // 如果数据总长度的等于记录长度，匹配，禁用懒加载
      if (this.datalist.length === this.total && this.total !== 0) {
        this.finished = true;
        return;
      }
      this.pag++;

      http({
        url: `/gateway?cityId=${this.cityId}&pageNum=${this.pag}&pageSize=10&type=1&k=5545971`,
        headers: {
          "X-Host": "mall.film-ticket.film.list",
        },
      }).then((res) => {
        console.log(res.data);
        this.datalist = [...this.datalist, ...res.data.data.films];
        // 加载状态结束
        this.loading = false;
      });
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.pag = 0;
      this.datalist = [];
      this.onLoad();
      this.refreshing = false;
    },
  },
  mounted() {
    // 1.用http封装axios函数式
    // http.httpForList().then(res => {
    //   this.datalist = res.data.data.films
    // })
    // 2.写axios实例后的http使用
    http({
      url: `/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=5545971`,
      headers: {
        "X-Host": "mall.film-ticket.film.list",
      },
    }).then((res) => {
      // console.log(res.data.data.films)
      this.datalist = res.data.data.films;
      this.total = res.data.data.total;
      setTimeout(() => {
        this.$dialog
          .confirm({
            title: "提示",
            message: "登陆可体验更多功能",
            confirmButtonText: "现在就去",
            cancelButtonText: "等会再去",
          })
          .then(() => {
            // on confirm
            this.$router.push("/login");
          })
          .catch(() => {
            // on cancel
            console.log(2);
          });
      }, 1000);
    });
  },
};
</script>
<style lang="scss" scoped>
.van-list {
  .van-cell {
    width: 95vw;
    padding: 0 0 5px 0;
    margin: 10px 10px;
    border-bottom: 1px rgb(191, 191, 191) solid;
  }
  .van-tag {
    margin-left: 5px;
  }
  .CinemaBox {
    // background-color: aquamarine;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    &:hover {
      border: 1px rgb(255, 207, 207) solid;
    }

    .ImgBox {
      position: absolute;
      margin-right: 10px;
      background-position: center;
      background-size: cover;

      img {
        width: 70px;
      }
    }

    .content {
      margin-left: 75px;
      width: 300px;
      font-size: 13px;
      color: gray;
      line-height: 24px;

      .title {
        font-size: 16px;
      }

      .hidden {
        visibility: hidden;
      }

      .actors {
        font-size: 12px;
        width: 240px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .btn_buy {
      position: absolute;
      top: 35px;
      right: 0px;
      width: 40px;
      height: 26px;
      line-height: 26px;
      border-radius: 5px;
      color: rgb(255, 55, 55);
      border: 1px rgb(255, 66, 66) solid;
      font-size: 13px;
      text-align: center;
    }
  }
}
</style>
