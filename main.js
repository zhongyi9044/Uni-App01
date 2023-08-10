// #ifndef VUE3

import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
// 1. 导入 store 的实例对象
import store from './store/store.js'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app
  }
}
// #endif

import {
  $http
} from '@escook/request-miniprogram'

uni.$http = $http

$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...',
  })
  if (options.url.indexOf('/my/') !== -1) {
    options.header = {
      //因为获取不到token只能手动输入
      // Authorization: store.state.m_user.token
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    }
  }
}

// $http.beforeRequest = function(options) {
//   uni.showLoading({
//     title: '数据加载中...',
//   })
// }

$http.afterRequest = function() {
  uni.hideLoading()
}

$http.baseUrl = 'https://api-hmugo-web.itheima.net'

uni.$showMsg = function(title = '请求数据失败', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}