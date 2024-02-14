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
		<div class="container-xxl">
			<p class="navbar-brand d-flex align-items-center">
				<img src="/images/flag.svg" width="20" height="20" style="margin-right: 10px" />
				<strong>Minesweeper</strong>
			</p>
			<form>
				<button @click="viewChanged(0)" class="btn btn-success me-2" type="button">
					<img src="/images/play.svg" width="25" height="25" />
				</button>
				<button @click="viewChanged(1)" class="btn btn-sm btn-outline-secondary me-2" type="button">
					<img src="/images/gallery.svg" width="25" height="25" />
				</button>
				<a
					class="btn btn-sm btn-outline-secondary me-2"
					type="button"
					data-bs-toggle="collapse"
					href="#settingsContainer"
				>
					<img src="/images/settings.svg" width="25" height="25" />
				</a>
			</form>
			<button type="button" class="navbar-toggler" data-bs-toggle="modal" data-bs-target="#aboutModal">
				<img src="/images/info-circle.svg" width="25" height="25" />
			</button>
		</div>
	</nav>
</template>
