<template>
  <h1>구매내역</h1>
<TheLoader
  :loading="loading"
  :size="50"
  :width="10"
  class="loader" />
 
 <HistoryItem 
    v-for="transaction in productStore.transactions"
    :key="transaction.detailId"
    :transaction = "transaction"/>


  <!-- {{productStore.transactions}} -->
  <!-- <table>
    <thead>
      <th>거래 내역 ID</th>
      <th>거래 시간</th>
      <th>거래 취소 여부</th>
      <th>거래 완료 여부</th>
      <th>제품 ID</th>
      <th>제품 제목</th>
      <th>제품 가격</th>
      <th>작가</th>
      <th>태그</th>
      <th>썸네일</th>
      
    </thead>
    <template v-for="transaction in productStore.transactions">
    <tbody>
      <tr @click="makepopup() ">
        <td>{{transaction.detailId}}</td>
        <td>{{transaction.timePaid}}</td>
        <td>{{transaction.isCanceled}}</td>
        <td>{{transaction.done}}</td>
        <td>{{transaction.product.productId}}</td>
        <td>{{transaction.product.title}}</td>
        <td>{{transaction.product.price}}</td>
        <td>{{transaction.product.description}}</td>
        <td>{{transaction.product.tags}}</td>
        <td>{{transaction.product.thumbnail}}</td>
      </tr>
    </tbody>
  </template>
  </table>
   -->

</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'
import { useProductStore } from '~/store/product'
import HistoryItem from '~/components/HistoryItem.vue'

export default {
  components: {
    HistoryItem
  },
   data() {
    return {
      loading: true,
      hello: {}
    }
  },
  computed: {
    ...mapStores(useUserStore, useProductStore),
  },
  async created() {
    await this.productStore.transactionHistory(); // 거래내역 불러오기!! 
    this.loading = false;
  },
  methods: {
    makepopup(){
      console.log(this.hello)
      alert(`${this.hello.detailId}`)
    }
  }

}
</script>

<style scoped lang="scss">

</style>