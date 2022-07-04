<template>
	<div class="container">
		<select v-model="accountValue" name="account" id="account" required>
			<option value="" disabled selected>나의 계좌</option>
			<option v-for="account in myAccount.accounts" :key="account.id" :value="account">
				{{account.bankName}}
				{{account.accountNumber}}
			</option>
		</select>
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
}
</script>

<style lang="scss" scoped>
	select {
		@include select-options;
	}
</style>
