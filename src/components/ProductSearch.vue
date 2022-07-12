<template>


  <div class="cover-img"></div>
  <TheLoader
    :loading="loading"
    :size="50"
    :width="10"
    class="loader" />
  <!-- <div class="propro"
  @click="searchAll">
  </div> -->

  <div class="card--title">
    <h3>전체 이모티콘</h3>
    <!-- <i class="fa-solid fa-angle-right"></i> -->
    <span class="material-symbols-rounded">arrow_forward_ios</span>
  </div>
  <div class="card--container">
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

  </div>
  
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
.card--title {
  .svg-color {
    svg {
      fill: #808080;
    }
  }
}
.card--container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 20px;
  .card {
  
  margin: 0 auto;
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
    background-color: greenyellow;
    width: 80%;
    text-align: center; 
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 0 auto;
    font-weight: lighter; //400으로 하면 안되고 lighter로 하니까되네..? 왜지?
    // font-size: 1rem;
    
  }


}
}

.propro{
  background-color: blue;
  height: 100px;
  width: 100px;
}
</style>