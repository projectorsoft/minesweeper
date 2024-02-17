<script lang="ts">
import { StorageService } from '@/game/engine/managers/storageService';
import { SettingsService } from '@/game/services/settingsService';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'PlayerNameEdit',
	data() {
		return {
			name: '',
			currentName: '',
			editMode: false,
			settingsService: new SettingsService(new StorageService())
		};
	},
	mounted() {
		this.currentName = this.settingsService.get().currentName ?? 'Unknown';
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
		}
	}
});
</script>

<template>
	<div>
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
			<button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="showEditForm()">
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
			<button class="btn btn-outline-secondary" type="button" @click="cancelSetName">Cancel</button>
		</div>
	</div>
</template>
