<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Rules',
});
</script>

<template>
	<div class="container mb-2">
		<div class="row d-flex flex-wrap align-items-center">
			<div class="col-12">
				<label class="fw-bold mb-2">Rules and purpose of minesweeper</label>
				<a
					class="btn btn-sm btn-outline-secondary me-2 float-end"
					type="button"
					data-bs-toggle="collapse"
					href="#rulesContainer"
				>
					<img src="/images/unfold.svg" width="25" height="25" />
				</a>
			</div>
		</div>
	</div>
	<div class="container collapse mb-4" id="rulesContainer">
		<div class="row d-flex flex-wrap align-items-center">
			<div class="col-12">
				<div class="card">
					<div class="card-body">
						<div class="row">
							<div class="col-12">
								<div class="list-group">
									<p class="lead list-group-item list-group-item-light">
										1. Minesweeper is classic logic game.
									</p>
									<p class="lead list-group-item list-group-item-light">
										2. Your purpose is to clear the mine field without detonating hidden mines.
									</p>
									<p class="lead list-group-item list-group-item-light">
										3. When You choose field with mine - game is over.
									</p>
									<p class="lead list-group-item list-group-item-light">
										4. If You uncover all fields without detonating any mine - game is won.
									</p>
									<p class="lead list-group-item list-group-item-light">
										5. Each game measures time. If You were able to win, Your score will be saved in
										statistics and You can compare time with other games.
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
