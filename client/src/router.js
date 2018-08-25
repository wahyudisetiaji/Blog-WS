import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('./views/Articles.vue'),
      children: [{
        path: '/articles',
        name: 'listarticles',
        component: () => import('./components/ListArticles.vue')
      },
      {
        path: '/articles/detail/:id',
        name: 'articledetail',
        component: () => import('./components/ArticleDetail.vue')
      }]
    },
    {
      path: '/myarticle',
      name: 'myarticle',
      component: () => import('./views/MyArticle.vue'),
      children: [{
        path: '/myarticle',
        name: 'list',
        component: () => import('./components/ListMyArticle.vue')
      },
      {
        path: '/myarticle/create',
        name: 'create',
        component: () => import('./components/FormCreateArticle.vue')
      },
      {
        path: '/myarticle/update/:id',
        name: 'update',
        component: () => import('./components/FormUpdateArticle.vue')
      }]
    }
  ]
})
