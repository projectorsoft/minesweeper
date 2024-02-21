<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'DevNotes',
});
</script>

<template>
	<div class="container text-center mb-2">
		<div class="row justify-content-xxl-center">
			<div class="col text-start">
				<label class="fw-bold">Developer notes</label>
				<hr />
				<p class="text-body-secondary text-uppercase mt-4">
					Last release: 21-02-2024
				</p>
				<p class="text-body-secondary mt-4">
					1. The game was supposed to be simple and intuitive as much as possible.
				</p>
				<p class="text-body-secondary">2. The user interface suppoused to be minimalist and clear.</p>
				<p class="text-body-secondary">3. The size after built suppoused to be as small as possible.</p>
				<p class="text-body-secondary">4. The graphics used are as few as possible.</p>
				<hr />
				<label class="fw-bold mb-3 mt-4">Technologies used:</label>
				<ul class="list-group list-group-flush list-group-numbered">
					<li class="list-group-item text-uppercase fw-medium list-group-item-light">TypeScript</li>
					<li class="list-group-item text-uppercase fw-medium">JavaScript</li>
					<li class="list-group-item text-uppercase fw-medium list-group-item-light">VueJs framework</li>
					<li class="list-group-item text-uppercase fw-medium">Html / Canvas</li>
					<li class="list-group-item text-uppercase fw-medium list-group-item-light">CSS / Bootstrap</li>
				</ul>
				<hr />
				<label class="fw-bold mb-3 mt-4">Useful links:</label>
					<a
						href="https://www.typescriptlang.org/"
						class="d-block mb-1 link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
						>https://www.typescriptlang.org/</a
					>
					<a
						href="https://vuejs.org"
						class="d-block mb-1 link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
						>https://vuejs.org</a
					>
					<a
						href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API"
						class="d-block mb-1 link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
						>https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API</a
					>
					<a
						href="https://getbootstrap.com"
						class="d-block mb-1 link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
						>https://getbootstrap.com</a
					>
			</div>
		</div>
	</div>
</template>