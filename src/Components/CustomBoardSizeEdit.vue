<script lang="ts">
import { Game } from '@/game/game';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'CustomBoardSizeEdit',
	emits: ['boardSizeChanged'],
	data() {
		return {
			xSize: Game.CustomBoardDefaultXSize,
			ySize: Game.CustomBoardDefaultYSize,
			minesNumber: Game.CustomBoardDefaultMinesNumber,
		};
	},
	methods: {
		changeBoardSize(): void {
			if (this.minesNumber < Game.MinMinesNumber || this.minesNumber > Game.MaxMinesNumber) {
				return;
			}

			if (this.minesNumber > (this.xSize * this.ySize) / 3) 
				return;

			this.$emit('boardSizeChanged', {
				xSize: this.xSize,
				ySize: this.ySize,
				mines: this.minesNumber,
			});
		},
	},
});
</script>

<template>
	<div>
		<label class="fw-bold mb-2">Custom board size:</label>
		<div class="row g-2">
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-text">X size:</span>
					<input
						type="number"
						v-model="xSize"
						min="9"
						max="65"
						onkeypress="return event.charCode >= 48 && event.charCode <= 57"
						onpaste="return false"
						class="form-control"
						placeholder="X size"
						aria-label="X size"
					/>
				</div>
			</div>
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-text">Y size:</span>
					<input
						type="number"
						v-model="ySize"
						min="9"
						max="50"
						onkeypress="return event.charCode >= 48 && event.charCode <= 57"
						onpaste="return false"
						class="form-control"
						placeholder="Y size"
						aria-label="Y size"
					/>
				</div>
			</div>
			<div class="col-md-4">
				<div class="input-group">
					<span class="input-group-text">Mines number:</span>
					<input
						type="number"
						v-model="minesNumber"
						min="27"
						max="1300"
						onkeypress="return event.charCode >= 48 && event.charCode <= 57"
						onpaste="return false"
						class="form-control"
						placeholder="Mines number"
						aria-label="Mines number"
					/>
				</div>
			</div>
			<div class="col-md-2">
				<button @click="changeBoardSize()" type="submit" class="btn btn-outline-secondary w-100">Change</button>
			</div>
		</div>
		<p class="fst-italic text-warning mt-2">Mines number value must be less than 1/3 of board cells.</p>
	</div>
</template>
