<template>
  <main>
    <h1>Home page..</h1>
    <Account />
    <ProductSearch />
  </main>
</template>

<script>
import Account from '~/components/Account'
import ProductSearch from '~/components/ProductSearch'
export default {
  components: {
    Account,
    ProductSearch
  }
}
</script>
<style lang="scss" scoped>
main {
  height: 100vh;
}
</style>
