import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '*',
    //   redirect: '/backlog'
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
      path: '/backlog',
      component: () => import(/* webpackChunkName: "Index" */ './views/Index.vue'),
      redirect: '/backlog/index',
      meta: {
        navName: '工作台', // 一级导航名称
        icon: 'el-icon-menu'
      },
      children: [
        {
          path: 'index',
          component: () => import('./views/backlog/Index.vue'),
          meta: {
            title: 'TA工作台',
            isNav: true // 是否为菜单栏
          }
        },
        {
          path: 'wechat',
          component: () => import('./views/backlog/Index.vue'),
          meta: {
            title: '待办-添加微信',
            isNav: true // 是否为菜单栏
          }
        },
        {
          path: 'group',
          component: () => import('./views/backlog/Index.vue'),
          meta: {
            title: '待办-拉群',
            isNav: true // 是否为菜单栏
          }
        },
        {
          path: 'start',
          component: () => import('./views/backlog/Index.vue'),
          meta: {
            title: '待办-开学典礼',
            isNav: true // 是否为菜单栏
          }
        },
        {
          path: 'remind',
          component: () => import('./views/backlog/Index.vue'),
          meta: {
            title: '待办-上课提醒',
            isNav: true // 是否为菜单栏
          }
        },
        {
          path: 'homework',
          component: () => import('./views/backlog/Index.vue'),
          meta: {
            title: '待办-作业批改-已交',
            isNav: true // 是否为菜单栏
          }
        },
        {
          path: 'visit',
          component: () => import('./views/backlog/Index.vue'),
          meta: {
            title: '待办-家访',
            isNav: true // 是否为菜单栏
          }
        },
        {
          path: 'renew',
          component: () => import('./views/backlog/Index.vue'),
          meta: {
            title: '待办-续费转化',
            isNav: true // 是否为菜单栏
          }
        },
        {
          path: 'graduate',
          component: () => import('./views/backlog/Index.vue'),
          meta: {
            title: '待办-毕业典礼',
            isNav: true // 是否为菜单栏
          }
        }
      ]
    },
    {
      path: '/sop-setting',
      component: () => import(/* webpackChunkName: "backlog" */ './views/Index.vue'),
      meta: {
        navName: 'SOP设置'
      },
      children: [
        {
          path: 'index',
          component: () => import('./views/sop-setting/list.vue'),
          meta: {
            title: 'SOP列表',
            isNav: true
          }
        },
        {
          path: 'add',
          component: () => import('./views/sop-setting/list.vue'),
          meta: {
            title: '新增SOP',
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
      next('/backlog/list')
    }
    next()
  }
})

export default router
