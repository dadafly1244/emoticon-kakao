<template v-if="userStore.accessToken">
  <div class="modify-form-wrap">
    <h1 class="title">사용자 정보 수정</h1>
    <form @submit.prevent="login">
      <!-- <div class="login-container"> -->
      <div>
        <label>
          이메일
          <input class="email-input" type="text" v-model="email" placeholder="이메일" />
          <div><span>현재 이메일:</span> {{ userStore.email }}</div>
        </label>
      </div>
      <div>
        <label>
          이름
          <input class="name-input" type="text" v-model="displayName" placeholder="이름" />
          <div><span>현재 이름:</span> {{ userStore.displayName }}</div>
        </label>
      </div>
      <div>
        <label>
          사진 변경
          <input class="img-input" type="file" @change.prevent="selectImg" />
          <div>현재 이미지</div>
          <img class="img" v-bind:src="userStore.img" />
        </label>
      </div>
      <div>
        <label for="">
          패스워드*
          <input
            type="password"
            v-model="password"
            placeholder="변경이 없으시면 기존의 비밀번호 입력!"
          />
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
        email: this.email || this.userStore.email,
        displayName: this.displayName || this.userStore.displayName,
        img: this.img || this.userStore.img,
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
    div {
      margin: 10px 30px;
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
  }

  .img {
    width: 300px;
    height: 300px;
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
