<template>
	<ul class="lists">
		<li>
			<RouterLink to="/account">계좌 조회</RouterLink>		
		</li>
		<li>
			<RouterLink to="/newaccount">계좌 생성</RouterLink>
		</li>
		<li>
			<RouterLink to="/removeaccount">계좌 해지</RouterLink>
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
	color: #FF8251;
	border: 1px solid;
	background-color: #fff;
	border-radius: 5px;
	li {
		padding: 20px;
		font-size: 25px;
		border-bottom: 1px solid;
		transition: .4s;
		&:hover {
			background-color: #FF8251;
			color: #fff;
		}
		&:last-child{
			border-bottom: 0;
		}
	}
	a {
		font-weight: bold;
		color: inherit; text-decoration: none; outline: none;
		&:hover, &:active {
			text-decoration: none; background-color:transparent;
		}
	}
}
</style>