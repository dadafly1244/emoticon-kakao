import { defineStore } from 'pinia'
import axios from 'axios'
export const useUserStore = defineStore('user', {
  state() {
    return {
      user: {},
      accessToken: '',
    }
  },
  actions: {
    // LOGIN
    async loginUser(payload) {
      const { email, password, validation } = payload
      if (!validation()) {
        return
      }
      try {
        const res = await axios(
          'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login',
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              apikey: 'FcKdtJs202204',
              username: 'KDT2TEAM8',
            },
            data: {
              email,
              password,
            },
          }
        )
        const { user, accessToken } = res.data
        window.localStorage.setItem('token', accessToken)
        this.user = user
        this.accessToken = accessToken
        if (res.status === 200) {
          alert('로그인이 완료되었습니다')
          this.$router.push('/')
        }
      } catch (err) {
        if (err.response.data === '이메일 혹은 비밀번호가 일치하지 않습니다.') {
          alert('아이디와 비밀번호를 확인 해주세요.')
        }
        if (err.response.data === '유효한 사용자가 아닙니다.') {
          alert('회원가입을 해주세요.')
          this.$router.push('/signup')
        }
      }
    },
    // SIGNUP
    async signUpUser(payload) {
      const { email, password, passwordConfirm, displayName, img, validation } = payload
      if (!validation()) {
        return
      }
      try {
        const res = await axios(
          'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup',
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              apikey: 'FcKdtJs202204',
              username: 'KDT2TEAM8',
            },
            data: {
              email,
              password,
              displayName,
              profileImgBase64: img,
            },
          }
        )
        const { user, accessToken } = res.data
        window.localStorage.setItem('token', accessToken)
        if (res.status === 200) {
          alert('회원가입이 완료되었습니다. 로그인 해주세요!')
          this.$router.push('/login')
        }
      } catch (err) {
        if (err.response.data === '이미 존재하는 사용자입니다.') {
          alert('이미 존재하는 아이디입니다!')
          this.$router.push('/login')
        }
      }
    },
  },
})
