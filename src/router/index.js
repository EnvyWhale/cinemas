/*
 * @Author: yangxiaosen
 * @Date: 2023-04-03 16:23:07
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-13 23:30:32
 * @FilePath: \text\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Films from '@/views/Films'
import Nowplaying from '@/components/films/Nowplaying'
import Detail from '@/views/Detail'
// import Center from '@/views/Center'
import City from '@/components/cinemas/City'
Vue.use(VueRouter)// 注册路由插件
// 配置表
const routes = [
  // 电影路由配置
  {
    path: '/films',
    component: Films,
    // 嵌套路由
    children: [
      {
        name: 'nowplaying',
        path: '/films/nowplaying',
        component: Nowplaying
      },
      {
        path: '/films/comingsoon',
        component: () => import('@/components/films/Comingsoon')
      },
      // 子重定向
      {
        path: '',
        redirect: '/films/nowplaying'
      }
    ]
  },
  {
    path: '/cinemas',
    component: () => import('@/views/Cinemas')
  },
  // 影院选择城市路由
  {
    path: '/cinemas/city',
    component: City
  },
  // 影院搜索影院路由
  {
    path: '/cinemas/search',
    component: () => import('@/components/cinemas/Search')
  },
  // 个人中心路由配置
  {
    path: '/center',
    // 路由懒加载
    component: () => import('@/views/CenterView'),
    meta: {
      isStoprequire: true
    }
    // 路由独享拦截(局部拦截)
    // beforeEach: (to, from, next) => {
    //   //
    // }
  },
  // 电影详情路由配置
  {
    name: 'detail', // 命名路由
    path: '/detail/:id', // 动态路由
    component: Detail
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  // 重定向
  {
    path: '*',
    component: Films,
    redirect: '/films'
  }
]
const router = new VueRouter({
  // 添加mode属性，将切换路由模式，不加有#号
  mode: 'history',
  routes
})
// 全局拦截,在跳转之前拦截,(路由前置守卫)

export default router
