<template>
	<AccountLayout :heading="isCreate ? '계좌 생성' : '계좌 해지'">
		<p v-if="isCreate">계좌가 정상적으로 생성 되었습니다</p>
		<p v-else>계좌가 정상적으로 해지 되었습니다</p>
		<button class="button" @click="$router.push('/mypage/accountmanagement')">계좌 관리로</button>
	</AccountLayout>
</template>

<script>
import AccountLayout from '~/components/AccountLayout'
	export default {
		data() {
			return {
				isCreate: false
			}
		},
		created() {
			this.isCreate = this.$route.params.createOrDelete === 'create'
		},
		components: {
			AccountLayout
		},
	}
</script>

<style lang="scss" scoped>
	p {
		font-size: 32px;
		text-align: center;
		margin-top: 100px;
		color: #808080;
	}
	.button{
		margin: 50px auto 0 auto;
		@include btn(back);
	}
</style>