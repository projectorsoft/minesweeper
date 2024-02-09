<script lang="ts">
import { defineComponent } from 'vue';
import { Game } from './game/game';

export enum Views {
  Play = 0,
  Info = 1,
}

export default defineComponent({
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
		<nav class="navbar navbar-dark bg-dark shadow-xl">
			<div class="container-xxl">
				<a href="#" class="navbar-brand d-flex align-items-center">
					<img src="/images/flag.svg" width="20" height="20" style="margin-right: 10px" />
					<strong>Minesweeper</strong>
				</a>
				<form>
					<button @click="switchView(0)" class="btn btn-success btn-fixed-width me-2" type="button">Play</button>
					<button @click="switchView(1)" class="btn btn-sm btn-outline-secondary btn-fixed-width me-2" type="button">Information</button>
				</form>
				<button
					class="navbar-toggler collapsed"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarHeader"
					aria-controls="navbarHeader"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
			</div>
		</nav>
		<div class="text-bg-dark collapse" id="navbarHeader">
			<div class="container">
				<div class="row">
					<div class="col-sm-8 col-xl-7 py-4">
						<h4>About</h4>
						<p class="text-body-secondary">
							This game is online version of classic retro Minesweeper.
						</p>
            <p class="text-body-secondary">
              Play for free and have a fun :)
						</p>
					</div>
					<!-- <div class="col-sm-4 offset-xl-1 py-4">
						<h4>Contact</h4>
						<ul class="list-unstyled">
							<li><a href="#" class="text-white">Email me</a></li>
						</ul>
					</div> -->
				</div>
			</div>
		</div>
	</header>
	<main data-bs-theme="dark">
		<div v-show="showIf(1)" class="container text-center" style="margin-bottom: 20px;">
			<div class="row justify-content-xxl-center">
				<div class="col text-start">
          <h2>Gallery</h2>
          <hr />
					<Splide
						:options="{
							rewind: true,
              perPage: 3,
              perMove: 1,
              fixedWidth: 240,
              fixedHeight: 371,
              isNavigation: true,
              gap: 15,
              lazyLoad: 'nearby',
              pagination: true,
              cover: true,
              autoplay: true
						}"
						aria-label="My Favorite Images"
					>
						<SplideSlide>
							<img src="/screenshots/new_game.png" alt="New game" />
						</SplideSlide>
						<SplideSlide>
							<img src="/screenshots/won_game.png" alt="Game won" />
						</SplideSlide>
						<SplideSlide>
							<img src="/screenshots/paused_game.png" alt="Game pasused" />
						</SplideSlide>
						<SplideSlide>
							<img src="/screenshots/lost_game.png" alt="Lost game" />
						</SplideSlide>
						<SplideSlide>
							<img src="/screenshots/statistics.png" alt="Statistics" />
						</SplideSlide>
            <SplideSlide>
							<img src="/screenshots/settings.png" alt="Settings" />
						</SplideSlide>
            <SplideSlide>
							<img src="/screenshots/custom_settings.png" alt="Custom settings" />
						</SplideSlide>
					</Splide>
				</div>
			</div>
		</div>
		<div v-show="showIf(0)" class="container-fluid text-center" style="margin-bottom: 40px;">
			<div class="row justify-content-xxl-center">
				<div class="col-xxl">
					<canvas id="canvas" width="390" height="450">
						Your browser does not support canvas element.
					</canvas>
				</div>
			</div>
		</div>
		<div v-show="showIf(1)" class="container">
			<hr />
			<div class="row d-flex flex-wrap align-items-center">
				<div class="col-md-7">
					<h2 class="fw-normal lh-1">
						Rules and purpose of minesweeper
					</h2>
          <div class="list-group">
            <p class="lead list-group-item list-group-item-light">1. Minesweeper is classic logic game.</p>
            <p class="lead list-group-item list-group-item-light">2. Your purpose is to clear the mine field without detonating hidden mines.</p>
            <p class="lead list-group-item list-group-item-light">3. When You choose field with mine - game is over.</p>
            <p class="lead list-group-item list-group-item-light">4. If You uncover all fields without detonating any mine - game is won.</p>
            <p class="lead list-group-item list-group-item-light">5. Each game measures time. If You were able to win,
              Your score will be saved in statistics and You can compare time with other games.
            </p>
          </div>
				</div>
				<div class="col-md-5 text-center">
          <img src="/images/rule.svg"
                class="bd-placeholder-img bd-placeholder-img-lg img-fluid mx-auto"
                width="400"
                height="400"
                role="img"
						    aria-label="Rules" />
				</div>
			</div>
			<hr />
			<div class="row d-flex flex-wrap align-items-center">
				<div class="col-md-7 order-md-2">
					<h2 class="fw-normal lh-1">
						How to play minesweeper
					</h2>
					<div class="list-group">
            <p class="lead list-group-item list-group-item-light">
              1. Click on the empty field 
              <img src="/images/uncovered_field.png" alt="Uncovered field" />
            </p>
            <p class="lead list-group-item list-group-item-light">
              2. If there are no mines in the neighbourhood - filed is empty
              <img src="/images/empty_fields.png" alt="Empty field" />
            </p>
            <p class="lead list-group-item list-group-item-light">
              3. If there is at lest one mine in the neighbourhood - number of mines is shown.
              Number '1' means field has only one neighbour with hidden mine.
              <img src="/images/numbers.png" alt="Numbers" />
            </p>
            <p class="lead list-group-item list-group-item-light">
              4. You can mark field by flag if You think thre is a mine.
              <img src="/images/flagged_field.png" alt="Flagged field" />
            </p>
            <p class="lead list-group-item list-group-item-light">
              5. If You are uncertain filed could be marked by '?'.
              <img src="/images/uncertained_field.png" alt="Uncertain field" />
            </p>
          </div>
				</div>
				<div class="col-md-5 order-md-1 text-center">
					<img src="/images/question_mark.svg"
                class="bd-placeholder-img bd-placeholder-img-lg img-fluid mx-auto"
                width="400"
                height="400"
                role="img"
						    aria-label="Question mark" />
				</div>
			</div>
			<hr />
			<div class="row d-flex flex-wrap align-items-center">
				<div class="col-md-7">
					<h2 class="fw-normal lh-1">
						Guide
					</h2>
					<p class="lead">
						Games has three standard modes: easy, medium and difficult.
					</p>
          <p class="lead">
						Each mode has constant board size and mines hidden. 
            In esay mode board has 9x9 fields and only 10 mines.
            To compare difficult mode has 31x16 fields and 99 mines.
					</p>
          <p class="lead">
						There is also custom mode in which You can define board size and number of mines.
					</p>
          <p class="lead">
						Game could be also paused only if has been started and is not finished.
					</p>
          <p class="lead">
						In statistics popup You can see Your results for each mode separately as well as number of games played (won / lost).
					</p>
          <p class="lead">
						Controls:
            Use left mouse button or short tap on mobile to uncover the field.
            Use right mouse button or long tap on mobile to set flag or question mark.
					</p>
				</div>
				<div class="col-md-5 text-center">
					<img src="/images/joystick.svg"
                class="bd-placeholder-img bd-placeholder-img-lg img-fluid mx-auto"
                width="400"
                height="400"
                role="img"
						    aria-label="Guide" />
				</div>
			</div>
			<hr />
		</div>
	</main>
  <footer class="container">
    <p class="float-end"><a href="#">Back to top</a></p>
    <p>
      <a href="https://www.minesweeper-free.com">www.minesweeper-free.com</a>
    </p>
  </footer>
</template>

<style scoped>
.btn-fixed-width {
	width: 130px;
}

.splide__slide {
  border-radius: 15px;
}
</style>
