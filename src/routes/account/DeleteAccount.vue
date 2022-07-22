<template>
  <AccountLayout heading="계좌 해지">
    <Account v-on:selected="onSelected" />
    <div class="account-text">
      <svg
        v-if="!isSelected"
        class="up-arrow"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <p ref="paragraph">
        <strong>해지할 계좌 선택</strong>
      </p>
    </div>

    <div class="buttons">
      <button type="button" @click="$router.push('/mypage/accountmanagement')">뒤로 가기</button>
      <button type="button" @click="onDelete">해지</button>
    </div>
  </AccountLayout>
</template>

<script>
import Account from '~/src/components/Account'
import AccountLayout from '~/src/components/AccountLayout'
import { mapStores } from 'pinia'
import { useAccountStore } from '~/src/store/account.js'
export default {
  data() {
    return {
      isSelected: false,
      accountId: '',
    }
  },
  components: {
    Account,
    AccountLayout,
  },
  computed: {
    ...mapStores(useAccountStore),
  },
  methods: {
    /* Account.vue에서 emit 받아오기 */
    onSelected(account) {
      this.isSelected = true
      this.accountId = account.id
      this.$refs.paragraph.innerHTML = `<strong>${account.bankName}</strong> ${account.accountNumber} <br>
				해당 계좌를 정말로 해지 하시겠습니까?`
    },
    async onDelete() {
      if (!this.isSelected) return
      await this.accountStore.removeAccount(this.accountId, true)
      this.$router.push('/completed/delete')
    },
  },
}
</script>

<style lang="scss" scoped>
.account-text {
  @include account-text;
}
.buttons {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 30px;
  button {
    &:first-child {
      @include btn(back);
    }
    &:last-child {
      @include btn(delete);
    }
  }
}
</style>
