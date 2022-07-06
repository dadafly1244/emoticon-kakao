<template>
  <div class="inner">


  </div>
  <div class="cover-img"></div>
  <TheLoader
    :loading="loading"
    :size="50"
    :width="10"
    class="loader" />
  <div class="propro"
  @click="searchAll">
  </div>

  <div class="card--container">


  </div>
  <BaseCard 
    v-for=" product in productStore.productsArray"
    :key="product.id"
    class="card">
    <div class="image">
      <img 
      v-if =product.thumbnail
      :src="product.thumbnail" 
      :alt="product.title">
      <div v-else class="no-image"></div>
    </div>
    <h4>{{product.title}}</h4>

  </BaseCard>
</template>

<script>
import { mapStores } from "pinia";
import { useProductStore } from "~/store/product";
import { useUserStore } from "~/store/user";

export default {
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapStores(useProductStore, useUserStore)
  },
  async created() {
    await this.productStore.productSearch() // 다 불러오기..!!
    this.loading = false
  },
  methods: {
    async searchAll() {
      this.loading = true
      console.log(await this.productStore.productSearch())


      this.loading = false
    }
  }
}


</script>

<style scoped lang="scss">

.cover-img {
  width: 20;
  background: url('~/static/bg_search.png') no-repeat;
}

.card {
  
  margin: 0;
  .image{
   
    width: 70%;
    height: calc(70% * 0.9);
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
  h4{
    text-align: center;
  }

}

.propro{
  background-color: blue;
  height: 100px;
  width: 100px;
}
</style>