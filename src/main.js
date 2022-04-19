import "bootstrap/dist/css/bootstrap.min.css"
import Vue from 'vue'
import App from './App.vue'
import WebCam from 'vue-web-cam'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.use(WebCam)
Vue.use(VueAxios, axios)
import "bootstrap/dist/js/bootstrap.js"