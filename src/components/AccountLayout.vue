<template>
	<div class="container">
		<div class="subtitle">
			<h3>{{heading}}</h3>
		</div>
		<div class="inner">
			<slot />
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			heading: String
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 70vh;
		overflow: auto;
		background-color: #F6F5EE;
		.subtitle {
			background-color: #FF8251;
			color: #723210;
			h3 {
			font-size: 40px;
			margin: 0 auto;
			width: 600px;
			padding: 30px 0;
			}
		}
		.inner {
			margin: 0 auto;
			padding-top: 50px;
			width: 600px;
		}
	}
</style>