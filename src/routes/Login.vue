<template>
  <div class="login-form-wrap">
    <form @submit.prevent="login">
      <div class="login-container">
        <div class="title">KOKOA</div>
        <div>
          <label>
            이메일*
            <input type="text" v-model="email" placeholder="email" />
          </label>
        </div>
        <div>
          <label for="">
            패스워드*
            <input type="password" v-model="password" placeholder="8자 이상 입력해주세요!" />
          </label>
        </div>
        <button>로그인</button>
      </div>
    </form>
    <RouterLink to="/searchuser">id나 비밀번호가 기억나지 않는다면?</RouterLink>
    <RouterLink to="/signup">회원가입</RouterLink>
  </div>
</template>
<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    login() {
      this.userStore.loginUser({ email: this.email, password: this.password })
    },
  },
}
</script>
<style lang="scss" scoped>
.login-form-wrap {
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
