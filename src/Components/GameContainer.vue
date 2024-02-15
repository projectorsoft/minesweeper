<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'GameContainer',
});
</script>

<template>
	<div>
		<div class="container mb-4">
			<div class="row d-flex flex-wrap align-items-center">
				<div class="col-12">
					<label class="fw-bold">Game</label>
					<hr />
				</div>
			</div>
		</div>
		<div class="container-fluid text-center mb-4">
			<div class="row justify-content-xxl-center">
				<div class="col-xxl">
					<canvas id="canvas" width="370" height="440">
						Your browser does not support canvas element.
					</canvas>
				</div>
			</div>
		</div>
	</div>
</template>
