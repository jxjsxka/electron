import Vue from 'vue'
import Router from 'vue-router'

import ProList from '../components/ProList'
import Login from '../components/Login'
import AddPro from '../components/AddPro'
import Log from '../components/Log'
import About from '../components/About'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/proList',
      name: 'proList',
      component: ProList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/addpro',
      name: 'addpro',
      component: AddPro,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        requireAuth: true
      }
    },
    // {
    //   path: '*',
    //   redirect: '/'
    // }
    {
      path: '*',
      component: Error,
      name: 'error'
    }
  ]
});
export default router
 
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) { 
    // 判断本地是否存在token
    if (sessionStorage.getItem("token") == 'true') { 
      next()
    } else {
      // 未登录,跳转到登陆页面
      next({
        path: '/login'
      })
    }
  } else {
    if(sessionStorage.getItem("token") == 'true'){
      next('/index/table');
    }else{
      next();
    }
  }
});