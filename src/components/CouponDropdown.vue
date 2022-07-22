<template>
  <div class="dropdown"></div>
  <div>
    {{ coupones.title }}
  </div>
  <select v-model="productStore.coupone" class="dropdown--item">
    <option v-for="item of coupones.values" :key="item.name" :value="item.value">
      {{ item.name }}
    </option>
  </select>
</template>

<script>
import { mapStores } from 'pinia'
import { useProductStore } from '~/src/store/product'

export default {
  data() {
    return {
      coupones: {
        title: '할인쿠폰',
        values: [
          { name: '항상 전상품 20% 할인', value: 'discount' },
          { name: '쿠폰 선택 안함', value: 'nodiscount' },
        ],
      },
    }
  },
  computed: {
    ...mapStores(useProductStore),
  },
}
</script>

<style scoped lang="scss">
.dropdown {
  margin: 22px 0 10px;
}
div {
  display: block;
  margin: 10px 20px;
  font-size: 16px;
  line-height: 22px;
  font-weight: bold;
}
select {
  width: 320px;
  margin: 0 20px;
  height: 40px;
  border: 1px solid #999;
  border-radius: 3px;
}
</style>
