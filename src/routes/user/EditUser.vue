<template v-if="userStore.accessToken">
  <div class="modify-form-wrap">
    <h1 class="title">사용자 정보 수정</h1>
    <form @submit.prevent="login">
      <div>
        <label>
          이메일
          <input
            class="email-input"
            type="text"
            v-model="email"
            :placeholder="userStore.email"
            @blur="emailValidation"
          />
        </label>
      </div>
      <span v-if="emailVali">이메일 형식을 확인해주세요</span>
      <div>
        <label>
          이름
          <input
            class="name-input"
            type="text"
            v-model="displayName"
            :placeholder="userStore.displayName"
          />
        </label>
      </div>
      <div>
        <label>
          사진 변경
          <input class="img-input" type="file" @change.prevent="selectImg" />
          <img class="img" v-bind:src="userStore.img" />
        </label>
      </div>
      <div>
        <label for="">
          기존 패스워드*
          <input
            type="password"
            v-model="oldPassword"
            placeholder="변경이 없다면 기존의 패스워드 입력!"
            @input="ableBtn"
          />
        </label>
      </div>
      <span v-if="passwordVali">기존 패스워드를 8자 이상 입력해주세요</span>
      <div>
        <label for="" id="new-password">
          변경할 패스워드
          <input type="password" v-model="newPassword" placeholder="패스워드 변경하시려면 입력!" />
        </label>
      </div>
    </form>
    <button @click="toHome">취소</button>
    <button @click="modify" :disabled="!ableBtnBoolean">확인</button>
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
      img: '',
      oldPassword: '',
      newPassword: '',
      emailVali: false,
      passwordVali: false,
      ableBtnBoolean: false,
      changePhoto: false,
    }
  },
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    modify() {
      this.userStore.modifyUser({
        email: this.email || this.userStore.email,
        displayName: this.displayName || this.userStore.displayName,
        img: this.changePhoto ? this.img : /(.gif|.jpg|.jpeg|.webp)$/i.test(this.img),
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      })
    },
    ableBtn() {
      if (this.emailValidation() && this.passwordValidation()) {
        this.ableBtnBoolean = true
      }
    },
    emailValidation() {
      const expressEmail =
        /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/
      if (!this.email) {
        this.emailVali = false
        return true
      } else if (expressEmail.test(this.email) === false) {
        this.emailVali = true
        return false
      } else {
        this.emailVali = false
        return true
      }
    },
    passwordValidation() {
      if (this.oldPassword.length < 8) {
        this.passwordVali = true
        return false
      } else {
        this.passwordVali = false
        return true
      }
    },
    selectImg(e) {
      this.changePhoto = true
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
  border-radius: 5px;
  text-align: center;
  h1 {
    font-size: 30px;
    font-weight: 900;
  }
  form {
    div {
      margin: 10px 20px;
      font-weight: 900;
      label {
        input {
          width: 250px;
          height: 48px;
          border-style: solid;
          border-width: 0 0 2px 0;
          border-color: #ebebeb;
          padding: 11px 0px 8px 0;
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
          &.name-input {
            margin-left: 40px;
          }
          &:focus {
            border-bottom: 3px solid;
          }
        }
      }
      span {
        font-weight: 900;
        font-size: 14px;
      }
    }
    span {
      height: 20px;
      color: red;
      font-size: 14px;
    }
  }

  .img {
    display: block;
    width: 300px;
    height: 300px;
    margin: 0 auto;
  }
  button {
    width: 100px;
    margin: 30px;
    padding: 10px;
    border-radius: 10px;
    font-size: 16px;
    background-color: #fee500;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
  }
}
</style>
