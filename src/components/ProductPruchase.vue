<template>
<div class="modal">
  <div class="modal-inner">
    <div class="modal-head">
      <div class="modal-title">구매하기</div>
      <span class="material-symbols-rounded close-btn">close</span>
    </div>
    <div class="modal-body">
      <div class="modal-body--inner">
        <div class="box_order"></div>
        <div class="box_order box_coupon"></div>
        <div class="box_order box_agree">
          <button class="agree">
            <span class="material-symbols-rounded">done</span>
            <div class="agree-txt">아래 내용에 동의합니다.</div>
          </button>

        </div>
      </div>
    </div>
    <div class="modal-foot">
      <button class="square-btn yellow">구매하기</button>
    </div>
  </div>

</div>

</template>

<script>


</script>

<style scoped lang="scss">


.square-btn {
  border: 1px solid rgba($color: #000000, $alpha: 0.14);
  width: 220px;
  height: 44px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 10px;
  margin-right: 20px;
  &.yellow{
    background-color: #fee500;
    border: 1px solid rgba($color: #000000, $alpha: 0);
  }

}
</style>