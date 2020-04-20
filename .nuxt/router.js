import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _526c8615 = () => interopDefault(import('..\\pages\\details.vue' /* webpackChunkName: "pages_details" */))
const _1bf13800 = () => interopDefault(import('..\\pages\\product\\index.vue' /* webpackChunkName: "pages_product_index" */))
const _e5b37136 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/details",
    component: _526c8615,
    name: "details"
  }, {
    path: "/product",
    component: _1bf13800,
    name: "product"
  }, {
    path: "/",
    component: _e5b37136,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
