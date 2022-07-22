<template>
  <main>
    <div class="home-header">
      <div class="home-header--inner">
        <a href="javascript:void(0)"></a>
      </div>
    </div>
    <div class="content--inner">
      <ProductSearch /> 
    </div>
  
  </main>
</template>

<script>
import ProductSearch from '~/src/components/ProductSearch'
export default {
  components: {
    ProductSearch
  }
}
</script>
<style lang="scss" scoped>

main {
  .home-header {
    background-color: #A5D8F3;
    &--inner {
      position: relative;
      background-image: url('~/static/home_cover_img.gif');
      background-size: cover;
      height: 540px;
      width: 1024px;
      margin: 0 auto;
      padding: 0 40px;
    }
  }
  .content--inner {
    width: 1024px;
    margin: 0 auto;
  }
}
</style>
