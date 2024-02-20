<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HowToPlay',
});
</script>

<template>
	<div class="container mb-2">
		<div class="row d-flex flex-wrap align-items-center">
			<div class="col-12">
				<label class="fw-bold">How to play minesweeper</label>
				<a
					class="btn btn-sm btn-outline-secondary float-end"
					type="button"
					data-bs-toggle="collapse"
					href="#howToPlayContainer"
				>
					<img src="/images/unfold.svg" width="22" height="22" alt="unfold" />
				</a>
			</div>
		</div>
	</div>
	<div class="container collapse mb-4" id="howToPlayContainer">
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
												1. At the beginning all fileds are coverd.
												<img src="/images/uncovered_field.png" alt="Uncovered field" />
											</p>
										</div>
									</div>
									<div class="list-group-item">
										<div class="d-flex w-100 justify-content-between">
											<p class="mb-1">
												2. Game starts when player clicks choosen filed for the first time.
											</p>
										</div>
										<p class="mb-1">
											From this moment timer located in right top corner of the board is ticking.
										</p>
									</div>
									<div class="list-group-item">
										<p class="mb-1">
											3. If choosen field is empty and all surrounding filelds are empty then it
											discoveres all adjascent empty tiles.
											<img src="/images/empty_fields.png" alt="Empty field" />
										</p>
										<p class="mb-1">
											It works especially when <b>'Safe first click'</b> option is checked in settings
											popup.
										</p>
									</div>
									<div class="list-group-item">
										<div class="d-flex w-100 justify-content-between">
											<p class="mb-1">
												4. If choosen field has at least one mine in surrounding area than
												number of mines is shown.
												<img src="/images/numbers.png" alt="Numbers" />
											</p>
										</div>
										<p class="mb-1">
											For example: tile with number '3' in the picture means field has three neighbours with hidden mines.
										</p>
										<p class="mb-1">In rare cases field could be surrounded by all 8 neighbours with mines.</p>
									</div>
									<div class="list-group-item">
										<div class="d-flex w-100 justify-content-between">
											<p class="mb-1">
												5. Player can set flag on covered field to mark it as danger.
												<img src="/images/flagged_field.png" alt="Flagged field" />
											</p>
										</div>
										<p class="mb-1">
											It means field is no longer clickable so it is safe way to solve the game.
										</p>
										<p class="mb-1">
											When flag is set on tile than number shown in left top corner of the board
											is decreased.
										</p>
									</div>
									<div class="list-group-item">
										<div class="d-flex w-100 justify-content-between">
											<p class="mb-1">
												6. In some cases it is useful to mark field with question mark if player
												is uncertain.
												<img src="/images/uncertained_field.png" alt="Uncertain field" />
											</p>
										</div>
										<p class="mb-1">In this state field is clickable.</p>
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
