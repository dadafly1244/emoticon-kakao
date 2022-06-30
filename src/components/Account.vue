<template>
	<div class="container">
		<select v-model="accountValue" name="account" id="account" required>
			<option value="" disabled selected>--------- 계좌 선택 ---------</option>
			<option v-for="account in myAccount.accounts" :key="account.id" :value="account">
				{{account.bankName}}
				{{account.accountNumber}}
			</option>
		</select>
		<!-- <button @click="createAccount">계좌생성</button> -->
	</div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAccountStore } from '~/store/account.js'
export default {
		emits: ['selected'],
		data() {
			return {
				myAccount: {},
				accountValue: ''
			}
		},
		async created() {
			this.myAccount = await this.accountStore.getAccount()
		},
		watch: {
			accountValue(selectedAccount) {
				/* select 되어진 account 객체를 ReadAccount.vue에 emit */
				this.$emit('selected', selectedAccount)
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
	select {
		@include select-options;
	}
</style>
