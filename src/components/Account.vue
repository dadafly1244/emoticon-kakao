<template>

	<div class="container">
		<h2>계좌 조회</h2>
		<select v-model="selectValue" name="account" id="account" required>
			<option value="" disabled selected>--------- 계좌 선택 ---------</option>
			<option v-for="account in myAccount.accounts" :key="account.id" :value="account">
				{{account.bankName}}
				{{account.accountNumber}}
			</option>
		</select>

		<p class="account-bankName"></p>
		<p class="account-balance"></p>

		<button @click="accountStore.login()">로그인</button>
		<!-- <button @click="createAccount">계좌생성</button> -->
	</div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAccountStore } from '~/store/account.js'
export default {
		data() {
			return {
				myAccount: {},
				selectValue: ''
			}
		},
		async created() {
			this.myAccount = await this.accountStore.getAccount()
		},
		watch: {
			selectValue: (selected) => {
				const $bankName = document.querySelector('.account-bankName')
				const $balance = document.querySelector('.account-balance')
				$bankName.innerHTML = `고객님 ${selected.bankName} 계좌에`
				$balance.textContent = `잔액이 ${selected.balance.toLocaleString()}원 있습니다`
			}
		},
		computed: {
    	...mapStores(useAccountStore)
  	}, 
		methods: {
			async createAccount() {
				const PAYLOAD = {
					"bankCode": "004",
  				"accountNumber": "123456789012",
  				"phoneNumber": "01012345678",
  				"signature": true
				}
				await this.accountStore.setAccount(PAYLOAD)
				this.$router.push("/")
			}
		},

}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		padding: 0 20px;
	}
	h2 {
		font-size: 40px;
		margin: 20px 0;
	}
	.account-bankName {
		text-align: center;
	}
	.account-balance {
		text-align: center;
	}
	select {
		@include select-options;
	}

	p {
		margin-top: 20px;
	}
</style>
