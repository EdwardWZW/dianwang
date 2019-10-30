import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import WXConfig from 'weixin-js-sdk'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import '../node_modules/swiper/css/swiper.css'

import axios from './http'
Vue.use(axios)

Vue.config.productionTip = false

Vue.prototype.WXConfig = WXConfig


Vue.use(VueAwesomeSwiper, /* { default global options } */)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
