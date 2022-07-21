<template>
  <header>
    <!-- header -->
    <div class="head">
      <div class="head__inner">
        <div class="menu-icon" :class="{ clicked: leftNavOn }" @click="leftNavOn = !leftNavOn">
          <img src="~/static/hamburger_menu.svg" alt="menu-icon" />
        </div>
        <RouterLink to="/">
          <div class="head-title">kakao<strong>emoticon</strong> shop</div>
        </RouterLink>
        <div class="search-profile">
          <div class="search-icon" :class="{ clicked: searchOn }" @click="searchOn = !searchOn">
            <img src="~/static/search_icon.svg" alt="search-icon" />
          </div>
          <div v-if="userStore.img" class="profile-default" @click="popupOn = !popupOn">
            <img v-bind:src="userStore.img" alt="profile-default" />
          </div>
          <div v-else class="profile-default" @click="popupOn = !popupOn">
            <img src="~/static/profile_default.png" alt="profile-default" />
          </div>
          ~/static/
        </div>
        <!-- popup -->
        <div v-show="popupOn" class="popup">
          <div v-if="userStore.displayName" class="popup-profile">
            <img v-if="userStore.img" v-bind:src="userStore.img" alt="profile-default" />
            <img v-else v-bind:src="'~/static/profile_default.png'" alt="profile-default" />
          </div>
          <div v-else class="popup-profile">
            <img src="~/static/profile_default.png" alt="profile-default" />
          </div>
          <div class="popup-name">{{ this.userStore.displayName }}</div>
          <div class="popup-email">{{ this.userStore.email }}</div>
          <button
            v-if="!userStore.displayName"
            class="btn--logout"
            @click="$router.push('/login'), (popupOn = !popupOn)"
          >
            로그인
          </button>
          <button v-else class="btn--logout" @click="logout">로그아웃</button>
        </div>
        <div v-if="popupOn" @click="popupOn = !popupOn" class="popup-container"></div>
      </div>
      <!-- 홈/스타일 탭메뉴 -->
      <nav id="global-nav">
        <ul class="global-nav__inner">
          <li :class="{ current: $route.path === '/' }">
            <RouterLink to="/"> 홈 </RouterLink>
          </li>
          <li :class="{ current: isMatch(/^\/style/) }">
            <RouterLink to="/style"> 스타일 </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
    <!-- 검색창 -->
    <div v-show="searchOn" class="search-container">
      <div class="search-inner">
        <form v-on:submit.prevent class="search-form">
          <input
            :value="searchValue"
            @input="searchValue = $event.target.value"
            @keydown.enter.prevent="searchEmoticon"
            placeholder="이모티콘을 검색해보세요!"
            class="search-input"
            type="text"
            autocomplete="off"
          />
          <button v-show="searchValue" type="reset">
            <div class="cancel-icon">
              <img src="~/static/cancel_icon.svg" alt="cancel-icon" />
            </div>
          </button>
          <button type="submit" @click="searchEmoticon">
            <div class="search-icon button">
              <img src="~/static/search_icon.svg" alt="search-icon" />
            </div>
          </button>
        </form>
      </div>
    </div>
    <div @click="searchOn = !searchOn" v-if="searchOn" class="search-curtain"></div>
    <!-- 왼쪽 nav -->
    <nav v-show="leftNavOn" id="leftnav" @click="leftNavOn = !leftNavOn">
      <div class="leftnav__inner">
        <RouterLink v-if="userStore.displayName" to="/mypage/PurchaseHistory" class="nav-profile">
          <div class="profile-big">
            <img
              v-if="!userStore.img"
              v-bind:src="'~/static/profile_default.png'"
              alt="profile-default"
            />
            <img v-else v-bind:src="userStore.img" alt="" />
          </div>
          <div class="profile-name">{{ this.userStore.displayName }}</div>
        </RouterLink>
        <RouterLink v-else to="/login" class="nav-profile">
          <div class="profile-big">
            <img src="~/static/profile_default.png" alt="profile-default" />
          </div>
          <div class="profile-name">로그인</div>
        </RouterLink>
        <ul class="list-mypage">
          <li>
            <RouterLink to="/mypage/PurchaseHistory">
              <div class="nav-icon buy-icon">
                <img src="~/static/buy_icon.svg" alt="buy-icon" />
              </div>
              <div class="text-mypage">구매 내역</div>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/mypage/reservation">
              <div class="nav-icon reserve-icon">
                <img src="~/static/reserve_icon.svg" alt="reserve-icon" />
              </div>
              <div class="text-mypage">예약 하기</div>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/mypage/accountmanagement">
              <div class="nav-icon account-icon">
                <img src="~/static/account_icon.svg" alt="account-icon" />
              </div>
              <div class="text-mypage">계좌 관리</div>
            </RouterLink>
          </li>
        </ul>
        <ul class="list-nav">
          <li>
            <RouterLink to="/">홈</RouterLink>
          </li>
          <li>
            <RouterLink to="/style">스타일</RouterLink>
          </li>
        </ul>
        <ul class="list-aside">
          <li v-if="userStore.displayName" @click="userStore.logoutUser">
            <RouterLink to="/">로그아웃</RouterLink>
          </li>
          <li v-if="userStore.displayName">
            <RouterLink to="/user">정보 수정</RouterLink>
          </li>
          <li>
            <a href="https://lovely-queijadas-a67809.netlify.app/login">관리자 페이지</a>
          </li>
        </ul>
      </div>
      <div class="leftnav__copyright">
        <div class="nav-logo">kakao<strong>emoticon</strong> shop</div>
        <div class="nav-corp">@ kakao Corp</div>
      </div>
    </nav>
    <!-- 왼쪽 nav curtain  -->
    <div v-if="leftNavOn" class="nav-curtain" @click="leftNavOn = !leftNavOn"></div>
  </header>
