<template>
  <main>
    <h1>Home page..</h1>
    <ProductSearch />
  </main>
</template>

<script>
import ProductSearch from '~/components/ProductSearch'
export default {
  components: {
    ProductSearch
  }
}
</script>
<style lang="scss" scoped>
main {
  height: 100vh;
}
</style>
