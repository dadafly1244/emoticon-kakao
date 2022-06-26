<template>
  <section>
    <div class="description">설명에 대한 내용 넣을 곳</div>
    <form @submit.prevent="signUp">
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
            이름*
            <input type="text" v-model="displayName" placeholder="name" />
          </label>
        </div>
        <div>
          <label for="">
            패스워드*
            <input type="password" v-model="password" placeholder="8자 이상 입력해주세요!" />
          </label>
        </div>
        <div>
          <label for="">
            패스워드 확인*
            <input
              type="password"
              v-model="passwordConfirm"
              placeholder="패스워드를 확인 해 주세요!"
            />
          </label>
        </div>
        <label for="">
          프로필 사진
          <input type="file" @change.prevent="selectImg" />
        </label>
        <button>회원가입</button>
      </div>
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
