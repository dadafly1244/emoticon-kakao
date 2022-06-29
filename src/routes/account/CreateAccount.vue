<template>
	<div class="container">
		<h2>계좌 생성</h2>
		<form class="account-form">
			<label for="bank-name">은행</label>
			<select name="bank-name" id="bank-name" required>
				<option value="" disabled selected>--------- 은행 선택 ---------</option>
				<option v-for="bank in banks" :key="bank" :value="bank">
					{{bank}}
				</option>
			</select>
			<label for="account-number">계좌번호</label>
			<input type="number" id="account-number" />
			<label for="phone-number">전화번호</label>
			<input type="number" id="phone-number" />
			<label for="signature">서명</label>
			<input type="text" id="signature" />
			<button type="submit">확인</button>
		</form>
		<button @click="login">로그인</button>
	</div>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user.js'
import { useAccountStore } from '~/store/account.js'
	export default {
		data() {
			return {
				banks: []
			}
		},
		async created() {
			this.banks = await this.accountStore.getAccounts()
			console.log(this.banks)
			//console.log(userStore.getCurrentUser())
		},
		computed: {
    	...mapStores(useAccountStore, useUserStore)
  	},
		methods: {
			async login() {
				this.accountStore.login()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 100vh;
		background-color: #eee;
		padding: 0 20px;
	}
	h2 {
		font-size: 40px;
		margin: 20px 0;
	}
	.account-form {
		background-color: #fff;
		margin: 0 auto;
		padding: 20px;
		width: 600px;
		display: flex;
		flex-direction: column;
		align-items: center;
		label {
			width: 100%;
			font-size: 30px;
			text-align: left;
		}
		select {
			@include select-options;
		}
		input {
			@include input;
		}
	}

</style>