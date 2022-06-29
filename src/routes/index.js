import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home'
import Style from './Style'
import Login from './Login.vue'
import SignUp from './SignUp.vue'
import EditUser from './EditUser.vue'
import PurchaseHistory from './PurchaseHistory.vue'
import NotFound from './NotFound.vue'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/style',
      component: Style,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/signup',
      component: SignUp,
    },
    {
      path: '/user',
      component: EditUser,
    },
    {
      path: '/PurchaseHistory',
      component: PurchaseHistory,
    },
    {
      path: '/:notFound(.*)*',
      component: NotFound
    }
  ],
})
