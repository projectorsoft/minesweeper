<script lang="ts">
import { Theme } from '@/game/enums';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'ThemeEdit',
	emits: ['themeChanged'],
	data() {
		return {
			selectedTheme: Theme.Modern,
			themes: []
		};
	},
	watch: {
		selectedTheme: {
			handler(newValue) {
				this.$emit('themeChanged', newValue)
			},
			deep: true
		}
	},
	mounted() {
		this.themes = [{
			text: 'Modern',
			value: Theme.Modern
		},
		{
			text: 'Classic',
			value: Theme.Classic
		}];
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
	<div class="mb-2">
		<label class="fw-bold mb-2">Theme</label>
		<select v-model="selectedTheme" class="form-select form-select" aria-label="Small select example">
			<option v-for="theme in themes" :value="theme.value" selected>{{ theme.text }}</option>
		  </select>
	</div>
</template>
