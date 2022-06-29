import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home'
import Style from './Style'
import AccountForm from './AccountForm'

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
    },
    {
      path: '/newAccount',
      component: AccountForm
    }
  ]
})
