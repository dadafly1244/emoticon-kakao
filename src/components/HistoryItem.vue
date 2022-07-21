<template>
  <div class="container">
    <div class="product-img">
      <img
        v-if="transaction.product.thumbnail"
        :src="transaction.product.thumbnail"
        :alt="transaction.product.title"
      />
      <div v-else class="no-image"></div>
    </div>
    <div class="product">
      <div class="product-txt">
        <!-- <div class="product-txt--id">제품ID : {{ transaction.product.productId }}</div> -->
        <div class="product-txt--title">{{ transaction.product.title }}</div>
        <div class="product-txt--price">{{ transaction.product.price }}원</div>
        <div class="product-txt--author">{{ transaction.product.description }}</div>
      </div>
    </div>
    <div class="detailId">
      <div>{{ transaction.detailId }}</div>
    </div>
    <div class="timePaid">
      <div>{{ getDate(transaction.timePaid) }}</div>
      <!-- <div>{{transaction.timePaid}}</div> -->
    </div>
    <div class="isCanceled">
      <!-- <div>{{!transaction.isCanceled ? (!transaction.done ? '거래요청': '거래완료') : '취소됨'}}</div> -->
      <div>{{ isCanceledComputed }}</div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useProductStore } from '~/store/product'
import dayjs from 'dayjs'

export default {
  props: {
    transaction: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      inFocusTitle: false,
    }
  },
  computed: {
    ...mapStores(useProductStore),
    isCanceledComputed() {
      return !this.transaction.isCanceled
        ? !this.transaction.done
          ? '거래요청'
          : '거래완료'
        : '취소됨'
    },
  },
  //  watch: {
  //   this.transaction.isCanceled,
  //   this.transaction.done
  // },
  methods: {
    // getDate(time) {
    //   // time
    //   return dayjs.utc(time).format('YY년 MM월 YY일 HH:mm')
    // }
    getDate(timestamp) {
      return dayjs(timestamp).format('MM월 YY일 HH:mm')
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  /* background-color: aquamarine; */
  display: grid;
  grid-template-columns: [col-start] 100px [col1] 1fr [col1] 150px [col1] 150px [col1] 100px[col-end];
  gap: 20px 10px;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid;
  border-radius: 5px;

  &:hover {
    transform: scale(1.01);
    transition: transform 0.1s;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  .product-img {
    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
    .no-image {
      width: 50px;
      height: 50px;
      margin: 10px auto;
      background-image: url('~/static/no_image.jpg');
      background-position: center;
      background-size: cover;
    }
  }
  .product {
    display: flex;
    flex-direction: column;

    &-txt {
      display: flex;
      flex-direction: column;
      &--title {
        font-size: 18px;
        font-weight: bold;
      }
      &--price {
        font-size: 17px;
        font-weight: normal;
        color: #7f7f7f;
      }
      &--author {
        font-size: 15px;
        font-weight: normal;
        color: #7f7f7f;
      }
    }
  }
  .isCanceled {
    font-weight: bold;
  }
}
</style>
