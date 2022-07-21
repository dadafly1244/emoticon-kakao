<template>
  <TheLoader :loading="loading" :size="50" :width="10" class="loader" />

  <div class="history-container">
    <TransactionFilter />
    <div class="history-container--title">
      <div class="history-container--item" v-for="(title, index) in titles" :key="index">
        {{ title }}
      </div>
    </div>

    <HistoryItem
      v-for="transaction in productStore.filteredTransaction"
      :key="transaction.detailId"
      :transaction="transaction"
      @click="showTransactionDetail(transaction.detailId)"
    />

    <TheLoader :loading="routerloading" :size="50" :width="10" class="loader" />
    <RouterView />
  </div>
</template>
<!-- @click="$router.push(`/mypage/PurchaseHistory/${transaction.detailId}`)"/> -->
<!--  -->
<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'
import { useProductStore } from '~/store/product'
import HistoryItem from '~/components/HistoryItem.vue'
import TransactionFilter from '~/components/TransactionFilter.vue'

export default {
  components: {
    HistoryItem,
    TransactionFilter,
  },
  data() {
    return {
      loading: true,
      routerloading: false,
      titles: ['', '제품', '구매ID', '구매일시', '거래상태'],
    }
  },
  computed: {
    ...mapStores(useUserStore, useProductStore),
  },

  async created() {
    await this.productStore.transactionHistory() // 거래내역 불러오기!!
    this.loading = false
  },
  methods: {
    async showTransactionDetail(id) {
      this.$router.push(`/mypage/PurchaseHistory/${id}`)
      this.routerloading = true
      await this.productStore.transactionHistoryDetail({ detailId: id })
      this.routerloading = false
    },
  },
}
</script>

<style scoped lang="scss">
.history-container {
  &--title {
    display: grid;
    grid-template-columns: [col-start] 50px [col1] 1fr [col1] 150px [col1] 150px [col1] 100px[col-end];
    gap: 20px 10px;
    justify-content: center;
    align-items: center;
    .history-container--item {
      margin: 10px 0;
      font-weight: bold;
    }
  }
}
</style>
