import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '*',
    //   redirect: '/questions'
    // },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
      meta: {
        title: '登录',
        auth: false
      }
    },
    {
      path: '/questions',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
      meta: {
        navName: '题库管理' // 一级导航名称
      },
      children: [
        {
          path: '',
          component: () => import('./views/questions/list.vue'),
          meta: {
            title: '题库列表'
          }
        },
        {
          path: 'list',
          component: () => import('./views/questions/list.vue'),
          meta: {
            title: '题库列表',
            isNav: true // 是否未菜单栏
          }
        },
        {
          path: 'list/add',
          component: () => import('./views/questions/form.vue'),
          meta: {
            title: '题库管理'
          }
        }
      ]
    },
    {
      path: '/data',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
      meta: {
        navName: '数据管理'
      },
      children: [
        {
          path: 'list',
          component: () => import('./views/data/list.vue'),
          meta: {
            title: '数据列表',
            isNav: true
          }
        }
      ]
    }
  ]
})

// 路由拦截器
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '趣学园'
  if (to.meta.auth === undefined && !sessionStorage.getItem('userId')) {
    location.replace(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
  } else {
    if (to.path === '/') {
      next('/questions/list')
    }
    next()
  }
})

export default router
