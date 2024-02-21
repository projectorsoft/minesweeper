<script lang="ts">
import { StorageService } from '@/game/engine/managers/storageService';
import { Theme } from '@/game/enums';
import { SettingsService } from '@/game/services/settingsService';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'ThemeEdit',
	emits: ['themeChanged'],
	data() {
		return {
			settingsService: new SettingsService(new StorageService()),
			selectedTheme: Theme.Modern,
			themes: [
				{
					text: 'Modern',
					value: Theme.Modern,
				},
				{
					text: 'Classic',
					value: Theme.Classic,
				},
			],
		};
	},
	mounted() {
		this.selectedTheme = this.settingsService.get().theme ?? Theme.Modern;
	},
	methods: {
		onChange() {
			this.$emit('themeChanged', this.selectedTheme);
		}
	}
});
</script>

<template>
	<div class="mb-2">
		<label class="fw-bold mb-2">Theme</label>
		<select v-model="selectedTheme" @change="onChange()" class="form-select form-select" aria-label="Small select example">
			<option v-for="theme in themes" :value="theme.value" selected>{{ theme.text }}</option>
		</select>
	</div>
</template>
