<script lang="ts">
import { defineComponent } from 'vue';
import Controls from './description/Controls.vue';
import Footer from './Footer.vue';
import Gallery from './Gallery.vue';
import GameContainer from './GameContainer.vue';
import Features from './description/Features.vue';
import HowToPlay from './description/HowToPlay.vue';
import NavigationBar from './NavigationBar.vue';
import Settings from './Settings.vue';
import Rules from './description/Rules.vue';
import Scores from './description/Scores.vue';
import { GameState, Theme } from '@/game/enums';
import { ICustomModeOptions } from '@/game/components/mineField/mineFiledBuilder';
import { Minesweeper } from '@/game/minesweeper';

export enum Views {
	Play = 0,
	Gallery = 1,
}

export default defineComponent({
	components: {
		Controls,
		Footer,
		Gallery,
		GameContainer,
		Features,
		HowToPlay,
		NavigationBar,
		Settings,
		Rules,
		Scores,
	},
	data() {
		return {
			currentView: Views.Play,
			gameState: GameState.NotStarted,
			minesweeper: new Minesweeper(),
		};
	},
	mounted() {
		this.minesweeper.onGameStateChanged = (state: GameState) => {
			this.gameState = state;
		};
		this.minesweeper.onStatisticsCleared = () => {
			this.$refs.scores.clearStatistics();
		};
	},
	methods: {
		switchView(view: Views) {
			this.currentView = view;
		},
		showIf(view: Views) {
			return this.currentView == view;
		},
		boardSizeChanged(boardSizeOptions: ICustomModeOptions) {
			this.minesweeper.startExternalCustomGame(boardSizeOptions);
		},
		themeChanged(theme: Theme) {
			this.minesweeper.updateTheme(theme);
		},
	},
});
</script>

<template>
	<Settings @board-size-changed="boardSizeChanged" @theme-changed="themeChanged" />
	<GameContainer />
	<Gallery />
	<Scores ref="scores" :game-state="gameState" />
	<Rules />
	<HowToPlay />
	<Features />
	<Controls />
</template>
