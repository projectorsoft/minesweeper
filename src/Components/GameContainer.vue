<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'GameContainer',
});
</script>

<template>
	<div class="container">
		<div class="row d-flex flex-wrap align-items-center">
			<div class="col-12">
				<label class="fw-bold">Game</label>
				<hr />
			</div>
		</div>
	</div>
	<div class="container-fluid text-center">
		<div class="row justify-content-xxl-center">
			<div class="col-xxl" id="minesweeperContainer">
			</div>
		</div>
	</div>
</template>
