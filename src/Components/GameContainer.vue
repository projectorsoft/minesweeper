<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'GameContainer',
	data() {
		return {
			isGameShown: false
		}
	},
	methods: {
		showGame() {
			this.isGameShown = true;
		}
	}
});
</script>

<template>
	<div class="container text-center">
		<div class="row justify-content-center mb-4">
			<div class="col-12">
				<div v-show="!isGameShown" class="p-4 game-container">
					<img
					class="img-thumbnail d-block mx-auto mb-4"
					src="/images/flag.svg"
					alt="Minesweeper"
					width="150"
					height="150"
				/>
				<label class="fw-bold d-block fs-1 mb-4">Minesweeper</label>
				<button
					type="button"
					class="btn btn-danger mx-auto d-block w-50 fs-5 fw-bold"
					@click="showGame()"
				>
					Play
				</button>
				</div>
				<canvas v-show="isGameShown" id="minesweeperCanvas" width="370" height="445"></canvas>
			</div>
		</div>
	</div>
</template>