<template>
  <div v-show="modalOn">
    <div id="TransactionDetailId">
      <div class="inner">
        <h4>제품상세 구매내역</h4>
        <div class="content">
          <div class="tags">
            <span class="subtitle">카테고리</span>
            <span class="tag" v-for="tag in parsedTags">{{ tag }}</span>
          </div>
          <div class="account">
            <span class="subtitle">계좌 정보</span>
            <p><span>은행명: </span>{{ productStore.transactionDetail.account.bankName }}</p>
            <p><span>계좌번호: </span>{{ productStore.transactionDetail.account.accountNumber }}</p>
          </div>
          <div class="buttons">
            <button
              @click.stop="transactionFixed()"
              class="square-btn yellow"
              :disabled="
                this.productStore.transactionDetail.isCanceled ||
                this.productStore.transactionDetail.done
              "
            >
              구매확정
            </button>
            <button
              @click.stop="transactionCancel()"
              class="square-btn danger"
              :disabled="
                this.productStore.transactionDetail.isCanceled ||
                this.productStore.transactionDetail.done
              "
            >
              거래취소
            </button>
          </div>
        </div>
        <div class="close--btn" @click="modalOn = !modalOn">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <div class="modal-curtain" @click="modalOn = !modalOn"></div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useProductStore } from '~/src/store/product'

export default {
  data() {
    return {
      showModal: false,
      isdisabled: false,
      isdisabled1: false,
      modalOn: true,
    }
  },
  computed: {
    ...mapStores(useProductStore),
    currentTransactionId() {
      return this.$route.params.TransactionDetailId
    },
    parsedTags() {
      return this.productStore.transactionDetail.product?.tags.map((cur) => `#${cur}`)
    },
  },
  watch: {
    $route() {
      this.modalOn = true
    },
  },
  methods: {
    async transactionFixed() {
      await this.productStore.transactionFixed({ detailId: this.currentTransactionId })
      await this.productStore.transactionHistory()
    },
    async transactionCancel() {
      await this.productStore.transactionCancel({ detailId: this.currentTransactionId })
      await this.productStore.transactionHistory()
    },
  },
}
</script>

<style lang="scss" scoped>
#TransactionDetailId {
  z-index: 2;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  width: 500px;
  background-color: #fff;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 56px;
  .inner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0;
  }
  h4 {
    font-size: 32px;
  }
  .content {
    margin-top: 40px;
    .tag {
      &:first-child {
        margin-left: 0;
      }
      margin-left: 10px;
    }
    .subtitle {
      display: block;
      font-size: 24px;
      font-weight: 600;
      margin: 20px 0;
    }
    .account {
      p + p {
        margin-top: 10px;
      }
      p > span {
        color: gray;
        font-weight: bold;
      }
    }
    .buttons {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .square-btn {
        border: 1px solid rgba($color: #000000, $alpha: 0.14);
        padding: 10px 15px;
        font-size: 1rem;
        font-weight: 500;
        border-radius: 10px;
        cursor: pointer;
        &.yellow {
          background-color: #fee500;
          border: 1px solid rgba($color: #000000, $alpha: 0);
        }
        &.danger {
          color: #fff;
          background-color: #ff5f4c;
          border: 1px solid rgba($color: #000000, $alpha: 0);
        }
        &:disabled {
          cursor: default;
          color: rgba($color: #000000, $alpha: 0.25);
          background-color: #fafafa;
        }
      }
    }
  }
  .close--btn {
    position: absolute;
    cursor: pointer;
    top: 10px;
    right: 10px;
    width: 35px;
    height: 35px;
  }
}
.modal-curtain {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background-color: #191919;
  opacity: 0.6;
}
</style>
