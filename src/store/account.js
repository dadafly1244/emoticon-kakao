import { defineStore } from 'pinia'
import axios from 'axios'

export const useAccountStore = defineStore('account', {
  state() {
    return {}
  },
  getters: {},
  actions: {
    async getAccounts() {
      const token = localStorage.getItem('token')
      const headers = {
        'content-type': 'application/json',
        apikey: 'FcKdtJs202204',
        username: 'KDT2TEAM8',
        Authorization: `Bearer ${token}`,
      }
      const instance = axios.create({
        baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
        headers,
      })
      const { data } = await instance.get('/banks')
      return data
    },
    async getAccount() {
      const token = localStorage.getItem('token')
      const headers = {
        'content-type': 'application/json',
        apikey: 'FcKdtJs202204',
        username: 'KDT2TEAM8',
        Authorization: `Bearer ${token}`,
      }
      const instance = axios.create({
        baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
        headers,
      })
      const { data } = await instance.get('/')
      return data
    },
    async setAccount(payload) {
      const token = localStorage.getItem('token')
      const headers = {
        'content-type': 'application/json',
        apikey: 'FcKdtJs202204',
        username: 'KDT2TEAM8',
        Authorization: `Bearer ${token}`,
      }
      const instance = axios.create({
        baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
        headers,
      })
      const newAccount = await instance.post('/', {
        ...payload,
      })
    },
    async removeAccount(accountId, signature) {
      const token = localStorage.getItem('token')
      const headers = {
        'content-type': 'application/json',
        apikey: 'FcKdtJs202204',
        username: 'KDT2TEAM8',
        Authorization: `Bearer ${token}`,
      }
      const instance = axios.create({
        baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
        headers,
      })
      const isDeleted = await instance.delete('/', { data: { accountId, signature } })
    },
  },
})
