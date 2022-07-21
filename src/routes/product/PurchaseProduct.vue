<template>
  <div class="inner">
    <h1>제품 구입하기</h1>
    <div class="purchase-head">
      <img class="description-thumbnail" :src="productStore.product.thumbnail" />
      <div class="description">
        <div class="description-title">
          {{ productStore.product.title }}
        </div>
        <div class="description-author">
          {{ productStore.product.description }}
        </div>
      </div>
    </div>

    <div class="purchase-body">
      <div class="title">결제금액</div>
      <div class="nodiscount">
        <div class="nodiscount-title">판매금액</div>
        <div class="nodiscount-price">{{ addComma(productStore.product.price * 1.2) }}원</div>
      </div>
      <div class="discount">
        <div class="discount-title">할인금액</div>
        <div class="discount-price">
          - {{ addComma(productStore.product.price * 1.2 - productStore.chooseCoupone) }}원
        </div>
      </div>
      <div class="payment">
        <div class="payment-title">최종 결제금액</div>
        <div class="payment-price">{{ addComma(productStore.chooseCoupone) }}원</div>
      </div>
      <div class="account">
        <div class="account-title">결제할 계좌</div>
        <Account v-on:selected="onSelected" />
        <button class="square-btn yellow" :disabled="!this.isSelected" @click="purchaseProduct">
          구매하기
        </button>
      </div>
    </div>
    <TheLoader :loading="loading" :size="50" :width="10" class="loader" />
  </div>
</template>
<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'
import { useProductStore } from '~/store/product'

import Account from '~/components/Account'
export default {
  data() {
    return {
      loading: false,
      isSelected: false,
      selectedAccount: {},
    }
  },
  created() {
    console.log(this.productStore.product)
  },
  computed: {
    ...mapStores(useUserStore, useProductStore),
  },
  components: {
    Account,
  },
  methods: {
    /* Account.vue에서 emit 받아오기 */
    onSelected(account) {
      //계좌가 선택되면 계좌정보 갱신하기!
      this.isSelected = true
      this.selectedAccount = account
      console.log('this.selectedAccount', this.selectedAccount)
    },
    addComma(num) {
      const regexp = /\B(?=(\d{3})+(?!\d))/g
      return String(num).toString().replace(regexp, ',')
    },
    async purchaseProduct() {
      this.loading = true
      await this.productStore.productPurchase({
        productId: this.productStore.product.id,
        accountId: this.selectedAccount.id,
      })
      this.loading = false
    },
  },
}
</script>
<style lang="scss" scoped>
.inner {
  width: 600px;

  margin: 50px auto;

  h1 {
    margin: 10px 0;
    text-align: center;
  }
  .purchase-head {
    display: flex;
    margin: 30px 0;
    img {
      width: 150px;
      object-fit: cover;
    }
  }

  .description {
    display: block;
    margin: 10px 30px;
    font-size: 16px;
    &-title {
      font-size: 25px;
      font-weight: bold;
    }

    &-author {
      margin: 10px 0;
      color: #7f7f7f;
    }
  }
  .purchase-body {
    margin: 10px 0;
    .title {
      font-weight: bold;
    }
    .nodiscount {
      display: flex;
      margin: 10px 20px;
      font-size: 14px;

      &-title {
        color: #7f7f7f;
        flex-grow: 1;
        font-size: 13px;
      }
    }
    .discount {
      display: flex;
      margin: 0 20px;
      font-size: 14px;
      &-title {
        color: #7f7f7f;
        flex-grow: 1;
        font-size: 13px;
      }
    }
    .payment {
      display: flex;
      margin: 20px;
      &-title {
        font-size: 13px;
        font-weight: 800;
        color: #fa4637;
        flex-grow: 1;
      }
      &-price {
        font-size: 16px;
        font-weight: 900;
        color: #fa4637;
      }
    }
    .account {
      display: flex;
      flex-direction: column;
      &-title {
        font-weight: bold;
        margin-bottom: 10px;
      }

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
        &:disabled {
          cursor: default;
          background-color: #fafafa;
        }
      }
    }
  }
}
</style>
