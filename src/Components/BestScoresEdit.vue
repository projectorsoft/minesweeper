<script lang="ts">
import { StorageService } from '@/game/engine/managers/storageService';
import { SettingsService } from '@/game/services/settingsService';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'BestScoresEdit',
	data() {
		return {
			bestScoresNumber: null,
			minBestScoresNumber: SettingsService.MinBestScoresNumber,
			maxBestScoresNumber: SettingsService.MaxBestScoresNumber,
			settingsService: new SettingsService(new StorageService())
		};
	},
	watch: {
		bestScoresNumber: {
			handler(newValue) {
				this.settingsService.bestScoresNumber = newValue;
			},
			deep: true,
			immediate: true
		},
	},
	mounted() {
		this.bestScoresNumber = this.settingsService.bestScoresNumber;
	}
});
</script>

<template>
	<div>
		<label for="maxBestScoresNumber" class="fw-bold mt-4"
			>Best scores number to display: {{ bestScoresNumber }}</label
		>
		<input
			v-model="bestScoresNumber"
			type="range"
			class="form-range"
			:min="minBestScoresNumber"
			:max="maxBestScoresNumber"
			step="1"
			id="maxBestScoresNumber"
		/>
		<p class="fst-italic text-warning">This change will remove records above selected value!</p>
	</div>
</template>