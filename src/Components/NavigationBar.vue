<script lang="ts">
import { defineComponent, defineEmits } from 'vue';

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
		<div class="container-xxl">
			<p class="navbar-brand d-flex align-items-center">
				<img src="/images/flag.svg" width="20" height="20" style="margin-right: 10px" />
				<strong>Minesweeper</strong>
			</p>
			<form>
				<button @click="viewChanged(0)" class="btn btn-success btn-fixed-width me-2" type="button">Play</button>
				<button
					@click="viewChanged(1)"
					class="btn btn-sm btn-outline-secondary btn-fixed-width me-2"
					type="button"
				>
					Gallery
				</button>
			</form>
			<button type="button" class="navbar-toggler" data-bs-toggle="modal" data-bs-target="#aboutModal">
				<img src="/images/info-circle.svg" width="25" height="25" />
			</button>
		</div>
	</nav>
</template>

<style scoped>
.btn-fixed-width {
	width: 130px;
}
</style>
