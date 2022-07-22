<template>
  <div class="cover-img"></div>
  <TheLoader :loading="loading" :size="50" :width="10" class="loader" />

  <div class="card--wrap">
    <div class="card--title">
      <div>
        <h3>
          <a href="javascript:void(0)">
            전체 이모티콘
            <span class="material-symbols-rounded"> arrow_forward_ios </span>
          </a>
        </h3>
      </div>
    </div>
    <div class="card--container">
      <BaseCard
        v-for="product in productStore.productsArray"
        :key="product.id"
        @click="$router.push(`/ProductDetail/${product.id}`)"
        class="card"
      >
        <div class="image">
          <img v-if="product.thumbnail" :src="product.thumbnail" :alt="product.title" />
          <div v-else class="no-image"></div>
        </div>
        <h4>{{ product.title }}</h4>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useProductStore } from '~/src/store/product'
import { useUserStore } from '~/src/store/user'

export default {
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapStores(useProductStore, useUserStore),
  },
  async created() {
    await this.productStore.productSearch() // 다 불러오기..!!
    this.loading = false
  },
  methods: {
    async searchAll() {
      this.loading = true
      this.loading = false
    },
  },
}
</script>

<style scoped lang="scss">
.cover-img {
  width: 20;
  background: url('~/static/bg_search.png') no-repeat;
}
.card--wrap {
  margin: 2rem 0;
  .card--title {
    h3 {
      padding: 10px 0;
      a {
        line-height: 1.5rem;
        font-size: 24px;
        color: #000;
        .material-symbols-rounded {
          color: #808080;
        }
      }
    }
  }
  .card--container {
    margin: 1rem 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    row-gap: 20px;
    .card {
      margin: 0 auto;
      .image {
        width: 70%;
        height: calc(70% * 0.9);
        margin: 10px auto;
        img {
          width: 100%;
          margin: 10px auto;
        }
        .no-image {
          width: 100%;
          height: 100%;
          margin: 10px auto;
          background-image: url('~/static/no_image.jpg');
          background-position: center;
          background-size: cover;
        }
      }
      h4 {
        width: 80%;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin: 0 auto;
        font-weight: lighter; //400으로 하면 안되고 lighter로 하니까되네..? 왜지?
      }
    }
  }
}
</style>
