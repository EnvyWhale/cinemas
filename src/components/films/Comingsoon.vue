<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        :loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
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
          <div class="cinemabox">
            <div class="imgbox">
              <img :src="item.poster" alt="" />
            </div>
            <div class="content">
              <div class="title">
                {{ item.name
                }}<van-tag color="#7232dd">{{ item.item.name }}</van-tag>
              </div>
              <div class="actors">主演：{{ item.actors | actorsFilter }}</div>
              <div>{{ item.nation }}</div>
              <div>
                上映日期：{{
                  $moment(item.premiereAt * 1000).format("YYYY年MM月DD日")
                }}
              </div>
            </div>
            <div class="btn_buy" :class="item.isPresale ? 'y' : 'n'">
              {{ item.isPresale ? "可预购" : "不可预购" }}
            </div>
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
      console.log("到底了");
      // 如果数据总长度的等于记录长度，匹配，禁用懒加载
      if (this.datalist.length === this.total && this.total !== 0) {
        this.finished = true;
        return;
      }
      this.pag++;
      http({
        url: `/gateway?cityId=${this.cityId}&pageNum=${this.pag}&pageSize=10&type=2&k=9084647`,
        headers: {
          "X-Host": "mall.film-ticket.film.list",
        },
      }).then((res) => {
        console.log(res.data);
        this.datalist = [...this.datalist, ...res.data.data.films];
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
    console.log(this.$store.state.isTabbarShow);
    http({
      url: `/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=2&k=9084647`,
      headers: {
        "X-Host": "mall.film-ticket.film.list",
      },
    }).then((res) => {
      console.log(res.data.data.films);
      this.datalist = res.data.data.films;
      this.total = res.data.data.total;
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
  .cinemabox {
    // background-color: aquamarine;
    overflow: hidden;
    position: relative;

    &:hover {
      border: 1px gray solid;
    }

    .imgbox {
      position: absolute;
      margin-right: 10px;
      background-position: center;
      background-size: cover;

      img {
        width: 70px;
      }
    }

    .content {
      margin-left: 80px;
      width: 300px;
      height: 100px;
      font-size: 13px;
      color: gray;
      line-height: 24px;

      .title {
        font-size: 16px;
        line-height: 24px;
        // align-items: center;

        .van-tag {
          margin-left: 5px;
          position: relative;
          top: -2px;
        }
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
      top: 50px;
      right: 0px;
      width: 55px;
      height: 26px;
      line-height: 26px;
      border-radius: 5px;

      font-size: 13px;
      text-align: center;
    }
    .y {
      color: rgb(255, 55, 55);
      border: 1px rgb(255, 66, 66) solid;
    }
    .n {
      color: rgb(133, 133, 133);
      border: 1px rgb(133, 133, 133) solid;
    }
  }
}
</style>
