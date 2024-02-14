<script lang="ts">
import { GameMode, GameState } from '@/game/enums';
import { Helpers } from '@/game/helpers/helpers';
import { StatisticsService } from '@/game/services/statisticsService';
import { defineComponent, reactive, isProxy, toRaw} from 'vue';

export default defineComponent({
	name: 'Scores',
	props: {
		gameState: {
			readonly: true,
			default: GameState.NotStarted
		}
	},
	data() {
		return {
			bestScores: []
		}
	},
	watch: {
		gameState: {
			handler(newState: GameState) {
				if (newState === GameState.Won)
					this.getBestScores();
			},
			deep: true,
			immediate: true
		}
	},
	mounted() {
		this.getBestScores();
	},
	methods: {
		getBestScores(): void {
			const localStorageData = localStorage.getItem(StatisticsService.StatisticsLocalStorageKey);

			if (localStorageData) {
				this.bestScores = JSON.parse(localStorageData).bestGames;
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
			if (mode === undefined || mode === null)
				return 'Unknown';

			switch(mode) {
				case GameMode.Easy:
					return 'Easy';
				case GameMode.Medium:
					return 'Medium';
				case GameMode.Difficult:
					return 'Difficult';
				case GameMode.Custom:
					return 'Custom';
				default: 'Unknown'
			}
		}
	}
});
</script>

<template>
	<div class="accordion-item">
		<h2 class="accordion-header">
			<button
				class="accordion-button"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#collapseScores"
				aria-expanded="true"
				aria-controls="collapseScores"
			>
				<strong>Best scores</strong>
			</button>
		</h2>
		<div id="collapseScores" class="accordion-collapse collapse show">
			<div class="accordion-body">
				<div class="row d-flex flex-wrap align-items-center">
					<div class="col">
						<label v-if="showBestScores()" class="form-label fs-3 fw-bold">No scores yet</label>
						<table v-else class="table table-striped">
							<thead>
							  <tr>
								<th scope="col">#</th>
								<th scope="col">Name</th>
								<th scope="col">Time</th>
								<th scope="col">Clicks</th>
								<th scope="col">Mode</th>
								<th scope="col">Date</th>
							  </tr>
							</thead>
							<tbody>
							  <tr v-for="(item, index) in getRawBestScores()" :key="index">
								<th scope="row">{{ index + 1 }}</th>
								<td>{{ item?.name ?? 'Unknown' }}</td>
								<td>{{ formatTime(item?.time) }}</td>
								<td>{{ item?.clicks ?? '-1' }}</td>
								<td>{{ formatMode(item?.mode) }}</td>
								<td>{{ item?.date ?? 'Unknown' }}</td>
							  </tr>
							</tbody>
						  </table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
