<template>
<Backdrop @click="closeModal()" :display="this.display" />
<div class="modal"
  :class="{closeModal: this.isCloseModal}"
  :style="{
    width: `${width}px`,
    height: `${width * 1.65}px`
  }"
>
  <slot></slot>
</div>

</template>

<script>

import Backdrop from '~/components/ui/Backdrop.vue'

export default { 
  props: {
    width: {
      type: Number,
      default: 400
    }
  },
  components: {
    Backdrop
  },
  data() {
    return {
      isCloseModal: false,
      display: 'block'
    }
  },
  methods: {
    closeModal() {
      closeModal = 'none',
      isCloseModal = true

    }
  }
}

</script>


<style scoped lang="scss">
.modal  {
  position: fixed;
  left: calc(50% - 200px);
  top: 50%;
  // margin:0 auto;
  background-color: #fff;
  &.closeModal{
    display: none;
  }
}

</style>