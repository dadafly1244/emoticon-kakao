<template>

<!-- 아아아아아아ㅏㅇㅇ 

{{$route.params.productId}} -->

<div class="wrap">
  <div class="product--top">
    <div class="product--top--inner">
      <div class="product--thumbnail">
        <img 
        v-if ="productStore.product.thumbnail"
        :src="productStore.product.thumbnail" 
        :alt="productStore.product.title">
        <div v-else class="no-image"></div>
      </div>
      <div class="product--detail">
        <div class="product--detail--title">
          {{productStore.product.title}}
        </div>
        <div class="product--detail--author">
          {{productStore.product.description}}
        </div>
        <div class="product--detail--main">
          <span>항상 전 상품 20% 할인</span>
          
        </div>
      </div>
    </div>

  </div>
  <div class="product--photo">
    <div class="product--photo--inner">
      <img 
      v-if ="productStore.product.photo"
      :src="productStore.product.photo" 
      :alt="productStore.product.title">
      <div v-else class="no-image"></div>
    </div>
  </div>
</div>

<TheLoader
  :loading="loading"
  :size="50"
  :width="10"
  class="loader" />

<!-- <div class="see" @click="getProductDetail(`${$route.params.productId}`)"></div> -->


</template>

<script>
import { mapStores } from "pinia";
import { useProductStore } from "~/store/product";
import { useUserStore } from "~/store/user";

export default {
  data() {
    return {
      loading: true,
      productId: this.$route.params.productId
    }
  },
  computed: {
    ...mapStores(useProductStore, useUserStore)
  },
  async created() {
    await this.productStore.productDetail(this.productId) // 다 불러오기..!!
    this.loading = false
  },
  methods: {
    async getProductDetail(productId) {
      this.loading = true
      await this.productStore.productDetail(productId)
      this.loading = false
    }
  }
}

</script>

<style scoped lang="scss">
.wrap{ 
  // height: 30vh;
  border: 1px solid red;
  
  .product--top {
    background-color: #fff;
    &--inner {
      border: 1px solid greenyellow;
      width: 1024px;
      margin: 0 auto;
      .product--thumbnail{
        
        width: 180px;
        height: 180px;
        margin: 10px auto;
        img{
          width: 100%;
          margin: 10px auto;
        }
        .no-image{
          width: 100%;
          height: 100%;
          margin: 10px auto;
          background-image: url('~/static/no_image.jpg');
          background-position: center;
          background-size: cover;
        }
      }
      .product--detail {
        &--title {
          font-size: 30px;
          font-weight: 700;
          color: #191919;
        }
        &--author {
          color: #999;
        }

      }
    }
  }
  .product--photo {
    background-color: #FAFAFA;
    &--inner {
      border: 1px solid greenyellow;
      width: 1024px;
      margin: 0 auto;
    }
  }


}

// .see{
//   height: 100px;
//   width: 100px;
//   background-color: aqua;
// }
</style>