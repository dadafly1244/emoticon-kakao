<template>
	<AccountLayout heading="계좌 조회">
		<Account v-on:selected="onSelected"/>
		<div class="account-text">
			<svg v-if="!isSelected" class="up-arrow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"></path></svg>
			<p ref="paragraph">
				<strong>클릭하여 계좌 선택</strong>
			</p>
		</div>
		<button type="button" @click="$router.push('/mypage/accountmanagement')">뒤로 가기</button>
	</AccountLayout>
</template>

<script>
import Account from '~/components/Account'
import AccountLayout from '~/components/AccountLayout'

	export default {
		data() {
			return {
				isSelected: false
			}
		},
		components: {
			Account,
			AccountLayout,
		},
		methods: {
			/* Account.vue에서 emit 받아오기 */
			onSelected(account) {
				this.isSelected = true
				this.$refs.paragraph.innerHTML = `고객님 <strong>${account.bankName}</strong> 계좌에 <br>
				잔액이 <strong class="emp">${account.balance.toLocaleString()}원</strong> 있습니다`
			}
		}
	}
</script>

<style lang="scss" scoped>
	.account-text {
		@include account-text;
	}
	button {
		margin: 10px auto 0 auto;
		@include btn(back);
	}
</style>