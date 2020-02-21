import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import WelcomingPage from '../views/WelcomingPage.vue'
import SearchResults from '../views/SearchResults.vue'
import ChatRoom from '../views/ChatRoom.vue'
import SignUpPage from '../views/SignUpPage.vue'
import SignInPage from '../views/SignInPage.vue'

import store from '../store/index'



Vue.use(VueRouter)

const routes = [
  { 
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter:((to, from, next)=>{
      if(store.getters.getUser==null||store.getters.getUser==undefined ){
        next('/welcome',)
      }
        else next()
    })
  },
  {
    path: '/about',
    name: 'about',
    component:About,
  },
  {
    path: '/chat',
    name: 'ChatRoom',
    component:ChatRoom,
    beforeEnter:((to, from, next)=>{
      if(store.getters.getUser==null||store.getters.getUser==undefined ){
        next('/welcome',)
      }
        else next()
    })
  },
  {
    path: '/results/:idItemSelected',
    name: 'SearchResults',
    component:SearchResults,
    props:true,
    beforeEnter:((to, from, next)=>{
      if(store.getters.getUser==null||store.getters.getUser==undefined ){
        next('/welcome',)
      }
        else next()
    })
    
  },
  {
    path: '/welcome',
    name: 'WelcomingPage',
    component:WelcomingPage,
    
  },
  {
    path: '/signUp',
    name: 'SignUpPage',
    component:SignUpPage
  },
  {
    path: '/signIn',
    name: 'SignInPage',
    component:SignInPage
  }

]

const router = new VueRouter({
  routes,
  
})

export default router
