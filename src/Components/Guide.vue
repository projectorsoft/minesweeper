<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Guide',
});
</script>

<template>
	<div class="row d-flex flex-wrap align-items-center">
		<div class="col-md-7">
			<h2 class="fw-normal lh-1 mb-4">Guide</h2>
			<p class="lead">Game has three standard modes: easy, medium and difficult.</p>
			<p class="lead">
				Each mode has constant board size and mines hidden. In esay mode board has 9x9 fields and only 10 mines.
				To compare difficult mode has 31x16 fields and 99 mines.
			</p>
			<p class="lead">There is also custom mode in which You can define board size and number of mines.</p>
			<p class="lead">Game could be also paused only if has been started and is not finished.</p>
			<p class="lead">
				In statistics popup You can see Your results for each mode separately as well as number of games played
				(won / lost).
			</p>
		</div>
		<div class="col-md-5 text-center">
			<img
				src="/images/strategy.svg"
				class="bd-placeholder-img bd-placeholder-img-lg img-fluid mx-auto"
				width="400"
				height="400"
				role="img"
				aria-label="Guide"
			/>
		</div>
	</div>
	<hr />
</template>
