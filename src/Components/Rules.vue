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
				<label class="fw-bold">Rules and purpose of minesweeper</label>
				<a
					class="btn btn-sm btn-outline-secondary float-end"
					type="button"
					data-bs-toggle="collapse"
					href="#rulesContainer"
				>
					<img src="/images/unfold.svg" width="22" height="22" />
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
								<div class="list-group list-group-flush fw-light">
									<div class="list-group-item">
										<div class="d-flex w-100 justify-content-between">
											<p class="mb-1">1. Minesweeper is classic logic game.</p>
										</div>
									</div>
									<div class="list-group-item">
										<div class="d-flex w-100 justify-content-between">
											<p class="mb-1">
												2. Your purpose is to clear the mine field without detonating hidden mines.
											</p>
										</div>
									</div>
									<div class="list-group-item">
										<div class="d-flex w-100 justify-content-between">
											<p class="mb-1">
												3. Mine field is built from tiles. Each tile can be in 6 states:
											</p>
										</div>
										<p class="mb-1 mx-3">a) Covered</p>
										<p class="mb-1 mx-3">b) Uncovered and empty</p>
										<p class="mb-1 mx-3">c) Uncovered with number</p>
										<p class="mb-1 mx-3">d) With flag set</p>
										<p class="mb-1 mx-3">e) With question mark set</p>
										<p class="mb-1 mx-3">f) With mine</p>
									</div>
									<div class="list-group-item">
										<div class="d-flex w-100 justify-content-between">
											<p class="mb-1">4. When You choose field with mine - game is over.</p>
										</div>
									</div>
									<div class="list-group-item">
										<div class="d-flex w-100 justify-content-between">
											<p class="mb-1">
												5. If You uncover all fields without detonating any mine - game is won.
											</p>
										</div>
									</div>
									<div class="list-group-item">
										<div class="d-flex w-100 justify-content-between">
											<p class="mb-1">6. Each game measures time.</p>
										</div>
										<p class="mb-1 mx-3">
											If You were able to win, Your score will be saved in statistics and You can
											compare time with other games.
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
</template>
