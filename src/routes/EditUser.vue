<template v-if="userStore.accessToken">
  <div class="login-form-wrap">
    <h1 class="title">LOGIN</h1>
    <form @submit.prevent="login">
      <!-- <div class="login-container"> -->
      <div>
        <label>
          이메일*
          <input class="email-input" type="text" v-model="email" placeholder="이메일" />
        </label>
      </div>
      <div>
        <label for="">
          패스워드*
          <input type="password" v-model="password" placeholder="8자 이상 입력해주세요!" />
        </label>
      </div>
      <button>로그인</button>
    </form>
    <RouterLink to="/searchuser">id나 비밀번호가 기억나지 않는다면?</RouterLink>
    <RouterLink to="/signup">회원가입</RouterLink>
  </div>
</template>
<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'
export default {
  computed: {
    ...mapStores(useUserStore),
  },
}
</script>
