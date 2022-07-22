import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home'
import About from './About'
import Login from './user/Login.vue'
import SignUp from './user/SignUp.vue'
import EditUser from './user/EditUser.vue'
import PurchaseHistory from './product/PurchaseHistory.vue'
import NotFound from './NotFound.vue'
import MyPage from './MyPage.vue'
import ReadAccount from './account/ReadAccount.vue'
import AccountNav from '~/src/components/AccountNav.vue'
import CreateAccount from './account/CreateAccount.vue'
import DeleteAccount from './account/DeleteAccount.vue'
import CompletePage from './account/CompletePage.vue'
import ProductDetail from './product/ProductDetail.vue'
import PurchaseProduct from './product/PurchaseProduct.vue'
import TransactionDetailId from './product/TransactionDetailId.vue'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/about',
      component: About,
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
      path: '/ProductDetail/:productId',
      component: ProductDetail,
    },
    {
      path: '/PurchaseProduct',
      component: PurchaseProduct,
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
          children: [
            {
              path: ':TransactionDetailId',
              component: TransactionDetailId,
            },
          ],
        },
        {
          path: 'reservation',
          component: PurchaseHistory,
        },
        {
          path: 'accountmanagement',
          component: AccountNav,
        },
      ],
    },
    {
      path: '/:notFound(.*)*',
      component: NotFound,
    },
  ],
})
