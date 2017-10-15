import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'
import 'common/stylus/reset.min.css'
import 'common/stylus/index.styl'

Vue.use(VueRouter)
Vue.use(VueResource)

let router = new VueRouter({
  linkActiveClass: 'active'
})
let app = Vue.extend(App)

router.map({
  '/goods': {
    component: goods
  },
  '/ratings': {
    component: ratings
  },
  '/seller': {
    component: seller
  }
})

router.start(app, '#app')
router.go('/goods')
