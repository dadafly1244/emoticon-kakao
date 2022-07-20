<template>
  <div class="TransactionDetailId">
    <div class="title">제품 상세 구매 내역</div>
    <div class="content">
      {{productStore.transactionDetail}}
    </div>
    <button
      @click.stop="productStore.transactionFixed({detailId: currentTransactionId})"
      class="square-btn yellow"
      :disabled="isdisabled">
      구매확정
    </button>
    <button 
      @click.stop="productStore.transactionCancel({detailId: currentTransactionId})"
      class="square-btn danger"
      :disabled="isdisabled">
      거래취소
    </button>
    
  </div>
  

</template>


<script>
import { mapStores } from 'pinia'
import { useProductStore } from '~/store/product'


export default {
  data() {
    return {
      showModal: false,
      isdisabled: false
    }
  },
  computed: {
    ...mapStores(useProductStore),
    currentTransactionId() {
      
      return this.$route.params.TransactionDetailId
    }
  },
  

}

</script>

<style lang="scss" scoped>

.TransactionDetailId{
  background-color: rgba($color: #000000, $alpha: .15);
  height: 30vh;
  .square-btn {
    border: 1px solid rgba($color: #000000, $alpha: 0.14);
    width: 350px;
    height: 44px;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 10px;
    margin: 20px auto;
    cursor: pointer;
    &.yellow {
      background-color: #fee500;
      border: 1px solid rgba($color: #000000, $alpha: 0);
    }
    &.danger{
      color: #fff;
      background-color: #FF5F4C;
      border: 1px solid rgba($color: #000000, $alpha: 0);
    }
    &:disabled {
      cursor: default;
      background-color: #fafafa;
    }
  }
}

</style>