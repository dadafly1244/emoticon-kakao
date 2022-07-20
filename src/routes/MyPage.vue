<template>
  <div class="mypage-header">
    <div class="header-inner">
      <div class="content">
        <h3>마이페이지</h3>
        <div class="links">
          <RouterLink :class="{current: $route.path === '/mypage/PurchaseHistory'}" to="/mypage/PurchaseHistory">구매내역</RouterLink>
          <RouterLink :class="{current: $route.path === '/mypage/reservation'}" to="/mypage/reservation">예약하기</RouterLink>
          <RouterLink :class="{current: $route.path === '/mypage/accountmanagement'}" to="/mypage/accountmanagement">계좌관리</RouterLink>
        </div>
      </div>
      <div class="bg-image"></div>
    </div>
  </div>
  <div class="mypage-main">
    <div class="main-inner">
      <h4>{{ getRoute() }}</h4>
      <router-view></router-view>
    </div>
  </div>

</template>
<script>
 export default {
  methods: {
    getRoute() {
      switch(this.$route.path) {
        case '/mypage/PurchaseHistory':
          return '구매내역'
          break
        case '/mypage/reservation':
          return '예약하기'
          break
        case '/mypage/accountmanagement':
          return '계좌관리'
          break
      }
    }
  },
 }
</script>
<style lang="scss" scoped>
  .mypage-header {
    background-color:#6195ef;
    .header-inner {
      position: relative;
      width: 1024px;
      margin: 0 auto;
      padding: 0 40px;
      height: 190px;  
    }
    .content {
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
    }
    h3 {
      margin-bottom: 17px;
      font-size: 28px;
      line-height: 41px;
      color: #fff;
    }
    .links {
      display: flex;
      gap: 10px;
      a {
        &:hover, &.current {
          background-color: #fff;
          color: #4774c1;
        }
        color: #fff;
        height: 36px;
        padding: 0 18px;
        background-color: rgba(0,0,0,.1);
        border-radius: 19px;
        font-size: 14px;
        line-height: 36px;
      }
    }
    .bg-image {
      background-image: url('../../public/assets/mypage_header_bg.png');
      background-size: cover;
      background-repeat: no-repeat;
      position: absolute;
      height: 190px;
      width: 440px;
      top: 0px;
      right: 40px;
    }
  }
  .mypage-main {
    min-height: 50vh;
    .main-inner {
      position: relative;
      width: 1024px;
      margin: 0 auto;
      padding: 40px;
    }
    h4 {
      color: #191919;
      font-size: 18px;
      margin-bottom: 40px;
    }
  }
</style>
