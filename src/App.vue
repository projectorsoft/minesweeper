<script lang="ts">
import { defineComponent } from 'vue';
import Controls from './Components/Controls.vue';
import Footer from './Components/Footer.vue';
import Gallery from './Components/Gallery.vue';
import GameContainer from './Components/GameContainer.vue';
import Guide from './Components/Guide.vue';
import HowToPlay from './Components/HowToPlay.vue';
import NavigationBar from './Components/NavigationBar.vue';
import Rules from './Components/Rules.vue';
import { Game } from './game/game';

export enum Views {
  Play = 0,
  Info = 1,
}

export default defineComponent({
  components: {
    Controls,
    Footer,
    Gallery,
    GameContainer,
    Guide,
    HowToPlay,
    NavigationBar,
    Rules
  },
	data() {
		return {
			game: {},
      currentView: Views.Info
		};
	},
	mounted() {
    this.game = new Game();
	},
	methods: {
    switchView(view: Views) {
      this.currentView = view;
    },
    showIf(view: Views) {
      return this.currentView == view;
    }
	},
});
</script>

<template>
	<header data-bs-theme="dark" class="sticky-sm-top">
		<NavigationBar @view-changed="switchView" />
	</header>
	<main data-bs-theme="dark">
		<Gallery v-show="showIf(1)" />
		<GameContainer v-show="showIf(0)" />
		<div v-show="showIf(1)" class="container">
			<Rules />
			<HowToPlay />
			<Guide />
			<Controls />
		</div>
	</main>
  <footer class="container">
    <Footer />
  </footer>
</template>