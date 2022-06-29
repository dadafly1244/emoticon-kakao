import router from './index'
import { useUserStore } from '~/store/user'
import { validateTokenUser } from '~/core'

router.beforeEach(async (to) => {
  const userStore = useUserStore()
  console.log(to)

  if (to.meta.auth) {
    const user = await validateTokenUser()
    console.log(user.email)
    if (user.email === 'testemail@test.com' && user.displayName === 'test') {
      console.log('admin!')
      window.location.href = 'http://localhost:1000/login'
    }
    if (user && user.email) {
      userStore.user = user
      return true
    }
    return '/signin'
  }
  return true
})
