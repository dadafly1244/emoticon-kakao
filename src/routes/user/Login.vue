<template>
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
      this.userStore.loginUser({
        email: this.email,
        password: this.password,
        validation: this.validation,
      })
    },
    validation() {
      if (this.emailValidation() === false) {
        alert('이메일을 확인해주세요!')
        return false
      } else if (this.password.length < 8) {
        alert('패스워드를 8자 이상 입력해주세요!')
        return false
      } else return true
    },
    emailValidation() {
      const expressEmail =
        /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/
      if (expressEmail.test(this.email) === false) {
        return false
      }
      return true
    },
  },
}
</script>
<style lang="scss" scoped>
.login-form-wrap {
  width: 100%;
  max-width: 500px;
  margin: 50px auto;
  padding: 60px 30px;
  font-size: 16px;
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
  text-align: center;
  h1 {
    font-size: 30px;
    font-weight: 900;
  }
  form {
    div {
      margin: 30px;
      label {
        input {
          width: 220px;
          height: 48px;
          border-style: solid;
          border-width: 0 0 2px 0;
          border-color: #ebebeb;
          padding: 11px 70px 8px 0;
          margin-left: 10px;
          color: #252525;
          outline: 0;
          border-radius: 0;
          box-sizing: border-box;
          caret-color: #191919;
          text-decoration: none;
          &.email-input {
            margin-left: 20px;
          }
          &:focus {
            border-bottom: 3px solid;
          }
        }
      }
    }
    button {
      width: 200px;
      margin: 30px;
      padding: 10px;
      font-size: 16px;
      background-color: #fee500;
      &:hover {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }
    }
  }
  a {
    color: #333;
    margin: 10px;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
