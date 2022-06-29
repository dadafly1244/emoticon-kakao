<template>
  <footer>
    <div class="footer__inner">
      <div class="footer-links">
        <a href="javascript:void(0)">이용약관</a>
        <a href="javascript:void(0)">유료이용안내</a>
        <a href="javascript:void(0)"><strong>개인정보처리방침</strong></a>
        <a href="javascript:void(0)">기업고객</a>
        <a href="javascript:void(0)">문의하기</a>
        <a href="javascript:void(0)">공정위사업자정보</a>
        <a href="javascript:void(0)"><strong>(주) 카카오</strong></a>
      </div>
      <p>
        카카오 이모티콘샵에서 판매되는 콘텐츠의 저작권은 콘텐츠 제공자에게 있으며, 이를 무단
        이용하는 경우 저작권법 등에 따라 처벌될 수 있습니다.
      </p>
      <p>대표: 남궁훈 사업자등록번호 120-81-47521 통신판매업신고번호제 2015-제주아라-0032호</p>
      <p>
        주소: 제주특별자치도 제주시 첨단로 242(영평동) 호스팅사업자: (주)카카오 고객센터: 1577-3754
        메일: help.notice@kakaocorp.com
      </p>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
footer {
  background-color: #fff;
  min-width: 280px;
}
.footer__inner {
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px 40px;
  color: #7f7f7f;
}
.footer-links {
  display: flex;
  align-items: center;
  a {
    margin-right: 9px;
    padding-right: 11px;
    padding-bottom: 2px;
    font-size: 13px;
    color: #4c4c4c;
    position: relative;

    &::after {
      position: absolute;
      display: block;
      top: 50%;
      right: 0;
      transform: translateY(-60%);
      width: 1px;
      height: 10px;
      background-color: rgba(0, 0, 0, 0.2);
      content: '';
    }
    &:last-child::after {
      display: none;
    }
  }
}
p {
  padding-top: 10px;
  font-size: 11px;
  line-height: 17px;
}
</style>
