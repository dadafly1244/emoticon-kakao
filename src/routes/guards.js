import router from './index'
import { validateTokenUser } from '~/core'

router.beforeEach(async (to) => {
  if (to.path.includes('/mypage')) {
    // 토큰 없는 경우
    const accessToken = window.localStorage.getItem('token')
    if (!accessToken) {
      alert('로그인 해주세요!')
      return '/login'
    } else {
      const user = await validateTokenUser(accessToken)
      if (user.data && user.data.email) {
        return true
      }
      alert('로그인 해주세요!')
      return '/login'
    }
  }
  if (to.path.includes('/PurchaseProduct')) {
    const accessToken = window.localStorage.getItem('token')
    if (!accessToken) {
      alert('로그인 해주세요')
      return '/login'
    }
  }
})
