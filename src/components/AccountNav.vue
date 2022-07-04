<template>
	<ul class="lists">
		<li>
			<RouterLink to="/account">계좌 조회</RouterLink>		
		</li>
		<li>
			<RouterLink to="/newaccount">계좌 생성</RouterLink>
		</li>
		<li>
			<RouterLink to="/deleteaccount">계좌 해지</RouterLink>
		</li>
	</ul>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
.lists {
	width: 500px;
	border: 2px solid #EC6F66;
	border-radius: 5px;
	li {
		padding: 20px;
		font-size: 25px;
		border-bottom: 1px solid #EC6F66;
		&:hover {
			background-color: #EC6F66;
			color: #fff;
		}
		&:last-child{
			border-bottom: 0;
		}
	}
	a {
		color: inherit; text-decoration: none; outline: none;
		&:hover, &:active {
			text-decoration: none; background-color:transparent;
		}
	}
}
</style>