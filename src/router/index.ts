import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Editor from '../views/Editor.vue'
import Stories from '../views/Stories.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/editor/:id',
    name: 'editor',
    component: Editor,
    props: true,
  },
  {
    path: '/stories',
    name: 'stories',
    component: Stories,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
