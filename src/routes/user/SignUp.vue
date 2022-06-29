<template>
  <section class="signup-form-wrap">
    <h1 class="title">SIGNUP</h1>
    <form @submit.prevent="signUp">
      <div>
        <label>
          이메일*
          <input class="email" type="text" v-model="email" placeholder="이메일" />
        </label>
      </div>
      <div>
        <label>
          이름*
          <input class="name" type="text" v-model="displayName" placeholder="이름" />
        </label>
      </div>
      <div>
        <label>
          패스워드*
          <input
            class="password"
            type="password"
            v-model="password"
            placeholder="8자 이상 입력해주세요!"
          />
        </label>
      </div>
      <div>
        <label>
          패스워드 확인*
          <input
            type="password"
            v-model="passwordConfirm"
            placeholder="패스워드를 확인 해 주세요!"
          />
        </label>
      </div>
      <div>
        <label>
          프로필 사진
          <input class="profile" type="file" @change.prevent="selectImg" />
        </label>
      </div>
      <button>회원가입</button>
      <RouterLink to="/login">id가 있으신가요?</RouterLink>
      <RouterLink to="/login">id와 password 찾기</RouterLink>
    </form>
  </section>
</template>
<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'
import axios from 'axios'
export default {
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      displayName: '',
      img: '',
    }
  },
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    signUp() {
      this.userStore.signUpUser({
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
        displayName: this.displayName,
        img: this.img,
        validation: this.validation,
      })
    },
    selectImg(e) {
      const { files } = e.target
      for (const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', (event) => {
          this.img = event.target.result
        })
      }
    },
    validation() {
      if (this.emailValidation() === false) {
        alert('이메일 형식을 확인해주세요!')
        return false
      } else if (!this.displayName.trim()) {
        alert('이름을 입력해주세요!')
        return false
      } else if (this.password.length < 8) {
        alert('패스워드를 8자 이상 입력해주세요!')
        return false
      } else if (this.password !== this.passwordConfirm) {
        alert('입력하신 패스워드가 다릅니다!')
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
.signup-form-wrap {
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
      margin: 30px 0;
      label {
        input {
          width: 220px;
          height: 48px;
          border-style: solid;
          border-width: 0 0 2px 0;
          border-color: #ebebeb;
          padding: 11px 30px 8px 10px;
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
          &.email {
            margin-left: 60px;
          }
          &.name {
            margin-left: 80px;
          }
          &.password {
            margin-left: 50px;
          }
          &.profile {
            margin-left: 30px;
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
    a {
      color: #333;
      margin: 10px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
