<script lang="ts">
import { defineComponent } from 'vue';
import About from './components/About.vue';
import Controls from './components/Controls.vue';
import Footer from './components/Footer.vue';
import Gallery from './components/Gallery.vue';
import GameContainer from './components/GameContainer.vue';
import Guide from './components/Guide.vue';
import HowToPlay from './components/HowToPlay.vue';
import NavigationBar from './components/NavigationBar.vue';
import Settings from './components/Settings.vue';
import Rules from './components/Rules.vue';
import Scores from './components/Scores.vue';
import { GameState } from './game/enums';
import { Game } from './game/game';

export enum Views {
	Play = 0,
	Gallery = 1,
}

export default defineComponent({
	components: {
		About,
		Controls,
		Footer,
		Gallery,
		GameContainer,
		Guide,
		HowToPlay,
		NavigationBar,
		Settings,
		Rules,
		Scores,
	},
	data() {
		return {
			game: {},
			currentView: Views.Play,
			gameState: GameState.NotStarted,
		};
	},
	mounted() {
		this.game = new Game();
		this.game.onGameStateChanged = (state: GameState) => {
			this.gameState = state;
		};
		this.game.onStatisticsCleared = () => {
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
	},
});
</script>

<template>
	<header data-bs-theme="dark" class="sticky-sm-top">
		<NavigationBar @view-changed="switchView" />
	</header>
	<main data-bs-theme="dark">
		<Settings />
		<Gallery v-show="showIf(1)" />
		<GameContainer v-show="showIf(0)" />
		<Scores ref="scores" :game-state="gameState" />
		<Rules />
		<HowToPlay />
		<Guide />
		<Controls />
		<About />
	</main>
	<Footer />
</template>