</template>
<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'
import { useProductStore } from '~/store/product'
export default {
  data() {
    return {
      current: false,
      searchOn: false,
      leftNavOn: false,
      popupOn: false,
      searchValue: '',
    }
  },
  created() {
    this.userStore.authUser()
  },
  computed: {
    ...mapStores(useUserStore, useProductStore),
  },
  methods: {
    isMatch(path) {
      if (!path) return false
      return path.test(this.$route.fullPath)
    },
    searchEmoticon(event) {
      if (event.isComposing) return //한글 입력중인가?
      if (!this.searchValue.trim()) return // 빈문자인가?

      let input = this.searchValue
      input = input.replace(', ', ' ') // 검색이 '제품제목, #태그'와 같이 콤마와 공백을 모두 사용한 경우.!
      let array = input.split(/[\s,]/) //공백, 콤마로 구분 해서 배열에 넣기!

      let title = []
      let tags = []
      for (const item of array) {
        if (item.indexOf('#') === -1) {
          // 제목 검색일 때! 사용자가 여러개의 제목을 검색한 값 다 받아옴
          title = [...title, item]
        } else {
          let temp = item.replace('#', '')
          tags = [...tags, temp]
        }
      }

      this.productStore.productSearch({ searchText: title[0], searchTags: tags }) // 사용자가 입력한 제목 중에서 첫번째로 입력한 제목만 입력하기!

      this.searchValue = '' // api 보내고 입력값 초기화
    },
    logout() {
      this.userStore.logoutUser()
      this.popupOn = !this.popupOn
    },
  },
  watch: {},
}
</script>
<style lang="scss" scoped>
$head-height: 60px;
header {
  width: 100vw;
  height: 97px;
}
#leftnav {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 11;
  width: 290px;
  height: 100%;
  padding-bottom: 54px;
  background: #fff;
}
.leftnav__inner {
  overflow-y: auto;
  height: 100%;
  padding: 18px 0 12px;
  .nav-profile {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    .profile-big {
      width: 56px;
      height: 56px;
      img {
        width: 56px;
        height: 56px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .profile-name {
      color: #000;
      font-weight: bold;
      flex: 1;
      padding-left: 12px;
      &::after {
        margin-left: 8px;
        content: '>';
        color: gray;
      }
    }
  }
  .list-mypage {
    padding: 0 11px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    li {
      flex-basis: calc(100% / 3);
      padding: 12px 0;
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #191919;
      }
      .nav-icon {
        width: 30px;
        height: 30px;
      }
      .text-mypage {
        margin-top: 6px;
        font-size: 13px;
        line-height: 19px;
      }
    }
  }
  .list-nav {
    margin-top: 9px;
    padding-top: 13px;
    border-top: 1px solid rgba(0, 0, 0, 0.04);

    a {
      padding: 14px 20px;
      font-size: 16px;
      color: #191919;
      &:hover {
        background-color: rgba(0, 0, 0, 0.02);
      }
    }
  }
  .list-aside {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(0, 0, 0, 0.04);

    a {
      padding: 11px 20px;
      font-size: 14px;
      color: #7f7f7f;
      &:hover {
        background-color: rgba(0, 0, 0, 0.02);
      }
    }
  }
}
.leftnav__copyright {
  position: relative;
  height: 54px;
  padding: 9px 10px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
}
.nav-curtain {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  background-color: #191919;
  opacity: 0.3;
}
.head {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 10;
  min-width: 300px;
}
.head__inner {
  height: $head-height;
  padding: 0 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.menu-icon,
.search-icon,
.profile-default {
  cursor: pointer;
  width: 30px;
  height: 30px;
  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
  }
}
.search-icon {
  &.clicked {
    display: none;
  }
}
.cancel-icon {
  cursor: pointer;
  width: 20px;
  height: 20px;
  img {
    object-fit: cover;
  }
}
.head-title {
  font-size: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
}
.search-profile {
  display: flex;
}
.search-icon {
  margin-right: 20px;
}
.profile-default {
  img {
    border-radius: 20px;
  }
}
.popup {
  position: absolute;
  top: 50px;
  right: 20px;
  min-width: 200px;
  max-width: 240px;
  box-shadow: 0 4px 10px rgb(0 0 0 / 10%);
  border-radius: 10px;
  padding: 20px 0 0;
  background-color: #fff;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  .popup-profile {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .popup-name {
    margin: 8px 20px 2px;
    font-size: 14px;
    line-height: 20px;
    max-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
  }
  .popup-email {
    color: #999;
    font-size: 12px;
    line-height: 16px;
    display: block;
    margin: 0 20px;
    max-width: 240px;
    word-break: break-all;
  }
  .btn--logout {
    display: block;
    width: 100%;
    font-size: 12px;
    line-height: 46px;
    height: 44px;
    margin-top: 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.04);
    &:hover {
      background-color: rgba(0, 0, 0, 0.02);
    }
  }
}
.popup-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
@media (max-width: 767px) {
  .profile-default {
    display: none;
  }
  .search-icon {
    margin-right: 0;
  }
}

