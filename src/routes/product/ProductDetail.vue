<template>



<div class="wrap">
  <Modal v-if="showModal" @close-modal="showModal=false, isButtonDisable=true">
    <div class="modal-inner">
      <div class="modal-head">
        <div class="modal-head--title yellow">구매하기</div>
      </div>
      <div class="modal-body">
        <div class="modal-body--card">
          <div class="thumbnail">
            <img 
            v-if ="productStore.product.thumbnail"
            :src="productStore.product.thumbnail" 
            :alt="productStore.product.title">
            <div v-else class="no-image"></div>
          </div>
          <div class="detail">
            <div class="detail--title">{{productStore.product.title}}</div>
            <div class="detail--author"> {{productStore.product.description}}</div>
            <div class="detail--price">
              <div class="price--no-discount">{{addComma(productStore.product.price * 1.2)}}원</div>
            </div>
          </div>

        </div>
        <div class="modal-body--card">
          <div class="coupon">
            <!-- <div class="coupon--title">할인쿠폰</div> -->
            <!-- <div class="coupon--dropdown">할인쿠폰</div> -->
            <CouponDropdown />
            <div class="coupon--price">
              <div class="title">결제금액</div>
              <div class="nodiscount">
                <div class="nodiscount-title">판매금액</div>
                <div class="nodiscount-price">{{addComma(productStore.product.price * 1.2)}}원</div>
              </div>
              <div class="discount">
                <div class="discount-title">할인금액</div>
                <div class="discount-price">- {{addComma( (productStore.product.price * 1.2)-productStore.chooseCoupone)}}원</div>
              </div>
              <div class="payment">
                <div class="payment-title">최종 결제금액</div>
                <div class="payment-price">{{addComma(productStore.chooseCoupone)}}원</div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-body--card">
          <div class="agree">
            <button @click="isButtonDisable = !isButtonDisable">
              <span class="material-symbols-rounded" :class = '{yellow:!isButtonDisable}' >done</span>
              <div class="agree--title" >아래 내용에 동의합니다.</div>
            </button>
            <p>쿠폰은 중복사용 불가하며, 일부 결제수단은 할인쿠폰 적용이 불가합니다.</p>
            <p>주문취소 및 환불 시 이미 사용한 쿠폰은 재발급되지 않습니다.</p>
          </div>
        </div>
      </div>
      <div class="modal-foot">
        <button class="square-btn  yellow" @click="$router.push('/PurchaseProduct')" :disabled='isButtonDisable'>구매하기</button>
      </div>
    </div>
  </Modal>
  <div class="product--top">
    <div class="product--top--inner">
      <div class="product--thumbnail">
        <img 
        v-if ="productStore.product.thumbnail"
        :src="productStore.product.thumbnail" 
        :alt="productStore.product.title">
        <div v-else class="no-image"></div>
      </div>
      <div class="product--detail">
        <div class="product--detail--title">
          {{productStore.product.title}}
        </div>
        <div class="product--detail--author">
          {{productStore.product.description}}
        </div>
        <div class="product--detail--main">
          <div class="price-wrap">
            <span>항상 전상품 20% 할인</span>
            <div class="price">
              <div class="price--discount">
                <div class="price--discount--num">{{addComma(productStore.product.price)}}</div>
                <div class="price--discount--txt">원</div>
              </div>
              <div class="price--no-discount">{{addComma(productStore.product.price * 1.2)}}원</div>
            </div>
          </div>
          <button class="round-btn" > <span class="material-symbols-rounded">file_upload</span> </button>
          <button class="round-btn" > <span class="material-symbols-rounded">favorite</span></button>
        </div>
        <div class="product--purchase">
          <button class="square-btn yellow" @click="showModal=true">구매하기</button>
          <button class="square-btn">선물하기</button>
        </div>
      </div>
      
    </div>

  </div>
  <div class="product--photo">
    <div class="product--photo--inner">
      <img 
      v-if ="productStore.product.photo"
      :src="productStore.product.photo" 
      :alt="productStore.product.title">
      <div v-else class="no-image"></div>
    </div>
    
  </div>
  <div class="product--information">
    <div class="product--information--inner">
      <div class="area_guide">
        <dl class="list_guide " :class="{guide_close: iscloseDd}">
          <dt>
            <button @click="iscloseDd =! iscloseDd"  class="btn_open">
              <h4>상품안내</h4>
              <span :class="{ico_open: !iscloseDd}" class="material-symbols-rounded" >expand_more</span>
              <span :class="{ico_open: iscloseDd}" class="material-symbols-rounded" >expand_less</span>
            </button>
          </dt>
          <dd>부가가치세 10%가 포함된 가격입니다.</dd>
          <dd>결제 완료 후 ‘카카오톡’ 모바일 앱 메시지를 통해서 즉시 지급됩니다.</dd>
          <dd>선물 이모티콘은 결제 완료 후 선물받는 친구에게 이모티콘 메세지가 발송되므로 수신자가 직접 이모티콘을 다운로드 받을 수 있습니다.</dd>
          <dd>구매한 이모티콘은 카카오톡 모바일 앱 및 카카오톡 PC 서비스에서 사용할 수 있습니다.</dd>
          <dd>이 이모티콘을 구매, 또는 선물하면 카카오의 다른 서비스에서도 사용할 수 있습니다. 다만, 플러스 다운로드 하는 경우 카카오톡에서만 사용 가능합니다. 카카오는 회사의 사정, 기타
            제반 여건에 따라 이모티콘 사용처를 추가하거나 변경할 수 있습니다.</dd>
          <dd>카카오 이모티콘샵에서는 카카오톡 모바일 앱 내 이모티콘 스토어에서 판매하고 있는 이모티콘 중 일부는 판매하지 않을 수 있습니다.</dd>
          <dd>대한민국 카카오톡 사용자가 아닌 경우에는 일부 기능 또는 구매가 제한될 수 있습니다.</dd>
          <dd>미성년자인 회원이 법정대리인의 동의없이 상품 등을 구매하는 경우 본인 또는 법정대리인이 이를 취소할 수 있습니다.</dd>
        </dl>
        <dl class="list_guide" :class="{guide_close: iscloseDd2}">
          <dt>
            <button @click="iscloseDd2 =! iscloseDd2" class="btn_open" >
              <h4>해지 및 환불 안내</h4>
              <span :class="{ico_open: !iscloseDd2}" class="material-symbols-rounded" >expand_more</span>
              <span :class="{ico_open: iscloseDd2}" class="material-symbols-rounded" >expand_less</span>
            </button>
          </dt>
          <dd >결제 후 계약내용에 관한 서면을 교부받은 날(이하 ‘구매일’)로부터 7일 이내에 청약철회할 수 있습니다. 단, 콘텐츠의 내용이 표시·광고 내용과 다르거나 계약 내용과 다르게 이행된
            경우에는 당해 콘텐츠를 공급받은 날로부터 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회할 수 있습니다.</dd>
          <dd>아래 내용에 해당하는 경우에는 청약철회 또는 환불 신청이 제한될 수 있습니다.<ol class="list_subguide">
              <li>1) 구매일로부터 7일 이내에 용역 또는&nbsp;「문화산업진흥 기본법」 제2조제5호의 디지털콘텐츠의 제공이 개시된 경우. 다만, 가분적 용역 또는 가분적 디지털콘텐츠로
                구성된 계약의 경우에는 제공이 개시되지 아니한 부분에 대하여는 예외로 함.</li>
              <li>2) 구매일로부터 7일이 경과한 후 단순변심으로 인한 환불 신청의 경우</li>
            </ol>
          </dd>
          <dd>청약 철회/환불 요청을 원하실 경우
            <a href="https://cs.kakao.com/requests?category=278&amp;locale=ko&amp;node=30555&amp;service=94"
              class="link_txt" target="_blank" rel="noreferrer">[카카오 고객센터]
            </a> 
            에서 신청 할 수 있으며, 소비자의 청약철회일로부터 3 영업일
            이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 경우 소비자는 지연기간에 대해서 연 20%의 지연 배상금을 회사에게 청구할 수 있습니다.</dd>
          <dd>선물한 이모티콘의 경우 구매일로부터 7일이 경과하였거나, 선물을 받은 이용자가 다운로드 받은 경우 환불이 불가합니다.</dd>
          <dd>청약철회 및 환불 시 이미 사용하신 할인쿠폰은 재발급해드리지 않습니다.</dd>
          <dd>그 외 다른 사항에 대한 청약철회 및 환불은 카카오 유료서비스 이용약관 및 콘텐츠산업진흥법의 기준에 따르며, 피해보상 및 불만 처리 등 필요한 사항은 <a
              href="https://cs.kakao.com/requests?category=278&amp;locale=ko&amp;node=30555&amp;service=94"
              class="link_txt" target="_blank" rel="noreferrer">[카카오 고객센터]</a>로 연락 주시기 바랍니다.</dd>
        </dl>
      </div>
    </div>
  </div>
