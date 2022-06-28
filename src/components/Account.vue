<template>
	<div>
		<button @click="accountStore.login()">로그인</button>
		<label for="account">계좌 조회</label>
		<select name="account" id="account">
			<option value=""></option>
		</select>
	</div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAccountStore } from '~/store/account.js'
export default {
		data() {
			return {
				
			}
		},
		created() {
			this.accountStore.getAccounts()
		},
		computed: {
    ...mapStores(useAccountStore)
  	}, 
		methods: {
			
		},

}
</script>

<style lang="scss" scoped>
	
</style>