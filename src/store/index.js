/*
 * @Author: yangxiaosen
 * @Date: 2023-04-06 14:59:03
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-14 15:43:56
 * @FilePath: \text\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
// vuex 管理保存公共状态（分散在各个组件的状态，统一管理），存储在内存中
export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer: (state) => {
      return {
        cityId: state.cityId,
        cityName: state.cityName
      }
    }
  })],
  // state公共状态
  state: {
    cityId: '310100',
    cityName: '上海',
    CinemaList: [],
    isTabbarShow: true
  },
  getters: {
  },
  mutations: {
    // 只支持同步
    changeCityName (state, cityName) {
      state.cityName = cityName
      console.log(cityName)
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
    },
    changeCinemaList (state, cinemaList) {
      state.CinemaList = cinemaList
    },
    clearCinemaList (state) {
      state.CinemaList = []
    },
    TabShow (state) {
      state.isTabbarShow = true
    },
    TabHidden (state) {
      state.isTabbarShow = false
    }
  },
  // 支持同步和异步
  actions: {
    getCinemaData (store, cityId) {
      return http({
        url: `/gateway?cityId=${cityId}&ticketFlag=1&k=8553441`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        store.commit('changeCinemaList', res.data.data.cinemas)
        console.log(store.state.CinemaList)
      })
    }

  },
  modules: {
  }
})

// vuex持久化保存 --todo

// vuex应用场景
// 非父子之间的通信
// 后端数据的缓存快照，减少数据的请求次数，减轻服务器压力，提高用户体验
