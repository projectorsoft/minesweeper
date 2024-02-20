<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'NavigationBar',
	emits: ['viewChanged'],
	methods: {
		viewChanged(view: number) {
			this.$emit('viewChanged', view);
		},
	},
});
</script>

<template>
	<nav class="navbar navbar-dark bg-dark shadow-xl">
		<div class="container">
			<p class="navbar-brand d-flex align-items-center">
				<img src="/images/flag.svg" width="20" height="20" class="me-2" alt="logo" />
				<strong>Minesweeper-free.com</strong>
			</p>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="offcanvas"
				data-bs-target="#offcanvasRight"
				aria-controls="offcanvasRight"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
		</div>
	</nav>
</template>
