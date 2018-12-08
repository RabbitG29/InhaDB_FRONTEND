// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueResource from 'vue-resource'
import Notifications from 'vue-notification'
import VueSocketio from 'vue-socket.io'
import App from './App'
import vuejsmodal from 'vue-js-modal'
import router from './router'
import { store } from './store'
import vueNotice from './vue-notice.js'
import config from './config/config.json'
import common from './common'
import axios from 'axios'


Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$config = config
Vue.use(vueResource)
Vue.use(vueNotice)
Vue.use(Notifications)

Vue.mixin(common)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
