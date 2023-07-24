// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
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
}

$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}

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