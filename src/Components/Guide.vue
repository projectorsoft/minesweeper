<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Guide',
});
</script>

<template>
	<div class="container mb-2">
		<div class="row d-flex flex-wrap align-items-center">
			<div class="col-12">
				<label class="fw-bold mb-2">Guide</label>
				<a
					class="btn btn-sm btn-outline-secondary me-2 float-end"
					type="button"
					data-bs-toggle="collapse"
					href="#guideContainer"
				>
					<img src="/images/unfold.svg" width="25" height="25" />
				</a>
			</div>
		</div>
	</div>
	<div class="container collapse mb-4" id="guideContainer">
		<div class="row d-flex flex-wrap align-items-center">
			<div class="col-12">
				<div class="card">
					<div class="card-body">
						<div class="row">
							<div class="col-12">
								<div class="list-group">
									<p class="lead">Game has three standard modes: easy, medium and difficult.</p>
									<p class="lead">
										Each mode has constant board size and mines hidden. In esay mode board has 8x8
										fields and only 10 mines. To compare difficult mode has 30x16 fields and 99
										mines.
									</p>
									<p class="lead">
										There is also custom mode in which You can define board size and number of
										mines.
									</p>
									<p class="lead">
										Game could be also paused only if has been started and is not finished.
									</p>
									<p class="lead">
										In statistics popup You can see Your results for each mode separately as well as
										number of games played (won / lost).
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
