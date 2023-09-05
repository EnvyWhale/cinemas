/* eslint-disable indent */
/*
 * @Author: yangxiaosen
 * @Date: 2023-04-09 19:30:16
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-12 15:37:21
 * @FilePath: \text\src\util\http.js
 */
import axios from 'axios'
import { Toast } from 'vant'
// 2-用axios实例
const http = axios.create({
    baseURL: 'https://m.maizuo.com',
    timeout: 10000,
    headers: { 'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16810184282822338974318593","bc":"110100"}' }
})
// 在发送请求之前拦截 -- showLoading

// Add a request interceptor
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 发请求之前显示加载框
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
    })
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

// 在成功之后拦截 -- hideLoading
// Add a response interceptor
http.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    Toast.clear()
    return response
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
})

// export default { httpForList, httpForDetail, http }
export default http
