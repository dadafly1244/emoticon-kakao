<template>
	<div class="container">
		<div class="inner">
			<h3>{{heading}}</h3>
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
		background-color: #ddd;
		overflow: auto;
		.inner {
			margin: 0 auto;
			width: 600px;
		}
		h3 {
			font-size: 40px;
			padding: 30px 0;
		}
	}
</style>