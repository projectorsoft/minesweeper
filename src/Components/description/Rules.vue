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
					<img src="/images/unfold.svg" width="22" height="22" alt="unfold" />
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
								<div class="list-group list-group-flush fw-normal">
									<div class="list-group-item">
										<p class="mb-1">
											Minesweeper is a classic logic game. It was created in 1981 and added to
											Microsoft Windows as a standard. The game consists of fields arranged in
											rows and columns. The player's goal is to discover all the fields to avoid
											"falling" on a mine. To make the game easier, numbers appear on the
											uncovered fields, which indicate the number of mines in the immediate
											vicinity. On this basis, it is necessary to deduce where there are mines and
											where they are not.
										</p>
									</div>
									<div class="list-group-item">
										<p class="mb-1">Fields can be in multiple states:</p>
										<p class="mb-1">- Covered</p>
										<p class="mb-1">
											- Uncovered and empty- no mines in this field or in its vicinity
										</p>
										<p class="mb-1">
											- Revealed with a number – there is a mine adjacent to this square
										</p>
										<p class="mb-1">- Field marked with a flag</p>
										<p class="mb-1">- Field marked with a question mark</p>
										<p class="mb-1">- Field mined</p>
									</div>
									<div class="list-group-item">
										<p class="mb-1">
											The game has three default game modes, differing in the size of the board
											and the number of hidden mines. In 'easy' mode, the board is the smallest
											and contains the fewest mines. The size is 8x8 fields and only 10 min. In
											'medium' mode, the board size is 16x16 fields and 40 minutes. 'Hard' mode is
											31x16 fields and 99 minutes. As you can see, the difficulty level increases,
											requiring more concentration from the player.
										</p>
									</div>
									<div class="list-group-item">
										<p class="mb-1">
											There is also a fourth game mode available, in which the player can set the
											size of the board and the number of mines. In this mode, the difficulty
											level is definitely the highest due to the possible size of the board and
											the number of mines.
										</p>
									</div>
									<div class="list-group-item">
										<p class="mb-1">
											The goal of the game is, of course, to discover all the fields without
											hitting a mine. However, it is possible to compete with other players based
											on measured times and the number of clicks needed to win the game. Each game
											measures time in milliseconds, and when you win the current game, this time
											is recorded in your statistics. These statistics can later be compared in a
											summary table, sorted by time, number of clicks and game mode. If two
											players have the same time and the same number of clicks, the one with the
											more difficult game mode wins.
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
