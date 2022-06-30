<template>
	<AccountLayout heading="계좌 조회">
		<Account v-on:selected="onSelected"/>
		<p class="account-explanation"></p>
	</AccountLayout>
</template>

<script>
import Account from '~/components/Account'
import AccountLayout from '~/components/AccountLayout'
	export default {
		components: {
			Account,
			AccountLayout
		},
		methods: {
			/* Account.vue에서 emit 받아오기 */
			onSelected(account) {
				const $explanation = document.querySelector('.account-explanation')
				$explanation.innerHTML = `고객님 <strong class="emp">${account.bankName}</strong> 계좌에 <br>
				잔액이 <strong class="emp">${account.balance.toLocaleString()}원</strong> 있습니다`
			}
		}
	}
</script>

<style lang="scss" scoped>
	.account-explanation {
		font-size: 30px;
		padding-top: 20px;
		min-height: 140px;
		text-align: center;
		line-height: 2;
	}
</style>