// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入的是已定义好规则的一个路由对象
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
// Vue.use(ElementUI)
import "./assets/css/globael.css"

//Vue.prototype.$axios = axios
//这也能绑定到Vue实例上
Vue.use(VueAxios, axios)
//有了这句话，才能使用this.axios()
//不用this.axios，可以使用request的方法来发送请求。
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
