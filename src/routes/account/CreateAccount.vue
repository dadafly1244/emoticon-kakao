<template>
	<AccountLayout heading="계좌 생성">
		<form class="account-form" @submit.prevent="onSubmit" autocomplete="off">
			<label for="bank-name">은행</label>
			<select v-model="bankValue" name="bank-name" id="bank-name">
				<option value="" disabled selected>--------- 은행 선택 ---------</option>
				<option v-for="bank in banks" :key="bank.code" :value="bank" :disabled="bank.disabled">
					{{bank.name}}
				</option>
			</select>
			<p v-if="errors['bank']">{{ errors['bank'] }}</p>
			<label for="account-number">계좌번호 <strong class="account-length"
					v-if="digitsLength">{{digitsLength}}자리</strong></label>
			<input v-model="accountValue" @focus="accountValue = ''" @keyup="accountMask(currentDigits)" type="text"
				id="account-number" :disabled="!bankValue" />
			<p v-if="errors['account']">{{ errors['account'] }}</p>
			<label for="phone-number">전화번호</label>
			<input v-model="phoneValue" @focus="phoneValue = ''" @keyup="phoneMask" type="text" id="phone-number" />
			<p v-if="errors['phone']">{{ errors['phone'] }}</p>
			<label for="signature">서명</label>
			<input v-model="signValue" type="text" id="signature" />
			<p v-if="errors['sign']">{{ errors['sign'] }}</p>
			<button type="submit">확인</button>
		</form>
	</AccountLayout>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user.js'
import { useAccountStore } from '~/store/account.js'
import AccountLayout from '~/components/AccountLayout'

	export default {
		components: {
			AccountLayout
		},
		data() {
			return {
				errors: {},
				currentDigits: [],
				accountValue: '',
				phoneValue: '',
				bankValue: undefined,
				signValue: '',
				banks: []
			}
		},
		async created() {
			this.banks = await this.accountStore.getAccounts()
			console.log(this.banks)
		},
		watch: {
			bankValue(value) {
				this.accountValue = ''
				this.currentDigits = value.digits
			},
		},
		computed: {
    	...mapStores(useAccountStore, useUserStore),
			digitsLength() {
				if (!this.currentDigits.length) return 0
				return this.currentDigits.reduce((a,c) => a+c)
			},
			isFormValid() {
				this.errors = {}
				const accountLength = this.accountValue.replaceAll('-','').length
				const phoneLength = this.phoneValue.replaceAll('-','').length
				if (!this.bankValue) this.errors['bank'] = '은행을 선택 하세요.'
				if (accountLength < this.digitsLength) this.errors['account'] = '계좌번호 길이가 짧습니다.'
				if (phoneLength < 11) this.errors['phone'] = '전화번호 길이가 짧습니다.'
				if (!this.signValue) this.errors['sign'] = '서명을 입력 하세요.'
				return !Object.keys(this.errors).length
			}
  	},
		methods: {
			phoneMask() {
				const num = this.phoneValue.replace(/\D/g,'')
				this.phoneValue = num.substring(0,3) + '-' + num.substring(3,7) + '-' + num.substring(7,11)
			},
			accountMask(digits) {
				const num = this.accountValue.replace(/\D/g,'')
				let value = num.substring(0,digits[0]) + '-' + num.substring(digits[0],digits[0] + digits[1]) + '-' + num.substring(digits[0] + digits[1],digits[0] + digits[1] + digits[2])
				digits.length > 3 && (value += '-' + num.substring(digits[0] + digits[1],digits[0] + digits[1] + digits[2]))
				this.accountValue = value
			},
			async onSubmit() {
				if (!this.isFormValid) return
				await this.accountStore.setAccount({
					bankCode: this.bankValue.code,
        	accountNumber: this.accountValue.replaceAll('-',''),
        	phoneNumber: this.phoneValue.replaceAll('-',''),
        	signature: true
				})
				this.$router.push('/completed/newaccount')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.account-form {
		background-color: #fff;
		margin-bottom: 50px;
		padding: 20px;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		label {
			width: 100%;
			font-size: 22px;
			text-align: left;
			margin: 40px 0 20px 0;
			&:first-child {
				margin: 20px 0;
			}
		}
		.account-length {
			color: red;
			font-size: 16px;
		}
		select {
			@include select-options;
		}
		input {
			@include input;
		}
		button {
			margin-top: 40px;
			@include btn(ok);
		}
		p {
			font-size: 15px;
			margin-top: 10px;
			color: red;
		}
	}

</style>