<template>
  <h1>제품 구입하기</h1>
  
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'
import { useProductStore } from '~/store/product'

export default {

  computed: {
    ...mapStores(useUserStore, useProductStore),
  }

}
</script>

<style scoped lang="scss">

</style>