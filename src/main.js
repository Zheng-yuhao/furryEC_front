import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 4 配置全局样式 .. == @ == /src
import '@/assets/css/global.css'

// 5 配置全局自定义设置
import settings from '@/assets/js/settings'
Vue.prototype.$settings = settings

// 6 配置全局的后端路径
// console.log(this.$settings.base_url)

// 7 配置vue cookie
import cookies from 'vue-cookies'
Vue.prototype.$cookies = cookies;

// 8 配置element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 8 bootstrap配置
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


import axios from 'axios'
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// vue-video
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css');
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer)
