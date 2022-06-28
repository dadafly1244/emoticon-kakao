<template v-if="userStore.accessToken">
  <div class="modify-form-wrap">
    <h1 class="title">사용자 정보 수정</h1>
    <form @submit.prevent="login">
      <!-- <div class="login-container"> -->
      <div>
        <label>
          이메일
          <input class="email-input" type="text" v-model="email" placeholder="이메일" />
          <span> {{ userStore.user.email }}</span>
        </label>
      </div>
      <div>
        <label>
          이름
          <input class="name-input" type="text" v-model="displayName" placeholder="이름" />
          <span> {{ userStore.user.displayName }}</span>
        </label>
      </div>
      <div>
        <label>
          사진 변경
          <input class="img-input" type="file" @change.prevent="selectImg" />
          <img class="img" v-bind:src="userStore.user.profileImg" />
        </label>
      </div>
      <div>
        <label for="">
          패스워드
          <input type="password" v-model="password" placeholder="8자 이상 입력해주세요!" />
        </label>
      </div>
    </form>
    <button @click="toHome">취소</button>
    <button @click="modify">확인</button>
  </div>
</template>
<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'
export default {
  data() {
    return {
      email: '',
      displayName: '',
      password: '',
      img: '',
    }
  },
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    modify() {
      this.userStore.modifyUser({
        email: this.email,
        displayName: this.displayName,
        img: this.img,
        password: this.password,
        validation: this.validation,
      })
    },
    validation() {
      const expressEmail =
        /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/
      if (expressEmail.test(this.email) === false) {
        alert('이메일을 확인해주세요')
        return false
      } else if (this.password.length < 8) {
        alert('패스워드를 8자 이상 입력해주세요')
        return false
      }
      return true
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
    toHome() {
      this.$router.push('/')
    },
  },
}
</script>
<style lang="scss" scoped>
.modify-form-wrap {
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
    .img {
      width: 300px;
      height: 300px;
    }
  }
}
</style>
