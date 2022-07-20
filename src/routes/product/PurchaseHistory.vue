<template>
  <TheLoader
    :loading="loading"
    :size="50"
    :width="10"
    class="loader" />
  
  <div class="history-container">
    <div class="history-container--title">
      <div class="history-container--item" 
        v-for="(title, index) in titles"
        :key="index">
        {{title}}
        
      </div>
    </div>
   
    <HistoryItem 
    v-for="transaction in productStore.transactions"
    :key="transaction.detailId"
    :transaction = "transaction"/>
  </div>
  

  <RouterView />
 
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
      titles: ["","제품", "구매ID", "구매일시", "거래상태" ]
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
    
  }

}
</script>

<style scoped lang="scss">
  .history-container{
    &--title {
    display: grid;
    grid-template-columns: [col-start] 50px [col1] 1fr [col1] 150px [col1] 150px [col1] 100px[col-end];
    gap: 20px 10px;
    justify-content: center;
    align-items: center;
  }
}

</style>