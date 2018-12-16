// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'event-source-polyfill'
import 'es6-promise'
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
import moment from 'moment-timezone'
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import boardHeader from './components/board-header'
import VueProgressBar from 'vue-progressbar'
import wysiwyg from 'vue-wysiwyg'
import appMenuNavigation from './components/app-menu-navigation'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$config = config
Vue.prototype.$moment = moment
Vue.use(vueResource)
Vue.use(vueNotice)
Vue.use(Notifications)
Vue.use(Datetime)
Vue.mixin(common)
Vue.component('board-header', boardHeader)
Vue.use(wysiwyg, {})
Vue.component('app-menu-navigation', appMenuNavigation)

const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'left',
  inverse: false
}

Vue.use(VueProgressBar, options)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
