import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home'
import Style from './Style'
import Login from './user/Login.vue'
import SignUp from './user/SignUp.vue'
import EditUser from './user/EditUser.vue'
import PurchaseHistory from './product/PurchaseHistory.vue'
import NotFound from './NotFound.vue'
import MyPage from './MyPage.vue'
import ReadAccount from './account/ReadAccount.vue'
import AccountNav from '~/components/AccountNav.vue'
import CreateAccount from './account/CreateAccount.vue'
import DeleteAccount from './account/DeleteAccount.vue'
import CompletePage from './account/CompletePage.vue'

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
      path: '/account',
      component: ReadAccount,
    },
    {
      path: '/newaccount',
      component: CreateAccount,
    },
    {
      path: '/removeaccount',
      component: DeleteAccount,
    },
    {
      path: '/completed/:createOrDelete',
      component: CompletePage,
    },
    {
      path: '/mypage',
      component: MyPage,
      children: [
        {
          path: 'PurchaseHistory',
          component: PurchaseHistory,
        },
        {
          path: 'reservation',
          component: PurchaseHistory,
        },
        {
          path: 'accountmanagement',
          component: AccountNav
        }
      ],
    },
    {
      path: '/:notFound(.*)*',
      component: NotFound,
    },
    // {
    //   path: '/mypage/purchaseHistory',
    //   component: PurchaseHistory,
    // },
  ],
})
