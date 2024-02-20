<script lang="ts">
import { GameMode, GameState } from '@/game/enums';
import { Helpers } from '@/game/helpers/helpers';
import { SettingsService } from '@/game/services/settingsService';
import { defineComponent, toRaw } from 'vue';

export default defineComponent({
	name: 'Scores',
	props: {
		gameState: {
			readonly: true,
			default: GameState.NotStarted,
		}
	},
	data() {
		return {
			bestScores: [],
		};
	},
	watch: {
		gameState: {
			handler(newState: GameState) {
				if (newState === GameState.Won)
					this.getBestScores();
			},
			deep: true,
			immediate: true,
		}
	},
	mounted() {
		this.getBestScores();
	},
	methods: {
		getBestScores(): void {
			const localStorageData = localStorage.getItem(SettingsService.SettingsLocalStorageKey);

			if (localStorageData) {
				this.bestScores = JSON.parse(localStorageData).statistics.bestGames;
			}
		},
		clearStatistics() {
			this.bestScores = [];
		},
		getRawBestScores() {
			return toRaw(this.bestScores);
		},
		showBestScores(): boolean {
			const bestScores = this.getRawBestScores();
			return !bestScores || bestScores.length === 0;
		},
		formatTime(ms: number): string {
			return ms ? `${Helpers.formatMiliseconds(ms)}s` : 'Unknown';
		},
		formatMode(mode: number): string {
			if (mode === undefined || mode === null) return 'Unknown';

			switch(mode) {
				case GameMode.Easy:
					return 'Easy';
				case GameMode.Medium:
					return 'Medium';
				case GameMode.Difficult:
					return 'Difficult';
				case GameMode.Custom:
					return 'Custom';
				default:
					'Unknown';
			}
		},
	},
});
</script>

<template>
	<div class="container mb-2">
		<hr />
		<div class="row d-flex flex-wrap align-items-center">
			<div class="col-12">
				<label class="fw-bold">Best scores</label>
				<button @click="getBestScores()" class="btn btn-sm btn-outline-secondary mx-2" type="button">
					<img src="/images/new.svg" width="22" height="22" alt="unfold" />
				</button>
				<a
					class="btn btn-sm btn-outline-secondary float-end"
					type="button"
					data-bs-toggle="collapse"
					href="#bestScoresContainer"
				>
					<img src="/images/unfold.svg" width="22" height="22" alt="unfold" />
				</a>
			</div>
		</div>
	</div>
	<div class="container collapse show mb-4" id="bestScoresContainer">
		<div class="row d-flex flex-wrap align-items-center">
			<div class="col-12">
				<div class="card">
					<div class="card-body">
						<div class="row">
							<div class="col-12">
								<label v-if="showBestScores()" class="form-label fs-3 fw-bold">No scores yet</label>
								<table v-else class="table table-striped table-hover">
									<thead>
										<tr>
											<th scope="col">#</th>
											<th scope="col">Name</th>
											<th class="text-center" scope="col">Time</th>
											<th class="text-center" scope="col">Clicks</th>
											<th class="text-center" scope="col">Mode</th>
											<th class="text-center" scope="col">Date</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(item, index) in getRawBestScores()" :key="index">
											<th scope="row">{{ index + 1 }}</th>
											<td class="text-break">{{ item?.name ?? 'Unknown' }}</td>
											<td class="text-center">{{ formatTime(item?.time) }}</td>
											<td class="text-center">{{ item?.clicks ?? '-1' }}</td>
											<td class="text-center">{{ formatMode(item?.mode) }}</td>
											<td class="text-center">{{ item?.date ?? 'Unknown' }}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>