<template>
  <h1>구매내역</h1>

</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'

export default {

  computed: {
    ...mapStores(useUserStore),
  }

}
</script>

<style scoped lang="scss">

</style>