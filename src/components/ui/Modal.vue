<template>
  <div class="modal">
    <Backdrop @click="$emit('close-modal')" :display="this.display" />
    <!-- <Backdrop class="modal-backdrop" @click="closeModal()" :display="this.display" /> -->
    <div
      class="modal-card"
      :class="{ closeModal: this.isCloseModal }"
      :style="{
        width: `${width}px`,
        height: `${width * 1.65}px`,
      }"
    >
      <button class="close-btn" @click="$emit('close-modal')">
        <span class="material-symbols-rounded">close</span>
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Backdrop from '~/components/ui/Backdrop.vue'

export default {
  props: {
    width: {
      type: Number,
      default: 400,
    },
  },
  components: {
    Backdrop,
  },
  data() {
    return {
      isCloseModal: false,
      display: 'block',
    }
  },
  methods: {
    closeModal() {
      ;(closeModal = 'none'), (isCloseModal = true)
    },
  },
}
</script>

<style scoped lang="scss">
.modal {
  display: flex;

  // justify-content: center;
  // align-items: center;
  &-card {
    z-index: 10;
    position: absolute;
    left: calc(50% - 200px);
    /* top: 25%; */
    background-color: #fff;
    &.closeModal {
      display: none;
    }
    .close-btn {
      position: relative;
      top: 10px;
      left: calc(400px - 40px);
    }
  }
}
</style>
