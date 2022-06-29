import router from './index'
import { useUserStore } from '~/store/user'
import { validateTokenUser } from '~/core'

router.beforeEach(async (to) => {
  const userStore = useUserStore()
  console.log(to)
  if (to.meta.auth) {
    const user = await validateTokenUser()
    // if (user.email === 'admin@kdt.com' && user.displayName === 'admin') {
    //   console.log('admin!')
    //   window.location.href = 'http://localhost:1000/login'
    // }
    if (user && user.email) {
      userStore.user = user
      console.log('success')
      return true
    }
    return '/signin'
  }
  return true
})