</div>

<TheLoader
  :loading="loading"
  :size="50"
  :width="10"
  class="loader" />

<!-- <div class="see" @click="getProductDetail(`${$route.params.productId}`)"></div> -->



</template>

<script>
import { mapStores } from "pinia";
import { useProductStore } from "~/store/product";
import { useUserStore } from "~/store/user";
import Modal from "~/components/ui/Modal.vue";
import CouponDropdown from "~/components/CouponDropdown.vue";

export default {
    data() {
        return {
            loading: true,
            productId: this.$route.params.productId,
            iscloseDd: true,
            iscloseDd2: true,
            showModal: false,
            isButtonDisable: true
        };
    },
    computed: {
        ...mapStores(useProductStore, useUserStore)
    },
    async created() {
        await this.productStore.productDetail(this.productId); // 다 불러오기..!!
        this.loading = false;
    },
    methods: {
        async getProductDetail(productId) {
            this.loading = true;
            await this.productStore.productDetail(productId);
            this.loading = false;
        },
        addComma(num) {
            const regexp = /\B(?=(\d{3})+(?!\d))/g;
            return String(num).toString().replace(regexp, ",");
        },
        changeIcon() {
            this.iscloseDd = !this.iscloseDd;
            if (this.iscloseDd) {
                console.log(this.$refs.ico_open);
                this.$refs.ico_open.content = "expand_less";
            }
            else {
                this.$refs.ico_open.content = "expand_more";
            }
        }
    },
    components: { Modal, CouponDropdown }
}

