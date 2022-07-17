import { defineStore } from "pinia";
import axios from 'axios'

const VITE_API_KEY = 'FcKdtJs202204'
const VITE_USERNAME = 'KDT2TEAM8'
const END_POINT = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products'


export const useProductStore = defineStore('product', {

  state: () => {
    return {
    inputText: '',
    product: {},
    productsArray: [],
    ispruchaseSuccess: false
    }
  },
  actions: {
    //단일 제품 상세 조회
    async productDetail(productId='') {
      
      try {
        if (productId === ''){
          console.log('찾는 제품이 없습니다.')
        }
        const { data } = await requestApi({
          requestCategory: `${productId}`,
          method: 'GET'
        })
        this.product = data
        console.log('단일상품상세조회',this.product)
      }catch(error){
        console.log(error.response.state)
      }
    },

    //제품 검색(전체조회 및 검색)
    async productSearch(payload={})  {
      const {searchText= '', searchTags=[""]} = payload
      let productsArray = []
      console.log('searchText', searchText,'searchTags',searchTags )
      try {
        if (searchText !== '' && searchTags !== [""] ) { // 제목과 태그가 모두 있는 경우
          const { data } = await requestApi({
            requestCategory: 'search',
            method: 'POST',
            data: {
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
            data: {
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
            data: {
              searchTags
            }
          })
          console.log('태그',data)
          productsArray = data
        }
        console.log('스토어(api받아온거)',productsArray)
        this.productsArray = productsArray
        console.log('스토어에서',this.productsArray)
      }catch( error) {
        console.log(error.response.status)
      }
    }, 
  
    //제품 거래(구매)신청
    async productPurchase(payload) {
      const { productId='', accountId='', isreservation = false, reservationStart, reservationEnd} = payload
      if(!productId || !accountId ) { // productId가 없거나 accountId 전달되지 않으면
        throw '구매하려는 제품의 iD나 계좌 id가 선택되지 않았습니다.'
      }
      
      try {
        const { data } = await requestApi({
          requestCategory: 'buy',
          method: 'POST',
          data: {
            productId,
            accountId,
            reservation : isreservation ? {start: reservationStart, end: reservationEnd } : {} //isreservation 값이 true면 예약정보 보내기!
          }
        })

        

        // if(!isreservation){ //예약이 
        //   const { data } = await requestApi({
        //     requestCategory: 'buy',
        //     method: 'POST',
        //     data: {
        //       productId,
        //       accountId
        //     }
        //   })
        // }else {
        //   const { data } = await requestApi({
        //     requestCategory: 'buy',
        //     method: 'POST',
        //     data: {
        //       productId,
        //       accountId,
        //       reservation: {
        //         start: reservationStart,
        //         end: reservationEnd
        //       }
        //     }
        //   })
        // }

        console.log(data)
        // this.ispruchaseSuccess = data
        
      } catch (error)  {
        console.log(error)
      }
      

    }
  }

})


async function requestApi(options) {
      
  const {requestCategory = '', method, data='' } = options
  const accessToken = window.localStorage.getItem('token')

  const res = await axios({
    url:`${END_POINT}/${requestCategory}`,
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