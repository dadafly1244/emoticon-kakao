<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06) ;
  height: 202px;
  width: 176px;
  border-radius: 12px;
  padding: 12px 0 12px 16px;
  box-sizing: border-box;
  &:hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.26);
  }
}

</style>