</script>

<style scoped lang="scss">
.wrap{ 
  // position:relative;
  // height: 30vh;
  border: 1px solid red;
  
  .modal-inner{
    display: flex;
    flex-direction: column;
    .modal-head {
      &--title{
        font-size: 1.3rem;
        font-weight: 600;
        padding: 5px 0 10px 28px;
      }
    }
    .modal-body{
      &--card {
        border-bottom: 4px solid #fafafa;
        .agree {
          button {
            .material-symbols-rounded {
              color: #ccc;
              border: 1px solid #fafafa;
              border-radius: 50%;
              &.yellow {
                color: #fff;
                background-color: #fee500;
                border: 1px solid rgba($color: #000000, $alpha: 0);

              }
            }
          }
          p{
            color: #7f7f7f;
          }
        }
      }
    }
    .modal-foot {
      display: flex;
      justify-content: center;
      align-items:center;
      .square-btn {
        border: 1px solid rgba($color: #000000, $alpha: 0.14);
        width: 350px;
        height: 44px;
        font-size: 1rem;
        font-weight: 500;
        border-radius: 10px;
        margin-right: 20px;
        cursor: pointer;
        &.yellow{
          background-color: #fee500;
          border: 1px solid rgba($color: #000000, $alpha: 0);
        }
        &:disabled {
          cursor: default;
          background-color: #fafafa;
        }
      }
    }
  }

  .product--top {
    background-color: #fff;

    &--inner {
      border: 1px solid greenyellow;
      width: 1024px;
      margin: 0 auto;
      display: flex;

      padding: 50px 122px 50px 40px;
      .product--thumbnail{
        
        width: 180px;
        height: 180px;
        margin: 10px auto;
        img{
          width: 100%;
          margin: 10px auto;
        }
        .no-image{
          width: 100%;
          height: 100%;
          margin: 10px auto;
          background-image: url('~/static/no_image.jpg');
          background-position: center;
          background-size: cover;
        }
      }
      .product--detail {
        &--title {
          font-size: 30px;
          font-weight: 700;
          color: #191919;
          line-height: 4rem;
        }
        &--author {
          color: #999;
          line-height: 2rem;
        }
        &--main {
          display: flex;
          margin: 1rem 0;
          .price-wrap {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            span {
              color:#191919;
              margin-bottom: 2px;
              font-weight: 500;
            }
            .price {
              display: flex;
              // background-color: aqua;
              // flex-grow: 1;
              &--discount {
                color: #fa4637;
                font-size: 1.5rem;
                font-weight: 700;
                display: flex;
                margin-right: 10px;
              }
              &--no-discount{
                display: inline;
                margin-top: auto;
                color: #999;
                line-height: 1.5rem;
                text-decoration: line-through;
              }
            }
          }

          .round-btn {
            width: 44px;
            height: 44px;
            border: 1px solid rgba($color: #000000, $alpha: .14);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
          }
        }

        .product--purchase {

        display: flex;
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
      }
      }
      
    }
  }
  .product--photo {
    background-color: #FAFAFA;
    &--inner {
      border: 1px solid greenyellow;
      width: 1024px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 900px;
        margin: 30px;
      }
    }
  }

  .product--information {
    background-color: #FAFAFA;
    &--inner {
      width: 1024px;
      border: 1px solid red;
      margin: 0 auto;
      padding: 0 40px;

      .list_guide {
        
         
          dt .btn_open {
            position: relative;
            display: block;
            width: 100%;
            text-align: left;
            padding: 18px 0 18px;
            h4 {
              font-size: 16px;
              line-height: 24px;
              color: #000;
            }
            .material-symbols-rounded{
              font-size: 25px;
              position: absolute;
              right: 0;
              top: 23px;
              display: block;
            }
            .ico_open {
              display: none;
            }
          }
          dd {
            position: relative;
            display: block;
            padding-bottom: 15px;
            padding-left: 11px;
            font-size: 14px;
            line-height: 20px;
            color: #7f7f7f;
            
            .link_txt {
              display: inline;
              font-size: 14px;
              line-height: 20px;
              color: #7f7f7f;
              cursor: pointer;
              overflow: hidden;
              word-break: break-all;
            }
          }
          &.guide_close{
            dd {
              display: none;
            }
          }
        
      }
        
    }
  }
}

// .see{
//   height: 100px;
//   width: 100px;
//   background-color: aqua;
// }
</style>