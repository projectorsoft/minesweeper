<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Gallery',
	data() {
		return {
			options: {
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
				autoplay: true,
				lazy: true,
			},
		};
	},
});
</script>

<template>
	<div class="container collapse text-center mb-2" id="galleryContainer">
		<div class="row justify-content-xxl-center">
			<div class="col text-start">
				<label class="fw-bold">Gallery</label>
				<hr />
				<Splide :options="options" aria-label="My Favorite Images">
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
</template>

<style scoped>
.splide__slide {
	border-radius: 15px;
}
</style>
