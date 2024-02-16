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
				<label class="fw-bold">Guide</label>
				<a
					class="btn btn-sm btn-outline-secondary float-end"
					type="button"
					data-bs-toggle="collapse"
					href="#guideContainer"
				>
					<img src="/images/unfold.svg" width="22" height="22" />
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
								<div class="list-group list-group-flush fw-light">
									<div class="list-group-item">
										<div class="d-flex w-100 justify-content-between">
											<p class="mb-1">
												Game has three standard modes: <b>easy</b>, <b>medium</b> and
												<b>difficult</b>.
											</p>
										</div>
										<p class="mb-1">Default is <b>easy</b>.</p>
										<p class="mb-1">You can change game mode in settings popup.</p>
									</div>
									<div class="list-group-item">
										<div class="d-flex w-100 justify-content-between">
											<p class="mb-1">Each mode has constant board size and mines hidden.</p>
										</div>
										<p class="mb-1">In esay mode board has 8x8 fields and only 10 mines.</p>
										<p class="mb-1">To compare difficult mode has 30x16 fields and 99 mines.</p>
									</div>
									<div class="list-group-item">
										<div class="d-flex w-100 justify-content-between">
											<p class="mb-1">
												There is also custom mode in which You can define board size and number
												of mines.
											</p>
										</div>
										<p class="mb-1">
											This mode is really difficult due to board size and possible mines location.
										</p>
									</div>
									<div class="list-group-item">
										<div class="d-flex w-100 justify-content-between">
											<p class="mb-1">
												If You want to avoid failure after first click You can select 'Safe firs
												click' in settings.
											</p>
										</div>
										<p class="mb-1">
											It will allow You to choose any field without selecting mine and by the way
											uncover more sorrounding fields wich leads to simplify gameplay.
										</p>
									</div>
									<div class="list-group-item">
										<div class="d-flex w-100 justify-content-between">
											<p class="mb-1">Game could be also paused if You need a break.</p>
										</div>
									</div>
									<div class="list-group-item">
										<div class="d-flex w-100 justify-content-between">
											<p class="mb-1">
												In statistics popup You can see Your results for each mode separately as
												well as number of games played (won / lost).
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
