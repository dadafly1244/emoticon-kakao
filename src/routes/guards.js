import router from './index'
import { useUserStore } from '~/store/user'
import { validateTokenUser } from '~/core'

router.beforeEach(async (to) => {
  const userStore = useUserStore()
  if (to.path === '/mypage') {
    const user = await validateTokenUser()
    if (user.data.email === 'testemail@test.com' && user.data.displayName === 'test') {
      console.log('admin!')
      window.location.href = 'http://localhost:8080/admin'
    }
    if (user.data && user.data.email) {
      return true
    }
    console.log(user)
    alert('로그인 해주세요!')
    return '/login'
  }
  return true
})
