<script lang="ts">
import { StorageService } from '@/game/engine/managers/storageService';
import { StatisticsService } from '@/game/services/statisticsService';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Settings',
	data() {
		return {
			name: '',
			currentName: '',
			editMode: false,
			bestScoresNumber: null,
			minBestScoresNumber: StatisticsService.MinBestScoresNumber,
			maxBestScoresNumber: StatisticsService.MaxBestScoresNumber,
			statisticsService: new StatisticsService(new StorageService())
		};
	},
	watch: {
		bestScoresNumber: {
			handler(newValue) {
				this.statisticsService.bestScoresNumber = newValue;
			},
			deep: true,
			immediate: true
		}
	},
	mounted() {
		this.currentName = this.statisticsService.get().currentName ?? 'Unknown';
		this.bestScoresNumber = this.statisticsService.bestScoresNumber;
	},
	methods: {
		setName() {
			this.statisticsService.updateName(this.name);
			this.currentName = this.name;
			this.nameChangedMsgVisible = true;
			this.editMode = false;
		},
		cancelSetName() {
			this.editMode = false;
		},
		showEditForm() {
			this.name = this.currentName;
			this.editMode = true;
		},
	},
});
</script>

<template>
	<div class="container mb-4 collapse" id="settingsContainer">
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
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
