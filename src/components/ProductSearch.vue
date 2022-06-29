<template>
<div class="propro"
 @click="searchAll">

</div>
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
      console.log(await this.productStore.productsArray)

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