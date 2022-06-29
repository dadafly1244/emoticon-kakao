import { defineStore } from "pinia";

export const useProductStore = defineStore('product', {

  state: () => {
    return {
    product: {},
    productsArray: []
    }
  },
  actions: {
  async productSearch(payload = {})  {
    const {searchText='', searchTags=''} = payload
    const productsArray = await $request({
      requestCategory: 'search',
      method: 'POST',
      body: {
        searchText,
        searchTags
      }
    })
    console.log('스토어에서',this.productsArray)
    this.productsArray = productsArray
  }
  }

})

