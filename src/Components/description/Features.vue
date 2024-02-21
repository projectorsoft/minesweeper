<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Features',
});
</script>

<template>
	<div class="container mb-2">
		<div class="row d-flex flex-wrap align-items-center">
			<div class="col-12">
				<label class="fw-bold">Features</label>
				<a
					class="btn btn-sm btn-outline-secondary float-end"
					type="button"
					data-bs-toggle="collapse"
					href="#guideContainer"
				>
					<img src="/images/unfold.svg" width="22" height="22" alt="unfold" />
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
								<div class="list-group list-group-flush fw-normal">
									<div class="list-group-item">
										<p class="mb-1">
											1. <b>New Game</b> – creates a new game by randomly placing mines on the
											board and covering all fields. Clicking the button does not start the game.
										</p>
									</div>
									<div class="list-group-item">
										<p class="mb-1">
											2. <b>Pause</b> – allows you to stop the game clock. Until the button is
											pressed again, the clock is stopped and the board is inactive.
										</p>
									</div>
									<div class="list-group-item">
										<p class="mb-1">
											3. <b>Statistics</b> – displays a popup with basic statistics about the
											game:
										</p>
										<p class="mb-1">- Time and number of clicks in the last game</p>
										<p class="mb-1">- Highest scores by game mode</p>
										<p class="mb-1">- Total number of games won/lost</p>
									</div>
									<div class="list-group-item">
										<p class="mb-1">
											4. <b>Settings</b> – popup allowing you to change the game mode. There are
											separate buttons for each mode.
										</p>
										<p class="mb-1">
											- <b>Custom</b> game button opens a new popup where you can choose the board
											size and number of mines. The number of mines cannot be greater than 1/3 of
											the number of fields on the board.
										</p>
										<p class="mb-1">
											- <b>Clear statistics</b> button clears all statistics as well as best
											scores.
										</p>
										<p class="mb-1">
											- <b>Safe first click</b> - selecting this option avoids selecting the field
											with a mine when starting a new game. This is a significant simplification
											and allows you to avoid the frustrating process of starting a new game after
											first click.
										</p>
										<p class="mb-1">
											- <b>Allow question mark</b> – selected allows to use question mark on
											fields. This option is enabled by default.
										</p>
									</div>
									<div class="list-group-item">
										<p class="mb-1">
											5. It is possible to change the appearance of the board. Two modes are
											available: <b>Modern</b> and <b>Classic</b>. Modern mode is enabled by default.
										</p>
									</div>
									<div class="list-group-item">
										<p class="mb-1">
											6. For ease of adjustment, the board size can be changed from the html view.
											There is a simple form with inputs in which you can enter numerical values,
											unlike the popup available in the <b>Settings</b> → <b>Custom</b> menu where you have
											to click on the arrows.
										</p>
									</div>
									<div class="list-group-item">
										<p class="mb-1">
											7. Name change form: the name appears in the table with the best results.
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
