import { createRouter, createWebHistory } from 'vue-router'

import RootLayout from '@/views/RootLayout.vue'

import HomeView from '@/views/home/HomeView.vue'
import BookView from '@/views/book/BookView.vue'
import ReadView from '@/views/read/ReadView.vue'
import DownView from '@/views/down/DownView.vue'
import CatalogView from '@/views/book/CatalogView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'

import axiosInstance from '@/services/axiosinstance'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RootLayout,
      children:[
        {
          path: '',
          name: 'shelf',
          component: HomeView,
        },
        {
          path: 'book/:bookId/:chapterId',
          name: 'book',
          component: BookView,
        },
        {
          path: 'read',
          name: 'read',
          component: ReadView,
        },
        {
          path: 'down',
          name: 'down',
          component: DownView,
        },
        {
          path: 'catalog/:bookId',
          name: 'catalog',
          component: CatalogView,
        },
        {
          path: 'login',
          name: 'login',
          component: LoginView,
        },
        {
          path: 'register',
          name: 'register',
          component: RegisterView,
        },
        {
          path:'*',
          redirect:'/'
        }
      ]
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  console.log('beforeEach')
  if (to.name === 'shelf'){
    const isLogin = await checkLogin()
    console.log('isLogin', isLogin)
    if (isLogin){
      next()
    } else {
      console.log('redirect to login')
      next({
        path:'/login',
        query:{redirect:to.fullPath}
      })  
    } 
  }else if (to.name === 'register'){
    next()
  }else if (from.name === 'login'){
    if (from.query.redirect && from.query.redirect !== '/register'){
      console.log('redirect to', from.query.redirect)
      next(from.query.redirect)
    } else {
      console.log('redirect to shelf')
      next()
    } 
  } else {
    next()
  }
})

async function checkLogin() {
  try{
    const res = await axiosInstance.get('/api/user/info')
    console.log(res)
    return true
  }
  catch (err) {
    console.log(err)
    return false
  }
}

export default router
