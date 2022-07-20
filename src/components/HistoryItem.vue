<template>
  <div
    :class="{ focus: inFocusTitle }"
    @click="inFocusTitle = true"
    class="container">
    
    
    <div class="product">
      <div class="product-img">
        <img 
          v-if="transaction.product.thumbnail"
          :src="transaction.product.thumbnail" 
          :alt="transaction.product.title"> 
        <div v-else class="no-image"></div>
      </div>
      <div>제품ID : {{transaction.product.productId}}</div>
      <div>제품이름 : {{transaction.product.title}}</div>
      <div>제품가격 : {{transaction.product.price}}원</div>
      <div>작가 : {{transaction.product.description}}</div>
    </div>
    <div class="detailId">
      <div>{{transaction.detailId}}</div>
    </div>
    <div class="timePaid">
      <div>{{getDate(transaction.timePaid)}}</div>
      <!-- <div>{{transaction.timePaid}}</div> -->
    </div>
    <div class="isCanceled">
      <div>{{transaction.isCanceled}}</div>
    </div>
    <div class="done">
      <div>{{transaction.done}}</div>
    </div>
  <div >

  </div>
<!-- 
<td></td>


<td>{{transaction.product.tags}}</td>
-->
  </div>

</template>

<script>
import { mapStores } from "pinia";
import { useProductStore } from "~/store/product";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

export default {
  props: {
    transaction: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      inFocusTitle: false
    }
  },
  computed: {
    ...mapStores(useProductStore)
  },
  methods: {
    // getDate(time) {
    //   // time 
    //   return dayjs.utc(time).format('YY년 MM월 YY일 HH:mm')
    // }
    getDate(timestamp) {
      return dayjs(timestamp).format('MM월 YY일 HH:mm')
    }
  }

}

</script>

<style lang="scss" scoped>

.container {
  display: grid;
  grid-template-columns: [col-start] 2fr [col1] 1fr [col1] 1fr [col1] 1fr [col1] 1fr [col-end];
  gap: 20px 10px;
  justify-content: center;
  align-items: center;
  .product {
    display: flex;
    flex-direction: column;
    .product-img {
      img{
        width: 50px;
        height: 50px;
      }
      .no-image{
        width: 50px;
        height: 50px;
        margin: 10px auto;
        background-image: url('~/static/no_image.jpg');
        background-position: center;
        background-size: cover;
      }
    }
  }
}

</style>