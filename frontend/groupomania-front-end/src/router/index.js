import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/accueil',
    name: 'Post',
    component: () => import('../views/Post.vue')
  },
  {
    path: '/profil',
    name: 'profil user',
    component: () => import('../views/Profil.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router
