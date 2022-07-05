import { defineStore } from "pinia";
import axios from 'axios'

const VITE_API_KEY = 'FcKdtJs202204'
const  VITE_USERNAME = 'KDTTEAM8'
const END_POINT = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products'


export const useProductStore = defineStore('product', {

  state: () => {
    return {
    inputText: '',
    product: {},
    productsArray: []
    }
  },
  actions: {
    async productSearch(payload={})  {
      const {searchText= '', searchTags=[""]} = payload
      let productsArray = []

      console.log('searchText', searchText,'searchTags',searchTags )
      if (searchText !== '' && searchTags !== [""] ) { // 제목과 태그가 모두 있는 경우
        const { data } = await requestApi({
          requestCategory: 'search',
          method: 'POST',
          body: {
            "searchText": searchText,
            "searchTag": searchTags
          }
        })
        console.log('제목태그data',data)
        productsArray = data
      }else if (searchText !== '') { // 제목만 있는 경우 
        console.log('searchText',searchText)
        const { data } = await requestApi({
          requestCategory: 'search',
          method: 'POST',
          body: {
            "searchText": searchText,
            "searchTag":[""]
          }
        })
        productsArray = data
        console.log('제목만data',data)
      } else {
        const { data } = await requestApi({
          requestCategory: 'search',
          method: 'POST',
          body: {
            searchTags
          }
        })
        console.log('태그',data)
        productsArray = data
      }
      

      console.log('스토어(api받아온거)',productsArray)
      this.productsArray = productsArray
      console.log('스토어에서',this.productsArray)

    }
  }

})


async function requestApi(options) {
      
  const {requestCategory = '', method, body: data } = options
  const accessToken = window.localStorage.getItem('token')

  const res = await axios(`${END_POINT}/${requestCategory}`,{
    method,
    headers: {
      'content-type': 'application/json',
      apikey: VITE_API_KEY,
      username: VITE_USERNAME,
      masterkey: true,
      Authorization: `Bearer ${accessToken}`,
    },
    data
  })
  return res
}