<script lang="ts">
import { defineComponent, defineEmits } from 'vue';

//const emit = defineEmits(['viewChanged']);

export default defineComponent({
	name: 'NavigationBar',
    emits: ['viewChanged'],
    methods: {
        switchView(view: number) {
            this.$emit('viewChanged', view);
        }
    }
});
</script>

<template>
	<nav class="navbar navbar-dark bg-dark shadow-xl">
		<div class="container-xxl">
			<a href="#" class="navbar-brand d-flex align-items-center">
				<img src="/images/flag.svg" width="20" height="20" style="margin-right: 10px" />
				<strong>Minesweeper</strong>
			</a>
			<form>
				<button @click="switchView(0)" class="btn btn-success btn-fixed-width me-2" type="button">Play</button>
				<button
					@click="switchView(1)"
					class="btn btn-sm btn-outline-secondary btn-fixed-width me-2"
					type="button"
				>
					Information
				</button>
			</form>
			<button
				class="navbar-toggler collapsed"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarHeader"
				aria-controls="navbarHeader"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
		</div>
	</nav>
	<div class="text-bg-dark collapse" id="navbarHeader">
		<div class="container">
			<div class="row">
				<div class="col-sm-8 col-xl-7 py-4">
					<h4>About</h4>
					<p class="text-body-secondary">This game is online version of classic retro Minesweeper.</p>
					<p class="text-body-secondary">Play for free and have a fun :)</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
    .btn-fixed-width {
        width: 130px;
    }
</style>