#global-nav {
  .global-nav__inner {
    padding: 0 16px;
    display: flex;
    justify-content: center;
    border-bottom: 2px transparent;
    li {
      padding: 10px 70px;
      color: gray;
      a {
        color: inherit;
      }
      &.current {
        border-bottom: 2px solid;
        color: #000;
      }
    }
  }
  &::after {
    position: absolute;
    display: block;
    content: '';
    bottom: 0;
    width: 100%;
    left: 0;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.08);
  }
}

.search-container {
  position: fixed;
  top: 97px;
  left: 0;
  right: 0;
  height: 100px;
  z-index: 1;
  background-color: #fafafa;
}
.search-inner {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.search-form {
  width: 600px;
  min-width: 300px;
  position: relative;
  height: 56px;
  border-radius: 8px;
  background-color: #fff;
  &:before {
    position: absolute;
    top: -30px;
    left: -150px;
    content: '';
    width: 130px;
    height: 117px;
    background-size: contain;
    background: url('~/static/bg_search.png') no-repeat;
    background-size: 130px 117px;
  }
  &:after {
    position: absolute;
    top: -30px;
    right: -150px;
    content: '';
    width: 130px;
    height: 117px;
    background-size: contain;
    background: url('../../public/bg_search2.png') no-repeat;
    background-size: 130px 117px;
  }
}
.search-input {
  width: calc(100% - 128px);
  border: 0 none;
  padding: 13px 24px 13px 20px;
  font-size: 18px;
  line-height: 28px;
  border-radius: 8px;
  &:focus {
    outline: 2px solid;
  }
  &::placeholder {
    color: gray;
  }
}
button[type='reset'] {
  height: 100%;
  position: absolute;
}
button[type='submit'] {
  height: 100%;
  position: absolute;
  right: 0;
  .button {
    margin-right: 0;
  }
}
.search-curtain {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #191919;
  opacity: 0.3;
}
</style>
