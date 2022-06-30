import { defineStore } from "pinia";
import axios from 'axios'

const VITE_API_KEY = 'FcKdtJs202204'
const  VITE_USERNAME = 'KDTTEAM8'
const END_POINT = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products'




export const useProductStore = defineStore('product', {

  state: () => {
    return {
    product: {},
    productsArray: []
    }
  },
  actions: {
  async productSearch(payload={})  {
    const {searchText='', searchTags=''} = payload
    const { data } = await requestApi({
      requestCategory: 'search',
      method: 'POST',
      body: {
        searchText,
        searchTags
      }
    })

    const productsArray = data
    console.log('스토어(api받아온거)',productsArray)
    console.log('스토어에서',this.productsArray)
    this.productsArray = productsArray
  }
  }

})


async function requestApi(options) {
      
  const {requestCategory = '', method, body} = options
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
    body
  })
  return res
}