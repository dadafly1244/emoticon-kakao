<template>
<div class = "backdrop" 
:style="{
  display: `${display}`
}"

></div>
</template>

<script>
export default {
  props: {
    display: {
      type: String,
      default: 'block'
    }
  }
}

</script>

<style scoped lang="scss">
.backdrop {
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  height: 200vh;
  width: 100vw;
  background-color: rgba($color: #000000, $alpha: .15);
}

</style>