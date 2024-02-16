<script lang="ts">
import { StorageService } from '@/game/engine/managers/storageService';
import { Game } from '@/game/game';
import { SettingsService } from '@/game/services/settingsService';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Settings',
	emits: ['boardSizeChanged'],
	data() {
		return {
			name: '',
			currentName: '',
			editMode: false,
			bestScoresNumber: null,
			minBestScoresNumber: SettingsService.MinBestScoresNumber,
			maxBestScoresNumber: SettingsService.MaxBestScoresNumber,
			xSize: 31,
			ySize: 9,
			minesNumber: 50,
			settingsService: new SettingsService(new StorageService())
		};
	},
	watch: {
		bestScoresNumber: {
			handler(newValue) {
				this.settingsService.bestScoresNumber = newValue;
			},
			deep: true,
			immediate: true,
		}
	},
	mounted() {
		this.currentName = this.settingsService.get().currentName ?? 'Unknown';
		this.bestScoresNumber = this.settingsService.bestScoresNumber;
	},
	methods: {
		setName(): void {
			this.settingsService.updateName(this.name);
			this.currentName = this.name;
			this.nameChangedMsgVisible = true;
			this.editMode = false;
		},
		cancelSetName(): void {
			this.editMode = false;
		},
		showEditForm(): void {
			this.name = this.currentName;
			this.editMode = true;
		},
		changeBoardSize(): void {
			if (this.minesNumber < Game.MinMinesNumber || this.minesNumber > Game.MaxMinesNumber) {
				return;
			}

			if (this.minesNumber > (this.xSize * this.ySize) / 3)
				return;

			this.$emit('boardSizeChanged', {
				xSize: this.xSize,
				ySize: this.ySize,
				mines: this.minesNumber
			});
		}
	}
});
</script>

<template>
	<div class="container mb-4 collapse show" id="settingsContainer">
		<div class="row d-flex flex-wrap align-items-center">
			<div class="col">
				<label class="fw-bold mb-2">Settings</label>
				<div class="card">
					<div class="card-body">
						<label class="fw-bold mb-2">Player name:</label>
						<div v-if="!editMode" class="input-group">
							<span class="input-group-text">Name:</span>
							<input
								v-model="currentName"
								type="text"
								disabled
								class="form-control"
								aria-label="Player name"
								aria-describedby="button-addon2"
							/>
							<button
								class="btn btn-outline-secondary"
								type="button"
								id="button-addon2"
								@click="showEditForm()"
							>
								Change
							</button>
						</div>
						<div v-else class="input-group flex-nowrap">
							<span class="input-group-text">Name:</span>
							<input
								v-model="name"
								type="text"
								maxlength="30"
								class="form-control"
								placeholder="Player name"
								aria-label="PlayerName"
								aria-describedby="addon-wrapping"
							/>
							<button class="btn btn-outline-secondary" type="button" @click="setName">Set</button>
							<button class="btn btn-outline-secondary" type="button" @click="cancelSetName">
								Cancel
							</button>
						</div>
						<div>
							<label for="maxBestScoresNumber" class="fw-bold mt-4"
								>Best scores number to display: {{ bestScoresNumber }}</label
							>
							<p class="fst-italic text-warning">This change will remove records above selected value!</p>
							<input
								v-model="bestScoresNumber"
								type="range"
								class="form-range"
								:min="minBestScoresNumber"
								:max="maxBestScoresNumber"
								step="1"
								id="maxBestScoresNumber"
							/>
						</div>
						<div>
							<label class="fw-bold mb-2">Custom board size:</label>
							<div class="row">
								<div class="col input-group">
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
								<div class="col input-group">
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
								<div class="col input-group">
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
								<div class="col-1 mx-2">
									<button @click="changeBoardSize()" type="submit" class="btn btn-outline-secondary">Change</button>
								</div>
							</div>
							<p class="fst-italic text-warning mt-2">Mines number value must be less than 1/3 of board cells.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>