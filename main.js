import App from './App'

// 扫描组件
import {broadcastScan} from '@/utils/scanner'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  
  // 全局挂载红外扫描组件
  app.config.globalProperties.$broadcastScan=broadcastScan
  
  return {
    app
  }
}
// #endif