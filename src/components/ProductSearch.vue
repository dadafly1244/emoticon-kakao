<template>
  <div class="propro"
  @click="searchAll">

  </div>

  <base-card>
    <h2>이미지이름</h2>
    <p>
      이거 뭐 어케 하누? 
    </p>

  </base-card>
   <base-card>
    <h2>이미지이름</h2>
    <p>
      이거 뭐 어케 하누? 
    </p>

  </base-card>
</template>

<script>
import { mapStores } from "pinia";
import { useProductStore } from "~/store/product";
import { useUserStore } from "~/store/user";

export default {
  computed: {
    ...mapStores(useProductStore, useUserStore)
  },
  mounted() {
    console.log(this.productStore.productsArray)

  },
  methods: {
    async searchAll() {
      console.log(await this.productStore.productSearch())
    }
  }
}


</script>

<style>
.propro{
  background-color: blue;
  height: 100px;
  width: 100px;
}
</style>