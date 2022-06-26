import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home'
import Style from './Style'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/style',
      component: Style
    }
  ]
})
