<template>
  <section class="signup-form-wrap">
    <h1 class="title">SIGNUP</h1>
    <form @submit.prevent="signUp">
      <div>
        <label>
          이메일*
          <input
            class="email"
            type="text"
            v-model="email"
            placeholder="이메일"
            @blur="emailValidation"
          />
        </label>
      </div>
      <span v-if="emailVali">이메일 형식을 확인해주세요</span>
      <div>
        <label>
          이름*
          <input
            class="name"
            type="text"
            v-model="displayName"
            placeholder="이름"
            @blur="displayNameValidation"
          />
        </label>
      </div>
      <span v-if="displayNameVali">이름을 확인해주세요</span>
      <div>
        <label>
          패스워드*
          <input
            class="password"
            type="password"
            v-model="password"
            placeholder="8자 이상 입력해주세요!"
            @blur="passwordValidation"
          />
        </label>
      </div>
      <span v-if="passwordVali">패스워드를 8자 이상 입력해주세요</span>
      <div>
        <label>
          패스워드 확인*
          <input
            type="password"
            v-model="passwordConfirm"
            placeholder="패스워드를 확인 해 주세요!"
            @input="ableBtn"
          />
        </label>
      </div>
      <span v-if="passwordConfirmVali">패스워드를 확인해주세요</span>
      <div>
        <label>
          프로필 사진
          <input class="profile" type="file" @change.prevent="selectImg" />
        </label>
      </div>
      <button :disabled="!ableBtnBoolean">회원가입</button>
      <RouterLink to="/login">id가 있으신가요?</RouterLink>
      <RouterLink to="/login">id와 password 찾기</RouterLink>
    </form>
  </section>
</template>
<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/src/store/user'
import axios from 'axios'
export default {
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      displayName: '',
      img: '',
      emailVali: false,
      displayNameVali: false,
      passwordVali: false,
      passwordConfirmVali: false,
      ableBtnBoolean: false,
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
      })
    },
    ableBtn() {
      if (
        this.emailValidation() &&
        this.displayNameValidation() &&
        this.passwordValidation() &&
        this.passwordConfirmValidation()
      ) {
        this.ableBtnBoolean = true
      }
    },
    selectImg(e) {
      const { files } = e.target
      for (const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', (event) => {
          this.img = event.target.result
          this.userStore.img = event.target.result
        })
      }
    },
    emailValidation() {
      const expressEmail =
        /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/
      if (expressEmail.test(this.email) === false) {
        this.emailVali = true
        return false
      }
      this.emailVali = false
      return true
    },
    displayNameValidation() {
      if (!this.displayName.trim()) {
        this.displayNameVali = true
      } else {
        this.displayNameVali = false
        return true
      }
    },
    passwordValidation() {
      if (this.password.length < 8) {
        this.passwordVali = true
      } else {
        this.passwordVali = false
        return true
      }
    },
    passwordConfirmValidation() {
      if (this.password !== this.passwordConfirm) {
        this.passwordConfirmVali = true
        return false
      } else {
        this.passwordConfirmVali = false
        return true
      }
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
  border-radius: 5px;
  text-align: center;
  h1 {
    font-size: 30px;
    font-weight: 900;
  }
  form {
    div {
      margin: 30px 0;
      font-weight: 900;
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
      border-radius: 5px;
      background-color: #fee500;
      &:hover {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }
      &:disabled {
        box-shadow: none;
      }
    }
    a {
      color: #333;
      margin: 10px;
      &:hover {
        text-decoration: underline;
      }
    }
    span {
      height: 20px;
      color: red;
      font-size: 14px;
    }
  }
}
</style>
