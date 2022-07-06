<template>
  <div class="card"
  :style="{
    width: `${width}px`,
    height: `${width * 1.1}px`
  }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 176
    }
  }
}

</script>


<style scoped lang="scss">
.card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06) ;
  border-radius: 12px;
  padding: 12px 16px;
  box-sizing: border-box;
  &:hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.26);
  }
}

</style>