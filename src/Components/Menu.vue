<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	methods: {
		enableSettings() {
			return this.$route.path === '/';
		},
	},
});
</script>

<template>
	<div
		class="offcanvas offcanvas-end"
		data-bs-dismiss="offcanvas"
		tabindex="-1"
		id="offcanvasRight"
		aria-labelledby="offcanvasRightLabel"
	>
		<div class="offcanvas-header">
			<h5 class="offcanvas-title" id="offcanvasRightLabel">Minesweeper</h5>
			<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		</div>
		<div class="offcanvas-body">
			<div class="container">
				<router-link to="/" class="icon-link link-body-emphasis d-block fs-5 mb-2"
					><img class="me-3" src="/images/play.svg" width="32" height="32" />Play minesweeper
				</router-link>
				<a
					class="icon-link link-body-emphasis d-block fs-5 mb-2"
					type="button"
					v-if="enableSettings()"
					data-bs-toggle="collapse"
					href="#settingsContainer"
				>
					<img class="me-3" src="/images/preferences.svg" width="32" height="32" />Settings
				</a>
				<router-link to="/gallery" class="icon-link link-body-emphasis d-block fs-5 mb-2"
					><img class="me-3" src="/images/gallery.svg" width="32" height="32" />Gallery
				</router-link>
				<hr />
				<a
					class="icon-link link-body-emphasis d-block fs-5 mb-2"
					href="#"
					data-bs-toggle="modal"
					data-bs-target="#aboutModal"
				>
					<img class="me-3" src="/images/question_mark.svg" width="32" height="32" />About
				</a>
				<router-link to="/privacy" class="icon-link link-body-emphasis d-block fs-5 mb-2"
					><img class="me-3" src="/images/policy.svg" width="32" height="32" />Privacy policy
				</router-link>
			</div>
			<About />
		</div>
	</div>
</template>
