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
								<div class="list-group list-group-flush fw-normal">
									<div class="list-group-item">
										<p class="mb-1">
											1. At the beginning all squares are covered.
											<img src="/images/covered_field.png" alt="Uncovered field" />
										</p>
									</div>
									<div class="list-group-item">
										<p class="mb-1">
											2. The game starts when the player clicks on the selected box for the first
											time. From this moment time begins to be measured.
										</p>
									</div>
									<div class="list-group-item">
										<p class="mb-1">
											3. If the selected field is empty and all surrounding fields are empty, all
											neighbors are revealed. If neighbors also have empty squares nearby, they
											are revealed.
											<img src="/images/empty_fields.png" alt="Empty field" />
										</p>
									</div>
									<div class="list-group-item">
										<p class="mb-1">
											4. If the field is empty but has at least one mine nearby, a number appears on
											the field indicating the number of mines in the adjacent fields. For
											example: '1' means that a given field has only one mine in its vicinity. The
											picture shows that the field with the number '3' has three mines nearby. In
											a rare case, a square may be surrounded by 8 mined squares.
											<img src="/images/numbers.png" alt="Numbers" />
										</p>
									</div>
									<div class="list-group-item">
										<p class="mb-1">
											5. The field may be marked with a flag. The flag is used to mark a field as potentially mined. Such a field cannot be clicked and unhidden, which makes the game easier. Setting a flag on a field reduces the number of flags displayed in the UI. As a rule, the game is won if all empty squares are revealed and the number of flags set is equal to the number of mines (but you can also play without setting flags).
											<img src="/images/flagged_field.png" alt="Flagged field" />
										</p>
									</div>
									<div class="list-group-item">
										<p class="mb-1">6. A field may be marked with a question mark if the player is not sure whether the field is safe/mined. The box marked with a question mark is still clickable.</p>
										<img src="/images/uncertained_field.png" alt="Uncertain field" />
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
