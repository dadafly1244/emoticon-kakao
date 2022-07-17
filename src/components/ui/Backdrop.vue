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
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: rgba($color: #000000, $alpha: .15);
}

</style>