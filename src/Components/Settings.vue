<script lang="ts">
import { ICustomModeOptions } from '@/game/components/mineField/mineFiledBuilder';
import { Theme } from '@/game/enums';
import { defineComponent } from 'vue';
import BestScoresEdit from './settings/BestScoresEdit.vue';
import CustomBoardSizeEdit from './settings/CustomBoardSizeEdit.vue';
import PlayerNameEdit from './settings/PlayerNameEdit.vue';
import ThemeEdit from './settings/ThemeEdit.vue';

export default defineComponent({
	name: 'Settings',
	emits: ['boardSizeChanged', 'themeChanged'],
	components: {
		BestScoresEdit,
		CustomBoardSizeEdit,
		PlayerNameEdit,
		ThemeEdit,
	},
	methods: {
		boardSizeChanged(boardSizeOptions: ICustomModeOptions) {
			this.$emit('boardSizeChanged', boardSizeOptions);
		},
		themeChanged(theme: Theme) {
			this.$emit('themeChanged', theme);
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
						<PlayerNameEdit />
						<BestScoresEdit />
						<ThemeEdit @theme-changed="themeChanged" />
						<CustomBoardSizeEdit @board-size-changed="boardSizeChanged" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
