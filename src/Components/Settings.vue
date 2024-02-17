<script lang="ts">
import { ICustomModeOptions } from '@/game/components/mineField/mineFiledBuilder';
import { defineComponent } from 'vue';
import BestScoresEdit from './BestScoresEdit.vue';
import CustomBoardSizeEdit from './CustomBoardSizeEdit.vue';
import PlayerNameEdit from './PlayerNameEdit.vue';

export default defineComponent({
	name: 'Settings',
	emits: ['boardSizeChanged'],
	components: {
		BestScoresEdit,
		CustomBoardSizeEdit,
		PlayerNameEdit
	},
	methods: {
		boardSizeChanged(boardSizeOptions: ICustomModeOptions) {
			this.$emit('boardSizeChanged', boardSizeOptions);
		}
	},
});
</script>

<template>
	<div class="container mb-4 collapse show" id="settingsContainer">
		<div class="row d-flex flex-wrap align-items-center">
			<div class="col">
				<label class="fw-bold mb-2">Settings</label>
				<div class="card">
					<div class="card-body">
						<PlayerNameEdit />
						<BestScoresEdit />
						<CustomBoardSizeEdit @board-size-changed="boardSizeChanged" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
