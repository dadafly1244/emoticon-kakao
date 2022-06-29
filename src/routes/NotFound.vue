<template>
  <section>
    <img src="https://t1.kakaocdn.net/estoreweb/images/20220421091219/empty_purchase.png" alt="" />
    <h1>404 Page <br />Not Found!</h1>
    <RouterLink to="/">홈으로 가기</RouterLink>
  </section>
</template>

<style lang="scss" scoped>
section {
  text-align: center;
  padding: 100px 0 200px;
  h1 {
    font-size: 60px;
    font-weight: 700;
    line-height: 2;
  }
  a {
    width: 120px;
    padding: 10px 0;
    margin: 10px auto;
    text-align: center;
    background-color: #eee;
    color: #333;
    border-radius: 10px;
    &:hover {
      background-color: darken(#eee, 10%);
    }
  }
}
</style>
