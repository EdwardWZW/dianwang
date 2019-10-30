import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path:  '/detail/:id1' || '/detail/:id1/:id2',
      name: 'detail',
      component: () => import('./views/Detail.vue')
    },
    {
      path: '/videoDetail/:id',
      name: 'detail2',
      component: () => import('./views/VideoDetail.vue')
    },
    {
      path: '/themeDetail/:id1/:id2',
      name: 'themeDetail',
      component: () => import('./views/ThemeDetail.vue')
    },
  ]
})
