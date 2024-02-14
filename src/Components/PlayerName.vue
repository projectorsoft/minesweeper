<script lang="ts">
import { StorageService } from '@/game/engine/managers/storageService';
import { StatisticsService } from '@/game/services/statisticsService';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'PlayerName',
	data() {
		return {
			name: '',
			currentName: '',
			editMode: false,
			statisticsService: null,
		};
	},
	mounted() {
		this.statisticsService = new StatisticsService(new StorageService());

		this.currentName = this.statisticsService.get().currentName ?? 'Unknown';
	},
	methods: {
		setName() {
			this.statisticsService.updateName(this.name);
			this.currentName = this.name;
			this.nameChangedMsgVisible = true;

			/* setTimeout(() => {
				this.nameChangedMsgVisible = false;
				this.editMode = false;
			}, 3000); */

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
	<div class="container mb-4">
		<div class="row d-flex flex-wrap align-items-center">
			<div class="col">
				<div class="card">
					<div v-if="!editMode" class="card-body">
						<div class="input-group mb-3">
							<span class="input-group-text" id="addon-wrapping">Name:</span>
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
					</div>
					<div v-else class="card-body">
						<label class="form-label fw-bold">Enter Your name:</label>
						<div class="input-group flex-nowrap">
							<span class="input-group-text" id="addon-wrapping">Name:</span>
							<input
								v-model="name"
								type="text"
								class="form-control"
								placeholder="Player name"
								aria-label="PlayerName"
								aria-describedby="addon-wrapping"
							/>
							<button class="btn btn-outline-secondary" type="button" @click="setName">Set</button>
							<button class="btn btn-outline-secondary" type="button" @click="cancelSetName">Cancel</button>
							<!-- <span v-if="nameChangedMsgVisible" class="input-group-text text-success-emphasis"
								>Name has been changed!</span
							> -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
